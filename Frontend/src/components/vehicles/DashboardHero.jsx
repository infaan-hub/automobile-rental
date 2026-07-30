import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function DashboardHero({ firstName, bookingCount, search, onSearchChange }) {
  return (
    <motion.div
      className="dash-hero"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dash-hero-copy">
        <small>Customer dashboard</small>
        <h1>Welcome back{firstName ? `, ${firstName}` : ""} 👋</h1>
        <p>Find your perfect luxury vehicle today.</p>
      </div>
      <div className="dash-hero-badge">
        <strong>{bookingCount ?? 0}</strong>
        <span>Bookings on your account</span>
      </div>
      <div className="dash-hero-search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search vehicles by name, brand, or type..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search vehicles"
        />
      </div>
    </motion.div>
  );
}
