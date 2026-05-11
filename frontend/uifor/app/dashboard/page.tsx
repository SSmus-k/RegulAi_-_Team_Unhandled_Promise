"use client";
import { useEffect, useState } from "react";
import LineChartCard from "../../components/charts/LineChartCard";
import BarChartCard from "../../components/charts/BarChartCard";
import RadialChartCard from "../../components/charts/RadialChartCard";
import { API_URL } from '../../lib/api';
export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    pendingCompliance: 0,
    approvalsInProgress: 0,
    alerts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    Promise.all([
      fetch(`${API_URL}/users/me/businesses/`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${API_URL}/compliance/`, { headers: { Authorization: `Bearer ${token}` } })
    ])
      .then(([bizRes, compRes]) => Promise.all([bizRes.json(), compRes.json()]))
      .then(([bizData, compData]) => {
        const businesses = bizData.data || [];
        const steps = compData.data || [];
        setStats({
          totalBusinesses: businesses.length,
          pendingCompliance: steps.filter((s: any) => s.status === "pending").length,
          approvalsInProgress: steps.filter((s: any) => s.approval_required && s.status === "in_progress").length,
          alerts: steps.filter((s: any) => s.status === "overdue").length,
        });
      })
      .catch(() => {
  // stats stay at 0, which is acceptable fallback
})
      .finally(() => setLoading(false));
  }, []);

  const summaryCards = [
    { label: "Total Businesses", value: stats.totalBusinesses, accent: "from-cyan-500 to-blue-700", icon: "🏢" },
    { label: "Pending Compliance", value: stats.pendingCompliance, accent: "from-yellow-400 to-yellow-700", icon: "⏳" },
    { label: "Approvals in Progress", value: stats.approvalsInProgress, accent: "from-purple-500 to-indigo-700", icon: "🔄" },
    { label: "Alerts / Deadlines", value: stats.alerts, accent: "from-pink-500 to-red-700", icon: "⚠️" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card) => (
          <div key={card.label} className={`bg-gradient-to-br ${card.accent} rounded-2xl p-6 shadow-xl flex flex-col items-start justify-between min-h-30`}>
            <div className="text-3xl mb-2">{card.icon}</div>
            <div className="text-sm font-medium text-gray-300">{card.label}</div>
            <div className="text-2xl font-bold text-white mt-1">
              {loading ? "..." : card.value}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <LineChartCard />
        <BarChartCard />
        <RadialChartCard />
      </div>
    </div>
  );
}