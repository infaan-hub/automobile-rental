import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";

function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-8xl font-black tracking-tighter text-foreground/10">
          404
        </h1>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-2xl font-bold"
      >
        Page not found
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="max-w-xs text-muted-foreground"
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Button asChild>
          <Link to="/">Back Home</Link>
        </Button>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
