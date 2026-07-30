import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const directionVariants = {
  up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
};

function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
  once = true,
  distance = 40,
  ...props
}) {
  const variant = directionVariants[direction] || directionVariants.up;
  const v = {
    hidden: { ...variant.hidden, y: direction === "up" ? distance : direction === "down" ? -distance : 0, x: direction === "left" ? distance : direction === "right" ? -distance : 0 },
    visible: variant.visible,
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { ScrollReveal };
