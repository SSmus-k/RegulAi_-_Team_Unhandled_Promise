export default function ExecutiveSummary() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-blue-100 text-sm font-semibold mb-2">Overall Performance</p>
          <p className="text-4xl font-bold text-white mb-2">A+</p>
          <p className="text-blue-100 text-sm">Excellent growth trajectory with strong unit economics</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm font-semibold mb-2">Report Period</p>
          <p className="text-2xl font-bold text-white mb-2">Dec 2025</p>
          <p className="text-blue-100 text-sm">Generated on Jan 1, 2026</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm font-semibold mb-2">Status</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-white font-bold">On Track</p>
          </div>
          <p className="text-blue-100 text-sm">All KPIs within target range</p>
        </div>
      </div>
    </div>
  );
}
