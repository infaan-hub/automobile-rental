import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

function FadeIn({ children, className, as = "div", stagger = false, ...props }) {
  if (stagger) {
    const MotionComponent = motion[as] || motion.div;
    return (
      <MotionComponent
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(className)}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function FadeInItem({ children, className, ...props }) {
  return (
    <motion.div variants={itemVariants} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}

export { FadeIn, FadeInItem };
