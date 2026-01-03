
import os
import json
import time
import sqlite3
import logging
import requests
from typing import Optional

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

# Import strict AI response schema
from .ai_response_schema import AIResponseSerializer

logger = logging.getLogger(__name__)

# ===============================
# Simple Local Training Database
# ===============================

DB_PATH = os.path.join(os.path.dirname(__file__), "training_data.db")


def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(
        """
        CREATE TABLE IF NOT EXISTS training_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT UNIQUE,
            answer_json TEXT
        )
        """
    )
    conn.commit()
    return conn


def save_training_example(question: str, answer: dict):
    conn = init_db()
    c = conn.cursor()
    c.execute(
        "INSERT OR REPLACE INTO training_data (question, answer_json) VALUES (?, ?)",
        (question.lower().strip(), json.dumps(answer, ensure_ascii=False)),
    )
    conn.commit()
    conn.close()



# Fuzzy DB lookup for similar questions
def custom_ai_answer(question: str, threshold: float = 0.7) -> Optional[dict]:
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
    if best_answer:
        return json.loads(best_answer)
    return None

# Utility to check answer source
def get_answer_source(response_data: dict) -> str:
    """
    Returns 'gemini' if answer is from Gemini, 'custom_ai' if from DB, or 'unknown'.
    Expects the API response dict.
    """
    return response_data.get('source', 'unknown')


# ===============================
# Gemini Prompt + API
# ===============================

RESPONSE_SCHEMA_KEYS = [
    "summary",
    "key_points",
    "step_by_step",
    "legal_reference",
    "action_items",
    "confidence_score",
]


def generate_prompt(question: str, location: str = "Nepal") -> str:
    return f"""
You are an expert legal and business advisor for Nepalese SMEs.

STRICT RULES:
- Output ONLY valid JSON
- NO markdown
- NO explanations
- NO extra text

JSON SCHEMA (must match exactly):
{{
  "summary": "short explanation",
  "key_points": ["point 1", "point 2"],
  "step_by_step": ["step 1", "step 2"],
  "legal_reference": ["law reference"],
  "action_items": ["action 1"],
  "confidence_score": 0.0
}}

Guidelines:
- Simple language
- Bullet points preferred
- Empty lists allowed
- Confidence score between 0 and 1

Location: {location}
Question: {question}
""".strip()


def call_gemini(prompt: str, model: str, api_key: str) -> Optional[str]:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }

    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        logger.warning(f"Gemini call failed for {model}: {e}")
        return None



# Strict normalization and schema enforcement

def normalize_and_validate_response(parsed: dict) -> dict | None:
    parsed = dict(parsed)  # shallow copy

    DEFAULTS = {
        "schema_version": "1.0",
        "risk_level": "",
        "summary": "",
        "key_points": [],
        "step_by_step": [],
        "legal_reference": "",
        "action_items": [],
        "confidence_score": 0.0,
    }

    for key, default in DEFAULTS.items():
        parsed.setdefault(key, default)

    serializer = AIResponseSerializer(data=parsed)
    if not serializer.is_valid():
        return None

    data = serializer.validated_data

    # HARD safety clamp
    score = data.get("confidence_score", 0.0)
    if not isinstance(score, (int, float)) or not (0.0 <= score <= 1.0):
        return None

    return data



# ===============================
# API View
# ===============================


class AIAnswerView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        question = request.data.get("prompt")
        location = request.data.get("location", "Nepal")

        if not question:
            return Response({"error": "Prompt is required."}, status=status.HTTP_400_BAD_REQUEST)

        # 1️⃣ Check local trained answers (assumed already validated)
        cached = custom_ai_answer(question)
        if cached:
            return Response(
                {"answer": cached, "source": "custom_ai"},
                status=status.HTTP_200_OK,
            )

        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return Response(
                {"error": "GEMINI_API_KEY not configured"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        prompt = generate_prompt(question, location)
        models = [
            "gemini-2.5-flash",
            "gemini-2.0-flash",
        ]

        for model in models:
            raw = call_gemini(prompt, model, api_key)
            if not raw:
                continue

            try:
                parsed = json.loads(raw)
            except Exception as e:
                logger.warning(f"Invalid JSON from Gemini: {e}")
                time.sleep(1)
                continue

            validated = normalize_and_validate_response(parsed)
            if validated is not None:
                # Save only validated output
                save_training_example(question, validated)
                return Response(
                    {
                        "answer": validated,
                        "source": "gemini",
                        "model": model,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                logger.warning(f"AI output failed schema validation for model {model}")
                time.sleep(1)

        return Response(
            {"error": "AI service unavailable or output invalid"},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
