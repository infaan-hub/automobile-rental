import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { ADMIN_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function AdminRegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(event) {
    event.preventDefault();
    try {
      const data = await apiRequest("/admin/register/", {
        method: "POST",
        body: JSON.stringify({ username, email, password, firstName, lastName }),
      });
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthLayout badge="Admin" title="Admin Registration" text="Create admin account" altLabel="Already have an account? Login" altPath="/admin/login">
      <Notice error={error} />
      <form onSubmit={handleRegister} className="grid gap-4">
        <Input id="firstName" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
        <Input id="lastName" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
        <Input id="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" />
        <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" />
        <Input id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        <Button type="submit" className="w-full">Create Account</Button>
      </form>
    </AuthLayout>
  );
}
