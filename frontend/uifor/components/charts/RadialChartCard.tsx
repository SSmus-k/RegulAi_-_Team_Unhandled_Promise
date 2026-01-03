import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Compliance', value: 82, fill: '#06b6d4' },
];

export default function RadialChartCard() {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg flex flex-col items-center">
      <h3 className="text-cyan-200 font-semibold mb-2">Compliance Completion</h3>
      <ResponsiveContainer width={180} height={180}>
        <RadialBarChart innerRadius="80%" outerRadius="100%" barSize={18} data={data} startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={12} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="mt-2 text-3xl font-bold text-cyan-300">82%</div>
    </div>
  );
}
