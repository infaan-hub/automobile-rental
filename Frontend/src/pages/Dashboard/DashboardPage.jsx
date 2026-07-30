import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Bell,
  Car,
  CalendarCheck,
  Award,
  Heart,
  ChevronRight,
  Menu,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Input, Button, Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui";
import { FadeIn, FadeInItem } from "@/components/animations";
import { StatsCard, RecentActivity } from "@/components/dashboard";
import { RevenueChart } from "@/components/charts";

const trendingVehicles = [
  {
    id: 1,
    name: "Porsche 911 Carrera",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    price: 299,
    specs: "3.0L Twin-Turbo • 379 HP",
  },
  {
    id: 2,
    name: "BMW X5 M Competition",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    price: 249,
    specs: "4.4L V8 • 617 HP",
  },
  {
    id: 3,
    name: "Mercedes-AMG GT",
    image: "https://images.unsplash.com/photo-1617654112368-307921ebf905?w=600&q=80",
    price: 349,
    specs: "4.0L V8 • 577 HP",
  },
  {
    id: 4,
    name: "Audi R8 V10",
    image: "https://images.unsplash.com/photo-1606664513626-9928f1e3e000?w=600&q=80",
    price: 399,
    specs: "5.2L V10 • 602 HP",
  },
];

const stats = [
  { icon: CalendarCheck, label: "Active Bookings", value: 3, color: "blue", trend: { direction: "up", value: 12 } },
  { icon: Car, label: "Total Rentals", value: 18, color: "green", trend: { direction: "up", value: 8 } },
  { icon: Award, label: "Reward Points", value: 2450, color: "amber", suffix: "+" },
  { icon: Heart, label: "Favorite Vehicles", value: 7, color: "rose" },
];

function DashboardPage() {
  const [user] = useState({ name: "James Wilson", email: "james@example.com", avatar: "" });

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <FadeIn stagger className="space-y-6">
        <FadeInItem>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back,{" "}
                <span className="gradient-text">{user.name}</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Here's what's happening with your rentals today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vehicles..."
                  className="pl-10 h-10 w-56 rounded-full bg-glass backdrop-blur-md"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full p-0 h-10 w-10">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                        JW
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-rose-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </FadeInItem>

        <FadeInItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatsCard key={i} {...stat} />
            ))}
          </div>
        </FadeInItem>

        <FadeInItem>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Trending Vehicles</h2>
            <Link
              to="/vehicles"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {trendingVehicles.map((v) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-white font-semibold text-sm">{v.specs}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm">{v.name}</h3>
                  <p className="text-lg font-bold mt-1">
                    ${v.price}
                    <span className="text-xs font-normal text-muted-foreground">/day</span>
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1 h-9 text-xs">
                      Rent Now
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 h-9 text-xs">
                      View Specs
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeInItem>

        <FadeInItem>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
        </FadeInItem>
      </FadeIn>
    </div>
  );
}

export default DashboardPage;
