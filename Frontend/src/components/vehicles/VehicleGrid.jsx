import React from "react";
import { motion } from "framer-motion";
import VehicleCard from "./VehicleCard";

export default function VehicleGrid({ vehicles, variant = "home", onView, onRent, emptyMessage }) {
  if (!vehicles?.length) {
    return (
      <div className="v-empty">
        <div className="v-empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M16 8l-8 8M8 8l8 8"/></svg>
        </div>
        <p className="v-empty-text">{emptyMessage || "No vehicles found."}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="v-grid"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {vehicles.map((v) => (
        <VehicleCard key={v.id} vehicle={v} variant={variant} onView={onView} onRent={onRent} />
      ))}
    </motion.div>
  );
}
