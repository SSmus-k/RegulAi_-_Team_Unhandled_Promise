"use client";

import { useState } from 'react';
import SolutionResult from '@/components/solutions/SolutionResult';

// Unified env var — was NEXT_PUBLIC_BACKEND_URL which never matched other files
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';

type SolutionResultType = {
  summary: unknown;
};

export default function SolutionsPage() {
  const [input, setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<SolutionResultType | null>(null);
  const [error, setError]     = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        setError('You must be logged in to use this feature.');
        return;
      }

      const res = await fetch(`${API_URL}/core/ai/answer/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: input, location: 'Nepal' }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server error: ${res.status}`);
      }

      setResult({ summary: data.answer });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to get answer';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl rounded-md p-8 shadow-xl mb-8"
      >
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
          className="px-6 py-2 bg-cyan-700 text-sm text-white rounded-sm shadow hover:bg-cyan-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !input.trim()}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {error && (
        <div className="bg-red-900/80 text-red-200 rounded-md p-4 mb-4">
          {error}
        </div>
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