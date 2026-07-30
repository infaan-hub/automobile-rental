import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Home } from "lucide-react";
import { Button } from "@/components/ui";

function FloatingShape({ delay, x, y, size, color }) {
  return (
    <motion.div
      className="absolute rounded-full opacity-10"
      style={{ width: size, height: size, background: color }}
      initial={{ x: 0, y: 0 }}
      animate={{
        x: [0, x, 0],
        y: [0, y, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingShape delay={0} x={120} y={-80} size={300} color="oklch(0.5 0.15 270)" />
      <FloatingShape delay={2} x={-100} y={100} size={200} color="oklch(0.6 0.2 25)" />
      <FloatingShape delay={4} x={80} y={120} size={250} color="oklch(0.6 0.15 170)" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 text-center px-6"
      >
        <motion.p
          className="text-[10rem] md:text-[14rem] font-black leading-none gradient-text select-none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          404
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold mt-2">
            Page not found
          </h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm md:text-base">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Link to="/">
            <Button size="lg">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/vehicles">
            <Button variant="secondary" size="lg">
              <Car className="h-4 w-4 mr-2" />
              Browse Vehicles
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
