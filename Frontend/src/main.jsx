import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://automobile-rental.onrender.com/api";

const fallbackVehicles = [
  {
    id: "bmw-i4",
    name: "BMW i4",
    brand: "BMW",
    model: "i4",
    bodyTypeLabel: "Sedan",
    dailyRate: 78,
    imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "audi-a7",
    name: "Audi A7",
    brand: "Audi",
    model: "A7",
    bodyTypeLabel: "Luxury",
    dailyRate: 89,
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mercedes-gle",
    name: "Mercedes-Benz GLE",
    brand: "Mercedes-Benz",
    model: "GLE",
    bodyTypeLabel: "SUV",
    dailyRate: 94,
    imageUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "porsche-911",
    name: "Porsche 911",
    brand: "Porsche",
    model: "911",
    bodyTypeLabel: "Sport",
    dailyRate: 120,
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  {
    title: "Mercedes Benz",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    tone: "mist",
  },
  {
    title: "Audi",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
    tone: "light",
  },
  {
    title: "BMW",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=800&q=80",
    tone: "dark",
  },
  {
    title: "Porsche",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    tone: "silver",
  },
];

function money(value) {
  return `$${Number(value || 0).toFixed(0)}/day`;
}

function App() {
  const [vehicles, setVehicles] = useState(fallbackVehicles);

  useEffect(() => {
    async function loadVehicles() {
      try {
        const response = await fetch(`${API_BASE_URL}/vehicles/`);
        if (!response.ok) return;
        const data = await response.json();
        if (data.vehicles?.length) {
          setVehicles(data.vehicles.slice(0, 4));
        }
      } catch {
        setVehicles(fallbackVehicles);
      }
    }

    loadVehicles();
  }, []);

  const trendVehicles = useMemo(() => {
    const cars = vehicles.length ? vehicles : fallbackVehicles;
    return cars.slice(0, 4);
  }, [vehicles]);

  return (
    <main className="home-page" id="home">
      <Hero />
      <SearchBar />
      <CategorySection />
      <TrendSection vehicles={trendVehicles} />
      <FeatureStrip />
      <PromoSection />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <header className="hero-shell">
      <nav className="top-nav">
        <a className="logo" href="/home" aria-label="Premium rental home">
          <span>r</span>rw
        </a>
        <div className="nav-links">
          <a href="/home">Home</a>
          <a href="#category">Vehicles</a>
          <a href="#trend">Help</a>
          <a href="#footer">Blog</a>
          <a href="#footer">Contact</a>
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
          We rent cars from executive city rides to weekend sports models. Choose the class, dates, and driver service
          you need in minutes.
        </p>
      </section>
    </header>
  );
}

function SearchBar() {
  return (
    <form className="booking-search" aria-label="Vehicle search">
      <label>
        <span>Pick up location</span>
        <input defaultValue="Dar es Salaam, main branch" />
      </label>
      <label>
        <span>Return location</span>
        <input defaultValue="Same location" />
      </label>
      <label>
        <span>Pickup date</span>
        <input type="date" />
      </label>
      <label>
        <span>Return date</span>
        <input type="date" />
      </label>
      <button type="button">Search</button>
    </form>
  );
}

function CategorySection() {
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

function TrendSection({ vehicles }) {
  return (
    <section className="trend-section" id="trend">
      <div className="section-heading">
        <h2>Trend vehicles</h2>
        <a href="#category">View all</a>
      </div>
      <div className="trend-grid">
        {vehicles.map((vehicle) => (
          <article className="trend-card" key={vehicle.id}>
            <h3>{vehicle.name}</h3>
            <img src={vehicle.imageUrl} alt={vehicle.name} />
            <div>
              <span>{money(vehicle.dailyRate)}</span>
              <button>Book now</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureStrip() {
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

function PromoSection() {
  return (
    <section className="promo-section">
      <div>
        <h2>Book Tesla with a big discount</h2>
        <button>Book now</button>
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

function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div>
        <a className="logo" href="/home">
          <span>r</span>rw
        </a>
        <label className="footer-subscribe">
          Subscribe to the newsletter
          <input placeholder="Email address" />
        </label>
      </div>
      <FooterColumn title="Top cities" items={["New York", "London", "Dubai", "Los Angeles"]} />
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
        <a href="/home" key={item}>
          {item}
        </a>
      ))}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
