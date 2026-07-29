import React, { useEffect, useState } from "react";
import { Field } from "../components/FormControls";
import Notice from "../components/Notice";
import VideoBackground from "../components/VideoBackground";
import { Metric, PanelHeader } from "../components/PanelBits";
import { apiRequest } from "../lib/api";
import { ADMIN_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

function defaultWindow() {
  const start = new Date();
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() + 1);
  const end = new Date(start);
  end.setHours(end.getHours() + 10);

  const format = (value) => {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    const hours = String(value.getHours()).padStart(2, "0");
    const minutes = String(value.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return {
    loginStartAt: format(start),
    loginEndAt: format(end),
  };
}

export default function AdminDashboardPage() {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY) || "";
  const initialWindow = defaultWindow();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    loginStartAt: initialWindow.loginStartAt,
    loginEndAt: initialWindow.loginEndAt,
  });

  async function load() {
    if (!token) return navigate("/admin/login");
    try {
      setData(await apiRequest("/admin/dashboard/", {}, token));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createDealer(event) {
    event.preventDefault();
    try {
      await apiRequest("/admin/users/", { method: "POST", body: JSON.stringify(form) }, token);
      setMessage("Car dealer created.");
      setForm({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        ...defaultWindow(),
      });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteUser(userId) {
    try {
      await apiRequest(`/admin/users/${userId}/`, { method: "DELETE" }, token);
      setMessage("User deleted.");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (!data) {
    return <section className="panel-page"><div className="panel-card"><Notice error={error} /><p>Loading admin dashboard...</p></div></section>;
  }

  return (
    <section className="panel-page">
      <VideoBackground name="dashboard" fill />
      <PanelHeader
        badge="Admin dashboard"
        title={`Welcome ${data.user.firstName || data.user.username}`}
        text="Add car dealers with schedule windows, inspect all users and customers, and review bookings."
      />
      <Notice error={error} message={message} />
      <div className="panel-stats">
        <Metric label="Users" value={data.stats.totalUsers} />
        <Metric label="Dealers" value={data.stats.dealers} />
        <Metric label="Customers" value={data.stats.customers} />
        <Metric label="Vehicles" value={data.stats.vehicles} />
        <Metric label="Bookings" value={data.stats.bookings} />
        <Metric label="Rented" value={data.stats.rentedCars} />
      </div>
      <div className="panel-grid">
        <form className="panel-card form-card" onSubmit={createDealer}>
          <div className="card-head"><h2>Add car dealer</h2><span>Set the dealer login schedule</span></div>
          <Field label="Username" value={form.username} onChange={(value) => setForm({ ...form, username: value })} />
          <Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
          <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} />
          <div className="stack-grid compact-stack">
            <Field label="First name" value={form.firstName} onChange={(value) => setForm({ ...form, firstName: value })} />
            <Field label="Last name" value={form.lastName} onChange={(value) => setForm({ ...form, lastName: value })} />
          </div>
          <div className="stack-grid compact-stack">
            <Field label="Login start" type="datetime-local" value={form.loginStartAt} onChange={(value) => setForm({ ...form, loginStartAt: value })} />
            <Field label="Login end" type="datetime-local" value={form.loginEndAt} onChange={(value) => setForm({ ...form, loginEndAt: value })} />
          </div>
          <button className="solid-button" type="submit">Create dealer</button>
        </form>
        <section className="panel-card table-card">
          <div className="card-head"><h2>All users</h2><span>Admins, dealers, and customers</span></div>
          <div className="table-stack">
            {data.users.map((user) => (
              <article className="row-card" key={user.id}>
                <div>
                  <strong>{user.username}</strong>
                  <p>{user.email || "No email"}</p>
                  <small>{user.role}{user.loginStartAt ? ` | ${user.loginStartAt} - ${user.loginEndAt}` : user.loginStartTime ? ` | ${user.loginStartTime}-${user.loginEndTime}` : ""}</small>
                </div>
                <button className="ghost-button danger" type="button" onClick={() => deleteUser(user.id)}>Delete</button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
