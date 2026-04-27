import React, { useEffect, useMemo, useState } from "react";
import { navigate } from "../lib/navigation";

const NAV_SETS = {
  home: [
    { label: "Home", path: "/home" },
    { label: "Trend vehicles", path: "/home#trend" },
    { label: "Contact", path: "/home#footer" },
    { label: "Admin register", path: "/admin/register" },
    { label: "Admin login", path: "/admin/login" },
    { label: "Dealer login", path: "/car-dealer/login" },
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
  if (path === "/admin/dashboard") {
    return {
      eyebrow: "Admin controls",
      title: "Platform management",
      navItems: NAV_SETS.adminDashboard,
    };
  }

  if (path === "/car-dealer/dashboard") {
    return {
      eyebrow: "Dealer workspace",
      title: "Inventory and booking tools",
      navItems: NAV_SETS.dealerArea,
    };
  }

  if (path === "/admin/login" || path === "/admin/register") {
    return {
      eyebrow: "Admin access",
      title: "Secure entry",
      navItems: NAV_SETS.adminAuth,
    };
  }

  if (path === "/car-dealer/login") {
    return {
      eyebrow: "Dealer access",
      title: "Scheduled login",
      navItems: NAV_SETS.dealerArea,
    };
  }

  return {
    eyebrow: "Automobile rental",
    title: "Rental navigation",
    navItems: NAV_SETS.home,
  };
}

export default function AppShell({ path, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => window.localStorage.getItem("automobile-rental-theme") || "light");
  const config = useMemo(() => getShellConfig(path), [path]);
  const currentLocation = `${window.location.pathname}${window.location.hash}`;

  useEffect(() => {
    setSidebarOpen(false);
  }, [path]);

  useEffect(() => {
    window.localStorage.setItem("automobile-rental-theme", theme);
  }, [theme]);

  function goTo(target) {
    navigate(target);
    setSidebarOpen(false);
  }

  const isDark = theme === "dark";

  return (
    <div className={`app-shell theme-${theme} ${sidebarOpen ? "sidebar-open" : ""}`}>
      <header className="app-header">
        <div className="app-header-left">
          <button
            className="menu-toggle"
            type="button"
            aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
          <button className="logo app-logo" type="button" onClick={() => goTo("/home")}>
            <span>r</span>rw
          </button>
        </div>
        <div className="app-header-right">
          <button
            className="theme-toggle"
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <span className={`theme-icon ${!isDark ? "active" : ""}`}>☀</span>
            <span className={`theme-icon ${isDark ? "active" : ""}`}>☾</span>
          </button>
          <div className="app-header-copy">
            <small>{config.eyebrow}</small>
            <strong>{config.title}</strong>
          </div>
        </div>
      </header>

      <button
        className="app-sidebar-backdrop"
        type="button"
        aria-label="Close navigation"
        onClick={() => setSidebarOpen(false)}
      />

      <aside className="app-sidebar">
        <div className="app-sidebar-head">
          <small>{config.eyebrow}</small>
          <strong>{config.title}</strong>
        </div>
        <button
          className="theme-toggle sidebar-theme-toggle"
          type="button"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          <span className={`theme-icon ${!isDark ? "active" : ""}`}>☀</span>
          <span className={`theme-icon ${isDark ? "active" : ""}`}>☾</span>
        </button>
        <nav className="app-sidebar-nav" aria-label="Main navigation">
          {config.navItems.map((item) => {
            const itemPath = item.path.split("#")[0];
            const isActive = item.path.includes("#") ? item.path === currentLocation : itemPath === path;
            return (
              <button
                key={item.path}
                className={`app-nav-link ${isActive ? "active" : ""}`}
                type="button"
                onClick={() => goTo(item.path)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="app-content">{children}</main>
    </div>
  );
}
