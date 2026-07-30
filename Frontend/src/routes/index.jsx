import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppShell } from "@/components/layout";
import { useAuth } from "@/context";

const HomePage = lazy(() => import("@/pages/Home/index.jsx"));
const VehiclesPage = lazy(() => import("@/pages/Vehicles/index.jsx"));
const VehicleDetailsPage = lazy(() =>
  import("@/pages/VehicleDetails/index.jsx")
);
const LoginPage = lazy(() => import("@/pages/Login/index.jsx"));
const RegisterPage = lazy(() => import("@/pages/Register/index.jsx"));
const DashboardPage = lazy(() => import("@/pages/Dashboard/index.jsx"));
const BookingsPage = lazy(() => import("@/pages/Bookings/index.jsx"));
const ProfilePage = lazy(() => import("@/pages/Profile/index.jsx"));
const SettingsPage = lazy(() => import("@/pages/Settings/index.jsx"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/index.jsx"));

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  return null;
}

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
            </div>
          }
          key={location.pathname}
        >
          <AnimatedPage>
            <ScrollToTop />
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <BookingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatedPage>
        </Suspense>
      </AnimatePresence>
    </AppShell>
  );
}

function BrowserRoutes() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export { BrowserRoutes as Routes };
