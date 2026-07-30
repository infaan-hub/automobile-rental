import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const specs = [
  { label: 'Power', value: '409 hp' },
  { label: 'Speed', value: '210 km/h' },
  { label: 'Engine', value: '3.5L V6 TT' },
]

export default function CarPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
      className="absolute bottom-8 right-[8%] w-[280px] bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-black/5 border border-white/40 p-5 hidden md:block"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-bg overflow-hidden flex-shrink-0">
          <img src="/hero-car.svg" alt="Toyota Land Cruiser LC300" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-xs text-muted font-medium">Vehicle</p>
          <p className="text-sm font-bold">Land Cruiser LC300 VX</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {specs.map((s) => (
          <div key={s.label}>
            <p className="text-[11px] text-muted font-medium">{s.label}</p>
            <p className="text-sm font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ gap: 10 }}
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 cursor-pointer"
      >
        View Details
        <ArrowRight size={16} />
      </motion.button>
    </motion.div>
  )
}
