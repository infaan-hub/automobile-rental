import { motion } from "framer-motion";
import BackgroundShapes from "./ui/BackgroundShapes";
import Navbar from "./ui/Navbar";
import GlassCard from "./ui/GlassCard";
import { navigate } from "../lib/navigation";

export default function AuthLayout({ badge, title, text, altLabel, altPath, children }) {
  return (
    <main className="min-h-screen bg-bg relative overflow-hidden">
      <BackgroundShapes />
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center"
          >
            <svg viewBox="0 0 800 400" className="w-full max-w-lg drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg" fill="none">
              <defs>
                <linearGradient id="carBody" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1a1a2e"/>
                  <stop offset="50%" stopColor="#16213e"/>
                  <stop offset="100%" stopColor="#0f3460"/>
                </linearGradient>
              </defs>
              <ellipse cx="400" cy="370" rx="280" ry="20" fill="rgba(0,0,0,0.08)"/>
              <path d="M120 300 L140 260 L200 220 L280 200 L520 200 L600 220 L660 260 L680 300" fill="url(#carBody)"/>
              <path d="M120 300 L140 260 L200 220 L280 200 L400 200 L400 300 Z" fill="url(#carBody)"/>
              <path d="M520 200 L600 220 L660 260 L680 300 L520 300 Z" fill="url(#carBody)"/>
              <path d="M290 200 L400 190 L400 300 L290 300 Z" fill="#4a8ad4" opacity="0.4"/>
              <path d="M410 190 L510 200 L510 300 L410 300 Z" fill="#4a8ad4" opacity="0.2"/>
              <circle cx="250" cy="310" r="45" fill="#111"/>
              <circle cx="250" cy="310" r="35" fill="#222"/>
              <circle cx="250" cy="310" r="20" fill="#333"/>
              <circle cx="250" cy="310" r="8" fill="#555"/>
              <circle cx="550" cy="310" r="45" fill="#111"/>
              <circle cx="550" cy="310" r="35" fill="#222"/>
              <circle cx="550" cy="310" r="20" fill="#333"/>
              <circle cx="550" cy="310" r="8" fill="#555"/>
              <ellipse cx="125" cy="275" rx="12" ry="6" fill="#f0d060" opacity="0.8"/>
              <ellipse cx="678" cy="275" rx="8" ry="6" fill="#ff4444" opacity="0.7"/>
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex justify-center"
          >
            <GlassCard className="w-full max-w-[420px] p-8 sm:p-10">
              <div className="text-center mb-6">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider">Welcome to</p>
                <h1 className="text-3xl font-bold mt-1">CRUVO</h1>
                {badge && <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-2">{badge}</p>}
                <div className="mt-4">
                  <p className="text-base font-bold">{title}</p>
                  {text && <p className="text-sm text-muted mt-1">{text}</p>}
                </div>
              </div>
              {children}
              {altLabel && altPath && (
                <div className="mt-6 text-center">
                  <button onClick={() => navigate(altPath)} className="text-sm text-primary font-semibold hover:underline">
                    {altLabel}
                  </button>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
