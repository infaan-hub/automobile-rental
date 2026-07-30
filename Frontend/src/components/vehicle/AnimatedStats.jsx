import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { Car, Users, MapPin, Star } from "lucide-react";

const stats = [
  { icon: Car, value: 500, suffix: "+", label: "Vehicles" },
  { icon: Users, value: 10, suffix: "K+", label: "Customers" },
  { icon: MapPin, value: 50, suffix: "+", label: "Locations" },
  { icon: Star, value: 49, suffix: "", label: "Rating", decimals: 1, prefix: "" },
];

export default function AnimatedStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card flex flex-col items-center p-8 text-center"
            >
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                <stat.icon className="size-6" />
              </div>
              <span className="text-4xl font-bold tracking-tight md:text-5xl">
                {stat.prefix}
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  decimals={stat.decimals || 0}
                  suffix={stat.suffix}
                  enableScrollSpy
                  scrollSpyDelay={200}
                />
              </span>
              <span className="mt-2 text-sm text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
