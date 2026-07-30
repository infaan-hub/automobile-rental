import React from "react";
import { motion } from "framer-motion";
import { Shield, Star, HeadphonesIcon, Car } from "lucide-react";
import { navigate } from "../../lib/navigation";
import FloatingBadge from "./FloatingBadge";

const features = [
  { icon: Star, text: "Premium Vehicles" },
  { icon: Shield, text: "Fully Insured" },
  { icon: HeadphonesIcon, text: "24/7 Support" },
  { icon: Car, text: "Fast Booking" },
];

export default function HeroSection({ badge = "Premium car rental" }) {
  return (
    <div className="lux-auth-hero">
      <div className="lux-hero-icon">
        <Car size={80} />
      </div>
      <div className="lux-hero-gradient" />
      <div className="lux-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="lux-hero-logo">
            <button type="button" onClick={() => navigate("/home")}>
              <span>r</span>rw
            </button>
          </div>
          <div className="lux-hero-badge">
            <Star size={14} />
            {badge}
          </div>
          <h1 className="lux-hero-title">
            Drive the <span>Extraordinary</span>
          </h1>
          <p className="lux-hero-sub">
            Experience the pinnacle of automotive excellence. From luxury sedans to
            exotic supercars — your perfect drive awaits.
          </p>
        </motion.div>
        <motion.div
          className="lux-hero-features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div className="lux-hero-feat" key={feat.text}>
                <Icon />
                {feat.text}
              </div>
            );
          })}
        </motion.div>
        <motion.div
          className="lux-floating-badges"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}
        >
          <FloatingBadge index={0} />
          <FloatingBadge index={1} />
        </motion.div>
      </div>
    </div>
  );
}
