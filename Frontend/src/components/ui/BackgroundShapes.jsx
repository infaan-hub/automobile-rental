import { motion } from "framer-motion";

export default function BackgroundShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #111111, transparent 70%)" }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute top-[15%] right-[8%] w-[180px] h-[180px] opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #666 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div
        className="absolute bottom-[20%] left-[5%] w-[120px] h-[120px] opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #666 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
    </div>
  );
}
