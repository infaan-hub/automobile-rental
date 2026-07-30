import React, { useEffect, useMemo, useState } from "react";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { clearRentalDraft, getCustomerToken, getRentalDraft } from "../lib/customer";
import { moneyAmount } from "../lib/formatters";
import { navigate } from "../lib/navigation";
import { paymentGatewayAssets } from "../lib/paymentAssets";
import BackgroundShapes from "../components/ui/BackgroundShapes";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import Badge from "../components/ui/Badge";
import { CreditCard, CheckCircle } from "lucide-react";

function calculateDays(start, end) {
  const diff = Math.round((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

const gatewayFormMap = {
  mastercard: { holder: "", number: "", expiry: "", cvv: "" },
  visa: { holder: "", number: "", expiry: "", cvv: "" },
  "american-express": { holder: "", number: "", expiry: "", cvv: "" },
  paypal: { holder: "", number: "", email: "" },
  "yas-mixx": { holder: "", phone: "", reference: "" },
};

export default function PaymentPage() {
  const token = getCustomerToken();
  const vehicleId = new URLSearchParams(window.location.search).get("vehicle");
  const draft = getRentalDraft();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    businessName: draft?.businessName || "",
    contactEmail: draft?.contactEmail || "",
    contactPhone: draft?.customerPhone || "",
  });
  const [selectedGateway, setSelectedGateway] = useState("mastercard");
  const [gatewayDetails, setGatewayDetails] = useState(gatewayFormMap);

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    if (!draft?.vehicleId || String(draft.vehicleId) !== String(vehicleId)) { navigate(`/rental-agreement?vehicle=${vehicleId}`); return; }
    async function load() {
      try { setVehicle((await apiRequest(`/vehicles/${vehicleId}/`)).vehicle); } catch (err) { setError(err.message); }
    }
    if (vehicleId) load();
  }, [draft, token, vehicleId]);

  const totalDays = calculateDays(draft?.pickupDate, draft?.returnDate);
  const totalAmount = totalDays * Number(vehicle?.dailyRate || 0);
  const gatewayLabel = paymentGatewayAssets.find((g) => g.id === selectedGateway)?.label || "Gateway";

  const paymentNote = useMemo(() => {
    const selected = gatewayDetails[selectedGateway] || {};
    return Object.entries(selected).filter(([, v]) => String(v || "").trim()).map(([k, v]) => `${k}: ${v}`).join(", ");
  }, [gatewayDetails, selectedGateway]);

  async function submit(event) {
    event.preventDefault();
    if (!draft || !vehicle) return;
    setSubmitting(true); setError(""); setMessage("");
    try {
      await apiRequest("/customer/bookings/", {
        method: "POST",
        body: JSON.stringify({
          vehicleId: vehicle.id, customerPhone: customerDetails.contactPhone || draft.customerPhone,
          pickupDate: draft.pickupDate, returnDate: draft.returnDate,
          pickupLocation: draft.pickupLocation, returnLocation: draft.returnLocation,
          notes: [draft.notes, customerDetails.businessName ? `Business: ${customerDetails.businessName}` : "",
            customerDetails.contactEmail ? `Contact email: ${customerDetails.contactEmail}` : "",
            `Payment gateway: ${gatewayLabel}`, paymentNote].filter(Boolean).join(" | "),
        }),
      }, token);
      clearRentalDraft();
      setMessage("Rental request submitted. Your booking is pending confirmation.");
      setTimeout(() => navigate("/dashboard"), 1400);
    } catch (err) { setError(err.message); } finally { setSubmitting(false); }
  }

  if (!vehicle || !draft) {
    return <div className="min-h-screen bg-bg flex items-center justify-center"><Loader text="Loading payment..." /></div>;
  }

  return (
    <main className="min-h-screen bg-bg relative">
      <BackgroundShapes />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-4 justify-center mb-8">
          <div className="flex items-center gap-2"><span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span><span className="text-xs font-semibold">Details</span></div>
          <div className="w-8 h-px bg-border" />
          <div className="flex items-center gap-2"><span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span><span className="text-xs font-semibold">Payment</span></div>
          <div className="w-8 h-px bg-border" />
          <div className="flex items-center gap-2"><span className="w-7 h-7 rounded-full bg-border text-muted text-xs font-bold flex items-center justify-center">3</span><span className="text-xs text-muted">Confirm</span></div>
        </div>

        <GlassCard className="p-6">
          <Badge color="blue">Customer details</Badge>
          <h1 className="text-xl font-bold mt-3 mb-1">Billing details</h1>
          <p className="text-xs text-muted mb-6">Complete your payment and booking information.</p>

          <Notice error={error} message={message} />

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="text-xs font-semibold text-muted tracking-wide uppercase">Business or contact name</label>
              <input value={customerDetails.businessName} onChange={(e) => setCustomerDetails({ ...customerDetails, businessName: e.target.value })} placeholder="Tech store" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted tracking-wide uppercase">Contact email</label>
              <input type="email" value={customerDetails.contactEmail} onChange={(e) => setCustomerDetails({ ...customerDetails, contactEmail: e.target.value })} placeholder="Contact email" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted tracking-wide uppercase">Contact phone</label>
              <input value={customerDetails.contactPhone} onChange={(e) => setCustomerDetails({ ...customerDetails, contactPhone: e.target.value })} placeholder="Contact phone" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted tracking-wide uppercase">Pickup date</label>
              <input value={draft.pickupDate} readOnly className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-bg text-sm" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-sm font-bold mb-3">Select payment method</h2>
            <p className="text-xs text-muted mb-4">Payment details are recorded with the booking for manual confirmation — no live charge is processed.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
              {paymentGatewayAssets.map((gateway) => (
                <button key={gateway.id} type="button" onClick={() => setSelectedGateway(gateway.id)} className={`p-3 rounded-2xl border text-center transition-all ${selectedGateway === gateway.id ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-border bg-white/80 hover:border-primary/30"}`}>
                  <img src={gateway.image} alt={gateway.label} className="h-8 mx-auto mb-2 object-contain" />
                  <p className="text-[10px] font-semibold">{gateway.label}</p>
                </button>
              ))}
            </div>

            <p className="text-xs text-muted mb-4">Selected: <strong>{gatewayLabel}</strong></p>

            {["mastercard", "visa", "american-express"].includes(selectedGateway) && (
              <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-bg border border-border">
                <div><label className="text-xs font-semibold text-muted tracking-wide uppercase">Cardholder</label><input value={gatewayDetails[selectedGateway].holder} onChange={(e) => setGatewayDetails({ ...gatewayDetails, [selectedGateway]: { ...gatewayDetails[selectedGateway], holder: e.target.value } })} placeholder="Full name on card" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors" /></div>
                <div className="sm:col-span-2"><label className="text-xs font-semibold text-muted tracking-wide uppercase">Card number</label><input value={gatewayDetails[selectedGateway].number} onChange={(e) => setGatewayDetails({ ...gatewayDetails, [selectedGateway]: { ...gatewayDetails[selectedGateway], number: e.target.value } })} placeholder="0000 0000 0000 0000" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors" /></div>
                <div><label className="text-xs font-semibold text-muted tracking-wide uppercase">Expiry</label><input value={gatewayDetails[selectedGateway].expiry} onChange={(e) => setGatewayDetails({ ...gatewayDetails, [selectedGateway]: { ...gatewayDetails[selectedGateway], expiry: e.target.value } })} placeholder="MM/YY" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors" /></div>
                <div><label className="text-xs font-semibold text-muted tracking-wide uppercase">CVV</label><input value={gatewayDetails[selectedGateway].cvv} onChange={(e) => setGatewayDetails({ ...gatewayDetails, [selectedGateway]: { ...gatewayDetails[selectedGateway], cvv: e.target.value } })} placeholder="CVV" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors" /></div>
              </div>
            )}

            {selectedGateway === "paypal" && (
              <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-bg border border-border">
                <div><label className="text-xs font-semibold text-muted tracking-wide uppercase">PayPal name</label><input value={gatewayDetails.paypal.holder} onChange={(e) => setGatewayDetails({ ...gatewayDetails, paypal: { ...gatewayDetails.paypal, holder: e.target.value } })} placeholder="PayPal account name" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors" /></div>
                <div><label className="text-xs font-semibold text-muted tracking-wide uppercase">PayPal email</label><input type="email" value={gatewayDetails.paypal.email} onChange={(e) => setGatewayDetails({ ...gatewayDetails, paypal: { ...gatewayDetails.paypal, email: e.target.value } })} placeholder="PayPal email" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors" /></div>
              </div>
            )}

            {selectedGateway === "yas-mixx" && (
              <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-bg border border-border">
                <div className="sm:col-span-2"><label className="text-xs font-semibold text-muted tracking-wide uppercase">Mixx account name</label><input value={gatewayDetails["yas-mixx"].holder} onChange={(e) => setGatewayDetails({ ...gatewayDetails, "yas-mixx": { ...gatewayDetails["yas-mixx"], holder: e.target.value } })} placeholder="Account holder" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors" /></div>
                <div><label className="text-xs font-semibold text-muted tracking-wide uppercase">Mixx phone</label><input value={gatewayDetails["yas-mixx"].phone} onChange={(e) => setGatewayDetails({ ...gatewayDetails, "yas-mixx": { ...gatewayDetails["yas-mixx"], phone: e.target.value } })} placeholder="Mobile number" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors" /></div>
                <div><label className="text-xs font-semibold text-muted tracking-wide uppercase">Transaction reference</label><input value={gatewayDetails["yas-mixx"].reference} onChange={(e) => setGatewayDetails({ ...gatewayDetails, "yas-mixx": { ...gatewayDetails["yas-mixx"], reference: e.target.value } })} placeholder="Mixx reference" className="mt-1 w-full px-3 py-2 rounded-2xl border border-border bg-white/80 text-sm outline-none focus:border-primary/40 transition-colors" /></div>
              </div>
            )}
          </div>

          <GlassCard className="p-4 mb-6">
            <div className="flex justify-between mb-2"><span className="text-sm text-muted">Subtotal</span><strong className="text-sm">{moneyAmount(totalAmount || vehicle.dailyRate)}</strong></div>
            <div className="flex justify-between"><span className="text-sm text-muted">Service fee</span><strong className="text-sm">{moneyAmount(0)}</strong></div>
            <hr className="my-2 border-border" />
            <div className="flex justify-between"><span className="text-sm font-bold">Total</span><strong className="text-lg text-primary">{moneyAmount(totalAmount || vehicle.dailyRate)}</strong></div>
          </GlassCard>

          <Button type="submit" onClick={submit} disabled={submitting} className="w-full">
            {submitting ? "Confirming..." : "Confirm payment"}
          </Button>
        </GlassCard>
      </div>
    </main>
  );
}
