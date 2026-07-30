import React from "react";
import { motion } from "framer-motion";
import BackgroundShapes from "./BackgroundShapes";
import HeroSection from "./HeroSection";

export default function AuthLayout({ children, badge }) {
  return (
    <div className="lux-auth">
      <BackgroundShapes />
      <motion.div
        className="lux-auth-split"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection badge={badge} />
        <div className="lux-auth-card-wrap">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="lux-glass-card">{children}</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
