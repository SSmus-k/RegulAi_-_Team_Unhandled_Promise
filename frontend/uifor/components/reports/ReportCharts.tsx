import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ReportCharts({ dateRange }: { dateRange: string }) {
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [85000, 95000, 110000, 127500, 135000, 142000],
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const customerData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Dec"],
    datasets: [
      {
        label: "New Customers",
        data: [150, 175, 210, 245, 280, 320],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
      {
        label: "Churned Customers",
        data: [28, 25, 32, 38, 42, 48],
        backgroundColor: "rgba(239, 68, 68, 0.7)",
      },
    ],
  };

  const segmentData = {
    labels: ["Enterprise", "Mid-Market", "SMB", "Startup"],
    datasets: [
      {
        data: [35, 25, 28, 12],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(251, 146, 60, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-cyan-200 mb-4">Revenue Trend</h3>
        <Line data={revenueData} options={chartOptions} />
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-cyan-200 mb-4">Customer Acquisition vs Churn</h3>
        <Bar data={customerData} options={chartOptions} />
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-cyan-200 mb-4">Revenue by Customer Segment</h3>
        <div className="flex justify-center">
          <div className="w-64 h-64">
            <Doughnut
              data={segmentData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "rgba(229, 231, 235, 0.8)",
                      padding: 20,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-cyan-200 mb-4">Key Metrics Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Avg Revenue per User:</span>
            <span className="text-white font-bold">$44.82</span>
          </div>
          <div className="flex justify-between items-center border-t border-white/10 pt-3">
            <span className="text-gray-300">Payback Period:</span>
            <span className="text-white font-bold">12.2 months</span>
          </div>
          <div className="flex justify-between items-center border-t border-white/10 pt-3">
            <span className="text-gray-300">Net Dollar Retention:</span>
            <span className="text-green-300 font-bold">128%</span>
          </div>
          <div className="flex justify-between items-center border-t border-white/10 pt-3">
            <span className="text-gray-300">Product-Market Fit Score:</span>
            <span className="text-green-300 font-bold">8.5/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
