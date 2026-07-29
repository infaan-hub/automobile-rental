import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Vehicles', to: '/vehicles' },
  { label: 'Membership', to: '/membership' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
    >
      <nav className="flex items-center justify-between w-full max-w-5xl h-16 px-6 bg-white/90 backdrop-blur-md rounded-full shadow-xl shadow-black/5 border border-white/40">
        <Link to="/" className="text-xl font-bold tracking-wider">
          CRUVO
        </Link>

        <ul className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="relative transition-colors duration-300 hover:text-dark after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/login"
          className="hidden lg:inline-flex items-center gap-2 h-10 px-5 rounded-full bg-dark text-white text-sm font-semibold transition-all duration-300 hover:bg-dark/85"
        >
          Get Started
          <ArrowRight size={16} />
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden grid place-items-center w-10 h-10 rounded-full border border-border bg-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-white/40 p-6 lg:hidden"
          >
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-2xl text-sm font-medium text-muted hover:bg-bg transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 h-11 rounded-full bg-dark text-white text-sm font-semibold transition-all duration-300 hover:bg-dark/85"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
