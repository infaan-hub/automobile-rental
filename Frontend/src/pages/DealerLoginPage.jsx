import React, { useState } from "react";
import AuthShell from "../components/AuthShell";
import InputField from "../components/auth/InputField";
import PrimaryButton from "../components/auth/PrimaryButton";
import { apiRequest } from "../lib/api";
import { DEALER_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function DealerLoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest("/car-dealer/login/", { method: "POST", body: JSON.stringify(form) });
      localStorage.setItem(DEALER_TOKEN_KEY, data.token);
      navigate("/car-dealer/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      badge="Dealer"
      title="Dealer Portal"
      text="Manage your inventory, bookings, and vehicle listings."
      altLabel="Back to home"
      altPath="/home"
    >
      <form onSubmit={submit}>
        {error && <div className="lux-notice">{error}</div>}
        <InputField label="Username" icon="username" value={form.username} onChange={(v) => setForm({ ...form, username: v })} />
        <InputField label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
        <div style={{ marginTop: 4 }}>
          <PrimaryButton type="submit" loading={loading}>
            Login
          </PrimaryButton>
        </div>
      </form>
    </AuthShell>
  );
}
