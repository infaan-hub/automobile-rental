import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { getPath, navigate } from "./lib/navigation";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import DealerDashboardPage from "./pages/DealerDashboardPage";
import DealerLoginPage from "./pages/DealerLoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const [path, setPath] = useState(getPath());

  useEffect(() => {
    const handleRoute = () => setPath(getPath());
    window.addEventListener("popstate", handleRoute);
    if (getPath() === "/") navigate("/home");
    return () => window.removeEventListener("popstate", handleRoute);
  }, []);

  if (path === "/admin/register") return <AdminRegisterPage />;
  if (path === "/admin/login") return <AdminLoginPage />;
  if (path === "/admin/dashboard") return <AdminDashboardPage />;
  if (path === "/car-dealer/login") return <DealerLoginPage />;
  if (path === "/car-dealer/dashboard") return <DealerDashboardPage />;
  return <HomePage />;
}

createRoot(document.getElementById("root")).render(<App />);
