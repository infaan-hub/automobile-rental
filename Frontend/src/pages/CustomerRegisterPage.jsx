import React, { useCallback, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { CUSTOMER_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

export default function CustomerRegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = useCallback(async (event) => {
    event.preventDefault();
    try {
      const data = await apiRequest("/register/", {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, username, email, password }),
      });
      localStorage.setItem(CUSTOMER_TOKEN_KEY, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }, [firstName, lastName, username, email, password]);

  return (
    <AuthLayout badge="Customer" title="Create Account" text="Join CRUVO today" altLabel="Already have an account? Login" altPath="/login">
      <Notice error={error} />
      <form onSubmit={handleRegister} className="grid gap-4">
        <Input id="firstName" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
        <Input id="lastName" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
        <Input id="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="johndoe" />
        <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
        <Input id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        <Button type="submit" className="w-full">Create Account</Button>
      </form>
    </AuthLayout>
  );
}
