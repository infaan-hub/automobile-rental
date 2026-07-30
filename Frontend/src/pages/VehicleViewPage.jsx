import React, { useEffect, useState } from "react";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { money } from "../lib/formatters";
import { getCustomerToken } from "../lib/customer";
import { navigate } from "../lib/navigation";
import BackgroundShapes from "../components/ui/BackgroundShapes";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Loader from "../components/ui/Loader";
import { ArrowLeft, ArrowRight, Car } from "lucide-react";

function specItems(vehicle) {
  return [
    ["Brand", vehicle.brand],
    ["Model", vehicle.model],
    ["Year", vehicle.year],
    ["Seats", vehicle.seats],
    ["Transmission", vehicle.transmission],
    ["Fuel", vehicle.fuelType],
    ["Body", vehicle.bodyTypeLabel],
    ["Location", vehicle.location],
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
      try { setVehicle((await apiRequest(`/vehicles/${vehicleId}/`)).vehicle); } catch (err) { setError(err.message); }
    }
    load();
  }, [vehicleId]);

  if (!vehicle) {
    return <div className="min-h-screen bg-bg flex items-center justify-center"><Loader text="Loading details..." /></div>;
  }

  return (
    <main className="min-h-screen bg-bg relative">
      <BackgroundShapes />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Notice error={error} />
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
          <GlassCard className="p-6 flex items-center justify-center">
            <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full max-h-[420px] object-contain" />
          </GlassCard>
          <div>
            <Badge color="blue">{vehicle.vehicleType} rental</Badge>
            <h1 className="text-3xl font-bold mt-3 mb-2">{vehicle.name}</h1>
            <p className="text-muted text-sm mb-4">{vehicle.description || `${vehicle.brand} ${vehicle.model} from ${vehicle.year}`}</p>
            <p className="text-2xl font-bold text-primary mb-6">{money(vehicle.dailyRate)}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {specItems(vehicle).map(([label, value]) => (
                <GlassCard key={label} className="p-3 text-center">
                  <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-bold mt-1">{value}</p>
                </GlassCard>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => navigate("/home")}><ArrowLeft size={16} /> Back</Button>
              {loggedIn ? (
                <Button onClick={() => navigate(`/rent?vehicle=${vehicle.id}`)}>Rent now <ArrowRight size={16} /></Button>
              ) : (
                <Button onClick={() => navigate("/login")}>Login to rent <ArrowRight size={16} /></Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
