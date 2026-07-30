import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, User } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context";
import { Avatar, AvatarFallback } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/bookings", label: "Bookings" },
];

const activeLinkStyle = ({ isActive }) =>
  cn(
    "relative px-4 py-2 text-sm font-medium transition-colors",
    isActive
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground/80"
  );

function NavUnderline() {
  const { pathname } = useLocation();
  return (
    <motion.div
      className="absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-foreground"
      layoutId="nav-underline"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
}

function Header() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed left-1/2 z-50 w-full -translate-x-1/2 transition-all duration-500",
        "flex items-center justify-between",
        scrolled
          ? "top-3 max-w-5xl rounded-full glass px-4 py-2 shadow-glass"
          : "top-6 max-w-6xl px-6"
      )}
    >
      <Link
        to="/"
        className="flex items-center gap-1 text-xl font-extrabold tracking-tight"
      >
        <span className="text-primary">r</span>
        <span>w</span>
      </Link>

      <nav className="hidden items-center gap-1 md:flex">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={activeLinkStyle} end={link.to === "/"}>
            {({ isActive }) => (
              <>
                {isActive && <NavUnderline />}
                {link.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarFallback className="text-xs">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/bookings">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login">Sign Out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <User className="h-4 w-4" />
          </Link>
        )}

        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-3 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-glass-lg md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export { Header };
