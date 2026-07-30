import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";

function VehicleDetailsPage() {
  const { id } = useParams();
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold tracking-tight"
      >
        Vehicle #{id}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="max-w-md text-muted-foreground"
      >
        Detailed information about this vehicle.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button asChild variant="outline">
          <Link to="/vehicles">Back to Vehicles</Link>
        </Button>
      </motion.div>
    </div>
  );
}

export default VehicleDetailsPage;
