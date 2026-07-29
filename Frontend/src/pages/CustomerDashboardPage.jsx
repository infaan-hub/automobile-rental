import React, { useEffect, useState } from "react";
import Notice from "../components/Notice";
import VideoBackground from "../components/VideoBackground";
import { apiRequest } from "../lib/api";
import { CUSTOMER_TOKEN_KEY } from "../lib/config";
import { money, moneyAmount } from "../lib/formatters";
import { navigate } from "../lib/navigation";

function openView(vehicleId) {
  navigate(`/view?vehicle=${vehicleId}`);
}

function openRent(vehicleId) {
  navigate(`/rent?vehicle=${vehicleId}`);
}

export default function CustomerDashboardPage() {
  const token = localStorage.getItem(CUSTOMER_TOKEN_KEY) || "";
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        setData(await apiRequest("/customer/dashboard/", {}, token));
      } catch (err) {
        setError(err.message);
      }
    }

    load();
  }, [token]);

  if (!data) {
    return <section className="panel-page"><div className="panel-card"><Notice error={error} /><p>Loading customer dashboard...</p></div></section>;
  }

  return (
    <section className="customer-dashboard-page">
      <VideoBackground name="dashboard" fill />
      <header className="customer-dashboard-hero">
        <div>
          <small>Customer dashboard</small>
          <h1>Welcome {data.user.firstName || data.user.username}</h1>
          <p>Browse dealer-posted vehicles, compare details, and move straight into the rental flow.</p>
        </div>
        <div className="customer-booking-badge">
          <strong>{data.bookings.length}</strong>
          <span>Bookings on your account</span>
        </div>
      </header>

      <Notice error={error} />

      <section className="customer-vehicle-section">
        <div className="section-heading">
          <h2>Available vehicles</h2>
          <button type="button" onClick={() => navigate("/home")}>Back home</button>
        </div>
        <div className="customer-vehicle-grid">
          {data.vehicles.map((vehicle) => (
            <article className="customer-vehicle-card" key={vehicle.id}>
              <button className="vehicle-image-button" type="button" onClick={() => openView(vehicle.id)}>
                <img src={vehicle.imageUrl} alt={vehicle.name} loading="lazy" decoding="async" />
              </button>
              <div className="customer-vehicle-copy">
                <div>
                  <small>{vehicle.bodyTypeLabel}</small>
                  <h3>{vehicle.name}</h3>
                  <p>{vehicle.description || `${vehicle.brand} ${vehicle.model} | ${vehicle.transmission} | ${vehicle.fuelType}`}</p>
                </div>
                <strong>{money(vehicle.dailyRate)}</strong>
              </div>
              <div className="customer-card-actions">
                <button className="ghost-button" type="button" onClick={() => openView(vehicle.id)}>View specs</button>
                <button className="solid-button" type="button" onClick={() => openRent(vehicle.id)}>Rent now</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="customer-bookings-section">
        <div className="section-heading">
          <h2>Recent bookings</h2>
        </div>
        <div className="table-stack">
          {data.bookings.length ? data.bookings.map((booking) => (
            <article className="row-card" key={booking.id}>
              <div>
                {booking.vehicle.imageUrl ? <img className="row-image-preview" src={booking.vehicle.imageUrl} alt={booking.vehicle.name} /> : null}
                <strong>#{booking.id} {booking.vehicle.name}</strong>
                <p>{booking.pickupDate} to {booking.returnDate}</p>
                <small>{booking.status} | {booking.returnLocation}</small>
              </div>
              <div className="customer-booking-price">{moneyAmount(booking.totalCost)}</div>
            </article>
          )) : <p className="section-empty">No bookings yet. Your rentals will appear here after checkout.</p>}
        </div>
      </section>
    </section>
  );
}
