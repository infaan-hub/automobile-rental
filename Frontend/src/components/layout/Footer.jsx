import { Link } from "react-router-dom";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui";
import { Separator } from "@/components/ui";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/bookings", label: "Bookings" },
];

const services = [
  { to: "/vehicles?type=Sedan", label: "Sedans" },
  { to: "/vehicles?type=SUV", label: "SUVs" },
  { to: "/vehicles?type=Sports+Car", label: "Sports Cars" },
  { to: "/vehicles?type=Electric", label: "Electric" },
];

function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-background pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-2xl font-extrabold tracking-tight"
            >
              <span className="text-primary">r</span>
              <span>w</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Premium automobile rental service. Experience the thrill of driving
              the world&apos;s finest vehicles with RW.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground">
              Subscribe for exclusive offers and new arrivals.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                className="h-10 flex-1 text-sm"
              />
              <Button size="sm" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} RW. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
