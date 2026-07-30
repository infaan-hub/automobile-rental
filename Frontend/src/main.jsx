import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import AppShell from "./components/AppShell";
import "./styles.css";
import { getPath, navigate } from "./lib/navigation";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import CustomerLoginPage from "./pages/CustomerLoginPage";
import CustomerRegisterPage from "./pages/CustomerRegisterPage";
import DealerDashboardPage from "./pages/DealerDashboardPage";
import DealerLoginPage from "./pages/DealerLoginPage";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";
import RentalAgreementPage from "./pages/RentalAgreementPage";
import RentPage from "./pages/RentPage";
import VehicleViewPage from "./pages/VehicleViewPage";

function App() {
  const [path, setPath] = useState(getPath());

  useEffect(() => {
    const handleRoute = () => setPath(getPath());
    window.addEventListener("popstate", handleRoute);
    if (getPath() === "/") navigate("/home");
    return () => window.removeEventListener("popstate", handleRoute);
  }, []);

  let page = <HomePage />;
  if (path === "/register") page = <CustomerRegisterPage />;
  if (path === "/login") page = <CustomerLoginPage />;
  if (path === "/dashboard") page = <CustomerDashboardPage />;
  if (path === "/view") page = <VehicleViewPage />;
  if (path === "/rent") page = <RentPage />;
  if (path === "/rental-agreement") page = <RentalAgreementPage />;
  if (path === "/payment") page = <PaymentPage />;
  if (path === "/admin/register") page = <AdminRegisterPage />;
  if (path === "/admin/login") page = <AdminLoginPage />;
  if (path === "/admin/dashboard") page = <AdminDashboardPage />;
  if (path === "/car-dealer/login") page = <DealerLoginPage />;
  if (path === "/car-dealer/dashboard") page = <DealerDashboardPage />;

  return <AppShell path={path}>{page}</AppShell>;
}

createRoot(document.getElementById("root")).render(<App />);
