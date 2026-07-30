import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Star,
  Heart,
  Fuel,
  Gauge,
  Users,
  Calendar,
  Check,
  ChevronRight,
} from "lucide-react";
import { FadeIn, FadeInItem } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import VehicleCard from "@/components/vehicle/VehicleCard";
import { fetchVehicleById, fetchSimilarVehicles } from "@/services/api";

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setLoading(true);
    setActiveImage(0);
    const timer = setTimeout(() => {
      try {
        const result = fetchVehicleById(id);
        setVehicle(result.data);
        const similarResult = fetchSimilarVehicles(result.data);
        setSimilar(similarResult.data);
      } catch {
        navigate("/vehicles", { replace: true });
      }
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen px-4 pb-24 pt-28">
        <div className="mx-auto max-w-7xl">
          <Skeleton className="mb-8 h-6 w-32" />
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div>
              <Skeleton className="aspect-[16/9] w-full rounded-3xl" />
              <div className="mt-4 flex gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[4/3] w-24 rounded-xl" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-36" />
              <Skeleton className="h-40 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) return null;

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto max-w-7xl px-4 pt-28">
        <FadeIn>
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Back
          </button>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="overflow-hidden rounded-3xl border border-border">
              <div className="aspect-[16/9] overflow-hidden bg-accent">
                <img
                  src={vehicle.images[activeImage]}
                  alt={vehicle.name}
                  className="h-full w-full object-cover transition-all duration-500"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3 overflow-x-auto pb-2">
              {vehicle.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    i === activeImage
                      ? "border-primary opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="aspect-[4/3] w-24 object-cover"
                  />
                </button>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="premium" size="lg">{vehicle.type}</Badge>
                <Badge variant="secondary">{vehicle.year}</Badge>
                <StarRating rating={vehicle.rating} />
              </div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {vehicle.brand}
              </p>
              <h1 className="text-3xl font-bold md:text-4xl">{vehicle.name}</h1>
              <p className="text-base leading-relaxed text-muted-foreground">
                {vehicle.description}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
            >
              {[
                { icon: Gauge, label: "Transmission", value: vehicle.transmission },
                { icon: Fuel, label: "Fuel Type", value: vehicle.fuel },
                { icon: Users, label: "Seats", value: `${vehicle.seats} seats` },
                { icon: Calendar, label: "Year", value: vehicle.year },
                { icon: Gauge, label: "Mileage", value: vehicle.mileage },
              ].map((spec, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-4 text-center"
                >
                  <spec.icon className="mx-auto mb-2 size-5 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{spec.label}</p>
                  <p className="mt-0.5 text-sm font-semibold">{spec.value}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="mb-4 text-xl font-semibold">Features</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {vehicle.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-primary/10">
                      <Check className="size-3.5 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="mb-6 text-xl font-semibold">Reviews</h2>
              <div className="space-y-4">
                {vehicle.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="glass rounded-2xl p-5"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="text-xs">
                          {review.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="ml-auto">
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-3xl p-6 shadow-glass-lg"
            >
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">Price per day</p>
                <p className="text-4xl font-bold">
                  ${vehicle.price}
                  <span className="text-base font-normal text-muted-foreground">/day</span>
                </p>
              </div>

              <div className="mb-6 space-y-3">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Calendar className="size-3.5" /> Pickup Date
                  </label>
                  <input
                    type="date"
                    className="flex h-11 w-full rounded-xl border border-border bg-background/50 px-4 text-sm text-foreground transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Calendar className="size-3.5" /> Return Date
                  </label>
                  <input
                    type="date"
                    className="flex h-11 w-full rounded-xl border border-border bg-background/50 px-4 text-sm text-foreground transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Button size="lg" className="w-full gap-2 text-base">
                  Rent Now
                  <ChevronRight className="size-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full gap-2"
                  onClick={() => setFavorited(!favorited)}
                >
                  <Heart
                    className={`size-4 transition-colors ${
                      favorited ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {favorited ? "Favorited" : "Add to Favorites"}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="mt-20">
            <FadeIn>
              <h2 className="mb-8 text-2xl font-bold">Similar Vehicles</h2>
            </FadeIn>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((v, i) => (
                <FadeInItem key={v.id}>
                  <VehicleCard vehicle={v} index={i} />
                </FadeInItem>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
