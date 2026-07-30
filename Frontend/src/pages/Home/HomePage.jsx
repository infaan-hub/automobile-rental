import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { HeroSection } from "@/components/hero";
import {
  TrendingVehicles,
  PopularBrands,
  WhyChooseUs,
  Testimonials,
  AnimatedStats,
  AppDownload,
} from "@/components/vehicle";

function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-xl text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Find Us
          </span>
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Our{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Locations
            </span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card flex h-80 items-center justify-center overflow-hidden md:h-96"
        >
          <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
            <MapPin className="size-10 text-amber-500" />
            <p className="text-lg font-medium">50+ Locations Worldwide</p>
            <p className="text-sm">Interactive map coming soon</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrendingVehicles />
      <PopularBrands />
      <WhyChooseUs />
      <Testimonials />
      <AnimatedStats />
      <AppDownload />
      <LocationSection />
    </main>
  );
}
