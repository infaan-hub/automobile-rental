import React, { useState } from "react";
import AuthShell from "../components/AuthShell";
import { Field } from "../components/FormControls";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { ADMIN_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    try {
      const data = await apiRequest("/admin/login/", { method: "POST", body: JSON.stringify(form) });
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthShell
      badge="Admin login"
      title="Login to the admin dashboard"
      text="Admins can add car dealers, see customers and all users, review bookings, and delete users."
      altLabel="Need the first admin?"
      altPath="/admin/register"
    >
      <form onSubmit={submit}>
        <Notice error={error} />
        <Field label="Username" value={form.username} onChange={(value) => setForm({ ...form, username: value })} />
        <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} />
        <button className="solid-button" type="submit">Login admin</button>
      </form>
    </AuthShell>
  );
}
