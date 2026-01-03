export default function FinancialSummary({ dateRange }: { dateRange: string }) {
  const financialData = [
    {
      category: "Revenue",
      current: "$127,500",
      previous: "$113,400",
      change: "+12.5%",
      isPositive: true,
    },
    {
      category: "Costs",
      current: "$48,300",
      previous: "$52,100",
      change: "-7.3%",
      isPositive: true,
    },
    {
      category: "Gross Profit",
      current: "$79,200",
      previous: "$61,300",
      change: "+29.2%",
      isPositive: true,
    },
    {
      category: "Operating Expenses",
      current: "$35,500",
      previous: "$38,200",
      change: "-7.1%",
      isPositive: true,
    },
    {
      category: "Net Income",
      current: "$43,700",
      previous: "$23,100",
      change: "+89.2%",
      isPositive: true,
    },
    {
      category: "Gross Margin",
      current: "62.1%",
      previous: "54.1%",
      change: "+8.0pp",
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-cyan-200 mb-4">Monthly Financials</h3>
        <div className="space-y-3">
          {financialData.map((item) => (
            <div key={item.category} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0">
              <div>
                <p className="text-gray-300 font-medium">{item.category}</p>
                <p className="text-sm text-gray-500">{item.previous} (prev)</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{item.current}</p>
                <p className={`text-sm ${item.isPositive ? "text-green-300" : "text-red-300"}`}>
                  {item.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-cyan-200 mb-4">Financial Health</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Profitability</span>
              <span className="text-green-300 font-bold">34.3%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: "34.3%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Debt-to-Equity Ratio</span>
              <span className="text-blue-300 font-bold">0.45</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full" style={{ width: "45%" }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Healthy range: &lt;1.0</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Cash Flow Health</span>
              <span className="text-green-300 font-bold">Strong</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
            <p className="text-blue-300 font-semibold mb-2">💡 Insight</p>
            <p className="text-gray-300 text-sm">Your business shows strong financial health with improving margins and positive cash flow. Consider reinvesting profits into growth initiatives.</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg lg:col-span-2">
        <h3 className="text-lg font-semibold text-cyan-200 mb-4">Expenses Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-300 text-sm mb-2">Operations</p>
            <p className="text-2xl font-bold text-red-200">28%</p>
            <p className="text-xs text-gray-500 mt-1">$13,524/mo</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <p className="text-purple-300 text-sm mb-2">Engineering</p>
            <p className="text-2xl font-bold text-purple-200">35%</p>
            <p className="text-xs text-gray-500 mt-1">$16,975/mo</p>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-orange-300 text-sm mb-2">Marketing</p>
            <p className="text-2xl font-bold text-orange-200">22%</p>
            <p className="text-xs text-gray-500 mt-1">$10,670/mo</p>
          </div>
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
            <p className="text-pink-300 text-sm mb-2">Other</p>
            <p className="text-2xl font-bold text-pink-200">15%</p>
            <p className="text-xs text-gray-500 mt-1">$7,275/mo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
