import React, { useEffect, useState } from "react";
import { Field } from "../components/FormControls";
import Notice from "../components/Notice";
import { Metric, PanelHeader } from "../components/PanelBits";
import { apiRequest } from "../lib/api";
import { ADMIN_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";
import BackgroundShapes from "../components/ui/BackgroundShapes";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import Badge from "../components/ui/Badge";
import { Users, Car, BookOpen, Trash2 } from "lucide-react";

function defaultWindow() {
  const start = new Date();
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() + 1);
  const end = new Date(start);
  end.setHours(end.getHours() + 10);
  const format = (value) => {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    const h = String(value.getHours()).padStart(2, "0");
    const min = String(value.getMinutes()).padStart(2, "0");
    return `${y}-${m}-${d}T${h}:${min}`;
  };
  return { loginStartAt: format(start), loginEndAt: format(end) };
}

export default function AdminDashboardPage() {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY) || "";
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ ...defaultWindow(), username: "", email: "", password: "", firstName: "", lastName: "" });

  useEffect(() => {
    if (!token) return navigate("/admin/login");
    apiRequest("/admin/dashboard/", {}, token).then(setData).catch((err) => setError(err.message));
  }, []);

  function update(field) { return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value })); }

  async function saveDealer(event) {
    event.preventDefault();
    try {
      await apiRequest("/admin/users/", { method: "POST", body: JSON.stringify(form) }, token);
      setForm({ ...defaultWindow(), username: "", email: "", password: "", firstName: "", lastName: "" });
      setMessage("Dealer created.");
      setData(await apiRequest("/admin/dashboard/", {}, token));
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteUser(id) {
    try {
      await apiRequest(`/admin/users/${id}/`, { method: "DELETE" }, token);
      setMessage("User deleted.");
      setData(await apiRequest("/admin/dashboard/", {}, token));
    } catch (err) {
      setError(err.message);
    }
  }

  if (!data) return <div className="min-h-screen bg-bg flex items-center justify-center"><Loader text="Loading admin dashboard..." /></div>;

  const stats = data.stats || {};

  return (
    <main className="min-h-screen bg-bg relative">
      <BackgroundShapes />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <PanelHeader badge="Admin dashboard" title={`Welcome ${data.user.firstName || data.user.username}`} text="Add car dealers with schedule windows, inspect all users and customers, and review bookings." />

        <Notice error={error} message={message} />

        <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Metric label="Total Users" value={stats.totalUsers || 0} />
          <Metric label="Dealers" value={stats.dealers || 0} />
          <Metric label="Customers" value={stats.customers || 0} />
          <Metric label="Vehicles" value={stats.vehicles || 0} />
          <Metric label="Bookings" value={stats.bookings || 0} />
          <Metric label="Rented Cars" value={stats.rentedCars || 0} />
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-6 mb-8">
          <GlassCard className="p-6">
            <h2 className="text-base font-bold mb-4">Create Dealer</h2>
            <form onSubmit={saveDealer} className="grid gap-4">
              <Field label="Username" value={form.username} onChange={update("username")} />
              <Field label="Email" value={form.email} onChange={update("email")} />
              <Field label="Password" type="password" value={form.password} onChange={update("password")} />
              <Field label="First Name" value={form.firstName} onChange={update("firstName")} />
              <Field label="Last Name" value={form.lastName} onChange={update("lastName")} />
              <Field label="Login Start" type="datetime-local" value={form.loginStartAt} onChange={update("loginStartAt")} />
              <Field label="Login End" type="datetime-local" value={form.loginEndAt} onChange={update("loginEndAt")} />
              <Button type="submit" className="w-full">Create Dealer</Button>
            </form>
          </GlassCard>

          <div>
            <h2 className="text-base font-bold mb-4">Users</h2>
            {data.users?.length ? (
              <div className="grid gap-3">
                {data.users.map((user) => (
                  <GlassCard key={user.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Users size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted">{user.email} · {user.userType}</p>
                      </div>
                    </div>
                    <Button variant="danger" onClick={() => deleteUser(user.id)} className="!h-9 !px-3 !text-xs">
                      <Trash2 size={14} />
                    </Button>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <EmptyState message="No users found." />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
