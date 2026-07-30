import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { navigate } from "../../lib/navigation";

export default function Navbar({ variant = "public" }) {
  const [open, setOpen] = useState(false);

  const links = variant === "public"
    ? [
        { label: "Home", path: "/home" },
        { label: "Vehicles", path: "/home" },
        { label: "Membership", path: "/home" },
        { label: "Pricing", path: "/home" },
        { label: "FAQs", path: "/home" },
      ]
    : [];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
    >
      <nav className="flex items-center justify-between w-full max-w-5xl h-16 px-6 bg-white/90 backdrop-blur-md rounded-full shadow-xl shadow-black/5 border border-white/40">
        <button onClick={() => navigate("/home")} className="text-xl font-bold tracking-wider cursor-pointer">
          CRUVO
        </button>

        <ul className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted">
          {links.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => navigate(link.path)}
                className="relative transition-colors duration-300 hover:text-dark after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/login")}
          className="hidden lg:inline-flex items-center gap-2 h-10 px-5 rounded-full bg-dark text-white text-sm font-semibold transition-all duration-300 hover:bg-dark/80"
        >
          Get Started
          <ArrowRight size={16} />
        </button>

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
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-white/40 p-6 lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => { navigate(link.path); setOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-2xl text-sm font-medium text-muted hover:bg-bg transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => { navigate("/login"); setOpen(false); }}
              className="mt-3 w-full flex items-center justify-center gap-2 h-11 rounded-full bg-dark text-white text-sm font-semibold transition-all duration-300 hover:bg-dark/80"
            >
              Get Started
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
