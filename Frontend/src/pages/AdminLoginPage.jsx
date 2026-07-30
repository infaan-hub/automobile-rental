import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { ADMIN_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const data = await apiRequest("/admin/login/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthLayout badge="Admin" title="Admin Login" text="Secure platform access" altLabel="Register as admin" altPath="/admin/register">
      <Notice error={error} />
      <form onSubmit={handleLogin} className="grid gap-4">
        <Input id="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Admin username" />
        <Input id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </AuthLayout>
  );
}
