import React, { useEffect, useMemo, useState } from "react";
import { ADMIN_TOKEN_KEY, CUSTOMER_TOKEN_KEY, DEALER_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

const NAV_SETS = {
  home: [
    { label: "Home", path: "/home" },
    { label: "Trend vehicles", path: "/home#trend" },
    { label: "Contact", path: "/home#footer" },
    { label: "Customer register", path: "/register" },
    { label: "Customer login", path: "/login" },
    { label: "Admin register", path: "/admin/register" },
    { label: "Admin login", path: "/admin/login" },
    { label: "Dealer login", path: "/car-dealer/login" },
  ],
  customerAuth: [
    { label: "Home", path: "/home" },
    { label: "Customer register", path: "/register" },
    { label: "Customer login", path: "/login" },
    { label: "Admin login", path: "/admin/login" },
    { label: "Dealer login", path: "/car-dealer/login" },
  ],
  customerArea: [
    { label: "Home", path: "/home" },
    { label: "Customer dashboard", path: "/dashboard" },
    { label: "Customer login", path: "/login" },
  ],
  adminAuth: [
    { label: "Home", path: "/home" },
    { label: "Admin register", path: "/admin/register" },
    { label: "Admin login", path: "/admin/login" },
    { label: "Dealer login", path: "/car-dealer/login" },
  ],
  adminDashboard: [
    { label: "Home", path: "/home" },
    { label: "Admin dashboard", path: "/admin/dashboard" },
    { label: "Admin register", path: "/admin/register" },
    { label: "Admin login", path: "/admin/login" },
    { label: "Dealer login", path: "/car-dealer/login" },
  ],
  dealerArea: [
    { label: "Home", path: "/home" },
    { label: "Dealer login", path: "/car-dealer/login" },
    { label: "Dealer dashboard", path: "/car-dealer/dashboard" },
    { label: "Admin login", path: "/admin/login" },
    { label: "Admin register", path: "/admin/register" },
  ],
};

function getShellConfig(path) {
  if (path === "/admin/dashboard") return { eyebrow: "Admin", title: "Platform management", navItems: NAV_SETS.adminDashboard };
  if (path === "/dashboard" || path === "/view" || path === "/rent" || path === "/rental-agreement" || path === "/payment")
    return { eyebrow: "Customer", title: "Vehicle rentals", navItems: NAV_SETS.customerArea };
  if (path === "/car-dealer/dashboard") return { eyebrow: "Dealer", title: "Inventory & bookings", navItems: NAV_SETS.dealerArea };
  if (path === "/admin/login" || path === "/admin/register") return { eyebrow: "Admin", title: "Secure entry", navItems: NAV_SETS.adminAuth };
  if (path === "/login" || path === "/register") return { eyebrow: "Customer", title: "Rentals & bookings", navItems: NAV_SETS.customerAuth };
  if (path === "/car-dealer/login") return { eyebrow: "Dealer", title: "Scheduled login", navItems: NAV_SETS.dealerArea };
  return { eyebrow: "Automobile", title: "Rental navigation", navItems: NAV_SETS.home };
}

export default function AppShell({ path, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => window.localStorage.getItem("automobile-rental-theme") || "light");
  const config = useMemo(() => getShellConfig(path), [path]);
  const currentLocation = `${window.location.pathname}${window.location.hash}`;
  const isDark = theme === "dark";
  const hasCustomerToken = Boolean(window.localStorage.getItem(CUSTOMER_TOKEN_KEY));

  useEffect(() => { setSidebarOpen(false); }, [path]);

  useEffect(() => { window.localStorage.setItem("automobile-rental-theme", theme); }, [theme]);

  function goTo(target) { navigate(target); setSidebarOpen(false); }

  function toggleTheme() { setTheme(isDark ? "light" : "dark"); }

  function logout() {
    if (path === "/admin/dashboard") { window.localStorage.removeItem(ADMIN_TOKEN_KEY); goTo("/admin/login"); return; }
    if (path === "/car-dealer/dashboard") { window.localStorage.removeItem(DEALER_TOKEN_KEY); goTo("/car-dealer/login"); return; }
    if (path === "/dashboard" || path === "/view" || path === "/rent" || path === "/rental-agreement" || path === "/payment") {
      window.localStorage.removeItem(CUSTOMER_TOKEN_KEY); goTo("/login");
    }
  }

  const showLogout =
    path === "/admin/dashboard" || path === "/car-dealer/dashboard" ||
    (hasCustomerToken && ["/dashboard", "/view", "/rent", "/rental-agreement", "/payment"].includes(path));

  const hideShell = ["/login", "/register", "/admin/login", "/admin/register", "/car-dealer/login"].includes(path);

  if (hideShell) return <div className={`app-shell theme-${theme}`}>{children}</div>;

  return (
    <div className={`app-shell theme-${theme} ${sidebarOpen ? "sidebar-open" : ""}`}>
      <header className="app-header">
        <div className="app-header-left">
          <button className="menu-toggle" type="button" aria-label={sidebarOpen ? "Close" : "Open"} aria-expanded={sidebarOpen} onClick={() => setSidebarOpen((c) => !c)}>
            <span /><span /><span />
          </button>
          <button className="logo app-logo" type="button" onClick={() => goTo("/home")}><span>r</span>rw</button>
        </div>
        <div className="app-header-copy">
          <small>{config.eyebrow}</small>
          <strong>{config.title}</strong>
        </div>
        <div className="app-header-right">
          {showLogout && <button className="app-nav-action" type="button" onClick={logout}>Logout</button>}
        </div>
      </header>

      <button className="app-sidebar-backdrop" type="button" aria-label="Close" onClick={() => setSidebarOpen(false)} />

      <aside className="app-sidebar">
        <div className="app-sidebar-head">
          <small>{config.eyebrow}</small>
          <strong>{config.title}</strong>
        </div>
        <button className="sidebar-theme-toggle" type="button" aria-label={isDark ? "Light mode" : "Dark mode"} onClick={toggleTheme}>
          <span className={!isDark ? "active" : ""}>{"\u2600"} Light</span>
          <span className={isDark ? "active" : ""}>{"\u263E"} Dark</span>
        </button>
        <nav className="app-sidebar-nav" aria-label="Main navigation">
          {config.navItems.map((item) => {
            const itemPath = item.path.split("#")[0];
            const isActive = item.path.includes("#") ? item.path === currentLocation : itemPath === path;
            return (
              <button key={item.path} className={`app-nav-link ${isActive ? "active" : ""}`} type="button" onClick={() => goTo(item.path)}>
                {item.label}
              </button>
            );
          })}
        </nav>
        {showLogout && <button className="app-nav-link app-nav-action" type="button" onClick={logout}>Logout</button>}
      </aside>

      <main className="app-content">{children}</main>
    </div>
  );
}
