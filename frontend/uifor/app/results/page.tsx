"use client";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';


type ChecklistItem = {
  step: string;
  approval: string;
  deadline: string;
  source: string;
};

const mockChecklist: ChecklistItem[] = [
  {
    step: 'Submit registration form',
    approval: 'Company Registrar',
    deadline: '2026-01-15',
    source: 'Company Registration Act',
  },
  {
    step: 'Pay registration fee',
    approval: 'Tax Office',
    deadline: '2026-01-20',
    source: 'Tax Act',
  },
];

export default function ResultsPage() {
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setChecklist(mockChecklist);
      setLoading(false);
    }, 1200);
  }, []);

  const handleDownload = () => {
    // Simple PDF download logic (placeholder)
    window.print();
  };

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-4 bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#312e81]">
      <div className="max-w-2xl w-full bg-white/10 p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-white">Compliance Checklist</h2>
        <div className="mb-4 text-gray-300">
          <strong>Business Type:</strong> {params.get('businessType')}<br />
          <strong>Action:</strong> {params.get('action')}
        </div>
        {loading ? (
          <div className="text-blue-600">Loading checklist...</div>
        ) : (
          <ul className="mb-6">
            {checklist.map((item, idx) => (
              <li key={idx} className="mb-4 p-4 border rounded">
                <div><strong>Step:</strong> {item.step}</div>
                <div><strong>Approval:</strong> {item.approval}</div>
                <div><strong>Deadline:</strong> {item.deadline}</div>
                <div><strong>Source:</strong> {item.source}</div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleDownload}
          className="w-full py-2 bg-green-700 text-white rounded font-semibold hover:bg-green-800 transition"
        >
          Download as PDF
        </button>
      </div>
    </main>
  );
}
