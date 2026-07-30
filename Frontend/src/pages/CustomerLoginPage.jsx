import React, { useCallback, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { CUSTOMER_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function CustomerLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = useCallback(async (event) => {
    event.preventDefault();
    try {
      const data = await apiRequest("/login/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      localStorage.setItem(CUSTOMER_TOKEN_KEY, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }, [username, password]);

  const handleGoogleCredential = useCallback(async (credential) => {
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
    <AuthLayout badge="Customer" title="Welcome Back" text="Sign in to your account" altLabel="Don't have an account? Create one" altPath="/register">
      <Notice error={error} />
      <form onSubmit={handleLogin} className="grid gap-4">
        <Input id="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
        <Input id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </AuthLayout>
  );
}
