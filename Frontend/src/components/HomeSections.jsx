import React from "react";
import { categories } from "../lib/data";
import { money } from "../lib/formatters";
import { navigate } from "../lib/navigation";

export function Hero() {
  return (
    <header className="hero-shell">
      <nav className="top-nav">
        <button className="logo nav-button" type="button" onClick={() => navigate("/home")} aria-label="Premium rental home">
          <span>r</span>rw
        </button>
        <div className="nav-links">
          <button type="button" onClick={() => navigate("/home")}>Home</button>
          <button type="button" onClick={() => navigate("/admin/register")}>Admin</button>
          <button type="button" onClick={() => navigate("/car-dealer/login")}>Car dealer</button>
          <button type="button" onClick={() => navigate("/home#trend")}>Trend</button>
          <button type="button" onClick={() => navigate("/home#footer")}>Contact</button>
        </div>
        <label className="nav-search">
          <input aria-label="Search vehicle" placeholder="Search" />
          <span>Go</span>
        </label>
      </nav>

      <section className="hero-stage">
        <img
          className="hero-car"
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=90"
          alt="White premium car in a modern showroom"
        />
        <div className="hero-title">
          <h1>Premium car rental</h1>
        </div>
        <p className="hero-note">
          We rent cars from executive city rides to weekend sports models. Admin controls dealers, and dealers manage
          vehicles, categories, bookings, and rented cars.
        </p>
      </section>
    </header>
  );
}

export function SearchBar() {
  return (
    <form className="booking-search" aria-label="Vehicle search">
      <label><span>Pick up location</span><input defaultValue="Dar es Salaam, main branch" /></label>
      <label><span>Return location</span><input defaultValue="Same location" /></label>
      <label><span>Pickup date</span><input type="date" /></label>
      <label><span>Return date</span><input type="date" /></label>
      <button type="button" onClick={() => navigate("/car-dealer/login")}>Search</button>
    </form>
  );
}

export function CategorySection() {
  return (
    <section className="section-wrap" id="category">
      <h2>Car Category</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <article className={`category-card ${category.tone}`} key={category.title}>
            <h3>{category.title}</h3>
            <img src={category.image} alt={`${category.title} rental category`} />
            <button aria-label={`View ${category.title}`}>+</button>
          </article>
        ))}
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
        {vehicles.map((vehicle) => (
          <article className="trend-card" key={vehicle.id}>
            <h3>{vehicle.name}</h3>
            <img src={vehicle.imageUrl} alt={vehicle.name} />
            <div>
              <span>{money(vehicle.dailyRate)}</span>
              <button type="button" onClick={() => navigate("/car-dealer/login")}>Book now</button>
            </div>
          </article>
        ))}
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

export function PromoSection() {
  return (
    <section className="promo-section">
      <div>
        <h2>Book Tesla with a big discount</h2>
        <button type="button" onClick={() => navigate("/car-dealer/login")}>Book now</button>
      </div>
      <img
        src="https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=1500&q=90"
        alt="Black Tesla with falcon doors"
      />
      <aside>
        <strong>50%</strong>
        <span>Weekly hire Tesla cars</span>
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
