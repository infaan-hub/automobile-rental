import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Fuel, Gauge, Users } from "lucide-react";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui/badge";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function VehicleCard({ vehicle, index = 0, layout = "grid" }) {
  return (
    <motion.div
      variants={cardVariants}
      layout
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius)] border border-border bg-card shadow-sm transition-all duration-500 hover:shadow-glass-lg",
        layout === "list" && "flex"
      )}
    >
      <Link to={`/vehicles/${vehicle.id}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden",
            layout === "grid" ? "aspect-[4/3]" : "h-full w-72 shrink-0"
          )}
        >
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 bg-background/70 text-foreground backdrop-blur-md"
          >
            {vehicle.type}
          </Badge>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
            <Star className="size-3 fill-amber-400 text-amber-400" />
            {vehicle.rating}
          </div>
        </div>

        <div className={cn("space-y-3 p-5", layout === "list" && "flex-1")}>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {vehicle.brand}
            </p>
            <h3 className="text-lg font-semibold leading-tight">{vehicle.name}</h3>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Fuel className="size-3.5" /> {vehicle.fuel}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="size-3.5" /> {vehicle.transmission}
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-3.5" /> {vehicle.seats} seats
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-2">
            <div>
              <span className="text-2xl font-bold">${vehicle.price}</span>
              <span className="text-xs text-muted-foreground">/day</span>
            </div>
            <span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View Details &rarr;
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
