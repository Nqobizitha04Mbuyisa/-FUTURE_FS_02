import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle } from 'lucide-react';
import { leadService } from '../services/leadService.js';
import StatusBadge from '../components/StatusBadge.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { LEAD_STATUSES } from '../utils/constants.js';
import { formatDate } from '../utils/formatters.js';

export default function LeadsPage() {
  const [data, setData] = useState({ content: [], totalElements: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const size = 20;

  const params = useMemo(() => {
    const p = { page, size };
    if (q.trim()) p.q = q.trim();
    if (statusFilter) p.status = statusFilter;
    return p;
  }, [q, statusFilter, page]);

  useEffect(() => {
    setLoading(true);
    leadService.list(params)
      .then(setData)
      .catch(() => setData({ content: [], totalElements: 0, totalPages: 0 }))
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search by name, email, or company…"
              className="input pl-9"
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(0); }}
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              className="input w-44"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
            >
              <option value="">All statuses</option>
              {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <Link to="/leads/new" className="btn-primary">
              <PlusCircle size={16} className="mr-1.5" /> New lead
            </Link>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Phone</th>
                <th className="px-5 py-3 text-left">Company</th>
                <th className="px-5 py-3 text-left">Source</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr><td colSpan={7} className="px-5 py-10 text-center"><LoadingSpinner /></td></tr>
              ) : data.content.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-slate-500">No leads match your filters.</td></tr>
              ) : data.content.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <Link to={`/leads/${l.id}`} className="font-semibold text-slate-900 hover:text-brand-700">
                      {l.fullName}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-slate-700">{l.email}</td>
                  <td className="px-5 py-3 text-slate-700">{l.phone || '—'}</td>
                  <td className="px-5 py-3 text-slate-700">{l.company || '—'}</td>
                  <td className="px-5 py-3 text-slate-700">{l.leadSource || '—'}</td>
                  <td className="px-5 py-3"><StatusBadge status={l.status} /></td>
                  <td className="px-5 py-3 text-slate-500">{formatDate(l.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 text-sm">
            <span className="text-slate-500">
              Page {data.page + 1} of {data.totalPages} · {data.totalElements} total
            </span>
            <div className="flex gap-2">
              <button
                className="btn-secondary"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >Previous</button>
              <button
                className="btn-secondary"
                onClick={() => setPage((p) => p + 1)}
                disabled={data.last}
              >Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
