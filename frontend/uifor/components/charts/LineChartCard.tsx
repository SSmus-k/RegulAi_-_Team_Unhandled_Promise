import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { month: 'Jan', profit: 12000, loss: 4000 },
  { month: 'Feb', profit: 15000, loss: 2000 },
  { month: 'Mar', profit: 13000, loss: 3000 },
  { month: 'Apr', profit: 17000, loss: 1000 },
  { month: 'May', profit: 16000, loss: 2000 },
];

export default function LineChartCard() {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
      <h3 className="text-cyan-200 font-semibold mb-2">Profit vs Loss</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ background: '#0f172a', border: 'none', color: '#fff' }} />
          <Line type="monotone" dataKey="profit" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="loss" stroke="#a78bfa" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
