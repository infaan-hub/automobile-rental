import React, { useEffect, useState } from "react";
import Notice from "../components/Notice";
import { Field } from "../components/FormControls";
import { apiRequest } from "../lib/api";
import { getCustomerToken, getRentalDraft, saveRentalDraft } from "../lib/customer";
import { money } from "../lib/formatters";
import { navigate } from "../lib/navigation";
import BackgroundShapes from "../components/ui/BackgroundShapes";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { ArrowRight, CheckSquare } from "lucide-react";

const MAIN_BRANCH = "Abeid amani karume international airport Zanzibar, main branch.";

export default function RentalAgreementPage() {
  const vehicleId = new URLSearchParams(window.location.search).get("vehicle");
  const draft = getRentalDraft() || {};
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customerPhone: draft.customerPhone || "",
    pickupLocation: MAIN_BRANCH,
    returnLocation: draft.returnLocation || "",
    sameLocation: draft.sameLocation ?? true,
    pickupDate: draft.pickupDate || "",
    returnDate: draft.returnDate || "",
    notes: draft.notes || "",
  });

  useEffect(() => {
    if (!getCustomerToken()) { navigate("/login"); return; }
    async function load() {
      try { setVehicle((await apiRequest(`/vehicles/${vehicleId}/`)).vehicle); } catch (err) { setError(err.message); }
    }
    if (vehicleId) load();
    else setError("Vehicle was not selected.");
  }, [vehicleId]);

  function submit(event) {
    event.preventDefault();
    const returnLocation = form.sameLocation ? MAIN_BRANCH : form.returnLocation.trim();
    if (!form.pickupDate || !form.returnDate || !form.customerPhone.trim() || !returnLocation) {
      setError("Fill customer phone, pickup date, return date, and return location.");
      return;
    }
    saveRentalDraft({
      ...draft, vehicleId: Number(vehicleId), customerPhone: form.customerPhone.trim(),
      pickupLocation: MAIN_BRANCH, returnLocation, sameLocation: form.sameLocation,
      pickupDate: form.pickupDate, returnDate: form.returnDate, notes: form.notes.trim(),
    });
    navigate(`/payment?vehicle=${vehicleId}`);
  }

  if (!vehicle) {
    return <div className="min-h-screen bg-bg flex items-center justify-center"><Loader text="Loading agreement..." /></div>;
  }

  return (
    <main className="min-h-screen bg-bg relative">
      <BackgroundShapes />
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
        <GlassCard className="p-6 mb-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">Rental agreement</p>
              <h1 className="text-xl font-bold mt-1">{vehicle.name}</h1>
              <p className="text-sm text-muted">{money(vehicle.dailyRate)}</p>
            </div>
            <img src={vehicle.imageUrl} alt={vehicle.name} className="w-20 h-16 object-contain rounded-xl bg-bg shrink-0" />
          </div>

          <form onSubmit={submit} className="grid gap-4">
            <Notice error={error} />

            <div>
              <label className="text-xs font-semibold text-muted tracking-wide uppercase">Pick up location</label>
              <div className="mt-1 px-3 py-2 rounded-2xl bg-bg border border-border text-sm">{MAIN_BRANCH}</div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted tracking-wide uppercase">Return location</label>
              <input
                value={form.sameLocation ? MAIN_BRANCH : form.returnLocation}
                onChange={(e) => setForm({ ...form, returnLocation: e.target.value })}
                disabled={form.sameLocation}
                placeholder="Fill return location"
                className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors disabled:bg-bg disabled:text-muted"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.sameLocation} onChange={(e) => setForm({ ...form, sameLocation: e.target.checked })} className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30" />
              <span className="text-sm font-medium">Same location</span>
            </label>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Pickup date" type="date" value={form.pickupDate} onChange={(v) => setForm({ ...form, pickupDate: v })} />
              <Field label="Return date" type="date" value={form.returnDate} onChange={(v) => setForm({ ...form, returnDate: v })} />
            </div>

            <Field label="Customer phone" value={form.customerPhone} onChange={(v) => setForm({ ...form, customerPhone: v })} />

            <div>
              <label className="text-xs font-semibold text-muted tracking-wide uppercase">Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Flight number, hotel, or special pickup note" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors min-h-[80px] resize-y" />
            </div>

            <Button type="submit" className="w-full">Rent button <ArrowRight size={16} /></Button>
          </form>
        </GlassCard>
      </div>
    </main>
  );
}
