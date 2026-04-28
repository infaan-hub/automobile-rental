import React from "react";
import { homeHeroImage } from "../lib/data";
import { money } from "../lib/formatters";
import { navigate } from "../lib/navigation";

const tones = ["mist", "light", "dark", "silver"];

export function Hero() {
  return (
    <header className="hero-shell">
      <section className="hero-stage">
        <img
          className="hero-car"
          src={homeHeroImage}
          alt="Toyota Land Cruiser Prado with Zanzibar-ready safari styling"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-title">
          <h1>Premium car rental</h1>
        </div>
        <p className="hero-note">
          Dealers publish the live fleet, vehicle categories, prices, and availability for Zanzibar rentals from city
          drives to safari-ready 4x4s.
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
      <button type="button" onClick={() => navigate("/car-dealer/login")}>Search</button>
    </form>
  );
}

export function CategorySection({ categories }) {
  return (
    <section className="section-wrap" id="category">
      <h2>Car Category</h2>
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
  return (
    <section className="trend-section" id="trend">
      <div className="section-heading">
        <h2>Trend vehicles</h2>
        <button type="button" onClick={() => navigate("/car-dealer/login")}>View all</button>
      </div>
      <div className="trend-grid">
        {vehicles.length ? vehicles.map((vehicle) => (
          <article className="trend-card" key={vehicle.id}>
            <h3>{vehicle.name}</h3>
            <img src={vehicle.imageUrl} alt={vehicle.name} loading="lazy" decoding="async" />
            <p>{vehicle.description || `${vehicle.brand} ${vehicle.model}`}</p>
            <div>
              <span>{money(vehicle.dailyRate)}</span>
              <button type="button" onClick={() => navigate("/car-dealer/login")}>Book now</button>
            </div>
          </article>
        )) : <p className="section-empty">No dealer vehicles are live yet.</p>}
      </div>
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

  return (
    <section className="promo-section">
      <div>
        <h2>{vehicle.name}</h2>
        <p className="promo-copy">{vehicle.description || `${vehicle.brand} ${vehicle.model}`}</p>
        <button type="button" onClick={() => navigate("/car-dealer/login")}>Book now</button>
      </div>
      <img
        src={vehicle.imageUrl}
        alt={vehicle.name}
        loading="lazy"
        decoding="async"
      />
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
        <button className="logo nav-button" type="button" onClick={() => navigate("/home")}>
          <span>r</span>rw
        </button>
        <label className="footer-subscribe">
          Subscribe to the newsletter
          <input placeholder="Email address" />
        </label>
      </div>
      <FooterColumn title="Portals" items={["/admin/register", "/admin/login", "/car-dealer/login", "/home"]} />
      <FooterColumn title="Explore" items={["Vehicles", "Airport transfer", "Executive cars", "Private drivers"]} />
      <FooterColumn title="Loyalty clubs" items={["Membership card", "Long rentals", "Travel pass", "Business plans"]} />
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      {items.map((item) => (
        <button className="footer-link" type="button" onClick={() => navigate(item.startsWith("/") ? item : "/home")} key={item}>
          {item}
        </button>
      ))}
    </div>
  );
}
