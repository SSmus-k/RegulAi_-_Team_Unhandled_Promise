import os
import json
import sqlite3
import logging
import requests
from typing import Optional

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .ai_response_schema import AIResponseSerializer

logger = logging.getLogger(__name__)


# ===============================
# Local Training Database (SQLite)
# ===============================

DB_PATH = os.path.join(os.path.dirname(__file__), "training_data.db")


def init_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(
        """
        CREATE TABLE IF NOT EXISTS training_data (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            question    TEXT UNIQUE,
            answer_json TEXT
        )
        """
    )
    conn.commit()
    return conn


def save_training_example(question: str, answer: dict) -> None:
    conn = init_db()
    c = conn.cursor()
    c.execute(
        "INSERT OR REPLACE INTO training_data (question, answer_json) VALUES (?, ?)",
        (question.lower().strip(), json.dumps(answer, ensure_ascii=False)),
    )
    conn.commit()
    conn.close()


def custom_ai_answer(question: str, threshold: float = 0.7) -> Optional[dict]:
    """Return a cached answer if a sufficiently similar question exists in the DB."""
    import difflib

    conn = init_db()
    c = conn.cursor()
    c.execute("SELECT question, answer_json FROM training_data")
    rows = c.fetchall()
    conn.close()

    question_norm = question.lower().strip()
    best_score = 0.0
    best_answer = None

    for q, answer_json in rows:
        score = difflib.SequenceMatcher(None, question_norm, q).ratio()
        if score > best_score and score >= threshold:
            best_score = score
            best_answer = answer_json

    return json.loads(best_answer) if best_answer else None


# ===============================
# Prompt Builder
# ===============================

def generate_prompt(question: str, location: str = "Nepal") -> str:
    return f"""
You are an expert legal and business advisor for Nepalese SMEs.

STRICT RULES:
- Output ONLY valid JSON — no markdown, no code fences, no explanations.

JSON SCHEMA (match exactly):
{{
  "summary": "short explanation",
  "key_points": ["point 1", "point 2"],
  "step_by_step": ["step 1", "step 2"],
  "legal_reference": ["law or regulation reference"],
  "action_items": ["action 1"],
  "confidence_score": 0.85,
  "risk_level": "Low"
}}

Rules:
- Use simple, plain language.
- confidence_score must be a float between 0.0 and 1.0.
- risk_level must be exactly one of: Low, Medium, High.
- Empty lists are allowed if not applicable.

Location: {location}
Question: {question}
""".strip()


# ===============================
# Groq API Call  (free tier)
# https://console.groq.com — sign up, grab your key, set GROQ_API_KEY
# Free models: llama-3.3-70b-versatile, llama3-8b-8192, mixtral-8x7b-32768
# ===============================

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL   = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")


def call_groq(prompt: str, api_key: str) -> Optional[str]:
    """
    Call the Groq chat completion endpoint.
    Returns the raw text content of the model reply, or None on failure.
    """
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are an expert legal and business advisor for Nepalese SMEs. "
                    "Output ONLY valid JSON — no markdown, no code fences, no extra text."
                ),
            },
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.2,
        "max_tokens": 1024,
    }

    try:
        resp = requests.post(GROQ_API_URL, headers=headers, json=payload, timeout=30)
        logger.info(f"Groq response status: {resp.status_code}")
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]["content"]
    except requests.HTTPError as e:
        logger.warning(f"Groq HTTP error {resp.status_code}: {resp.text}")
        return None
    except Exception as e:
        logger.warning(f"Groq call failed: {e}")
        return None


# ===============================
# Response Normaliser & Validator
# ===============================

SCHEMA_DEFAULTS = {
    "schema_version":   "1.0",
    "summary":          "",
    "key_points":       [],
    "step_by_step":     [],
    "legal_reference":  [],
    "action_items":     [],
    "confidence_score": 0.0,
    "risk_level":       "",
}

ALLOWED_KEYS = set(SCHEMA_DEFAULTS.keys())


def strip_code_fences(raw: str) -> str:
    """Remove markdown code fences that some models add despite instructions."""
    raw = raw.strip()
    if raw.startswith("```"):
        # Remove opening fence (```json or just ```)
        raw = raw[raw.index("\n") + 1:] if "\n" in raw else raw[3:]
        # Remove closing fence
        if raw.endswith("```"):
            raw = raw[:-3]
    return raw.strip()


def normalize_and_validate(parsed: dict) -> Optional[dict]:
    """Fill defaults, strip unknown keys, run serializer validation."""
    parsed = dict(parsed)

    for key, default in SCHEMA_DEFAULTS.items():
        parsed.setdefault(key, default)

    # Keep only schema keys — discard anything extra the model hallucinated
    parsed = {k: v for k, v in parsed.items() if k in ALLOWED_KEYS}

    serializer = AIResponseSerializer(data=parsed)
    if not serializer.is_valid():
        logger.warning(f"Schema validation errors: {serializer.errors}")
        return None

    data = serializer.validated_data
    if not isinstance(data, dict):
        return None

    score = data.get("confidence_score", 0.0)
    if not isinstance(score, (int, float)) or not (0.0 <= float(score) <= 1.0):
        logger.warning(f"confidence_score out of range: {score}")
        return None

    return data


# ===============================
# API View
# ===============================

class AIAnswerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        question = request.data.get("prompt", "")
        location = request.data.get("location", "Nepal")

        # --- Input validation ---
        if not str(question).strip():
            return Response(
                {"error": "Prompt is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        question = str(question).strip()

        # --- 1. Check local cache first (free & instant) ---
        cached = custom_ai_answer(question)
        if cached:
            return Response(
                {"answer": cached, "source": "cache"},
                status=status.HTTP_200_OK,
            )

        # --- 2. Check API key ---
        api_key = os.environ.get("GROQ_API_KEY", "").strip()
        if not api_key:
            logger.error("GROQ_API_KEY is not set in environment variables.")
            return Response(
                {"error": "AI service is not configured. Contact the administrator."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # --- 3. Call Groq ---
        prompt = generate_prompt(question, location)
        raw = call_groq(prompt, api_key)

        if not raw:
            return Response(
                {"error": "AI service unavailable. Please try again later."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        # --- 4. Parse JSON ---
        raw = strip_code_fences(raw)
        try:
            parsed = json.loads(raw)
        except json.JSONDecodeError as e:
            logger.warning(f"Invalid JSON from Groq: {e}\nRaw output:\n{raw}")
            return Response(
                {"error": "AI returned malformed output. Please try again."},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        # --- 5. Validate against schema ---
        validated = normalize_and_validate(parsed)
        if not validated:
            logger.warning(f"Groq output failed schema validation.\nParsed: {parsed}")
            return Response(
                {"error": "AI output failed schema validation. Please try again."},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        # --- 6. Cache the good answer & return ---
        save_training_example(question, validated)

        return Response(
            {
                "answer": validated,
                "source": "groq",
                "model": GROQ_MODEL,
            },
            status=status.HTTP_200_OK,
        )