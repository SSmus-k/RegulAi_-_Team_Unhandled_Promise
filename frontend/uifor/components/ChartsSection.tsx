import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function ChartsSection() {
  // Mock data
  const profitLossData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Profit',
        data: [12000, 15000, 13000, 17000, 16000],
        backgroundColor: 'rgba(34,197,94,0.6)',
      },
      {
        label: 'Loss',
        data: [4000, 2000, 3000, 1000, 2000],
        backgroundColor: 'rgba(239,68,68,0.6)',
      },
    ],
  };
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Revenue',
        data: [20000, 22000, 21000, 25000, 24000],
        borderColor: 'rgba(59,130,246,1)',
        backgroundColor: 'rgba(59,130,246,0.2)',
        fill: true,
      },
    ],
  };
  const complianceCostData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Compliance Cost',
        data: [2000, 1800, 2200, 2100, 2300],
        borderColor: 'rgba(251,191,36,1)',
        backgroundColor: 'rgba(251,191,36,0.2)',
        fill: true,
      },
      {
        label: 'Revenue',
        data: [20000, 22000, 21000, 25000, 24000],
        borderColor: 'rgba(59,130,246,1)',
        backgroundColor: 'rgba(59,130,246,0.1)',
        fill: true,
      },
    ],
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Profit vs Loss</h3>
        <Bar data={profitLossData} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Revenue Over Time</h3>
        <Line data={revenueData} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Compliance Cost vs Revenue</h3>
        <Line data={complianceCostData} />
      </div>
    </div>
  );
}
