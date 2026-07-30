import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const brands = [
  "Mercedes", "BMW", "Porsche", "Audi", "Tesla", "Lexus", "Range Rover", "Lamborghini",
  "Ferrari", "Bentley", "Maserati", "McLaren",
];

const titleVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function PopularBrands() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          variants={titleVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Our Partners
          </span>
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Popular{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Brands
            </span>
          </h2>
        </motion.div>
      </div>
      <div className="group relative overflow-hidden">
        <div className="flex w-max animate-[scroll_30s_linear_infinite] gap-6 px-4 group-hover:[animation-play-state:paused]">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="glass flex h-16 shrink-0 items-center justify-center rounded-2xl px-8 text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-glass-lg"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
