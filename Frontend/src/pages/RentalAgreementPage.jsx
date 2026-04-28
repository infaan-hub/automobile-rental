import React, { useEffect, useState } from "react";
import Notice from "../components/Notice";
import { Field } from "../components/FormControls";
import { apiRequest } from "../lib/api";
import { getCustomerToken, getRentalDraft, saveRentalDraft } from "../lib/customer";
import { money } from "../lib/formatters";
import { navigate } from "../lib/navigation";

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
    if (!getCustomerToken()) {
      navigate("/login");
      return;
    }

    async function load() {
      try {
        const data = await apiRequest(`/vehicles/${vehicleId}/`);
        setVehicle(data.vehicle);
      } catch (err) {
        setError(err.message);
      }
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
      ...draft,
      vehicleId: Number(vehicleId),
      customerPhone: form.customerPhone.trim(),
      pickupLocation: MAIN_BRANCH,
      returnLocation,
      sameLocation: form.sameLocation,
      pickupDate: form.pickupDate,
      returnDate: form.returnDate,
      notes: form.notes.trim(),
    });
    navigate(`/payment?vehicle=${vehicleId}`);
  }

  if (!vehicle) {
    return <section className="panel-page"><div className="panel-card"><Notice error={error} /><p>Loading rental agreement...</p></div></section>;
  }

  return (
    <section className="agreement-page">
      <form className="agreement-card" onSubmit={submit}>
        <div className="agreement-head">
          <div>
            <small>Rental agreement</small>
            <h1>{vehicle.name}</h1>
            <p>{money(vehicle.dailyRate)} / day</p>
          </div>
          <img src={vehicle.imageUrl} alt={vehicle.name} />
        </div>
        <Notice error={error} />
        <label className="agreement-label">
          <span>Pick up location</span>
          <div className="agreement-static-field">{MAIN_BRANCH}</div>
        </label>
        <label className="agreement-label">
          <span>Return location</span>
          <input
            value={form.sameLocation ? MAIN_BRANCH : form.returnLocation}
            onChange={(event) => setForm({ ...form, returnLocation: event.target.value })}
            disabled={form.sameLocation}
            placeholder="Fill return location"
          />
        </label>
        <label className="agreement-check">
          <input
            type="checkbox"
            checked={form.sameLocation}
            onChange={(event) => setForm({ ...form, sameLocation: event.target.checked })}
          />
          <span>Same location</span>
        </label>
        <div className="double-grid">
          <Field label="Pickup date" type="date" value={form.pickupDate} onChange={(value) => setForm({ ...form, pickupDate: value })} />
          <Field label="Return date" type="date" value={form.returnDate} onChange={(value) => setForm({ ...form, returnDate: value })} />
        </div>
        <Field label="Customer phone" value={form.customerPhone} onChange={(value) => setForm({ ...form, customerPhone: value })} />
        <label className="agreement-label">
          <span>Notes</span>
          <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Flight number, hotel, or special pickup note" />
        </label>
        <button className="solid-button agreement-submit" type="submit">Rent button</button>
      </form>
    </section>
  );
}
