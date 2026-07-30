import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Apple, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppDownload() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="glass-card relative overflow-hidden rounded-[var(--radius)] p-8 md:p-16">
          <div className="hero-gradient pointer-events-none absolute inset-0" />
          <div className="relative z-10 flex flex-col items-center gap-12 lg:flex-row lg:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-lg text-center lg:text-left"
            >
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Mobile App
              </span>
              <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                Get the{" "}
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  RW
                </span>{" "}
                App
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Download for iOS and Android. Book vehicles, manage reservations, and access
                premium features right from your phone.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Button size="lg" className="h-12 px-8 text-base">
                  <Apple className="mr-2 size-5" />
                  App Store
                </Button>
                <Button variant="secondary" size="lg" className="h-12 px-8 text-base">
                  <Smartphone className="mr-2 size-5" />
                  Google Play
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative shrink-0"
            >
              <div className="relative mx-auto h-[380px] w-[190px] rounded-[3rem] border-4 border-foreground/10 bg-gradient-to-b from-amber-500/10 to-transparent p-4 shadow-2xl">
                <div className="mx-auto mb-4 h-4 w-20 rounded-full bg-foreground/10" />
                <div className="space-y-3">
                  <div className="h-3 w-3/4 rounded-full bg-foreground/5" />
                  <div className="h-3 w-1/2 rounded-full bg-foreground/5" />
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <div className="aspect-square rounded-xl bg-amber-500/10" />
                    <div className="aspect-square rounded-xl bg-amber-500/10" />
                    <div className="aspect-square rounded-xl bg-amber-500/10" />
                    <div className="aspect-square rounded-xl bg-amber-500/10" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-foreground/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
