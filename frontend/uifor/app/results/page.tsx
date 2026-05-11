"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

interface Step {
  id: number;
  description: string;
  deadline: string | null;
  approval_required: boolean;
  status: string;
  regulation: { name: string; source: string } | null;
}

export default function ResultsPage() {
  const params = useSearchParams();
  const checklistId = params.get("checklistId");
  const businessType = params.get("businessType");
  const action = params.get("action");

  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!checklistId) {
      setError("No checklist ID found. Please go back and submit the form.");
      setLoading(false);
      return;
    }
    const token = localStorage.getItem("jwt");
    fetch(`${API_URL}/compliance/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const checklists = data.data ?? [];
        const found = checklists.find((c: any) => String(c.id) === checklistId);
        setSteps(found?.steps ?? []);
      })
      .catch(() => setError("Failed to load checklist."))
      .finally(() => setLoading(false));
  }, [checklistId]);

  async function markComplete(stepId: number) {
    const token = localStorage.getItem("jwt");
    const res = await fetch(`${API_URL}/compliance/steps/${stepId}/status/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "completed" }),
    });
    if (res.ok) {
      setSteps((prev) =>
        prev.map((s) => (s.id === stepId ? { ...s, status: "completed" } : s))
      );
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81]">
      <div className="max-w-2xl w-full bg-white/10 p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-2 text-white">Compliance Checklist</h2>
        <p className="text-gray-300 mb-4 text-sm">
          <strong className="text-cyan-300">Business Type:</strong> {businessType} &nbsp;|&nbsp;
          <strong className="text-cyan-300">Action:</strong> {action}
        </p>

        {loading && <p className="text-cyan-300">Loading checklist...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && steps.length === 0 && (
          <p className="text-gray-400">No steps found for this checklist.</p>
        )}

        <ul className="mb-6 space-y-3">
          {steps.map((step) => (
            <li
              key={step.id}
              className={`p-4 border rounded-xl transition ${
                step.status === "completed"
                  ? "border-green-500/40 bg-green-900/20"
                  : "border-white/20 bg-white/5"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-white font-medium">{step.description}</p>
                  {step.regulation && (
                    <p className="text-xs text-cyan-400 mt-1">
                      Source: {step.regulation.name}
                    </p>
                  )}
                  {step.deadline && (
                    <p className="text-xs text-yellow-300 mt-1">
                      Deadline: {step.deadline}
                    </p>
                  )}
                  {step.approval_required && (
                    <span className="inline-block mt-1 text-xs bg-purple-700/40 text-purple-300 px-2 py-0.5 rounded">
                      Approval Required
                    </span>
                  )}
                </div>
                {step.status !== "completed" && (
                  <button
                    onClick={() => markComplete(step.id)}
                    className="text-xs px-3 py-1 bg-green-700 hover:bg-green-600 text-white rounded-lg shrink-0 transition"
                  >
                    Mark Done
                  </button>
                )}
                {step.status === "completed" && (
                  <span className="text-xs text-green-400 shrink-0">✓ Done</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Download as PDF
          </button>
          <Link
            href="/dashboard/compliance"
            className="flex-1 py-2 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition text-center"
          >
            ← New Check
          </Link>
        </div>
      </div>
    </main>
  );
}