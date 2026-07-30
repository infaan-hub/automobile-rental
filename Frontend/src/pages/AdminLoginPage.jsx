import React, { useState } from "react";
import AuthShell from "../components/AuthShell";
import InputField from "../components/auth/InputField";
import PrimaryButton from "../components/auth/PrimaryButton";
import { apiRequest } from "../lib/api";
import { ADMIN_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest("/admin/login/", { method: "POST", body: JSON.stringify(form) });
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
      title="Admin Portal"
      text="Secure access to the platform administration dashboard."
      altLabel="Need the first admin?"
      altPath="/admin/register"
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
