import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { DEALER_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function DealerLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const data = await apiRequest("/car-dealer/login/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      localStorage.setItem(DEALER_TOKEN_KEY, data.token);
      navigate("/car-dealer/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthLayout badge="Dealer" title="Dealer Login" text="Scheduled access portal" altLabel="Back to home" altPath="/home">
      <Notice error={error} />
      <form onSubmit={handleLogin} className="grid gap-4">
        <Input id="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Dealer username" />
        <Input id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </AuthLayout>
  );
}
