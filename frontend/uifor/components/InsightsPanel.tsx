export default function InsightsPanel({ insights }: { insights: string[] }) {
  return (
    <aside className="bg-blue-50 p-4 rounded shadow my-6">
      <h3 className="font-semibold mb-2">AI Compliance Insights</h3>
      <ul className="list-disc ml-6">
        {insights.map((insight, i) => (
          <li key={i} className="mb-2 text-blue-900">{insight}</li>
        ))}
      </ul>
    </aside>
  );
}
