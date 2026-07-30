import React from "react";
import { motion } from "framer-motion";
import { Shield, Star, HeadphonesIcon, Car, Clock } from "lucide-react";

const badgeConfig = [
  { icon: Star, text: "Trusted by <strong>20,000+</strong> Drivers" },
  { icon: HeadphonesIcon, text: "<strong>24/7</strong> Premium Support" },
  { icon: Shield, text: "<strong>Fully</strong> Insured" },
  { icon: Car, text: "<strong>Premium</strong> Fleet" },
  { icon: Clock, text: "<strong>Fast</strong> Booking" },
];

export default function FloatingBadge({ index = 0 }) {
  const item = badgeConfig[index];
  if (!item) return null;
  const Icon = item.icon;
  return (
    <motion.div
      className="lux-floating-badge"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.12, ease: "easeOut" }}
    >
      <Icon />
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
    </motion.div>
  );
}
