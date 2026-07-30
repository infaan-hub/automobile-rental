import { motion } from "framer-motion";

const variants = {
  primary: "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20",
  secondary: "bg-white text-dark border border-border hover:shadow-md hover:border-primary/30",
  ghost: "bg-transparent text-muted hover:text-dark hover:bg-white/60",
  danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
};

export default function Button({ children, variant = "primary", className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
