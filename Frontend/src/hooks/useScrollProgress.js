import { useScroll, useSpring } from "framer-motion";

function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return smoothProgress;
}

export { useScrollProgress };
