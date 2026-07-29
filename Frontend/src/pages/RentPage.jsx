import React, { useEffect, useState } from "react";
import Notice from "../components/Notice";
import VideoBackground from "../components/VideoBackground";
import { apiRequest } from "../lib/api";
import { getCustomerToken, saveRentalDraft } from "../lib/customer";
import { money, moneyAmount } from "../lib/formatters";
import { navigate } from "../lib/navigation";

function rentSpecs(vehicle) {
  return [
    ["Body", vehicle.bodyTypeLabel],
    ["Seats", `${vehicle.seats} seats`],
    ["Gear", vehicle.transmission],
  ];
}

function rentPlans(dailyRate) {
  const daily = Number(dailyRate || 0);

  return [
    ["Daily rent", daily, "Fixed dealer price per day"],
    ["Weekly rent", daily * 7 * 0.9, "7 days with 10% discount"],
    ["Monthly rent", daily * 30 * 0.7, "30 days with 30% discount"],
  ];
}

export default function RentPage() {
  const vehicleId = new URLSearchParams(window.location.search).get("vehicle");
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getCustomerToken()) {
      navigate("/login");
      return;
    }

    async function load() {
      try {
        const data = await apiRequest(`/vehicles/${vehicleId}/`);
        setVehicle(data.vehicle);
      } catch (err) {
        setError(err.message);
      }
    }

    if (vehicleId) load();
    else setError("Vehicle was not selected.");
  }, [vehicleId]);

  if (!vehicle) {
    return <section className="panel-page"><div className="panel-card"><Notice error={error} /><p>Loading rental view...</p></div></section>;
  }

  const plans = rentPlans(vehicle.dailyRate);

  return (
    <section className="rent-page">
      <VideoBackground name="rent" fill />
      <div className="rent-phone-shell">
        <div className="rent-top-bar">
          <button type="button" aria-label="Back to vehicle specs" onClick={() => navigate(`/view?vehicle=${vehicle.id}`)}>{"\u2039"}</button>
          <button type="button" aria-label="Saved vehicle state">{"\u2661"}</button>
        </div>
        <div className="rent-title-block">
          <h1>{vehicle.name}</h1>
          <span>{vehicle.brand} {vehicle.model}</span>
        </div>
        <div className="rent-meta-row">
          <strong>{moneyAmount(vehicle.dailyRate)}</strong>
          <small>{vehicle.year} | {vehicle.location}</small>
        </div>
        <div className="rent-hero-image">
          <img src={vehicle.imageUrl} alt={vehicle.name} />
        </div>
        <div className="rent-image-shadow" />
        <section className="rent-panel">
          <h2>Specs</h2>
          <div className="rent-spec-grid">
            {rentSpecs(vehicle).map(([label, value]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
        </section>
        <section className="rent-panel">
          <h2>Plan</h2>
          <div className="rent-plan-grid">
            {plans.map(([label, amount, note], index) => (
              <article className={`rent-plan-card ${index === 0 ? "active" : ""}`} key={label}>
                <small>{label}</small>
                <strong>{moneyAmount(amount)}</strong>
                <span>{note}</span>
              </article>
            ))}
          </div>
        </section>
        <section className="rent-panel">
          <h2>Availability</h2>
          <div className="rent-location-card">{vehicle.fuelType} | {vehicle.isAvailable ? "Available now" : "Not available"}</div>
        </section>
        <section className="rent-panel">
          <h2>Location</h2>
          <div className="rent-location-card">{vehicle.location}</div>
        </section>
        <div className="rent-footer-bar">
          <div>
            <strong>{moneyAmount(vehicle.dailyRate)}</strong>
            <span>/ day</span>
          </div>
          <button
            className="solid-button"
            type="button"
            onClick={() => {
              saveRentalDraft({ vehicleId: vehicle.id });
              navigate(`/rental-agreement?vehicle=${vehicle.id}`);
            }}
          >
            Pick up
          </button>
        </div>
      </div>
    </section>
  );
}
