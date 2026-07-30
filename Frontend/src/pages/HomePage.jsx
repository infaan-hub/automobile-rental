import React, { useEffect, useMemo, useState } from "react";
import { CategorySection, FeatureStrip, Footer, Hero, PromoSection, SearchBar, TrendSection } from "../components/HomeSections";
import { apiRequest } from "../lib/api";

export default function HomePage() {
  const [content, setContent] = useState({
    carCategories: [],
    scooterCategories: [],
    vehicles: [],
    featuredVehicle: null,
  });

  useEffect(() => {
    async function loadContent() {
      try {
        const data = await apiRequest("/home-content/");
        setContent({
          carCategories: data.carCategories || [],
          scooterCategories: data.scooterCategories || [],
          vehicles: data.vehicles || [],
          featuredVehicle: data.featuredVehicle || null,
        });
      } catch {
        setContent({
          carCategories: [],
          scooterCategories: [],
          vehicles: [],
          featuredVehicle: null,
        });
      }
    }
    loadContent();
  }, []);

  const homeCategories = useMemo(
    () => [
      ...content.carCategories.map((item) => ({ ...item, type: "car" })),
      ...content.scooterCategories.map((item) => ({ ...item, type: "scooter" })),
    ].slice(0, 8),
    [content]
  );

  return (
    <main className="min-h-screen bg-bg">
      <Hero />
      <CategorySection categories={homeCategories} />
      <TrendSection vehicles={content.vehicles.slice(0, 12)} />
      <FeatureStrip />
      <PromoSection vehicle={content.featuredVehicle} />
      <Footer />
    </main>
  );
}
