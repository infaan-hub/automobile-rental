import React, { useEffect, useMemo, useState } from "react";
import { CategorySection, FeatureStrip, Footer, Hero, PromoSection, SearchBar, TrendSection } from "../components/HomeSections";
import { apiRequest } from "../lib/api";
import { fallbackVehicles } from "../lib/data";

export default function HomePage() {
  const [vehicles, setVehicles] = useState(fallbackVehicles);

  useEffect(() => {
    async function loadVehicles() {
      try {
        const data = await apiRequest("/vehicles/");
        if (data.vehicles?.length) {
          setVehicles(data.vehicles);
        }
      } catch {
        setVehicles(fallbackVehicles);
      }
    }

    loadVehicles();
  }, []);

  const trendVehicles = useMemo(() => {
    const cars = vehicles.length ? vehicles : fallbackVehicles;
    return cars.slice(0, 16);
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
