import React, { useCallback, useState } from "react";
import AuthShell from "../components/AuthShell";
import { Field } from "../components/FormControls";
import GoogleAuthButton from "../components/GoogleAuthButton";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { CUSTOMER_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function CustomerRegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    try {
      const data = await apiRequest("/register/", { method: "POST", body: JSON.stringify(form) });
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
      badge="Customer register"
      title="Create your customer account"
      text="Register to unlock vehicle rentals, agreements, bookings, and a private customer dashboard."
      altLabel="Already have an account?"
      altPath="/login"
    >
      <form onSubmit={submit}>
        <Notice error={error} />
        <div className="double-grid">
          <Field label="First name" value={form.firstName} onChange={(value) => setForm({ ...form, firstName: value })} />
          <Field label="Last name" value={form.lastName} onChange={(value) => setForm({ ...form, lastName: value })} />
        </div>
        <Field label="Username" value={form.username} onChange={(value) => setForm({ ...form, username: value })} />
        <Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
        <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} />
        <div className="auth-action-row">
          <button className="auth-pill-button auth-pill-primary" type="submit">Register</button>
          <button className="auth-pill-button auth-pill-secondary" type="button" onClick={() => navigate("/login")}>Login</button>
        </div>
      </form>
      <div className="customer-google-row">
        <GoogleAuthButton onCredential={signInWithGoogle} onError={setError} />
      </div>
    </AuthShell>
  );
}
