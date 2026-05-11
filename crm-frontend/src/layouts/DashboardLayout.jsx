import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Topbar from '../components/Topbar.jsx';

const TITLE_BY_PATH = {
  '/dashboard': 'Dashboard',
  '/leads': 'Leads',
  '/leads/new': 'Add a new lead',
};

export default function DashboardLayout() {
  const location = useLocation();
  let title = TITLE_BY_PATH[location.pathname];
  if (!title && location.pathname.startsWith('/leads/')) title = 'Lead details';
  if (!title) title = 'Mini CRM';

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
