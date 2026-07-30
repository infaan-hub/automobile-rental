import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Clock, Car, BadgePercent, MapPin, Star } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Insurance Included",
    description: "Every rental comes with comprehensive insurance coverage for your peace of mind.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service to assist you anytime, anywhere.",
  },
  {
    icon: Car,
    title: "Premium Fleet",
    description: "A meticulously maintained collection of the finest automobiles available.",
  },
  {
    icon: BadgePercent,
    title: "Best Rates",
    description: "Competitive pricing with transparent billing and no hidden fees.",
  },
  {
    icon: MapPin,
    title: "Convenient Locations",
    description: "Pick up and drop off at over 50 locations worldwide.",
  },
  {
    icon: Star,
    title: "Top Rated",
    description: "Consistently rated 5 stars by thousands of satisfied customers.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 },
  }),
};

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-xl text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Designed for{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            We go beyond renting cars — we deliver experiences
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="glass-card group p-6 transition-shadow duration-500 hover:shadow-glass-lg"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition-colors duration-300 group-hover:bg-amber-500/20">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
