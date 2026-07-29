import { motion } from 'framer-motion'

export default function PrimaryButton({ children, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-primary text-white font-semibold text-sm transition-all duration-300 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
