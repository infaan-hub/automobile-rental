import React, { useEffect, useState } from "react";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { money } from "../lib/formatters";
import { getCustomerToken } from "../lib/customer";
import { navigate } from "../lib/navigation";

function specItems(vehicle) {
  return [
    ["Brand", vehicle.brand], ["Model", vehicle.model], ["Year", vehicle.year],
    ["Seats", vehicle.seats], ["Transmission", vehicle.transmission], ["Fuel", vehicle.fuelType],
    ["Body", vehicle.bodyTypeLabel], ["Location", vehicle.location],
  ];
}

export default function VehicleViewPage() {
  const vehicleId = new URLSearchParams(window.location.search).get("vehicle");
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");
  const loggedIn = Boolean(getCustomerToken());

  useEffect(() => {
    async function load() {
      if (!vehicleId) { setError("Vehicle was not selected."); return; }
      try { const data = await apiRequest(`/vehicles/${vehicleId}/`); setVehicle(data.vehicle); }
      catch (err) { setError(err.message); }
    }
    load();
  }, [vehicleId]);

  if (!vehicle) {
    return <section className="panel-page"><div className="panel-card"><Notice error={error} /><p>Loading vehicle details...</p></div></section>;
  }

  return (
    <section className="vv-page">
      <div className="vv-shell">
        <div className="vv-media">
          <img src={vehicle.imageUrl} alt={vehicle.name} />
        </div>
        <div className="vv-copy">
          <small>{vehicle.vehicleType} rental</small>
          <h1>{vehicle.name}</h1>
          <p>{vehicle.description || `${vehicle.brand} ${vehicle.model} from ${vehicle.year}`}</p>
          <strong>{money(vehicle.dailyRate)}</strong>
          <div className="vv-specs">
            {specItems(vehicle).map(([label, value]) => (
              <div className="vv-spec-item" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="vv-actions">
            <button className="ghost-button" type="button" onClick={() => navigate("/home")}>Back</button>
            {loggedIn ? (
              <button className="solid-button" type="button" onClick={() => navigate(`/rent?vehicle=${vehicle.id}`)}>Rent now</button>
            ) : (
              <button className="solid-button" type="button" onClick={() => navigate("/login")}>Login to rent</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
