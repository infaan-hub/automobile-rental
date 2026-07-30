export default function PageHeader({ badge, title, text, children }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
      <div>
        {badge && (
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">{badge}</span>
        )}
        <h1 className="text-2xl font-bold mt-1">{title}</h1>
        {text && <p className="text-sm text-muted mt-1">{text}</p>}
      </div>
      {children && <div className="flex items-start gap-3 shrink-0">{children}</div>}
    </div>
  );
}
