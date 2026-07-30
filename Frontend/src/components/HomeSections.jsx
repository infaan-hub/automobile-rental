import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { homeHeroImage } from "../lib/data";
import { isCustomerLoggedIn } from "../lib/customer";
import { money } from "../lib/formatters";
import { navigate } from "../lib/navigation";
import { homePaymentGateways, websiteQr } from "../lib/paymentAssets";
import Button from "./ui/Button";
import GlassCard from "./ui/GlassCard";
import BackgroundShapes from "./ui/BackgroundShapes";

const tones = ["mist", "light", "dark", "silver"];

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 px-4 overflow-hidden bg-dark">
      <BackgroundShapes />
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[700px] mx-auto"
        >
          <h1 className="text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.94] tracking-[-0.04em] text-white">
            Drive the
            <br />
            <span className="font-serif text-[clamp(3rem,9vw,6.2rem)] leading-[1.1] italic text-primary/90">
              Experience
            </span>
            <br />
            You Deserve.
          </h1>
          <p className="mt-6 text-white/60 text-[clamp(0.9rem,1.4vw,1.05rem)] leading-relaxed max-w-lg mx-auto">
            Choose from a fleet of well-maintained, high-performance vehicles. Easy booking, no hidden fees.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
          className="mt-10"
        >
          <SearchBar />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="mt-16 flex justify-center px-4"
      >
        <div className="relative w-full max-w-[65%]">
          <img
            src={homeHeroImage}
            alt="Toyota Land Cruiser Prado"
            className="w-full object-contain drop-shadow-2xl rounded-3xl"
          />
        </div>
      </motion.div>
    </section>
  );
}

export function SearchBar() {
  return (
    <div className="flex flex-wrap items-center w-full max-w-3xl mx-auto bg-white rounded-full shadow-xl shadow-black/5 border border-white/40 divide-x divide-border overflow-hidden">
      <div className="flex-1 min-w-[130px] px-5 py-3">
        <label className="block text-[11px] font-semibold text-muted tracking-wider uppercase mb-1">Pickup Location</label>
        <input className="w-full text-sm font-medium bg-transparent outline-none" defaultValue="Zanzibar, main branch" />
      </div>
      <div className="flex-1 min-w-[130px] px-5 py-3">
        <label className="block text-[11px] font-semibold text-muted tracking-wider uppercase mb-1">Return Location</label>
        <input className="w-full text-sm font-medium bg-transparent outline-none" defaultValue="Same location" />
      </div>
      <div className="flex-1 min-w-[130px] px-5 py-3">
        <label className="block text-[11px] font-semibold text-muted tracking-wider uppercase mb-1">Pickup Date</label>
        <input type="date" className="w-full text-sm font-medium bg-transparent outline-none" />
      </div>
      <div className="flex-1 min-w-[130px] px-5 py-3">
        <label className="block text-[11px] font-semibold text-muted tracking-wider uppercase mb-1">Return Date</label>
        <input type="date" className="w-full text-sm font-medium bg-transparent outline-none" />
      </div>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate(isCustomerLoggedIn() ? "/dashboard" : "/login")}
        className="flex items-center gap-2 h-full px-7 py-4 bg-primary text-white text-sm font-semibold transition-colors duration-300 hover:bg-primary/90 cursor-pointer shrink-0"
      >
        <Search size={18} />
        Search
      </motion.button>
    </div>
  );
}

export function CategorySection({ categories }) {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Vehicle Categories</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.length ? categories.map((cat, i) => (
          <motion.article
            key={`${cat.type}-${cat.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`relative rounded-3xl overflow-hidden min-h-[270px] group cursor-pointer ${tones[i % 4] === "dark" ? "bg-dark" : "bg-bg"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[1]" />
            <img src={cat.imageUrl} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <h3 className="relative z-[2] text-white font-bold text-lg max-w-[120px] m-4 drop-shadow-lg">{cat.name}</h3>
            <button className="absolute right-3 bottom-3 z-[2] w-7 h-7 rounded-full bg-primary text-white grid place-items-center text-sm font-bold hover:scale-110 transition-transform">
              +
            </button>
          </motion.article>
        )) : <p className="text-sm text-muted col-span-full">Dealers have not published categories yet.</p>}
      </div>
    </section>
  );
}

export function TrendSection({ vehicles }) {
  return (
    <section className="py-16 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Trending Vehicles</h2>
          <button onClick={() => navigate(isCustomerLoggedIn() ? "/dashboard" : "/login")} className="text-sm font-semibold text-primary hover:underline">
            View all
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vehicles.slice(0, 12).map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-3xl p-5 border border-border hover:shadow-lg transition-shadow duration-300"
            >
              <img src={v.imageUrl} alt={v.name} className="w-full h-36 object-contain mb-4 drop-shadow-lg" />
              <h3 className="font-bold text-sm mb-1">{v.name}</h3>
              <p className="text-xs text-muted line-clamp-2 mb-3">{v.description || `${v.brand} ${v.model}`}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">{money(v.dailyRate)}</span>
                <Button variant="ghost" className="text-xs !h-8 !px-3">View</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeatureStrip() {
  const features = [
    { title: "Service", text: "24/7 customer support and roadside assistance" },
    { title: "Smart reservations", text: "Real-time booking with instant confirmation" },
    { title: "Trusted quality", text: "All vehicles pass rigorous 100-point inspection" },
    { title: "Secure payment", text: "256-bit encrypted transactions" },
  ];

  return (
    <section className="bg-dark">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div key={i} className="px-8 py-10 text-white border-r border-white/10 last:border-r-0">
            <div className="w-8 h-8 border border-white/40 rounded-lg mb-4" />
            <h3 className="font-bold text-sm mb-2">{f.title}</h3>
            <p className="text-xs text-white/50 leading-relaxed">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PromoSection({ vehicle }) {
  return (
    <section className="relative py-16 px-6 bg-dark overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-[2]">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-white">{vehicle?.name || "Premium Selection"}</h2>
          <p className="mt-4 text-white/60 text-sm leading-relaxed">
            {vehicle?.description || "Experience the ultimate in luxury and performance. Our premium fleet awaits you."}
          </p>
          <Button className="mt-6" onClick={() => navigate(isCustomerLoggedIn() ? "/dashboard" : "/login")}>
            Book Now <ArrowRight size={16} />
          </Button>
        </div>
      </div>
      {vehicle?.imageUrl && (
        <img src={vehicle.imageUrl} alt="" className="absolute right-[-10%] bottom-[-40px] w-[55%] h-[330px] object-cover opacity-40 mix-blend-screen" />
      )}
    </section>
  );
}

export function Footer() {
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
                  <button onClick={() => navigate(link.path)} className="text-sm text-white/50 hover:text-white transition-colors duration-200">
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
        <p className="text-center text-xs text-white/30">&copy; {new Date().getFullYear()} CRUVO. All rights reserved.</p>
      </div>
    </footer>
  );
}
