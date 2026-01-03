import Sidebar from '../sidebar/Sidebar';
import UserPanel from '../sidebar/UserPanel';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#312e81]">
      <Sidebar />
      <main className="flex-1 flex flex-col px-6 py-8 md:ml-58">
        {children}
      </main>
      <div className="hidden lg:block w-48 bg-white/10 backdrop-blur-xl border-l border-white/10 p-6">
        <UserPanel />
      </div>
    </div>
  );
}
