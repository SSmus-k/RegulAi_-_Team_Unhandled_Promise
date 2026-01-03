import React from 'react';

export default function Header({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSearch(query);
    } catch (err: any) {
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-between">
      <form className="flex-1 flex gap-2" onSubmit={handleSubmit}>
        <input
          className="flex-1 border rounded px-3 py-2"
          type="text"
          placeholder="Describe your compliance problem..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Global search"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {error && <div className="text-red-600 ml-4">{error}</div>}
    </header>
  );
}
