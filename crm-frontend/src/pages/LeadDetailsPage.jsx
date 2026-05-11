import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Mail, Phone, Building2, Tag, MessageSquarePlus, History } from 'lucide-react';
import toast from 'react-hot-toast';
import { leadService } from '../services/leadService.js';
import StatusBadge from '../components/StatusBadge.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { LEAD_STATUSES } from '../utils/constants.js';
import { formatDateTime } from '../utils/formatters.js';

export default function LeadDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  const load = () => {
    setLoading(true);
    leadService.get(id)
      .then(setData)
      .catch(() => toast.error('Lead not found'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [id]);

  const handleStatus = async (e) => {
    const newStatus = e.target.value;
    setSavingStatus(true);
    try {
      await leadService.updateStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      load();
    } catch {
      toast.error('Failed to update status');
    } finally {
      setSavingStatus(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSavingNote(true);
    try {
      await leadService.addNote(id, noteText.trim());
      setNoteText('');
      toast.success('Note added');
      load();
    } catch {
      toast.error('Failed to add note');
    } finally {
      setSavingNote(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this lead? This cannot be undone.')) return;
    try {
      await leadService.remove(id);
      toast.success('Lead deleted');
      navigate('/leads');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Delete failed';
      toast.error(msg);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  if (!data) return <p className="text-slate-600">Lead not found.</p>;

  const { lead, notes, statusHistory } = data;

  return (
   <div className="space-y-6">
  <div className="flex items-center justify-between">
    <Link to="/leads" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900">
      <ArrowLeft size={16} className="mr-1" /> Back to leads
    </Link>

    <div className="flex gap-2">
      <Link to={`/leads/${id}/edit`} className="btn-secondary">
        Edit
      </Link>

      <button onClick={handleDelete} className="btn-danger">
        <Trash2 size={16} className="mr-1.5" /> Delete
      </button>
    </div>
  </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Lead summary */}
        <div className="card p-6 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 text-lg font-semibold">
              {lead.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">{lead.fullName}</h2>
              <StatusBadge status={lead.status} />
            </div>
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-slate-700">
              <Mail size={16} className="text-slate-400" />
              <a href={`mailto:${lead.email}`} className="hover:text-brand-700">{lead.email}</a>
            </div>
            {lead.phone && (
              <div className="flex items-center gap-2 text-slate-700">
                <Phone size={16} className="text-slate-400" />
                <a href={`tel:${lead.phone}`} className="hover:text-brand-700">{lead.phone}</a>
              </div>
            )}
            {lead.company && (
              <div className="flex items-center gap-2 text-slate-700">
                <Building2 size={16} className="text-slate-400" /> {lead.company}
              </div>
            )}
            {lead.leadSource && (
              <div className="flex items-center gap-2 text-slate-700">
                <Tag size={16} className="text-slate-400" /> {lead.leadSource}
              </div>
            )}
            <div className="text-xs text-slate-500">Created {formatDateTime(lead.createdAt)}</div>
          </dl>

          {lead.message && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Message</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{lead.message}</p>
            </div>
          )}

          <div className="mt-6">
            <label className="label">Update status</label>
            <select
              className="input"
              value={lead.status}
              onChange={handleStatus}
              disabled={savingStatus}
            >
              {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Right: notes + history */}
        <div className="space-y-6 lg:col-span-2">
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <MessageSquarePlus size={18} /> Notes & follow-ups
            </h3>
            <form onSubmit={handleAddNote} className="mt-4">
              <textarea
                className="input min-h-[90px]"
                placeholder="Log a call, meeting, or follow-up note…"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <div className="mt-2 flex justify-end">
                <button type="submit" className="btn-primary" disabled={savingNote || !noteText.trim()}>
                  {savingNote ? 'Adding…' : 'Add note'}
                </button>
              </div>
            </form>

            <ul className="mt-4 divide-y divide-slate-100">
              {notes.length === 0 ? (
                <li className="py-4 text-sm text-slate-500">No notes yet.</li>
              ) : notes.map((n) => (
                <li key={n.id} className="py-3">
                  <p className="whitespace-pre-wrap text-sm text-slate-800">{n.noteText}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {n.authorName} · {formatDateTime(n.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <History size={18} /> Status history
            </h3>
            <ul className="mt-4 space-y-3">
              {statusHistory.length === 0 ? (
                <li className="text-sm text-slate-500">No history yet.</li>
              ) : statusHistory.map((h) => (
                <li key={h.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {h.fromStatus ? <StatusBadge status={h.fromStatus} /> : <span className="text-slate-400">created</span>}
                    <span className="text-slate-400">→</span>
                    <StatusBadge status={h.toStatus} />
                  </div>
                  <span className="text-xs text-slate-500">
                    {h.changedByName} · {formatDateTime(h.changedAt)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
