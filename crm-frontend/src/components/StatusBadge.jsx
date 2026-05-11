import { STATUS_STYLES } from '../utils/constants.js';

export default function StatusBadge({ status, className = '' }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.NEW;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${s.bg} ${s.text} ${s.ring} ${className}`}
    >
      {status}
    </span>
  );
}
