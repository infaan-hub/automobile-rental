import React, { useState } from "react";
import AuthShell from "../components/AuthShell";
import { Field } from "../components/FormControls";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { DEALER_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function DealerLoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    try {
      const data = await apiRequest("/car-dealer/login/", { method: "POST", body: JSON.stringify(form) });
      localStorage.setItem(DEALER_TOKEN_KEY, data.token);
      navigate("/car-dealer/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthShell
      badge="Car dealer login"
      title="Login to the dealer dashboard"
      text="Dealer access follows the schedule time set by admin. Dealers can add vehicles, categories, trend vehicles, bookings, and rented cars."
      altLabel="Back to home"
      altPath="/home"
    >
      <form onSubmit={submit}>
        <Notice error={error} />
        <Field label="Username" value={form.username} onChange={(value) => setForm({ ...form, username: value })} />
        <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} />
        <button className="solid-button" type="submit">Login dealer</button>
      </form>
    </AuthShell>
  );
}
