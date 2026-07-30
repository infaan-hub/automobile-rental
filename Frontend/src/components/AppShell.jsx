import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, LogOut, Home, LayoutDashboard, Car, UserCircle, Settings } from "lucide-react";
import { ADMIN_TOKEN_KEY, CUSTOMER_TOKEN_KEY, DEALER_TOKEN_KEY } from "../lib/config";
import { navigate } from "../lib/navigation";

const NAV_SETS = {
  home: [
    { label: "Home", path: "/home", icon: <Home size={18} /> },
    { label: "Vehicles", path: "/home", icon: <Car size={18} /> },
    { label: "Customer Login", path: "/login", icon: <UserCircle size={18} /> },
    { label: "Customer Register", path: "/register", icon: <UserCircle size={18} /> },
    { label: "Admin Login", path: "/admin/login", icon: <Settings size={18} /> },
    { label: "Dealer Login", path: "/car-dealer/login", icon: <Settings size={18} /> },
  ],
  customerAuth: [
    { label: "Home", path: "/home", icon: <Home size={18} /> },
    { label: "Customer Register", path: "/register", icon: <UserCircle size={18} /> },
    { label: "Customer Login", path: "/login", icon: <UserCircle size={18} /> },
  ],
  customerArea: [
    { label: "Home", path: "/home", icon: <Home size={18} /> },
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
  ],
  adminAuth: [
    { label: "Home", path: "/home", icon: <Home size={18} /> },
    { label: "Admin Register", path: "/admin/register", icon: <UserCircle size={18} /> },
    { label: "Admin Login", path: "/admin/login", icon: <Settings size={18} /> },
  ],
  adminDashboard: [
    { label: "Home", path: "/home", icon: <Home size={18} /> },
    { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
  ],
  dealerArea: [
    { label: "Home", path: "/home", icon: <Home size={18} /> },
    { label: "Dashboard", path: "/car-dealer/dashboard", icon: <LayoutDashboard size={18} /> },
  ],
};

function getShellConfig(path) {
  if (path === "/admin/dashboard") return { eyebrow: "Admin", title: "Platform management", navItems: NAV_SETS.adminDashboard };
  if (["/dashboard","/view","/rent","/rental-agreement","/payment"].includes(path)) return { eyebrow: "Customer", title: "Vehicle rentals", navItems: NAV_SETS.customerArea };
  if (path === "/car-dealer/dashboard") return { eyebrow: "Dealer", title: "Inventory & bookings", navItems: NAV_SETS.dealerArea };
  if (["/admin/login","/admin/register"].includes(path)) return { eyebrow: "Admin", title: "Secure entry", navItems: NAV_SETS.adminAuth };
  if (["/login","/register"].includes(path)) return { eyebrow: "Customer", title: "Rentals & bookings", navItems: NAV_SETS.customerAuth };
  if (path === "/car-dealer/login") return { eyebrow: "Dealer", title: "Scheduled login", navItems: NAV_SETS.dealerArea };
  return { eyebrow: "CRUVO", title: "Premium car rental", navItems: NAV_SETS.home };
}

export default function AppShell({ path, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(() => window.localStorage.getItem("cruvo-theme") === "dark");

  useEffect(() => { setSidebarOpen(false); }, [path]);

  useEffect(() => {
    window.localStorage.setItem("cruvo-theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const config = useMemo(() => getShellConfig(path), [path]);

  function goTo(target) { navigate(target); setSidebarOpen(false); }

  function logout() {
    if (path === "/admin/dashboard") { localStorage.removeItem(ADMIN_TOKEN_KEY); goTo("/admin/login"); return; }
    if (path === "/car-dealer/dashboard") { localStorage.removeItem(DEALER_TOKEN_KEY); goTo("/car-dealer/login"); return; }
    if (["/dashboard","/view","/rent","/rental-agreement","/payment"].includes(path)) { localStorage.removeItem(CUSTOMER_TOKEN_KEY); goTo("/login"); }
  }

  const showLogout = ["/admin/dashboard","/car-dealer/dashboard"].includes(path) ||
    (Boolean(localStorage.getItem(CUSTOMER_TOKEN_KEY)) && ["/dashboard","/view","/rent","/rental-agreement","/payment"].includes(path));

  return (
    <div className="min-h-screen bg-bg">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-full hover:bg-bg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <button onClick={() => goTo("/home")} className="text-lg font-bold tracking-wider">CRUVO</button>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-muted">{config.eyebrow}</p>
            <p className="text-sm font-bold">{config.title}</p>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className="grid place-items-center w-10 h-10 rounded-full hover:bg-bg transition-colors"
            aria-label={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {showLogout && (
            <button onClick={logout} className="flex items-center gap-2 h-9 px-4 rounded-full bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors">
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </header>

      {/* Sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed top-0 left-0 bottom-0 z-40 w-72 bg-white/95 backdrop-blur-xl border-r border-border shadow-2xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold tracking-wider">CRUVO</span>
              <button onClick={() => setSidebarOpen(false)} className="grid place-items-center w-8 h-8 rounded-full hover:bg-bg transition-colors" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="text-xs font-semibold text-muted uppercase tracking-wider">{config.eyebrow}</div>
            <div className="text-sm font-bold">{config.title}</div>

            <nav className="flex flex-col gap-1 mt-4 flex-1">
              {config.navItems.map((item) => {
                const isActive = item.path.split("#")[0] === path;
                return (
                  <button
                    key={item.path}
                    onClick={() => goTo(item.path)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                      isActive ? "bg-primary/10 text-primary" : "text-muted hover:bg-bg hover:text-dark"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {showLogout && (
              <button onClick={logout} className="flex items-center justify-center gap-2 h-11 rounded-full bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors">
                <LogOut size={16} /> Logout
              </button>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="pt-20 min-h-screen">
        {children}
      </main>
    </div>
  );
}
