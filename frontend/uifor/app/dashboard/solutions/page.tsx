"use client";


import { useState } from 'react';
import SolutionResult from '@/components/solutions/SolutionResult';

type SolutionResultType = {
  summary: string;
};

export default function SolutionsPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SolutionResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      // Always use absolute backend URL for fetch
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || "http://localhost:8000";
      const apiUrl = `${backendUrl}/api/v1/core/ai/answer/`;
      console.log('Fetching AI answer from:', apiUrl);
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, location: "Nepal" })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      // Expecting backend to return { answer: string }
      // For demo, parse answer as summary, laws, statements, steps (if possible)
      // Here, just show answer as summary, rest empty
      setResult({
        summary: data.answer,
      });
    } catch (err: any) {
      setError(err.message || "Failed to get answer");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 w-full">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-md p-8 shadow-xl mb-8">
        <h2 className="text-2xl font-bold text-cyan-200 mb-4">Describe Your Problem</h2>
        <textarea
          className="w-full h-32 resize-none p-4 rounded-md bg-white/10 text-cyan-100 border border-cyan-600 focus:outline-none focus:ring focus:ring-cyan-500 mb-4"
          placeholder="E.g. I want to expand my retail business and hire 5 employees"
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-cyan-700 text-sm text-white rounded-sm shadow hover:bg-cyan-800 transition"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {error && (
        <div className="bg-red-900/80 text-red-200 rounded-md p-4 mb-4">{error}</div>
      )}
      {result && (
        <SolutionResult
          summary={result.summary}
          onDownload={() => alert('Download as PDF (to be implemented)')}
          onSave={() => alert('Save Solution (to be implemented)')}
        />
      )}
    </div>
  );
}
