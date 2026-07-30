import React, { useState } from "react";
import AuthShell from "../components/AuthShell";
import InputField from "../components/auth/InputField";
import PrimaryButton from "../components/auth/PrimaryButton";
import { apiRequest } from "../lib/api";
import { ADMIN_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function AdminRegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "", firstName: "", lastName: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest("/admin/register/", { method: "POST", body: JSON.stringify(form) });
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      badge="Admin"
      title="Create Admin"
      text="Set up the platform superuser to manage your fleet."
      altLabel="Already have admin access?"
      altPath="/admin/login"
    >
      <form onSubmit={submit}>
        {error && <div className="lux-notice">{error}</div>}
        <div className="lux-double-grid">
          <InputField label="First Name" icon="name" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
          <InputField label="Last Name" icon="name" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
        </div>
        <InputField label="Username" icon="username" value={form.username} onChange={(v) => setForm({ ...form, username: v })} />
        <InputField label="Email" type="email" icon="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <InputField label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
        <div style={{ marginTop: 4 }}>
          <PrimaryButton type="submit" loading={loading}>
            Register
          </PrimaryButton>
        </div>
      </form>
    </AuthShell>
  );
}
