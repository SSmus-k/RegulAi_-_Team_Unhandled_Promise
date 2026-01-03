import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function GrowthMetrics({ dateRange }: { dateRange: string }) {
  const mrrData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Dec"],
    datasets: [
      {
        label: "MRR",
        data: [50000, 61000, 78500, 95000, 112000, 128500],
        borderColor: "rgba(168, 85, 247, 1)",
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const growthRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Dec"],
    datasets: [
      {
        label: "MoM Growth %",
        data: [0, 22, 28.6, 20.9, 17.9, 14.8],
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: "rgba(229, 231, 235, 0.8)",
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "rgba(229, 231, 235, 0.6)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "rgba(229, 231, 235, 0.6)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-cyan-200 mb-4">Monthly Recurring Revenue (MRR)</h3>
        <Line data={mrrData} options={chartOptions} />
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-cyan-200 mb-4">Month-over-Month Growth Rate</h3>
        <Line data={growthRateData} options={chartOptions} />
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg lg:col-span-2">
        <h3 className="text-lg font-semibold text-cyan-200 mb-4">Growth Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-cyan-500/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Annual Growth Rate</p>
            <p className="text-2xl font-bold text-green-300">157%</p>
          </div>
          <div className="border border-cyan-500/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Runway (months)</p>
            <p className="text-2xl font-bold text-cyan-300">24</p>
          </div>
          <div className="border border-cyan-500/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Burn Rate</p>
            <p className="text-2xl font-bold text-orange-300">$45k/mo</p>
          </div>
          <div className="border border-cyan-500/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Cash on Hand</p>
            <p className="text-2xl font-bold text-green-300">$1.2M</p>
          </div>
        </div>
      </div>
    </div>
  );
}
