import { motion } from "framer-motion";
import {
  Car,
  CreditCard,
  Clock,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/utils/cn";

const activities = [
  {
    id: 1,
    icon: Car,
    text: "You booked a Porsche 911 Carrera",
    time: "2 hours ago",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    id: 2,
    icon: CreditCard,
    text: "Payment of $2,450 confirmed for BMW X5",
    time: "5 hours ago",
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    id: 3,
    icon: UserCheck,
    text: "Profile verification completed successfully",
    time: "1 day ago",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    id: 4,
    icon: Clock,
    text: "Mercedes-Benz S-Class rental ends tomorrow",
    time: "1 day ago",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    id: 5,
    icon: AlertCircle,
    text: "Service reminder: Audi RS7 due for checkup",
    time: "3 days ago",
    color: "bg-rose-500/10 text-rose-500",
  },
];

function RecentActivity() {
  return (
    <div className="glass-card p-5">
      <h3 className="font-semibold text-base mb-4">Recent Activity</h3>
      <div className="space-y-1">
        {activities.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors"
          >
            <div className={cn("rounded-lg p-2 shrink-0", item.color)}>
              <item.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{item.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export { RecentActivity };
