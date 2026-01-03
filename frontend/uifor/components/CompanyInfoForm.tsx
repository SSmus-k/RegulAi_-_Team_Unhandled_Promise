import { useState } from 'react';

interface CompanyInfoFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
  error: string;
}

export default function CompanyInfoForm({ onSubmit, loading, error }: CompanyInfoFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    if (file) formData.append('file', file);
    onSubmit(formData);
  }

  return (
    <form className="bg-white p-6 rounded shadow max-w-md w-full" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4 text-blue-900">Add Company Info / File</h2>
      <label className="block mb-2 font-medium">Company Name</label>
      <input className="w-full mb-4 p-2 border rounded" value={name} onChange={e => setName(e.target.value)} required />
      <label className="block mb-2 font-medium">Type</label>
      <input className="w-full mb-4 p-2 border rounded" value={type} onChange={e => setType(e.target.value)} required />
      <label className="block mb-2 font-medium">Upload File</label>
      <input className="w-full mb-4" type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button type="submit" className="w-full py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 transition" disabled={loading}>
        {loading ? 'Uploading...' : 'Submit'}
      </button>
    </form>
  );
}
