import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { month: 'Jan', revenue: 20000 },
  { month: 'Feb', revenue: 22000 },
  { month: 'Mar', revenue: 21000 },
  { month: 'Apr', revenue: 25000 },
  { month: 'May', revenue: 24000 },
];

export default function BarChartCard() {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
      <h3 className="text-cyan-200 font-semibold mb-2">Revenue by Month</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ background: '#0f172a', border: 'none', color: '#fff' }} />
          <Bar dataKey="revenue" fill="#06b6d4" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
