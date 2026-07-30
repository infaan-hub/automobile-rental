import React from "react";
import { motion } from "framer-motion";

export default function BackgroundShapes() {
  return (
    <div className="lux-bg-layer">
      <motion.div
        className="lux-bg-blob lux-bg-blob--1"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="lux-bg-blob lux-bg-blob--2"
        animate={{ scale: [1, 1.08, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="lux-bg-blob lux-bg-blob--3"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="lux-bg-noise" />
    </div>
  );
}
