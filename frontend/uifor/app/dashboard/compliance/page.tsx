"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

const businessTypes = ["Private Limited", "Partnership", "Sole Proprietorship", "NGO"];
const actions = ["registration", "hiring", "expansion"];

export default function ComplianceForm() {
  const [businessType, setBusinessType] = useState("");
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("jwt");
    if (!token) {
      router.replace("/auth/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/compliance/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ business_type: businessType, action }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to generate checklist.");
      }

      // Pass the checklist id to results page
      router.push(`/results?checklistId=${data.id}&businessType=${businessType}&action=${action}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-4">
      <form
        className="max-w-md w-full bg-white/10 p-6 rounded shadow"
        onSubmit={handleSubmit}
        aria-label="Compliance Form"
      >
        <h2 className="text-xl font-bold mb-4 text-white">Compliance Check</h2>

        <label className="block mb-2 font-medium text-cyan-200">Business Type</label>
        <select
          className="w-full mb-4 bg-gray-800 p-2 border border-white/20 rounded text-white"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          required
        >
          <option value="">Select type</option>
          {businessTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <label className="block mb-2 font-medium text-cyan-200">Intended Action</label>
        <select
          className="w-full mb-4 p-2 bg-gray-800 border border-white/20 rounded text-white"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          required
        >
          <option value="">Select action</option>
          {actions.map((act) => (
            <option key={act} value={act}>{act}</option>
          ))}
        </select>

        {error && (
          <div className="text-red-400 bg-red-900/30 border border-red-500/40 rounded px-3 py-2 mb-3 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 transition disabled:opacity-50"
          disabled={loading || !businessType || !action}
        >
          {loading ? "Generating..." : "Get Checklist"}
        </button>
      </form>
    </main>
  );
}