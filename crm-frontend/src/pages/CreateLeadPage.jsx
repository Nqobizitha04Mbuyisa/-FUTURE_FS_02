import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { leadService } from '../services/leadService.js';
import { LEAD_SOURCES } from '../utils/constants.js';

export default function CreateLeadPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', company: '', leadSource: '', message: '',
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const lead = await leadService.create(form);
      toast.success('Lead created');
      navigate(`/leads/${lead.id}`);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to create lead';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="card p-6">
        <h2 className="font-display text-xl font-semibold">New lead</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manually add a lead that came in through a phone call, event, or referral.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">Full name *</label>
            <input className="input" required value={form.fullName} onChange={update('fullName')} />
          </div>
          <div>
            <label className="label">Email *</label>
            <input className="input" type="email" required value={form.email} onChange={update('email')} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" value={form.phone} onChange={update('phone')} />
          </div>
          <div>
            <label className="label">Company</label>
            <input className="input" value={form.company} onChange={update('company')} />
          </div>
          <div>
            <label className="label">Lead source</label>
            <select className="input" value={form.leadSource} onChange={update('leadSource')}>
              <option value="">— Select —</option>
              {LEAD_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label">Message / notes</label>
            <textarea className="input min-h-[110px]" value={form.message} onChange={update('message')} />
          </div>

          <div className="flex justify-end gap-2 sm:col-span-2">
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Saving…' : 'Create lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
