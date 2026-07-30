import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

export default function StatsCard({ label, value, icon }) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <GlassCard className="p-5 flex items-center gap-4">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            {icon}
          </div>
        )}
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold mt-0.5">{value}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}
