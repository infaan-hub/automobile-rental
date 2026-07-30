import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingSearch from "./BookingSearch";
import CarScene from "./CarScene";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.15 },
  }),
};

const floatingElements = [
  { pos: "top-[15%] right-[8%]", size: "h-24 w-40", delay: 0 },
  { pos: "bottom-[20%] left-[5%]", size: "h-32 w-28", delay: 1.5 },
  { pos: "top-[35%] left-[10%]", size: "h-20 w-32", delay: 3 },
];

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <div className="hero-gradient pointer-events-none absolute inset-0" />
      <CarScene />
      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-28 text-center md:pt-36">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-4 inline-block rounded-full border border-glass-border bg-white/40 px-5 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur-sm dark:bg-white/5"
        >
          Premium Automobile Rental
        </motion.span>
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-balance text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
        >
          Drive the{" "}
          <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
            Experience
          </span>
          <br />
          You Deserve
        </motion.h1>
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          Premium automobile rental for those who demand excellence
        </motion.p>
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" className="h-12 px-8 text-base">
            Explore Vehicles
            <ArrowRight className="ml-2 size-4" />
          </Button>
          <Button variant="ghost" size="lg" className="h-12 px-8 text-base">
            <Play className="mr-2 size-4" />
            Watch Experience
          </Button>
        </motion.div>
      </div>
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 0.5,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 1, delay: 0.5 + i * 0.3 },
            y: {
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: el.delay,
            },
          }}
          className={`pointer-events-none absolute ${el.pos} ${el.size} glass rounded-2xl`}
        />
      ))}
      <BookingSearch />
    </section>
  );
}
