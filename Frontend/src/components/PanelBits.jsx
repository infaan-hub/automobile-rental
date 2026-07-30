import GlassCard from "./ui/GlassCard";

export function PanelHeader({ badge, title, text }) {
  return (
    <div className="mb-8">
      {badge && <span className="text-xs font-semibold text-primary uppercase tracking-wider">{badge}</span>}
      <h1 className="text-2xl font-bold mt-1">{title}</h1>
      {text && <p className="text-sm text-muted mt-1 max-w-xl">{text}</p>}
    </div>
  );
}

export function Metric({ label, value }) {
  return (
    <GlassCard className="p-5">
      <p className="text-xs font-semibold text-muted uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </GlassCard>
  );
}
