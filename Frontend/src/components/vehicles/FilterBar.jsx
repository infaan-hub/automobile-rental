import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const FILTERS = [
  { key: "type", label: "Type", options: ["All", "SUV", "Sedan", "Sports", "Electric", "Luxury"] },
  { key: "transmission", label: "Transmission", options: ["All", "Automatic", "Manual"] },
  { key: "fuel", label: "Fuel", options: ["All", "Petrol", "Diesel", "Electric", "Hybrid"] },
];

export default function FilterBar({ active, onChange }) {
  return (
    <motion.div
      className="dash-filters"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      {FILTERS.map((group) => (
        <div className="dash-filter-group" key={group.key}>
          <span className="dash-filter-label">{group.label}</span>
          <div className="dash-filter-chips">
            {group.options.map((opt) => {
              const isActive = (active[group.key] || "All") === opt;
              return (
                <button
                  className={`dash-chip ${isActive ? "dash-chip--on" : ""}`}
                  type="button"
                  key={opt}
                  onClick={() => onChange({ ...active, [group.key]: opt === "All" ? undefined : opt })}
                >
                  {opt}
                  {isActive && opt !== "All" && <X size={14} />}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
