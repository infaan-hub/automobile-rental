import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

function VehiclesPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold tracking-tight"
      >
        Our Fleet
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="max-w-md text-muted-foreground"
      >
        Browse our collection of premium vehicles.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button asChild>
          <Link to="/">Back Home</Link>
        </Button>
      </motion.div>
    </div>
  );
}

export default VehiclesPage;
