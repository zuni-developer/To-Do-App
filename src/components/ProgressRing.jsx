export default function ProgressRing({ total, completed }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="progress-ring" title={`${pct}% complete`}>
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle
          className="ring-track"
          cx="32"
          cy="32"
          r={radius}
          strokeWidth="6"
          fill="none"
        />
        <circle
          className="ring-fill"
          cx="32"
          cy="32"
          r={radius}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="ring-label">{pct}%</span>
    </div>
  );
}
