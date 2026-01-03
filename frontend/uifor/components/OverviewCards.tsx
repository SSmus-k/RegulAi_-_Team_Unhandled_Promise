export default function OverviewCards({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-6">
      <div className="bg-blue-50 p-4 rounded shadow">
        <div className="text-sm text-gray-500">Total Businesses</div>
        <div className="text-2xl font-bold">{data.totalBusinesses}</div>
      </div>
      <div className="bg-green-50 p-4 rounded shadow">
        <div className="text-sm text-gray-500">Compliance Status</div>
        <div className="text-2xl font-bold">{data.complianceStatus}</div>
      </div>
      <div className="bg-yellow-50 p-4 rounded shadow">
        <div className="text-sm text-gray-500">Pending Approvals</div>
        <div className="text-2xl font-bold">{data.pendingApprovals}</div>
      </div>
      <div className="bg-red-50 p-4 rounded shadow">
        <div className="text-sm text-gray-500">Upcoming Deadlines</div>
        <div className="text-2xl font-bold">{data.upcomingDeadlines}</div>
      </div>
    </div>
  );
}
