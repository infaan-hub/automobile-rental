import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CalendarClock, Car } from "lucide-react";
import { Input, Button, Badge } from "@/components/ui";
import { FadeIn, FadeInItem } from "@/components/animations";
import { BookingCard } from "@/components/dashboard";

const tabs = ["All", "Active", "Completed", "Cancelled"];

const mockBookings = [
  {
    id: "BK-1024",
    vehicle: "Porsche 911 Carrera",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    pickDate: "2026-08-15",
    returnDate: "2026-08-20",
    status: "active",
    price: 1495,
  },
  {
    id: "BK-1023",
    vehicle: "BMW X5 M Competition",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    pickDate: "2026-07-10",
    returnDate: "2026-07-18",
    status: "completed",
    price: 1992,
  },
  {
    id: "BK-1022",
    vehicle: "Mercedes-Benz S-Class",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
    pickDate: "2026-06-05",
    returnDate: "2026-06-12",
    status: "cancelled",
    price: 2450,
  },
  {
    id: "BK-1021",
    vehicle: "Audi RS7 Sportback",
    image: "https://images.unsplash.com/photo-1606664513626-9928f1e3e000?w=600&q=80",
    pickDate: "2026-09-01",
    returnDate: "2026-09-07",
    status: "active",
    price: 2100,
  },
  {
    id: "BK-1020",
    vehicle: "Lamborghini Huracán",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
    pickDate: "2026-05-20",
    returnDate: "2026-05-25",
    status: "completed",
    price: 4995,
  },
];

function BookingsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = mockBookings.filter((b) => {
    const matchTab = activeTab === "All" || b.status === activeTab.toLowerCase();
    const matchSearch =
      b.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleCancel = (id) => {
    alert(`Cancelling booking ${id}...`);
  };

  const handleDownload = (id) => {
    alert(`Downloading invoice for ${id}...`);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <FadeIn stagger className="space-y-6">
        <FadeInItem>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">My Bookings</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and track all your vehicle rentals.
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by vehicle or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 w-64 rounded-full bg-glass backdrop-blur-md"
              />
            </div>
          </div>
        </FadeInItem>

        <FadeInItem>
          <div className="flex items-center gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground bg-accent/50 hover:bg-accent"
                }`}
              >
                {tab}
                {tab !== "All" && (
                  <span className="ml-2 text-xs opacity-60">
                    {mockBookings.filter((b) => b.status === tab.toLowerCase()).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </FadeInItem>

        <FadeInItem>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card flex flex-col items-center justify-center py-20 px-6"
            >
              <div className="rounded-full bg-accent p-6 mb-4">
                <CalendarClock className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No bookings yet</h3>
              <p className="text-sm text-muted-foreground mt-1 text-center max-w-sm">
                {search
                  ? "No bookings match your search. Try a different keyword."
                  : "You haven't made any bookings yet. Browse our premium fleet and book your first ride."}
              </p>
              {!search && (
                <Button className="mt-4">
                  <Car className="h-4 w-4 mr-2" />
                  Browse Vehicles
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((booking) => (
                  <motion.div
                    key={booking.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <BookingCard
                      booking={booking}
                      onCancel={handleCancel}
                      onDownload={handleDownload}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </FadeInItem>
      </FadeIn>
    </div>
  );
}

export default BookingsPage;
