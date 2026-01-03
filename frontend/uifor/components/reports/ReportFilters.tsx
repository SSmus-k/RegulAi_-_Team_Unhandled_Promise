export default function ReportFilters({
  dateRange,
  setDateRange,
}: {
  dateRange: string;
  setDateRange: (range: string) => void;
}) {
  const ranges = [
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "quarterly", label: "Quarterly" },
    { id: "yearly", label: "Yearly" },
  ];

  return (
    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-lg">
      <span className="text-gray-300 font-semibold">Report Period:</span>
      <div className="flex gap-2">
        {ranges.map((range) => (
          <button
            key={range.id}
            onClick={() => setDateRange(range.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              dateRange === range.id
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}
