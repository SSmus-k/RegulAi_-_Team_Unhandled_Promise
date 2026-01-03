export default function PropertiesList({ properties }: { properties: any[] }) {
  return (
    <div className="bg-white p-4 rounded shadow my-6">
      <h3 className="font-semibold mb-4">Your Businesses</h3>
      <ul>
        {properties.map((p, i) => (
          <li key={i} className="flex justify-between items-center border-b py-2 last:border-b-0">
            <div>
              <div className="font-bold">{p.name}</div>
              <div className="text-sm text-gray-500">{p.type}</div>
              <div className="text-xs text-blue-700">{p.complianceStatus}</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-900 rounded">View</button>
              <button className="px-3 py-1 bg-green-100 text-green-900 rounded">Comply</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
