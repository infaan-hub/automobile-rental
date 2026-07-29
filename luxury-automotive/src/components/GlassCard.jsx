export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-black/5 border border-white/40 ${className}`}>
      {children}
    </div>
  )
}
