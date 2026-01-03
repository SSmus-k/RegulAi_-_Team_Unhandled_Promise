"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import LineChartCard from "../../components/charts/LineChartCard";
import BarChartCard from "../../components/charts/BarChartCard";
import RadialChartCard from "../../components/charts/RadialChartCard";

const summaryCards = [
  { label: "Total Businesses", value: 3, accent: "from-cyan-500 to-blue-700", icon: "🏢" },
  { label: "Pending Compliance", value: 2, accent: "from-yellow-400 to-yellow-700", icon: "⏳" },
  { label: "Approvals in Progress", value: 1, accent: "from-purple-500 to-indigo-700", icon: "🔄" },
  { label: "Alerts / Deadlines", value: 1, accent: "from-pink-500 to-red-700", icon: "⚠️" },
];

const insights = [
  { type: "alert", text: "Upcoming deadline: Tax filing by Jan 15." },
  { type: "risk", text: "No major compliance risks detected." },
  { type: "info", text: "Consider updating employee contracts for new labor law." },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className={`bg-linear-to-br ${card.accent} rounded-2xl p-6 shadow-xl flex flex-col items-start justify-between min-h-30`}
            style={{ backdropFilter: "blur(12px)", background: "rgba(30,41,59,0.7)" }}
          >
            <div className="text-3xl mb-2">{card.icon}</div>
            <div className="text-sm font-medium text-gray-300">{card.label}</div>
            <div className="text-2xl font-bold text-white mt-1">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <LineChartCard />
        <BarChartCard />
        <RadialChartCard />
      </div>

      {/* Insights Panel */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg mt-4">
        <h3 className="text-cyan-200 font-semibold mb-4">AI Insights & Alerts</h3>
        <ul className="space-y-2">
          {insights.map((insight, i) => (
            <li
              key={i}
              className={
                insight.type === "alert"
                  ? "text-yellow-300"
                  : insight.type === "risk"
                  ? "text-pink-300"
                  : "text-cyan-100"
              }
            >
              {insight.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
