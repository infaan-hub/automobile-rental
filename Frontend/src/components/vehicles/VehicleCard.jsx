import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Fuel, Gauge, Users, Star } from "lucide-react";
import VehicleBadge from "./VehicleBadge";
import { money } from "../../lib/formatters";

export default function VehicleCard({ vehicle, variant = "home", onView, onRent }) {
  const isDashboard = variant === "dashboard";

  return (
    <motion.article
      className={`v-card ${isDashboard ? "v-card--dash" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div className="v-card-image-wrap">
        <button className="v-card-image-btn" type="button" onClick={() => onView?.(vehicle.id)} aria-label="View vehicle">
          <img src={vehicle.imageUrl} alt={vehicle.name} loading="lazy" decoding="async" />
        </button>
        {isDashboard && <VehicleBadge type={vehicle.bodyTypeLabel || vehicle.fuelType} />}
      </div>

      <div className="v-card-body">
        <h3 className="v-card-name">{vehicle.name}</h3>
        <p className="v-card-desc">{vehicle.description || `${vehicle.brand} ${vehicle.model} | ${vehicle.transmission} | ${vehicle.fuelType}`}</p>

        <div className="v-card-price">
          <strong>{money(vehicle.dailyRate)}</strong>
          <span>/ Day</span>
        </div>

        {isDashboard && (
          <div className="v-card-specs">
            <span><Gauge size={14} /> {vehicle.transmission || "Auto"}</span>
            <span><Fuel size={14} /> {vehicle.fuelType || "Petrol"}</span>
            <span><Users size={14} /> {vehicle.seats || 4}</span>
            <span><Star size={14} /> 5.0</span>
          </div>
        )}

        <div className={`v-card-actions ${isDashboard ? "v-card-actions--pair" : ""}`}>
          {isDashboard ? (
            <>
              <button className="v-btn v-btn--outline" type="button" onClick={() => onView?.(vehicle.id)}>
                View Specs
              </button>
              <button className="v-btn v-btn--primary" type="button" onClick={() => onRent?.(vehicle.id)}>
                Rent Now
              </button>
            </>
          ) : (
            <button className="v-btn v-btn--primary" type="button" onClick={() => onView?.(vehicle.id)}>
              View Specs <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
