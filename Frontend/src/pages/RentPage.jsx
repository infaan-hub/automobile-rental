import React, { useEffect, useState } from "react";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { getCustomerToken, saveRentalDraft } from "../lib/customer";
import { moneyAmount } from "../lib/formatters";
import { navigate } from "../lib/navigation";

function rentSpecs(vehicle) {
  return [
    ["Body", vehicle.bodyTypeLabel], ["Seats", `${vehicle.seats} seats`], ["Gear", vehicle.transmission],
  ];
}

function rentPlans(dailyRate) {
  const daily = Number(dailyRate || 0);
  return [
    ["Daily", daily, "Fixed dealer price per day"],
    ["Weekly", daily * 7 * 0.9, "7 days with 10% discount"],
    ["Monthly", daily * 30 * 0.7, "30 days with 30% discount"],
  ];
}

export default function RentPage() {
  const vehicleId = new URLSearchParams(window.location.search).get("vehicle");
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Daily");

  useEffect(() => {
    if (!getCustomerToken()) { navigate("/login"); return; }
    async function load() {
      try { const data = await apiRequest(`/vehicles/${vehicleId}/`); setVehicle(data.vehicle); }
      catch (err) { setError(err.message); }
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
      <div className="rent-top">
        <button type="button" aria-label="Back" onClick={() => navigate(`/view?vehicle=${vehicle.id}`)}>{"\u2039"}</button>
        <button type="button" aria-label="Save">{"\u2661"}</button>
      </div>
      <div className="rent-head">
        <h1>{vehicle.name}</h1>
        <span>{vehicle.brand} {vehicle.model}</span>
      </div>
      <div className="rent-meta">
        <strong>{moneyAmount(vehicle.dailyRate)}</strong>
        <small>{vehicle.year} | {vehicle.location}</small>
      </div>
      <div className="rent-image">
        <img src={vehicle.imageUrl} alt={vehicle.name} />
      </div>
      <section className="rent-section">
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
      <section className="rent-section">
        <h2>Plan</h2>
        <div className="rent-plan-grid">
          {plans.map(([label, amount, note]) => (
            <div className={`rent-plan-card ${selectedPlan === label ? "active" : ""}`} key={label} onClick={() => setSelectedPlan(label)}>
              <small>{label}</small>
              <strong>{moneyAmount(amount)}</strong>
              <span>{note}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="rent-section">
        <h2>Availability</h2>
        <div className="rent-location-card">{vehicle.fuelType} | {vehicle.isAvailable ? "Available now" : "Not available"}</div>
      </section>
      <section className="rent-section">
        <h2>Location</h2>
        <div className="rent-location-card">{vehicle.location}</div>
      </section>
      <div className="rent-footer">
        <div>
          <strong>{moneyAmount(vehicle.dailyRate)}</strong>
          <span>/ day</span>
        </div>
        <button className="solid-button" type="button" style={{ padding: "0 28px", height: 44 }} onClick={() => {
          saveRentalDraft({ vehicleId: vehicle.id });
          navigate(`/rental-agreement?vehicle=${vehicle.id}`);
        }}>Pick up</button>
      </div>
    </section>
  );
}
