import { motion } from "framer-motion";
import { Calendar, Download, XCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";

const statusStyles = {
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  cancelled: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

function BookingCard({ booking, onCancel, onDownload }) {
  const { id, vehicle, image, pickDate, returnDate, status, price } = booking;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0">
          <img
            src={image}
            alt={vehicle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-base">{vehicle}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Booking #{id}
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "capitalize shrink-0",
                statusStyles[status] || statusStyles.pending
              )}
            >
              {status}
            </Badge>
          </div>
          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(new Date(pickDate), "MMM dd, yyyy")}</span>
            </div>
            <span className="text-muted-foreground/40">—</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(new Date(returnDate), "MMM dd, yyyy")}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-bold">
              ${price.toLocaleString()}
            </p>
            <div className="flex items-center gap-2">
              {status !== "cancelled" && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onDownload?.(id)}
                  >
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    Invoice
                  </Button>
                  {status === "active" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                      onClick={() => onCancel?.(id)}
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1.5" />
                      Cancel
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export { BookingCard };
