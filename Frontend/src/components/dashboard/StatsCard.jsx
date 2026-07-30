import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import CountUp from "react-countup";
import { cn } from "@/utils/cn";

const iconColors = {
  blue: "bg-blue-500/10 text-blue-500",
  green: "bg-emerald-500/10 text-emerald-500",
  amber: "bg-amber-500/10 text-amber-500",
  purple: "bg-purple-500/10 text-purple-500",
  rose: "bg-rose-500/10 text-rose-500",
  cyan: "bg-cyan-500/10 text-cyan-500",
};

function StatsCard({ icon: Icon, label, value, trend, color = "blue", suffix = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 flex items-start gap-4"
    >
      <div className={cn("rounded-xl p-3 shrink-0", iconColors[color] || iconColors.blue)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="text-2xl font-bold mt-0.5">
          <CountUp end={value} duration={2} suffix={suffix} />
        </p>
        {trend && (
          <div className="flex items-center gap-1 mt-1">
            {trend.direction === "up" ? (
              <TrendingUp className="h-3 w-3 text-emerald-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-rose-500" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                trend.direction === "up" ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export { StatsCard };
