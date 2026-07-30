import React, { useCallback, useState } from "react";
import AuthShell from "../components/AuthShell";
import InputField from "../components/auth/InputField";
import PrimaryButton from "../components/auth/PrimaryButton";
import GoogleButton from "../components/auth/GoogleButton";
import Divider from "../components/auth/Divider";
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
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!accepted) {
      setError("Please accept the terms and conditions.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest("/register/", { method: "POST", body: JSON.stringify(form) });
      localStorage.setItem(CUSTOMER_TOKEN_KEY, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
      badge="Customer"
      title="Create Account"
      text="Start your luxury driving experience today."
      altLabel="Already have an account?"
      altPath="/login"
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
        <div className="lux-terms">
          <input type="checkbox" id="terms" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
          <label htmlFor="terms">I agree to the Terms & Conditions and Privacy Policy</label>
        </div>
        <PrimaryButton type="submit" loading={loading}>
          Register
        </PrimaryButton>
      </form>
      <Divider />
      <GoogleButton onCredential={signInWithGoogle} onError={setError} />
    </AuthShell>
  );
}
