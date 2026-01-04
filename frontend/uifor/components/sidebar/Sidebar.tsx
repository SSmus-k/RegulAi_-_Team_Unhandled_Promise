"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building, ShieldCheck, Search, FileText, Settings } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'My Businesses', href: '/dashboard/businesses', icon: Building },
  { label: 'Compliance', href: '/dashboard/compliance', icon: ShieldCheck },
  { label: 'Find Solution', href: '/dashboard/solutions', icon: Search },
  { label: 'Reports', href: '/dashboard/reports', icon: FileText },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-full w-58 bg-white/10 backdrop-blur-xl border-r border-white/10 flex flex-col z-30">
      <div className="h-20 flex items-center justify-center border-b border-white/10">
        <span className="text-2xl font-bold text-cyan-300 tracking-wide">RegulAI</span>
      </div>
      <nav className="flex-1 py-6">
        <ul className="space-y-2">
          {navItems.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className={`flex items-center gap-3 px-6 py-3 transition font-medium text-sm ${pathname === href ? 'bg-cyan-700/80 text-white shadow-lg' : 'text-cyan-100 hover:bg-cyan-900/40 hover:text-white'}`}>
                <Icon className="size-5" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Collapsible logic can be added here */}
    </aside>
  );
}
