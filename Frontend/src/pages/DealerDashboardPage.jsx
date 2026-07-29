import React, { useEffect, useState } from "react";
import { Area, Field, SelectField } from "../components/FormControls";
import Notice from "../components/Notice";
import { Metric, PanelHeader } from "../components/PanelBits";
import VideoBackground from "../components/VideoBackground";
import { apiRequest } from "../lib/api";
import { DEALER_TOKEN_KEY } from "../lib/config";
import { money } from "../lib/formatters";
import { navigate } from "../lib/navigation";

const MAX_IMAGE_SIZE = 1024 * 1024;

function emptyCategory() {
  return { name: "", description: "", imageUrl: "" };
}

function emptyVehicle() {
  return {
    name: "",
    brand: "",
    model: "",
    year: "2026",
    vehicleType: "car",
    bodyType: "sedan",
    seats: "5",
    transmission: "Automatic",
    fuelType: "Petrol",
    location: "Main Branch",
    dailyRate: "50",
    imageUrl: "",
    description: "",
    carCategoryId: "",
    scooterCategoryId: "",
    isAvailable: true,
    isTrending: false,
  };
}

function PreviewImage({ src, alt }) {
  if (!src) return null;
  return <img className="form-image-preview" src={src} alt={alt} />;
}

export default function DealerDashboardPage() {
  const token = localStorage.getItem(DEALER_TOKEN_KEY) || "";
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [carCategory, setCarCategory] = useState(emptyCategory());
  const [scooterCategory, setScooterCategory] = useState(emptyCategory());
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [editingCarCategoryId, setEditingCarCategoryId] = useState(null);
  const [editingScooterCategoryId, setEditingScooterCategoryId] = useState(null);
  const [vehicle, setVehicle] = useState(emptyVehicle());

  async function load() {
    if (!token) return navigate("/car-dealer/login");
    try {
      setData(await apiRequest("/car-dealer/dashboard/", {}, token));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function clearNotice() {
    setError("");
    setMessage("");
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Unable to read image."));
      reader.readAsDataURL(file);
    });
  }

  async function handleImagePick(file, update) {
    clearNotice();
    if (!file) {
      update("");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image must be smaller than 1 MB.");
      return;
    }
    try {
      update(await fileToDataUrl(file));
    } catch (err) {
      setError(err.message);
    }
  }

  async function saveCategory(basePath, form, reset, editingId = null, label = "Category") {
    try {
      await apiRequest(
        editingId ? `${basePath}${editingId}/` : basePath,
        { method: editingId ? "PATCH" : "POST", body: JSON.stringify(form) },
        token
      );
      reset();
      setMessage(editingId ? `${label} updated.` : `${label} saved.`);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteCategory(basePath, id, label) {
    try {
      await apiRequest(`${basePath}${id}/`, { method: "DELETE" }, token);
      setMessage(`${label} deleted.`);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function saveVehicle(event) {
    event.preventDefault();
    try {
      await apiRequest(
        editingVehicleId ? `/car-dealer/vehicles/${editingVehicleId}/` : "/car-dealer/vehicles/",
        { method: editingVehicleId ? "PATCH" : "POST", body: JSON.stringify(vehicle) },
        token
      );
      setMessage(editingVehicleId ? "Vehicle updated." : "Vehicle added.");
      setEditingVehicleId(null);
      setVehicle(emptyVehicle());
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteVehicle(id) {
    try {
      await apiRequest(`/car-dealer/vehicles/${id}/`, { method: "DELETE" }, token);
      setMessage("Vehicle deleted.");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function changeBookingStatus(id, status) {
    try {
      await apiRequest(`/bookings/${id}/`, { method: "PATCH", body: JSON.stringify({ status }) }, token);
      setMessage("Booking updated.");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (!data) {
    return <section className="panel-page"><div className="panel-card"><Notice error={error} /><p>Loading dealer dashboard...</p></div></section>;
  }

  return (
    <section className="panel-page">
      <VideoBackground name="dashboard" fill />
      <PanelHeader
        badge="Car dealer dashboard"
        title={`Welcome ${data.user.firstName || data.user.username}`}
        text="Add vehicle inventory, create car and scooter categories, mark trend vehicles, and manage bookings."
      />
      <Notice error={error} message={message} />
      <div className="panel-stats">
        <Metric label="Vehicles" value={data.stats.vehicles} />
        <Metric label="Trending" value={data.stats.trendingVehicles} />
        <Metric label="Bookings" value={data.stats.bookings} />
        <Metric label="Rented cars" value={data.stats.rentedCars} />
      </div>
      <div className="panel-grid wide">
        <form className="panel-card form-card" onSubmit={saveVehicle}>
          <div className="card-head"><h2>{editingVehicleId ? "Update vehicle" : "Add vehicle"}</h2><span>Manage cars, scooters, and trend vehicles</span></div>
          <div className="triple-grid">
            <Field label="Name" value={vehicle.name} onChange={(value) => setVehicle({ ...vehicle, name: value })} />
            <Field label="Brand" value={vehicle.brand} onChange={(value) => setVehicle({ ...vehicle, brand: value })} />
            <Field label="Model" value={vehicle.model} onChange={(value) => setVehicle({ ...vehicle, model: value })} />
          </div>
          <div className="triple-grid">
            <SelectField label="Vehicle type" value={vehicle.vehicleType} onChange={(value) => setVehicle({ ...vehicle, vehicleType: value })} options={[["car", "Car"], ["scooter", "Scooter"]]} />
            <SelectField label="Body type" value={vehicle.bodyType} onChange={(value) => setVehicle({ ...vehicle, bodyType: value })} options={[["sedan", "Sedan"], ["suv", "SUV"], ["van", "Van"], ["pickup", "Pickup"], ["luxury", "Luxury"]]} />
            <Field label="Year" type="number" value={vehicle.year} onChange={(value) => setVehicle({ ...vehicle, year: value })} />
          </div>
          <div className="double-grid">
            <Field label="Seats" type="number" value={vehicle.seats} onChange={(value) => setVehicle({ ...vehicle, seats: value })} />
            <Field label="Daily rate" type="number" value={vehicle.dailyRate} onChange={(value) => setVehicle({ ...vehicle, dailyRate: value })} />
          </div>
          <div className="double-grid">
            <SelectField label="Car category" value={vehicle.carCategoryId} onChange={(value) => setVehicle({ ...vehicle, carCategoryId: value })} options={[["", "Select"], ...data.carCategories.map((item) => [String(item.id), item.name])]} />
            <SelectField label="Scooter category" value={vehicle.scooterCategoryId} onChange={(value) => setVehicle({ ...vehicle, scooterCategoryId: value })} options={[["", "Select"], ...data.scooterCategories.map((item) => [String(item.id), item.name])]} />
          </div>
          <Field label="Transmission" value={vehicle.transmission} onChange={(value) => setVehicle({ ...vehicle, transmission: value })} />
          <Field label="Fuel type" value={vehicle.fuelType} onChange={(value) => setVehicle({ ...vehicle, fuelType: value })} />
          <Field label="Location" value={vehicle.location} onChange={(value) => setVehicle({ ...vehicle, location: value })} />
          <Field label="Image URL" value={vehicle.imageUrl} onChange={(value) => setVehicle({ ...vehicle, imageUrl: value })} />
          <label className="field">
            <span className="sr-only">Upload vehicle image</span>
            <input className="file-input" type="file" accept="image/*" onChange={(event) => handleImagePick(event.target.files?.[0], (value) => setVehicle({ ...vehicle, imageUrl: value }))} />
          </label>
          <PreviewImage src={vehicle.imageUrl} alt="Vehicle preview" />
          <Area label="Description" value={vehicle.description} onChange={(value) => setVehicle({ ...vehicle, description: value })} />
          <div className="toggle-row">
            <label><input type="checkbox" checked={vehicle.isAvailable} onChange={(event) => setVehicle({ ...vehicle, isAvailable: event.target.checked })} />Available</label>
            <label><input type="checkbox" checked={vehicle.isTrending} onChange={(event) => setVehicle({ ...vehicle, isTrending: event.target.checked })} />Trend vehicle</label>
          </div>
          <div className="row-actions">
            <button className="solid-button" type="submit">{editingVehicleId ? "Save vehicle" : "Add vehicle"}</button>
            {editingVehicleId ? <button className="ghost-button" type="button" onClick={() => { setEditingVehicleId(null); setVehicle(emptyVehicle()); }}>Cancel</button> : null}
          </div>
        </form>
        <div className="stack-grid">
          <form className="panel-card form-card compact-form" onSubmit={(event) => { event.preventDefault(); saveCategory("/car-dealer/car-categories/", carCategory, () => { setCarCategory(emptyCategory()); setEditingCarCategoryId(null); }, editingCarCategoryId, "Car category"); }}>
            <div className="card-head"><h2>Car category</h2><span>{editingCarCategoryId ? "Update car category" : "Create categories for cars"}</span></div>
            <Field label="Name" value={carCategory.name} onChange={(value) => setCarCategory({ ...carCategory, name: value })} />
            <Field label="Image URL" value={carCategory.imageUrl} onChange={(value) => setCarCategory({ ...carCategory, imageUrl: value })} />
            <label className="field">
              <span className="sr-only">Upload car category image</span>
              <input className="file-input" type="file" accept="image/*" onChange={(event) => handleImagePick(event.target.files?.[0], (value) => setCarCategory({ ...carCategory, imageUrl: value }))} />
            </label>
            <PreviewImage src={carCategory.imageUrl} alt="Car category preview" />
            <Area label="Description" value={carCategory.description} onChange={(value) => setCarCategory({ ...carCategory, description: value })} />
            <div className="row-actions">
              <button className="solid-button" type="submit">{editingCarCategoryId ? "Save car category" : "Add car category"}</button>
              {editingCarCategoryId ? <button className="ghost-button" type="button" onClick={() => { setCarCategory(emptyCategory()); setEditingCarCategoryId(null); }}>Cancel</button> : null}
            </div>
          </form>
          <form className="panel-card form-card compact-form" onSubmit={(event) => { event.preventDefault(); saveCategory("/car-dealer/scooter-categories/", scooterCategory, () => { setScooterCategory(emptyCategory()); setEditingScooterCategoryId(null); }, editingScooterCategoryId, "Scooter category"); }}>
            <div className="card-head"><h2>Scooter category</h2><span>{editingScooterCategoryId ? "Update scooter category" : "Create categories for scooters"}</span></div>
            <Field label="Name" value={scooterCategory.name} onChange={(value) => setScooterCategory({ ...scooterCategory, name: value })} />
            <Field label="Image URL" value={scooterCategory.imageUrl} onChange={(value) => setScooterCategory({ ...scooterCategory, imageUrl: value })} />
            <label className="field">
              <span className="sr-only">Upload scooter category image</span>
              <input className="file-input" type="file" accept="image/*" onChange={(event) => handleImagePick(event.target.files?.[0], (value) => setScooterCategory({ ...scooterCategory, imageUrl: value }))} />
            </label>
            <PreviewImage src={scooterCategory.imageUrl} alt="Scooter category preview" />
            <Area label="Description" value={scooterCategory.description} onChange={(value) => setScooterCategory({ ...scooterCategory, description: value })} />
            <div className="row-actions">
              <button className="solid-button" type="submit">{editingScooterCategoryId ? "Save scooter category" : "Add scooter category"}</button>
              {editingScooterCategoryId ? <button className="ghost-button" type="button" onClick={() => { setScooterCategory(emptyCategory()); setEditingScooterCategoryId(null); }}>Cancel</button> : null}
            </div>
          </form>
        </div>
      </div>
      <div className="panel-grid">
        <section className="panel-card table-card">
          <div className="card-head"><h2>Vehicles</h2><span>Update and delete inventory</span></div>
          <div className="table-stack">
            {data.vehicles.map((item) => (
              <article className="row-card" key={item.id}>
                <div>
                  {item.imageUrl ? <img className="row-image-preview" src={item.imageUrl} alt={item.name} /> : null}
                  <strong>{item.name} | {money(item.dailyRate)}</strong>
                  <p>{item.vehicleType} | {item.brand} {item.model} | {item.location}</p>
                  <small>{item.isTrending ? "Trend vehicle" : "Standard"} | {item.isAvailable ? "Available" : "Unavailable"}</small>
                </div>
                <div className="row-actions">
                  <button
                    className="ghost-button"
                    type="button"
                    onClick={() => {
                      setEditingVehicleId(item.id);
                      setVehicle({
                        name: item.name,
                        brand: item.brand,
                        model: item.model,
                        year: String(item.year),
                        vehicleType: item.vehicleType,
                        bodyType: item.bodyType,
                        seats: String(item.seats),
                        transmission: item.transmission,
                        fuelType: item.fuelType,
                        location: item.location,
                        dailyRate: String(item.dailyRate),
                        imageUrl: item.imageUrl || "",
                        description: item.description,
                        carCategoryId: item.carCategory?.id ? String(item.carCategory.id) : "",
                        scooterCategoryId: item.scooterCategory?.id ? String(item.scooterCategory.id) : "",
                        isAvailable: item.isAvailable,
                        isTrending: item.isTrending,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button className="ghost-button danger" type="button" onClick={() => deleteVehicle(item.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="panel-card table-card">
          <div className="card-head"><h2>Car categories</h2><span>Update and delete car categories</span></div>
          <div className="table-stack">
            {data.carCategories.map((item) => (
              <article className="row-card" key={`car-${item.id}`}>
                <div>
                  {item.imageUrl ? <img className="row-image-preview" src={item.imageUrl} alt={item.name} /> : null}
                  <strong>{item.name}</strong>
                  <p>{item.description || "No description"}</p>
                </div>
                <div className="row-actions">
                  <button className="ghost-button" type="button" onClick={() => { setEditingCarCategoryId(item.id); setCarCategory({ name: item.name, description: item.description, imageUrl: item.imageUrl || "" }); }}>Edit</button>
                  <button className="ghost-button danger" type="button" onClick={() => deleteCategory("/car-dealer/car-categories/", item.id, "Car category")}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <div className="panel-grid">
        <section className="panel-card table-card">
          <div className="card-head"><h2>Scooter categories</h2><span>Update and delete scooter categories</span></div>
          <div className="table-stack">
            {data.scooterCategories.map((item) => (
              <article className="row-card" key={`scooter-${item.id}`}>
                <div>
                  {item.imageUrl ? <img className="row-image-preview" src={item.imageUrl} alt={item.name} /> : null}
                  <strong>{item.name}</strong>
                  <p>{item.description || "No description"}</p>
                </div>
                <div className="row-actions">
                  <button className="ghost-button" type="button" onClick={() => { setEditingScooterCategoryId(item.id); setScooterCategory({ name: item.name, description: item.description, imageUrl: item.imageUrl || "" }); }}>Edit</button>
                  <button className="ghost-button danger" type="button" onClick={() => deleteCategory("/car-dealer/scooter-categories/", item.id, "Scooter category")}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="panel-card table-card">
          <div className="card-head"><h2>Bookings and rented cars</h2><span>See all bookings for your vehicles</span></div>
          <div className="table-stack">
            {data.bookings.map((booking) => (
              <article className="row-card" key={booking.id}>
                <div>
                  {booking.vehicle.imageUrl ? <img className="row-image-preview" src={booking.vehicle.imageUrl} alt={booking.vehicle.name} /> : null}
                  <strong>#{booking.id} {booking.customerName}</strong>
                  <p>{booking.vehicle.name} | {booking.pickupDate} to {booking.returnDate}</p>
                  <small>{booking.customerEmail}</small>
                </div>
                <select value={booking.status} onChange={(event) => changeBookingStatus(booking.id, event.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
