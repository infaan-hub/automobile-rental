import { motion } from "framer-motion";

function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Account and application preferences.
        </p>
      </motion.div>
    </div>
  );
}

export default SettingsPage;
