import React, { useState } from "react";
import AuthShell from "../components/AuthShell";
import { Field } from "../components/FormControls";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { ADMIN_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function AdminRegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "", firstName: "", lastName: "" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    try {
      const data = await apiRequest("/admin/register/", { method: "POST", body: JSON.stringify(form) });
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthShell
      badge="Admin register"
      title="Create the admin superuser"
      text="Use this once to create the platform admin. After that, admin manages dealers, users, bookings, and rented cars."
      altLabel="Already have admin access?"
      altPath="/admin/login"
    >
      <form onSubmit={submit}>
        <Notice error={error} />
        <Field label="Username" value={form.username} onChange={(value) => setForm({ ...form, username: value })} />
        <Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
        <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} />
        <div className="double-grid">
          <Field label="First name" value={form.firstName} onChange={(value) => setForm({ ...form, firstName: value })} />
          <Field label="Last name" value={form.lastName} onChange={(value) => setForm({ ...form, lastName: value })} />
        </div>
        <button className="solid-button" type="submit">Register admin</button>
      </form>
    </AuthShell>
  );
}
