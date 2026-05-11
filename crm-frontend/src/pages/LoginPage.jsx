import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth.js';

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@crm.com');
  const [password, setPassword] = useState('Admin@123');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed. Check credentials.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="hidden flex-col justify-between bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-10 text-white lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-xl font-bold">◆</div>
          <span className="font-display text-xl font-semibold">Mini CRM</span>
        </div>
        <div>
          <h2 className="font-display text-4xl font-semibold leading-tight">
            Convert more leads.<br />Lose fewer to follow-up gaps.
          </h2>
          <p className="mt-4 max-w-md text-white/85">
            Capture website inquiries, track every conversation, and watch your
            pipeline move from <em>NEW</em> to <em>CONVERTED</em>.
          </p>
        </div>
        <p className="text-sm text-white/70">© {new Date().getFullYear()} Mini CRM</p>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-slate-600">
            Use your admin account to access the dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email" type="email" required autoComplete="email"
                className="input"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input
                id="password" type="password" required autoComplete="current-password"
                className="input"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? 'Signing in…' : (
                <span className="inline-flex items-center gap-2"><LogIn size={16} /> Sign in</span>
              )}
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            <p className="font-medium text-slate-700">Default admin (seeded):</p>
            <p>admin@crm.com · Admin@123</p>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Need to submit an inquiry?{' '}
            <Link to="/contact" className="font-semibold text-brand-700 hover:text-brand-800">
              Public contact form
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
