import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/dashboard", { replace: true });
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/40" />
        <div className="absolute inset-0 hero-gradient opacity-30" />
        <div className="relative flex h-full flex-col items-center justify-center p-12 text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mx-auto mb-8 flex h-48 w-48 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl">
              <div className="text-8xl font-black tracking-tight">rw</div>
            </div>
            <h2 className="mb-4 text-3xl font-bold">Experience luxury.</h2>
            <h2 className="text-3xl font-bold">Drive excellence.</h2>
            <p className="mx-auto mt-6 max-w-sm text-base text-white/70">
              Access the world's finest automobile collection. Book your dream drive today.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <motion.div variants={itemVariants} className="mb-2 text-center lg:text-left">
            <div className="mb-6 flex items-center justify-center lg:justify-start">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-bold">
                rw
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to access your account
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <motion.div variants={itemVariants}>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email}
                  className="h-12 pl-11"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="mb-1.5 block text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  error={errors.password}
                  className="h-12 pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-destructive">{errors.password.message}</p>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 text-sm">
                <input
                  {...register("remember")}
                  type="checkbox"
                  className="size-4 rounded border-border bg-transparent text-primary focus:ring-primary/30"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Forgot password?
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full gap-2 text-base"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
                <ArrowRight className="size-4" />
              </Button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-6">
            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-xs text-muted-foreground">
                or continue with
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6">
            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full gap-3"
              type="button"
            >
              <svg className="size-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              Create one
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
