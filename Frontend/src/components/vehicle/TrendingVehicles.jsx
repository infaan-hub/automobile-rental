import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import VehicleCard from "./VehicleCard";

const vehicles = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    description: "The pinnacle of luxury sedans with unmatched comfort and cutting-edge technology.",
    price: 299,
    transmission: "Auto",
    fuel: "Hybrid",
    seats: 5,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Porsche 911 Turbo S",
    description: "Iconic sports car delivering exhilarating performance and timeless design.",
    price: 499,
    transmission: "Auto",
    fuel: "Premium",
    seats: 2,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Range Rover Velar",
    description: "Refined SUV blending British elegance with go-anywhere capability.",
    price: 349,
    transmission: "Auto",
    fuel: "Diesel",
    seats: 5,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Tesla Model S Plaid",
    description: "Electric performance flagship with insane acceleration and autonomous driving.",
    price: 399,
    transmission: "Auto",
    fuel: "Electric",
    seats: 5,
    rating: 4.9,
  },
];

const titleVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function TrendingVehicles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          variants={titleVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mb-16 max-w-xl text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Premium Collection
          </span>
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Trending{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Vehicles
            </span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Our most sought-after vehicles, handpicked for the discerning driver
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} onView={() => {}} />
          ))}
        </div>
      </div>
    </section>
  );
}
