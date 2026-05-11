export default function StatCard({ label, value, hint, icon: Icon, accent = 'brand' }) {
  const accents = {
    brand:   'bg-brand-50    text-brand-700',
    emerald: 'bg-emerald-50  text-emerald-700',
    amber:   'bg-amber-50    text-amber-700',
    violet:  'bg-violet-50   text-violet-700',
    rose:    'bg-rose-50     text-rose-700',
  };

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {value}
          </p>
          {hint ? (
            <p className="mt-1 text-xs text-slate-500">{hint}</p>
          ) : null}
        </div>
        {Icon ? (
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accents[accent]}`}>
            <Icon size={20} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
