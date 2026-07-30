import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { ThemeProvider, AuthProvider } from "@/context";
import { Routes } from "@/routes";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Routes />
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              borderRadius: "var(--radius)",
              border: "1px solid var(--color-border)",
              background: "var(--color-card)",
              color: "var(--color-foreground)",
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
