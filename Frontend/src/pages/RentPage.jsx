import React, { useEffect, useState } from "react";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { getCustomerToken, saveRentalDraft } from "../lib/customer";
import { money, moneyAmount } from "../lib/formatters";
import { navigate } from "../lib/navigation";
import BackgroundShapes from "../components/ui/BackgroundShapes";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Loader from "../components/ui/Loader";
import { ArrowLeft, ArrowRight, Heart, CheckCircle } from "lucide-react";

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
    ["Daily", daily, "Fixed dealer price per day"],
    ["Weekly", daily * 7 * 0.9, "7 days with 10% discount"],
    ["Monthly", daily * 30 * 0.7, "30 days with 30% discount"],
  ];
}

export default function RentPage() {
  const vehicleId = new URLSearchParams(window.location.search).get("vehicle");
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getCustomerToken()) { navigate("/login"); return; }
    async function load() {
      try { setVehicle((await apiRequest(`/vehicles/${vehicleId}/`)).vehicle); } catch (err) { setError(err.message); }
    }
    if (vehicleId) load();
    else setError("Vehicle was not selected.");
  }, [vehicleId]);

  if (!vehicle) {
    return <div className="min-h-screen bg-bg flex items-center justify-center"><Loader text="Loading rental view..." /></div>;
  }

  const plans = rentPlans(vehicle.dailyRate);

  return (
    <main className="min-h-screen bg-bg relative">
      <BackgroundShapes />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Notice error={error} />

        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(`/view?vehicle=${vehicle.id}`)} className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-dark hover:bg-gray-50 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-dark hover:bg-gray-50 transition-colors">
            <Heart size={18} />
          </button>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold">{vehicle.name}</h1>
          <p className="text-muted text-sm">{vehicle.brand} {vehicle.model}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xl font-bold text-primary">{moneyAmount(vehicle.dailyRate)}</span>
            <span className="text-xs text-muted">{vehicle.year} | {vehicle.location}</span>
          </div>
        </div>

        <GlassCard className="p-4 mb-6">
          <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-56 object-contain" />
        </GlassCard>

        <GlassCard className="p-5 mb-4">
          <h2 className="text-sm font-bold mb-3">Specs</h2>
          <div className="grid grid-cols-3 gap-3">
            {rentSpecs(vehicle).map(([label, value]) => (
              <div key={label} className="text-center">
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">{label}</p>
                <p className="text-sm font-bold mt-1">{value}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 mb-4">
          <h2 className="text-sm font-bold mb-3">Plan</h2>
          <div className="grid grid-cols-3 gap-3">
            {plans.map(([label, amount, note], index) => (
              <GlassCard key={label} className={`p-4 text-center ${index === 0 ? "ring-2 ring-primary ring-offset-2 ring-offset-white" : ""}`}>
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">{label}</p>
                <p className="text-lg font-bold mt-1">{moneyAmount(amount)}</p>
                <p className="text-[10px] text-muted mt-1">{note}</p>
                {index === 0 && <CheckCircle size={16} className="mx-auto mt-2 text-primary" />}
              </GlassCard>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 mb-8">
          <h2 className="text-sm font-bold mb-2">Available</h2>
          <p className="text-sm">{vehicle.fuelType} · {vehicle.isAvailable ? "Available now" : "Not available"}</p>
          <p className="text-sm text-muted mt-1">{vehicle.location}</p>
        </GlassCard>

        <div className="flex items-center justify-between gap-4 bg-white rounded-3xl border border-border p-4">
          <div>
            <span className="text-xl font-bold">{moneyAmount(vehicle.dailyRate)}</span>
            <span className="text-xs text-muted"> / day</span>
          </div>
          <Button onClick={() => { saveRentalDraft({ vehicleId: vehicle.id }); navigate(`/rental-agreement?vehicle=${vehicle.id}`); }}>
            Pick up <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </main>
  );
}
