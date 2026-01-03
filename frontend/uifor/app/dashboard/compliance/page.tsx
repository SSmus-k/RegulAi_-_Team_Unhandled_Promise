"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const businessTypes = [
  'Private Limited',
  'Partnership',
  'Sole Proprietorship',
  'NGO',
];
const actions = [
  'registration',
  'hiring',
  'expansion',
];

export default function ComplianceForm() {
  const [businessType, setBusinessType] = useState('');
  const [action, setAction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        router.push(`/results?businessType=${businessType}&action=${action}`);
      }, 1200);
    } catch {
      setLoading(false);
      setError('Failed to fetch compliance checklist.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-4">
      <form className="max-w-md w-full bg-white/10 p-6 rounded shadow" onSubmit={handleSubmit} aria-label="Compliance Form">
        <h2 className="text-xl font-bold mb-4 text-white">Compliance Check</h2>
        <label className="block mb-2 font-medium">Business Type</label>
        <select
          className="w-full mb-4 bg-gray-800 p-2 border rounded"
          value={businessType}
          onChange={e => setBusinessType(e.target.value)}
          required
        >
          <option className='' value="">Select type</option>
          {businessTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <label className="block mb-2 font-medium">Intended Action</label>
        <select
          className="w-full mb-4 p-2 bg-gray-800 border rounded"
          value={action}
          onChange={e => setAction(e.target.value)}
          required
        >
          <option value="">Select action</option>
          {actions.map(act => (
            <option key={act} value={act}>{act}</option>
          ))}
        </select>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 transition"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Checklist'}
        </button>
      </form>
    </main>
  );
}
