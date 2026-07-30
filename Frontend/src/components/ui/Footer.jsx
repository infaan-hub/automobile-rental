import { navigate } from "../../lib/navigation";
import { homePaymentGateways, websiteQr } from "../../lib/paymentAssets";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Home", path: "/home" },
      { label: "Vehicles", path: "/home" },
      { label: "Pricing", path: "/home" },
      { label: "Membership", path: "/home" },
    ],
  },
  {
    title: "Loyalty",
    links: [
      { label: "My Account", path: "/dashboard" },
      { label: "Bookings", path: "/dashboard" },
      { label: "Support", path: "/home" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", path: "/home" },
      { label: "Terms of Service", path: "/home" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white/80">
      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[1.4fr_repeat(3,1fr)] gap-10">
        <div>
          <button onClick={() => navigate("/home")} className="text-2xl font-bold tracking-wider text-white">
            CRUVO
          </button>
          <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
            Premium car rental experience. Choose from a fleet of well-maintained, high-performance vehicles.
          </p>
          <div className="mt-6">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Accepted Payments</p>
            <img src={homePaymentGateways} alt="Payment gateways" className="h-8 rounded-lg" />
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold text-white mb-4">{col.title}</h3>
            <ul className="grid gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-bold text-white mb-4">Download</h3>
          <img src={websiteQr} alt="QR Code" className="w-28 h-28 rounded-2xl bg-white p-2" />
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <p className="text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} CRUVO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
