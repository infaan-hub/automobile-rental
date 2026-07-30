import React, { useEffect, useMemo, useState } from "react";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { clearRentalDraft, getCustomerToken, getRentalDraft } from "../lib/customer";
import { moneyAmount } from "../lib/formatters";
import { navigate } from "../lib/navigation";
import { paymentGatewayAssets } from "../lib/paymentAssets";

function calculateDays(start, end) {
  const a = new Date(start), b = new Date(end);
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24));
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
      try { const data = await apiRequest(`/vehicles/${vehicleId}/`); setVehicle(data.vehicle); }
      catch (err) { setError(err.message); }
    }
    if (vehicleId) load();
  }, [draft, token, vehicleId]);

  const totalDays = calculateDays(draft?.pickupDate, draft?.returnDate);
  const totalAmount = totalDays * Number(vehicle?.dailyRate || 0);
  const gatewayLabel = paymentGatewayAssets.find((g) => g.id === selectedGateway)?.label || "Gateway";

  const paymentNote = useMemo(() => {
    const sel = gatewayDetails[selectedGateway] || {};
    return Object.entries(sel).filter(([, v]) => String(v || "").trim()).map(([k, v]) => `${k}: ${v}`).join(", ");
  }, [gatewayDetails, selectedGateway]);

  async function submit(event) {
    event.preventDefault();
    if (!draft || !vehicle) return;
    setSubmitting(true); setError(""); setMessage("");
    try {
      await apiRequest("/customer/bookings/", {
        method: "POST",
        body: JSON.stringify({
          vehicleId: vehicle.id,
          customerPhone: customerDetails.contactPhone || draft.customerPhone,
          pickupDate: draft.pickupDate, returnDate: draft.returnDate,
          pickupLocation: draft.pickupLocation, returnLocation: draft.returnLocation,
          notes: [draft.notes, customerDetails.businessName ? `Business: ${customerDetails.businessName}` : "",
            customerDetails.contactEmail ? `Contact email: ${customerDetails.contactEmail}` : "",
            `Payment gateway: ${gatewayLabel}`, paymentNote].filter(Boolean).join(" | "),
        }),
      }, token);
      clearRentalDraft();
      setMessage("Rental request submitted. This flow records booking and payment form details for manual confirmation.");
      setTimeout(() => navigate("/dashboard"), 1400);
    } catch (err) { setError(err.message); }
    finally { setSubmitting(false); }
  }

  if (!vehicle || !draft) {
    return <section className="panel-page"><div className="panel-card"><Notice error={error} message={message} /><p>Loading payment section...</p></div></section>;
  }

  return (
    <section className="pay-page">
      <form className="pay-card" onSubmit={submit}>
        <div className="pay-hero">
          <h1>Billing details</h1>
          <p>Complete your payment and booking information.</p>
        </div>
        <div className="pay-steps">
          <div className="pay-step active"><strong>1</strong><span>Customer</span></div>
          <div className="pay-step active"><strong>2</strong><span>Payment</span></div>
          <div className="pay-step"><strong>3</strong><span>Confirmation</span></div>
        </div>
        <section className="pay-section">
          <h2>Booking information</h2>
          <p>Fill in the customer and rental details for this order.</p>
          <Notice error={error} message={message} />
          <div className="pay-form-grid">
            <label><span>Business or contact name</span><input value={customerDetails.businessName} onChange={(e) => setCustomerDetails({ ...customerDetails, businessName: e.target.value })} placeholder="Tech store" /></label>
            <label><span>Contact email</span><input type="email" value={customerDetails.contactEmail} onChange={(e) => setCustomerDetails({ ...customerDetails, contactEmail: e.target.value })} placeholder="Contact email" /></label>
            <label><span>Contact phone</span><input value={customerDetails.contactPhone} onChange={(e) => setCustomerDetails({ ...customerDetails, contactPhone: e.target.value })} placeholder="Contact phone" /></label>
            <label><span>Pickup date</span><input value={draft.pickupDate} readOnly /></label>
          </div>
        </section>
        <section className="pay-section">
          <h2>Select payment method</h2>
          <p>Real gateway logos are stored in project assets. This screen records a booking and payment form, not a live processor charge.</p>
          <div className="pay-gateway-grid">
            {paymentGatewayAssets.map((gateway) => (
              <button key={gateway.id} className={`gateway-card ${selectedGateway === gateway.id ? "active" : ""}`} type="button" onClick={() => setSelectedGateway(gateway.id)}>
                <img src={gateway.image} alt={gateway.label} />
                <div className="gateway-card-foot">
                  <span className={`gateway-radio ${selectedGateway === gateway.id ? "active" : ""}`} />
                  <strong>{gateway.label}</strong>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className="pay-section">
          <div style={{ fontSize: "0.82rem", color: "#888", marginBottom: 12 }}>Selected gateway: <strong style={{ color: "#08090d" }}>{gatewayLabel}</strong></div>
          {["mastercard", "visa", "american-express"].includes(selectedGateway) && (
            <div className="pay-form-grid">
              <label><span>Cardholder name</span><input value={gatewayDetails[selectedGateway].holder} onChange={(e) => setGatewayDetails({ ...gatewayDetails, [selectedGateway]: { ...gatewayDetails[selectedGateway], holder: e.target.value } })} placeholder="Full name on card" /></label>
              <label className="full-width"><span>Card number</span><input value={gatewayDetails[selectedGateway].number} onChange={(e) => setGatewayDetails({ ...gatewayDetails, [selectedGateway]: { ...gatewayDetails[selectedGateway], number: e.target.value } })} placeholder="0000 0000 0000 0000" /></label>
              <label><span>Expiry date</span><input value={gatewayDetails[selectedGateway].expiry} onChange={(e) => setGatewayDetails({ ...gatewayDetails, [selectedGateway]: { ...gatewayDetails[selectedGateway], expiry: e.target.value } })} placeholder="MM/YY" /></label>
              <label><span>CVV</span><input value={gatewayDetails[selectedGateway].cvv} onChange={(e) => setGatewayDetails({ ...gatewayDetails, [selectedGateway]: { ...gatewayDetails[selectedGateway], cvv: e.target.value } })} placeholder="CVV" /></label>
            </div>
          )}
          {selectedGateway === "paypal" && (
            <div className="pay-form-grid">
              <label><span>PayPal name</span><input value={gatewayDetails.paypal.holder} onChange={(e) => setGatewayDetails({ ...gatewayDetails, paypal: { ...gatewayDetails.paypal, holder: e.target.value } })} placeholder="PayPal account name" /></label>
              <label><span>PayPal email</span><input type="email" value={gatewayDetails.paypal.email} onChange={(e) => setGatewayDetails({ ...gatewayDetails, paypal: { ...gatewayDetails.paypal, email: e.target.value } })} placeholder="PayPal email" /></label>
            </div>
          )}
          {selectedGateway === "yas-mixx" && (
            <div className="pay-form-grid">
              <label><span>Mixx account name</span><input value={gatewayDetails["yas-mixx"].holder} onChange={(e) => setGatewayDetails({ ...gatewayDetails, "yas-mixx": { ...gatewayDetails["yas-mixx"], holder: e.target.value } })} placeholder="Account holder" /></label>
              <label><span>Mixx phone</span><input value={gatewayDetails["yas-mixx"].phone} onChange={(e) => setGatewayDetails({ ...gatewayDetails, "yas-mixx": { ...gatewayDetails["yas-mixx"], phone: e.target.value } })} placeholder="Mobile number" /></label>
              <label className="full-width"><span>Transaction reference</span><input value={gatewayDetails["yas-mixx"].reference} onChange={(e) => setGatewayDetails({ ...gatewayDetails, "yas-mixx": { ...gatewayDetails["yas-mixx"], reference: e.target.value } })} placeholder="Mixx transaction reference" /></label>
            </div>
          )}
          <div className="pay-total">
            <div><span>Subtotal</span><strong>{moneyAmount(totalAmount || vehicle.dailyRate)}</strong></div>
            <div><span>Service fee</span><strong>{moneyAmount(0)}</strong></div>
            <div><span>Total amount</span><strong>{moneyAmount(totalAmount || vehicle.dailyRate)}</strong></div>
          </div>
        </section>
        <button className="solid-button" type="submit" disabled={submitting} style={{ width: "100%" }}>
          {submitting ? "Confirming..." : "Confirm payment"}
        </button>
      </form>
    </section>
  );
}
