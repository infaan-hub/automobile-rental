import React from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

export default function PrimaryButton({ children, loading, disabled, ...rest }) {
  return (
    <motion.button
      className="lux-btn-primary"
      whileHover={!disabled ? { scale: 1.01 } : undefined}
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Loader size={20} className="lux-spin" /> : children}
    </motion.button>
  );
}
