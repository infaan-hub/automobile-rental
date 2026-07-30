import { motion } from "framer-motion";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <motion.div
        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-sm text-muted">{text}</p>
    </div>
  );
}
