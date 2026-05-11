import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Mail, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { dashboardService } from '../services/dashboardService.js';
import StatCard from '../components/StatCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { formatDate } from '../utils/formatters.js';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.stats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  }
  if (!stats) {
    return <p className="text-sm text-slate-600">Unable to load dashboard.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total leads"        value={stats.totalLeads}        icon={Users}        accent="brand" />
        <StatCard label="Contacted"          value={stats.contactedLeads}    icon={Mail}         accent="amber"
                  hint={`${stats.qualifiedLeads} qualified`} />
        <StatCard label="Converted"          value={stats.convertedLeads}    icon={CheckCircle2} accent="emerald" />
        <StatCard label="Conversion rate"    value={`${stats.conversionRate}%`} icon={TrendingUp} accent="violet"
                  hint={`${stats.newLeadsThisWeek} new this week`} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Status breakdown */}
        <div className="card p-5 lg:col-span-1">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Pipeline breakdown</h2>
            <Sparkles size={18} className="text-slate-400" />
          </div>
          <ul className="mt-4 space-y-3">
            {Object.entries(stats.statusBreakdown).map(([k, v]) => {
              const total = stats.totalLeads || 1;
              const pct = Math.round((v / total) * 100);
              return (
                <li key={k}>
                  <div className="flex items-center justify-between text-sm">
                    <StatusBadge status={k} />
                    <span className="font-semibold text-slate-700">{v}</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Recent leads */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="font-display text-lg font-semibold">Recent leads</h2>
            <Link to="/leads" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left">Name</th>
                  <th className="px-5 py-3 text-left">Company</th>
                  <th className="px-5 py-3 text-left">Source</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {stats.recentLeads.length === 0 ? (
                  <tr><td className="px-5 py-6 text-slate-500" colSpan={5}>No leads yet.</td></tr>
                ) : stats.recentLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <Link to={`/leads/${l.id}`} className="font-semibold text-slate-900 hover:text-brand-700">
                        {l.fullName}
                      </Link>
                      <div className="text-xs text-slate-500">{l.email}</div>
                    </td>
                    <td className="px-5 py-3 text-slate-700">{l.company || '—'}</td>
                    <td className="px-5 py-3 text-slate-700">{l.leadSource || '—'}</td>
                    <td className="px-5 py-3"><StatusBadge status={l.status} /></td>
                    <td className="px-5 py-3 text-slate-500">{formatDate(l.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
