import { useState } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle2 } from 'lucide-react';
import { leadService } from '../services/leadService.js';
import { LEAD_SOURCES } from '../utils/constants.js';

export default function PublicContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', company: '', leadSource: '', message: '',
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await leadService.submitPublic(form);
      setDone(true);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Submission failed. Try again.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">◆</div>
          <span className="font-display text-lg font-semibold">Mini CRM</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Get in touch</h1>
        <p className="mt-2 text-slate-600">
          Tell us a little about your team and what you're looking for. We'll get back within one business day.
        </p>

        {done ? (
          <div className="mt-8 card p-8 text-center">
            <CheckCircle2 size={40} className="mx-auto text-emerald-500" />
            <h2 className="mt-3 font-display text-xl font-semibold">Thanks — we'll be in touch.</h2>
            <p className="mt-2 text-sm text-slate-600">Your inquiry was received successfully.</p>
            <button className="btn-secondary mt-6" onClick={() => { setDone(false); setForm({ fullName:'', email:'', phone:'', company:'', leadSource:'', message:'' }); }}>
              Submit another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 card p-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <label className="label">How did you hear about us?</label>
              <select className="input" value={form.leadSource} onChange={update('leadSource')}>
                <option value="">— Select —</option>
                {LEAD_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="label">Message *</label>
              <textarea className="input min-h-[120px]" required value={form.message} onChange={update('message')} />
            </div>
            <div className="flex justify-end sm:col-span-2">
              <button type="submit" disabled={submitting} className="btn-primary">
                {submitting ? 'Submitting…' : 'Send inquiry'}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
