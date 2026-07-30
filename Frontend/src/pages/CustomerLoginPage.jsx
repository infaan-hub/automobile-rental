import React, { useCallback, useState } from "react";
import AuthShell from "../components/AuthShell";
import InputField from "../components/auth/InputField";
import PrimaryButton from "../components/auth/PrimaryButton";
import GoogleButton from "../components/auth/GoogleButton";
import Divider from "../components/auth/Divider";
import { apiRequest } from "../lib/api";
import { CUSTOMER_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function CustomerLoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest("/login/", { method: "POST", body: JSON.stringify(form) });
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
      title="Welcome Back"
      text="Sign in to continue your premium journey."
      altLabel="Don't have an account?"
      altPath="/register"
    >
      <form onSubmit={submit}>
        {error && <div className="lux-notice">{error}</div>}
        <InputField label="Username or Email" icon="email" value={form.username} onChange={(v) => setForm({ ...form, username: v })} />
        <InputField label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
        <div className="lux-row">
          <label className="lux-checkbox">
            <input type="checkbox" defaultChecked />
            Remember me
          </label>
          <button className="lux-forgot-link" type="button">Forgot Password?</button>
        </div>
        <PrimaryButton type="submit" loading={loading}>
          Login
        </PrimaryButton>
      </form>
      <Divider />
      <GoogleButton onCredential={signInWithGoogle} onError={setError} />
    </AuthShell>
  );
}
