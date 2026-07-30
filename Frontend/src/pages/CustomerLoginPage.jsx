import React, { useCallback, useState } from "react";
import AuthShell from "../components/AuthShell";
import { Field } from "../components/FormControls";
import GoogleAuthButton from "../components/GoogleAuthButton";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { CUSTOMER_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function CustomerLoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    try {
      const data = await apiRequest("/login/", { method: "POST", body: JSON.stringify(form) });
      localStorage.setItem(CUSTOMER_TOKEN_KEY, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  const signInWithGoogle = useCallback(async (credential) => {
    try {
      const data = await apiRequest("/google-login/", {
        method: "POST",
        body: JSON.stringify({ credential }),
      });
      localStorage.setItem(CUSTOMER_TOKEN_KEY, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return (
    <AuthShell
      badge="Customer login"
      title="Login to start renting"
      text="Browse full specs, save rentals, complete agreements, and manage your active bookings."
      altLabel="Need a customer account?"
      altPath="/register"
    >
      <form onSubmit={submit}>
        <Notice error={error} />
        <Field label="Username or email" value={form.username} onChange={(value) => setForm({ ...form, username: value })} />
        <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} />
        <div className="auth-action-row">
          <button className="auth-pill-button auth-pill-primary" type="submit">Login</button>
          <button className="auth-pill-button auth-pill-secondary" type="button" onClick={() => navigate("/register")}>Register</button>
        </div>
      </form>
      <div className="customer-google-row">
        <GoogleAuthButton onCredential={signInWithGoogle} onError={setError} />
      </div>
    </AuthShell>
  );
}
