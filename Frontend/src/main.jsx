import React, { useEffect, useState, startTransition } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(formatApiError(data));
  }
  return data;
}

function formatApiError(data) {
  if (!data?.errors) return data?.error || "Something went wrong.";
  if (Array.isArray(data.errors)) return data.errors.join(" ");
  return Object.entries(data.errors)
    .map(([field, message]) => `${field}: ${Array.isArray(message) ? message.join(" ") : message}`)
    .join(" ");
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value || 0));
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function tomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [filters, setFilters] = useState({ search: "", bodyType: "all" });
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function loadData(nextFilters = filters) {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (nextFilters.search) params.set("search", nextFilters.search);
      if (nextFilters.bodyType !== "all") params.set("bodyType", nextFilters.bodyType);

      const [vehicleData, bookingData, dashboardData] = await Promise.all([
        apiRequest(`/vehicles/?${params.toString()}`),
        apiRequest("/bookings/"),
        apiRequest("/dashboard/"),
      ]);
      setVehicles(vehicleData.vehicles);
      setBookings(bookingData.bookings);
      setStats(dashboardData.stats);
      setSelectedVehicle((current) => current || vehicleData.vehicles[0] || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function updateFilters(nextFilters) {
    startTransition(() => {
      setFilters(nextFilters);
      loadData(nextFilters);
    });
  }

  async function createBooking(formData) {
    setNotice("");
    setError("");
    try {
      const data = await apiRequest("/bookings/", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setNotice(`Booking #${data.booking.id} created for ${data.booking.customerName}.`);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateBookingStatus(id, status) {
    setNotice("");
    setError("");
    try {
      await apiRequest(`/bookings/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setNotice(`Booking #${id} updated to ${status}.`);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main>
      <Hero stats={stats} />

      <section className="workspace">
        <aside className="fleet-panel">
          <div className="panel-heading">
            <span>Live Fleet</span>
            <strong>{loading ? "Loading..." : `${vehicles.length} vehicles`}</strong>
          </div>
          <Filters filters={filters} onChange={updateFilters} />
          <VehicleList vehicles={vehicles} selectedVehicle={selectedVehicle} onSelect={setSelectedVehicle} />
        </aside>

        <section className="booking-panel">
          {error && <div className="alert error">{error}</div>}
          {notice && <div className="alert success">{notice}</div>}
          <BookingForm vehicle={selectedVehicle} onSubmit={createBooking} />
          <BookingBoard bookings={bookings} onStatusChange={updateBookingStatus} />
        </section>
      </section>
    </main>
  );
}

function Hero({ stats }) {
  return (
    <header className="hero">
      <nav>
        <div className="brand-mark">AR</div>
        <span>Automobile Rental</span>
      </nav>
      <div className="hero-grid">
        <div>
          <p className="eyebrow">Django API + React booking desk</p>
          <h1>Rent, reserve, and manage vehicles from one connected system.</h1>
          <p className="hero-copy">
            Browse the fleet, capture customer bookings, prevent overlapping rentals, and manage booking statuses
            through localhost APIs.
          </p>
        </div>
        <div className="stats-card">
          <Stat label="Vehicles" value={stats?.totalVehicles ?? "-"} />
          <Stat label="Available" value={stats?.availableVehicles ?? "-"} />
          <Stat label="Active Bookings" value={stats?.activeBookings ?? "-"} />
          <Stat label="Revenue" value={stats ? money(stats.revenue) : "-"} />
        </div>
      </div>
    </header>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Filters({ filters, onChange }) {
  return (
    <div className="filters">
      <input
        type="search"
        placeholder="Search by brand, model, location..."
        value={filters.search}
        onChange={(event) => onChange({ ...filters, search: event.target.value })}
      />
      <select
        value={filters.bodyType}
        onChange={(event) => onChange({ ...filters, bodyType: event.target.value })}
      >
        <option value="all">All body types</option>
        <option value="sedan">Sedan</option>
        <option value="suv">SUV</option>
        <option value="van">Van</option>
        <option value="pickup">Pickup</option>
        <option value="luxury">Luxury</option>
      </select>
    </div>
  );
}

function VehicleList({ vehicles, selectedVehicle, onSelect }) {
  if (!vehicles.length) {
    return <p className="empty">No vehicles match the current filters.</p>;
  }

  return (
    <div className="vehicle-list">
      {vehicles.map((vehicle) => (
        <button
          className={`vehicle-card ${selectedVehicle?.id === vehicle.id ? "active" : ""}`}
          key={vehicle.id}
          type="button"
          onClick={() => onSelect(vehicle)}
        >
          <img src={vehicle.imageUrl} alt={vehicle.name} />
          <span>{vehicle.bodyTypeLabel}</span>
          <strong>{vehicle.name}</strong>
          <small>
            {vehicle.brand} {vehicle.model} · {vehicle.seats} seats · {vehicle.location}
          </small>
          <b>{money(vehicle.dailyRate)} / day</b>
        </button>
      ))}
    </div>
  );
}

function BookingForm({ vehicle, onSubmit }) {
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    pickupDate: today(),
    returnDate: tomorrow(),
    pickupLocation: "Main Branch",
    notes: "",
  });

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!vehicle) return;
    onSubmit({ ...form, vehicleId: vehicle.id });
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <span>Selected Vehicle</span>
          <h2>{vehicle ? vehicle.name : "Choose a vehicle"}</h2>
        </div>
        {vehicle && <strong>{money(vehicle.dailyRate)} / day</strong>}
      </div>

      {vehicle && <p className="vehicle-description">{vehicle.description}</p>}

      <div className="form-grid">
        <label>
          Customer name
          <input value={form.customerName} onChange={(event) => update("customerName", event.target.value)} required />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.customerEmail}
            onChange={(event) => update("customerEmail", event.target.value)}
            required
          />
        </label>
        <label>
          Phone
          <input value={form.customerPhone} onChange={(event) => update("customerPhone", event.target.value)} required />
        </label>
        <label>
          Pickup location
          <input
            value={form.pickupLocation}
            onChange={(event) => update("pickupLocation", event.target.value)}
            required
          />
        </label>
        <label>
          Pickup date
          <input
            type="date"
            min={today()}
            value={form.pickupDate}
            onChange={(event) => update("pickupDate", event.target.value)}
            required
          />
        </label>
        <label>
          Return date
          <input
            type="date"
            min={form.pickupDate}
            value={form.returnDate}
            onChange={(event) => update("returnDate", event.target.value)}
            required
          />
        </label>
      </div>

      <label>
        Notes
        <textarea value={form.notes} onChange={(event) => update("notes", event.target.value)} />
      </label>

      <button className="primary-action" type="submit" disabled={!vehicle}>
        Create Booking
      </button>
    </form>
  );
}

function BookingBoard({ bookings, onStatusChange }) {
  return (
    <section className="booking-board">
      <div className="section-title">
        <span>Operations</span>
        <h2>Recent bookings</h2>
      </div>
      {!bookings.length && <p className="empty">Bookings will appear here after customers reserve vehicles.</p>}
      {bookings.map((booking) => (
        <article className="booking-row" key={booking.id}>
          <div>
            <strong>#{booking.id} {booking.customerName}</strong>
            <span>
              {booking.vehicle.name} · {booking.pickupDate} to {booking.returnDate}
            </span>
            <small>{booking.customerEmail} · {booking.customerPhone}</small>
          </div>
          <div className="booking-actions">
            <b>{money(booking.totalCost)}</b>
            <select value={booking.status} onChange={(event) => onStatusChange(booking.id, event.target.value)}>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </article>
      ))}
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
