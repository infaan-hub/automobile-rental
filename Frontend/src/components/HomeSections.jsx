import React from "react";
import { isCustomerLoggedIn } from "../lib/customer";
import { money } from "../lib/formatters";
import { navigate } from "../lib/navigation";
import { homePaymentGateways, websiteQr } from "../lib/paymentAssets";
import SectionHeader from "./vehicles/SectionHeader";
import VehicleGrid from "./vehicles/VehicleGrid";
import heroImage from "../assets/download.jpg";

const tones = ["mist", "light", "dark", "silver"];

export function Hero() {
  return (
    <header className="hero-shell">
      <section className="hero-stage">
        <div className="hero-overlay" />
        <img className="hero-image" src={heroImage} alt="Toyota Land Cruiser LC300 Black" />
        <div className="hero-title">
          <h1>Premium car rental</h1>
        </div>
        <p className="hero-note">
          Dealers publish the live fleet, vehicle categories, prices, and availability for Zanzibar rentals from city drives to safari-ready 4x4s.
        </p>
      </section>
    </header>
  );
}

export function SearchBar() {
  return (
    <form className="booking-search" aria-label="Vehicle search">
      <label><span>Pick up location</span><input defaultValue="Zanzibar, main branch" /></label>
      <label><span>Return location</span><input defaultValue="Same location" /></label>
      <label><span>Pickup date</span><input type="date" /></label>
      <label><span>Return date</span><input type="date" /></label>
      <button type="button" onClick={() => navigate(isCustomerLoggedIn() ? "/dashboard" : "/login")}>Search</button>
    </form>
  );
}

export function CategorySection({ categories }) {
  return (
    <section className="section-wrap" id="category">
      <SectionHeader title="Vehicle Categories" />
      <div className="category-grid">
        {categories.length ? categories.map((category, index) => (
          <article className={`category-card ${tones[index % tones.length]}`} key={`${category.type}-${category.id}`}>
            <h3>{category.name}</h3>
            <img src={category.imageUrl} alt={`${category.name} rental category`} loading="lazy" decoding="async" />
            <button aria-label={`View ${category.name}`}>+</button>
          </article>
        )) : <p className="section-empty">Dealers have not published categories yet.</p>}
      </div>
    </section>
  );
}

export function TrendSection({ vehicles }) {
  const customerLoggedIn = isCustomerLoggedIn();
  return (
    <section className="trend-section" id="trend">
      <SectionHeader title="Trending Vehicles" subtitle="Find the perfect luxury vehicle for your next journey." action={() => navigate(customerLoggedIn ? "/dashboard" : "/login")} actionLabel="View All" />
      <VehicleGrid vehicles={vehicles} variant="home" onView={(id) => navigate(`/view?vehicle=${id}`)} emptyMessage="No dealer vehicles are live yet." />
    </section>
  );
}

export function FeatureStrip() {
  const items = [
    ["Service", "24/7 luxury support"],
    ["Smart reservations", "Fast booking confirmation"],
    ["Trusted quality", "Clean, inspected vehicles"],
    ["Secure payment", "Protected rental checkout"],
  ];
  return (
    <section className="feature-strip">
      {items.map(([title, copy]) => (
        <article key={title}>
          <span />
          <div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export function PromoSection({ vehicle }) {
  if (!vehicle) return null;
  const customerLoggedIn = isCustomerLoggedIn();
  return (
    <section className="promo-section">
      <div>
        <h2>{vehicle.name}</h2>
        <p className="promo-copy">{vehicle.description || `${vehicle.brand} ${vehicle.model}`}</p>
        <button type="button" onClick={() => navigate(customerLoggedIn ? `/rent?vehicle=${vehicle.id}` : `/view?vehicle=${vehicle.id}`)}>
          {customerLoggedIn ? "Rent now" : "View specs"}
        </button>
      </div>
      <img src={vehicle.imageUrl} alt={vehicle.name} loading="lazy" decoding="async" />
      <aside>
        <strong>{money(vehicle.dailyRate)}</strong>
        <span>{vehicle.location || vehicle.bodyTypeLabel || "Live dealer listing"}</span>
      </aside>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div>
        <button className="logo nav-button" type="button" onClick={() => navigate("/home")}><span>r</span>rw</button>
        <label className="footer-subscribe">
          Subscribe to the newsletter
          <input placeholder="Email address" />
        </label>
        <div className="footer-payment-block">
          <h3>Payment gateways</h3>
          <img className="footer-gateway-strip" src={homePaymentGateways} alt="PayPal, Visa, Mastercard, and American Express payment gateways" loading="lazy" decoding="async" />
        </div>
        <div className="footer-qr-block">
          <div>
            <h3>Scan website QR</h3>
            <p>Open the live rental web app quickly on any phone.</p>
            <a className="footer-link" href="https://automobile-rental.vercel.app/" target="_blank" rel="noreferrer">automobile-rental.vercel.app</a>
          </div>
          <img src={websiteQr} alt="QR code for automobile-rental.vercel.app" loading="lazy" decoding="async" />
        </div>
      </div>
      <FooterColumn title="Explore" items={["Vehicles", "Airport transfer", "Executive cars", "Private drivers"]} />
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      {items.map((item) => (
        <button className="footer-link" type="button" onClick={() => navigate(item.startsWith("/") ? item : "/home")} key={item}>{item}</button>
      ))}
    </div>
  );
}
