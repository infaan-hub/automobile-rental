import { MapPin, Calendar, Car, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingSearch() {
  return (
    <div className="relative z-20 mx-auto -mt-20 w-full max-w-5xl px-4 pb-8 md:-mt-24">
      <div className="glass rounded-[32px] p-6 shadow-glass-lg md:p-8">
        <form className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-end">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <MapPin className="size-3.5" /> Pickup Location
            </label>
            <input
              type="text"
              placeholder="City or airport"
              className="flex h-11 w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Calendar className="size-3.5" /> Pickup Date
            </label>
            <input
              type="date"
              className="flex h-11 w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Calendar className="size-3.5" /> Return Date
            </label>
            <input
              type="date"
              className="flex h-11 w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Car className="size-3.5" /> Vehicle Type
            </label>
            <select className="flex h-11 w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm text-foreground transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30">
              <option value="">Any type</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="sports">Sports</option>
              <option value="luxury">Luxury</option>
              <option value="electric">Electric</option>
            </select>
          </div>
          <Button type="submit" size="lg" className="h-11 w-full">
            Search
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
