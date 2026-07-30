import { motion, AnimatePresence } from "framer-motion";

export default function Notice({ error, message }) {
  if (!error && !message) return null;
  return (
    <AnimatePresence>
      {(error || message) && (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          className={`mb-4 px-4 py-3 rounded-2xl text-sm font-semibold border ${
            error
              ? "bg-red-50 text-red-700 border-red-200"
              : "bg-green-50 text-green-700 border-green-200"
          }`}
        >
          {error || message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
