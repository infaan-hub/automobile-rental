import React, { useEffect, useState } from "react";
import { Area, Field, SelectField } from "../components/FormControls";
import Notice from "../components/Notice";
import { Metric, PanelHeader } from "../components/PanelBits";
import { apiRequest } from "../lib/api";
import { DEALER_TOKEN_KEY } from "../lib/config";
import { money } from "../lib/formatters";
import { navigate } from "../lib/navigation";
import BackgroundShapes from "../components/ui/BackgroundShapes";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import Badge from "../components/ui/Badge";
import { Plus, Pencil, Trash2, Car, FolderOpen, BookOpen } from "lucide-react";

const MAX_IMAGE_SIZE = 1024 * 1024;

function emptyCategory() { return { name: "", description: "", imageUrl: "" }; }
function emptyVehicle() {
  return {
    name: "", brand: "", model: "", year: "2026", vehicleType: "car", bodyType: "sedan",
    seats: "5", transmission: "Automatic", fuelType: "Petrol", location: "Main Branch",
    dailyRate: "50", imageUrl: "", description: "",
    carCategoryId: "", scooterCategoryId: "", isAvailable: true, isTrending: false,
  };
}

function PreviewImage({ src, alt }) {
  if (!src) return null;
  return <img src={src} alt={alt} className="w-full max-w-[220px] h-[140px] object-cover rounded-2xl border border-border bg-bg mb-2" />;
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
    try { setData(await apiRequest("/car-dealer/dashboard/", {}, token)); } catch (err) { setError(err.message); }
  }

  useEffect(() => { load(); }, []);

  function clearNotice() { setError(""); setMessage(""); }

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
    if (!file) { update(""); return; }
    if (file.size > MAX_IMAGE_SIZE) { setError("Image must be smaller than 1 MB."); return; }
    try { update(await fileToDataUrl(file)); } catch (err) { setError(err.message); }
  }

  function updateVehicle(field) { return (e) => setVehicle((prev) => ({ ...prev, [field]: e.target.value })); }

  async function saveCategory(basePath, form, reset, editingId, label) {
    try {
      await apiRequest(editingId ? `${basePath}${editingId}/` : basePath,
        { method: editingId ? "PATCH" : "POST", body: JSON.stringify(form) }, token);
      reset();
      setMessage(editingId ? `${label} updated.` : `${label} saved.`);
      load();
    } catch (err) { setError(err.message); }
  }

  async function deleteCategory(basePath, id, label) {
    try {
      await apiRequest(`${basePath}${id}/`, { method: "DELETE" }, token);
      setMessage(`${label} deleted.`);
      load();
    } catch (err) { setError(err.message); }
  }

  async function saveVehicle(event) {
    event.preventDefault();
    try {
      await apiRequest(editingVehicleId ? `/car-dealer/vehicles/${editingVehicleId}/` : "/car-dealer/vehicles/",
        { method: editingVehicleId ? "PATCH" : "POST", body: JSON.stringify(vehicle) }, token);
      setVehicle(emptyVehicle());
      setEditingVehicleId(null);
      setMessage(editingVehicleId ? "Vehicle updated." : "Vehicle saved.");
      load();
    } catch (err) { setError(err.message); }
  }

  async function deleteVehicle(id) {
    try {
      await apiRequest(`/car-dealer/vehicles/${id}/`, { method: "DELETE" }, token);
      setMessage("Vehicle deleted.");
      load();
    } catch (err) { setError(err.message); }
  }

  function editVehicle(v) {
    setVehicle({
      name: v.name || "", brand: v.brand || "", model: v.model || "", year: String(v.year || "2026"),
      vehicleType: v.vehicleType || "car", bodyType: v.bodyType || "sedan", seats: String(v.seats || "5"),
      transmission: v.transmission || "Automatic", fuelType: v.fuelType || "Petrol",
      location: v.location || "Main Branch", dailyRate: String(v.dailyRate || "50"),
      imageUrl: v.imageUrl || "", description: v.description || "",
      carCategoryId: v.carCategoryId || "", scooterCategoryId: v.scooterCategoryId || "",
      isAvailable: v.isAvailable ?? true, isTrending: v.isTrending ?? false,
    });
    setEditingVehicleId(v.id);
  }

  async function changeBookingStatus(id, status) {
    try { await apiRequest(`/bookings/${id}/`, { method: "PATCH", body: JSON.stringify({ status }) }, token); load(); } catch (err) { setError(err.message); }
  }

  if (!data) return <div className="min-h-screen bg-bg flex items-center justify-center"><Loader text="Loading dealer dashboard..." /></div>;

  const vOptions = [["car", "Car"], ["scooter", "Scooter"]];
  const bOptions = [["sedan", "Sedan"], ["suv", "SUV"], ["hatchback", "Hatchback"], ["coupe", "Coupe"], ["convertible", "Convertible"], ["wagon", "Wagon"], ["van", "Van"], ["truck", "Truck"]];
  const tOptions = [["Automatic", "Automatic"], ["Manual", "Manual"], ["Semi-Automatic", "Semi-Automatic"]];
  const fOptions = [["Petrol", "Petrol"], ["Diesel", "Diesel"], ["Electric", "Electric"], ["Hybrid", "Hybrid"]];
  const lOptions = [["Main Branch", "Main Branch"], ["Airport", "Airport"], ["City Center", "City Center"]];
  const sOptions = [["pending", "Pending"], ["confirmed", "Confirmed"], ["completed", "Completed"], ["cancelled", "Cancelled"]];
  const statusColors = { pending: "yellow", confirmed: "blue", completed: "green", cancelled: "red" };

  return (
    <main className="min-h-screen bg-bg relative">
      <BackgroundShapes />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <PanelHeader badge="Car dealer dashboard" title={`Welcome ${data.user.firstName || data.user.username}`} text="Add vehicle inventory, create car and scooter categories, mark trend vehicles, and manage bookings." />

        <Notice error={error} message={message} />

        <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Metric label="Total Vehicles" value={data.vehicles?.length || 0} />
          <Metric label="Car Categories" value={data.carCategories?.length || 0} />
          <Metric label="Scooter Categories" value={data.scooterCategories?.length || 0} />
          <Metric label="Total Bookings" value={data.bookings?.length || 0} />
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-6 mb-8">
          <GlassCard className="p-6">
            <h2 className="text-base font-bold mb-4">{editingVehicleId ? "Edit Vehicle" : "Add Vehicle"}</h2>
            <form onSubmit={saveVehicle} className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" value={vehicle.name} onChange={updateVehicle("name")} />
                <Field label="Brand" value={vehicle.brand} onChange={updateVehicle("brand")} />
                <Field label="Model" value={vehicle.model} onChange={updateVehicle("model")} />
                <Field label="Year" value={vehicle.year} onChange={updateVehicle("year")} />
                <SelectField label="Type" value={vehicle.vehicleType} onChange={updateVehicle("vehicleType")} options={vOptions} />
                <SelectField label="Body" value={vehicle.bodyType} onChange={updateVehicle("bodyType")} options={bOptions} />
                <Field label="Seats" value={vehicle.seats} onChange={updateVehicle("seats")} />
                <SelectField label="Transmission" value={vehicle.transmission} onChange={updateVehicle("transmission")} options={tOptions} />
                <SelectField label="Fuel" value={vehicle.fuelType} onChange={updateVehicle("fuelType")} options={fOptions} />
                <SelectField label="Location" value={vehicle.location} onChange={updateVehicle("location")} options={lOptions} />
                <Field label="Daily Rate" value={vehicle.dailyRate} onChange={updateVehicle("dailyRate")} />
              </div>
              <Area label="Description" value={vehicle.description} onChange={updateVehicle("description")} />
              <div>
                <label className="text-xs font-semibold text-muted tracking-wide uppercase">Image</label>
                <input type="file" accept="image/*" onChange={(e) => handleImagePick(e.target.files[0], (url) => setVehicle((prev) => ({ ...prev, imageUrl: url })))} className="w-full mt-1 px-3 py-2 rounded-2xl border border-dashed border-border bg-white/80 text-sm" />
                <PreviewImage src={vehicle.imageUrl} alt="Vehicle" />
              </div>
              <div className="flex gap-4">
                {editingVehicleId && <Button variant="secondary" onClick={() => { setVehicle(emptyVehicle()); setEditingVehicleId(null); }}>Cancel</Button>}
                <Button type="submit">{editingVehicleId ? "Update" : "Save"} Vehicle</Button>
              </div>
            </form>
          </GlassCard>

          <div className="grid gap-6">
            <GlassCard className="p-6">
              <h2 className="text-base font-bold mb-4">Vehicle Categories</h2>
              <div className="grid gap-4 mb-4">
                <Field label="Name" value={carCategory.name} onChange={(e) => setCarCategory((p) => ({ ...p, name: e.target.value }))} />
                <Field label="Image URL" value={carCategory.imageUrl} onChange={(e) => setCarCategory((p) => ({ ...p, imageUrl: e.target.value }))} />
                <Button onClick={() => saveCategory("/car-dealer/car-categories/", carCategory, () => setCarCategory(emptyCategory()), editingCarCategoryId, "Car category")} className="w-full">
                  {editingCarCategoryId ? "Update" : "Add"} Car Category
                </Button>
                {editingCarCategoryId && <Button variant="secondary" onClick={() => { setCarCategory(emptyCategory()); setEditingCarCategoryId(null); }}>Cancel</Button>}
              </div>
              {data.carCategories?.length ? data.carCategories.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm font-medium">{c.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => { setCarCategory(c); setEditingCarCategoryId(c.id); }} className="text-muted hover:text-primary transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => deleteCategory("/car-dealer/car-categories/", c.id, "Car category")} className="text-muted hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              )) : <EmptyState message="No car categories." />}
            </GlassCard>

            <GlassCard className="p-6">
              <h2 className="text-base font-bold mb-4">Scooter Categories</h2>
              <div className="grid gap-4 mb-4">
                <Field label="Name" value={scooterCategory.name} onChange={(e) => setScooterCategory((p) => ({ ...p, name: e.target.value }))} />
                <Field label="Image URL" value={scooterCategory.imageUrl} onChange={(e) => setScooterCategory((p) => ({ ...p, imageUrl: e.target.value }))} />
                <Button onClick={() => saveCategory("/car-dealer/scooter-categories/", scooterCategory, () => setScooterCategory(emptyCategory()), editingScooterCategoryId, "Scooter category")} className="w-full">
                  {editingScooterCategoryId ? "Update" : "Add"} Scooter Category
                </Button>
                {editingScooterCategoryId && <Button variant="secondary" onClick={() => { setScooterCategory(emptyCategory()); setEditingScooterCategoryId(null); }}>Cancel</Button>}
              </div>
              {data.scooterCategories?.length ? data.scooterCategories.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm font-medium">{c.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => { setScooterCategory(c); setEditingScooterCategoryId(c.id); }} className="text-muted hover:text-primary transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => deleteCategory("/car-dealer/scooter-categories/", c.id, "Scooter category")} className="text-muted hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              )) : <EmptyState message="No scooter categories." />}
            </GlassCard>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-base font-bold mb-4">Vehicles ({data.vehicles?.length || 0})</h2>
          {data.vehicles?.length ? (
            <div className="grid gap-3">
              {data.vehicles.map((v) => (
                <GlassCard key={v.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {v.imageUrl && <img src={v.imageUrl} alt="" className="w-16 h-12 rounded-xl object-cover bg-bg shrink-0" />}
                    <div>
                      <p className="text-sm font-bold">{v.name}</p>
                      <p className="text-xs text-muted">{v.brand} {v.model} · {money(v.dailyRate)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="ghost" onClick={() => editVehicle(v)}><Pencil size={16} /></Button>
                    <Button variant="danger" onClick={() => deleteVehicle(v.id)}><Trash2 size={16} /></Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : <EmptyState message="No vehicles yet." />}
        </div>

        <div>
          <h2 className="text-base font-bold mb-4">Bookings ({data.bookings?.length || 0})</h2>
          {data.bookings?.length ? (
            <div className="grid gap-3">
              {data.bookings.map((b) => (
                <GlassCard key={b.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold">#{b.id} · {b.vehicle?.name || "Vehicle"}</p>
                    <p className="text-xs text-muted">{b.customerPhone} · {b.pickupDate} to {b.returnDate}</p>
                    <Badge color={statusColors[b.status] || "gray"}>{b.status}</Badge>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {sOptions.map(([val, lbl]) => (
                      <Button key={val} variant={b.status === val ? "primary" : "ghost"} className="!h-8 !px-3 !text-xs" onClick={() => changeBookingStatus(b.id, val)}>
                        {lbl}
                      </Button>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : <EmptyState message="No bookings yet." />}
        </div>
      </div>
    </main>
  );
}
