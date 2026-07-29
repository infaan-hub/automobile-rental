import { motion } from 'framer-motion'
import { Calendar, Search } from 'lucide-react'

export default function BookingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
      className="flex flex-wrap items-center gap-0 w-full max-w-3xl mx-auto bg-white rounded-full shadow-xl shadow-black/5 border border-white/40 divide-x divide-border overflow-hidden"
    >
      <div className="flex-1 min-w-[140px] px-5 py-3">
        <label className="block text-[11px] font-semibold text-muted tracking-wider uppercase mb-1">Car Brand</label>
        <select className="w-full text-sm font-medium bg-transparent outline-none text-dark cursor-pointer">
          <option>Any Brand</option>
          <option>Audi</option>
          <option>BMW</option>
          <option>Mercedes</option>
          <option>Porsche</option>
        </select>
      </div>
      <div className="flex-1 min-w-[140px] px-5 py-3">
        <label className="block text-[11px] font-semibold text-muted tracking-wider uppercase mb-1">Car Type</label>
        <select className="w-full text-sm font-medium bg-transparent outline-none text-dark cursor-pointer">
          <option>Any Type</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Sports</option>
          <option>Coupe</option>
        </select>
      </div>
      <div className="flex-1 min-w-[140px] px-5 py-3">
        <label className="block text-[11px] font-semibold text-muted tracking-wider uppercase mb-1">Pickup Location</label>
        <select className="w-full text-sm font-medium bg-transparent outline-none text-dark cursor-pointer">
          <option>New York</option>
          <option>Los Angeles</option>
          <option>Miami</option>
          <option>Chicago</option>
        </select>
      </div>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 h-full px-7 py-4 bg-primary text-white text-sm font-semibold transition-colors duration-300 hover:bg-primary/90 cursor-pointer"
      >
        <Search size={18} />
        Book Now
      </motion.button>
    </motion.div>
  )
}
