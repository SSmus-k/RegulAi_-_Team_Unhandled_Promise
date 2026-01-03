export default function MetricsCards({ dateRange }: { dateRange: string }) {
  const metrics = [
    {
      label: "Monthly Revenue",
      value: "$127,500",
      change: "+12.5%",
      isPositive: true,
      icon: "💰",
      accent: "from-green-500 to-emerald-700",
    },
    {
      label: "Active Customers",
      value: "2,847",
      change: "+8.2%",
      isPositive: true,
      icon: "👥",
      accent: "from-blue-500 to-cyan-700",
    },
    {
      label: "Churn Rate",
      value: "2.3%",
      change: "-0.8%",
      isPositive: true,
      icon: "📉",
      accent: "from-purple-500 to-indigo-700",
    },
    {
      label: "Customer LTV",
      value: "$3,420",
      change: "+6.4%",
      isPositive: true,
      icon: "📊",
      accent: "from-orange-500 to-red-700",
    },
    {
      label: "CAC",
      value: "$542",
      change: "-3.2%",
      isPositive: true,
      icon: "🎯",
      accent: "from-pink-500 to-rose-700",
    },
    {
      label: "MRR Growth",
      value: "18.9%",
      change: "+5.1%",
      isPositive: true,
      icon: "📈",
      accent: "from-violet-500 to-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={`bg-linear-to-br ${metric.accent} rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-48`}
          style={{ backdropFilter: "blur(12px)", background: "rgba(30,41,59,0.7)" }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="text-4xl">{metric.icon}</div>
            <span
              className={`text-sm font-bold ${
                metric.isPositive ? "text-green-300" : "text-red-300"
              }`}
            >
              {metric.change}
            </span>
          </div>
          <div>
            <p className="text-gray-300 text-sm font-medium mb-1">{metric.label}</p>
            <p className="text-3xl font-bold text-white">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
