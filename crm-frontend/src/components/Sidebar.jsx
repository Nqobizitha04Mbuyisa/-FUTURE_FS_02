import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, PlusCircle, Mail } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard',   icon: LayoutDashboard },
  { to: '/leads',     label: 'Leads',       icon: Users },
  { to: '/leads/new', label: 'Add Lead',    icon: PlusCircle },
  { to: '/contact',   label: 'Public Form', icon: Mail, external: true },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col">
      <div className="px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">
            ◆
          </div>
          <div>
            <p className="font-display text-lg font-semibold leading-none">Mini CRM</p>
            <p className="text-xs text-slate-500">Lead management</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {links.map(({ to, label, icon: Icon, external }) => (
            <li key={to}>
              {external ? (
                <a
                  href={to}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </a>
              ) : (
                <NavLink
                  to={to}
                  end={to === '/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
        v1.0.0 · Spring Boot + React
      </div>
    </aside>
  );
}
