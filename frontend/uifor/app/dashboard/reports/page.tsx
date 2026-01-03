"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../hooks/useAuth";
import MetricsCards from "../../../components/reports/MetricsCards";
import ReportCharts from "../../../components/reports/ReportCharts";
import GrowthMetrics from "../../../components/reports/GrowthMetrics";
import FinancialSummary from "../../../components/reports/FinancialSummary";
import ExecutiveSummary from "../../../components/reports/ExecutiveSummary";
import ReportFilters from "../../../components/reports/ReportFilters";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("monthly");
  const [selectedMetric, setSelectedMetric] = useState("all");

  const handleExportPDF = () => {
    alert("PDF export functionality will be implemented soon!");
  };

  const handleScheduleReport = () => {
    alert("Report scheduling functionality will be implemented soon!");
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Business Reports</h1>
          <p className="text-gray-400">Track your startup's performance and growth metrics</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleScheduleReport}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
          >
            📅 Schedule Report
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            ⬇️ Export PDF
          </button>
        </div>
      </div>

      {/* Report Filters */}
      <ReportFilters dateRange={dateRange} setDateRange={setDateRange} />

      {/* Executive Summary */}
      <ExecutiveSummary />

      {/* Key Metrics Cards */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Performance Overview</h2>
        <MetricsCards dateRange={dateRange} />
      </div>

      {/* Financial Summary */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Financial Summary</h2>
        <FinancialSummary dateRange={dateRange} />
      </div>

      {/* Growth Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Growth & Trends</h2>
        <GrowthMetrics dateRange={dateRange} />
      </div>

      {/* Charts Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Detailed Analytics</h2>
        <ReportCharts dateRange={dateRange} />
      </div>

      {/* Recommendations Section */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-cyan-200 mb-4">📊 AI-Powered Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-green-300 font-semibold mb-2">✅ Strong Areas</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Customer retention improved by 15%</li>
              <li>• Cost optimization achieved 12% savings</li>
              <li>• Team productivity up 8%</li>
            </ul>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="text-yellow-300 font-semibold mb-2">⚠️ Areas for Improvement</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Scale marketing spend for better ROI</li>
              <li>• Optimize operational costs in Q2</li>
              <li>• Increase product development velocity</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-cyan-200 mb-4">🎯 Next Steps</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg">
            <input type="checkbox" className="mt-1" />
            <div>
              <p className="text-white font-semibold">Review Q1 Performance Metrics</p>
              <p className="text-gray-400 text-sm">Due by January 10, 2026</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg">
            <input type="checkbox" className="mt-1" />
            <div>
              <p className="text-white font-semibold">Implement Cost Optimization Strategy</p>
              <p className="text-gray-400 text-sm">Due by January 20, 2026</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg">
            <input type="checkbox" className="mt-1" />
            <div>
              <p className="text-white font-semibold">Schedule investor update call</p>
              <p className="text-gray-400 text-sm">Due by January 15, 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-4 mt-4">
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
