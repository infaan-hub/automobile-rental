import React, { useEffect, useState } from "react";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { CUSTOMER_TOKEN_KEY } from "../lib/config";
import { moneyAmount } from "../lib/formatters";
import { navigate } from "../lib/navigation";
import DashboardHero from "../components/vehicles/DashboardHero";
import FilterBar from "../components/vehicles/FilterBar";
import VehicleGrid from "../components/vehicles/VehicleGrid";
import SectionHeader from "../components/vehicles/SectionHeader";

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
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

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
    return (
      <section className="dash-page">
        <div className="dash-hero"><Notice error={error} /><p>Loading customer dashboard...</p></div>
      </section>
    );
  }

  const vehicles = data.vehicles || [];
  const filtered = vehicles.filter((v) => {
    const q = search.toLowerCase();
    if (q && !v.name.toLowerCase().includes(q) && !v.brand?.toLowerCase().includes(q)) return false;
    if (filters.type && filters.type !== "All" && v.bodyTypeLabel?.toLowerCase() !== filters.type.toLowerCase()) return false;
    if (filters.transmission && filters.transmission !== "All") {
      const t = filters.transmission.toLowerCase();
      if (!v.transmission?.toLowerCase().includes(t)) return false;
    }
    if (filters.fuel && filters.fuel !== "All") {
      const f = filters.fuel.toLowerCase();
      if (!v.fuelType?.toLowerCase().includes(f)) return false;
    }
    return true;
  });

  return (
    <section className="dash-page">
      <DashboardHero
        firstName={data.user?.firstName || data.user?.username}
        bookingCount={(data.bookings || []).length}
        search={search}
        onSearchChange={setSearch}
      />

      <Notice error={error} />

      <div className="dash-section">
        <SectionHeader title="Available Vehicles" subtitle={`${filtered.length} vehicle${filtered.length !== 1 ? "s" : ""} found`} />
        <FilterBar active={filters} onChange={setFilters} />
        <VehicleGrid
          vehicles={filtered}
          variant="dashboard"
          onView={openView}
          onRent={openRent}
          emptyMessage="No vehicles match your filters."
        />
      </div>

      <section className="dash-bookings">
        <SectionHeader title="Recent Bookings" />
        <div className="table-stack">
          {data.bookings?.length ? data.bookings.map((booking) => (
            <article className="row-card" key={booking.id}>
              <div>
                {booking.vehicle?.imageUrl ? <img className="row-image-preview" src={booking.vehicle.imageUrl} alt={booking.vehicle.name} /> : null}
                <strong>#{booking.id} {booking.vehicle?.name}</strong>
                <p>{booking.pickupDate} to {booking.returnDate}</p>
                <small>{booking.status} | {booking.returnLocation}</small>
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#08090d" }}>{moneyAmount(booking.totalCost)}</div>
            </article>
          )) : <p className="section-empty" style={{ padding: "40px 20px", textAlign: "center" }}>No bookings yet. Your rentals will appear here after checkout.</p>}
        </div>
      </section>
    </section>
  );
}
