import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, LayoutGrid, List, ChevronLeft, ChevronRight, X } from "lucide-react";
import { FadeIn, FadeInItem } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import VehicleCard from "@/components/vehicle/VehicleCard";
import { fetchVehicles } from "@/services/api";

const ITEMS_PER_PAGE = 6;

const BRANDS = ["Lamborghini", "Rolls-Royce", "Porsche", "Mercedes-Benz", "Ferrari", "Range Rover", "Tesla", "BMW"];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];
const TRANSMISSIONS = ["Automatic", "Manual"];

const containerVariants = {
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

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    fuel: "",
    transmission: "",
    minPrice: "",
    maxPrice: "",
  });
  const [sort, setSort] = useState("");
  const [layout, setLayout] = useState("grid");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const totalPages = Math.max(1, Math.ceil(vehicles.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const result = fetchVehicles({ search, ...filters, sort });
      setVehicles(result.data);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [search, filters, sort]);

  useEffect(() => {
    setPage(1);
  }, [search, filters, sort]);

  const paginatedVehicles = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return vehicles.slice(start, start + ITEMS_PER_PAGE);
  }, [vehicles, safePage]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ brand: "", fuel: "", transmission: "", minPrice: "", maxPrice: "" });
    setSearch("");
    setSort("");
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "") || search || sort;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-20 pt-28 md:pt-36">
        <div className="hero-gradient pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl text-center">
          <FadeIn>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium text-primary"
            >
              Premium Fleet
            </motion.span>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
              Our{" "}
              <span className="gradient-text">Collection</span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
              Explore our hand-picked selection of the world's finest automobiles. Each vehicle is maintained to perfection.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="relative -mt-10 px-4 pb-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="glass rounded-[32px] p-4 shadow-glass-lg md:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, brand, or type..."
                    className="h-11 w-full rounded-xl border-border bg-background/50 pl-10 pr-4 text-sm backdrop-blur-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button
                  variant={showFilters ? "default" : "secondary"}
                  size="sm"
                  className="h-11 gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="size-4" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
                <div className="flex rounded-xl border border-border bg-background/50">
                  <button
                    onClick={() => setLayout("grid")}
                    className={`flex h-11 w-11 items-center justify-center rounded-l-xl transition-colors ${
                      layout === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <LayoutGrid className="size-4" />
                  </button>
                  <button
                    onClick={() => setLayout("list")}
                    className={`flex h-11 w-11 items-center justify-center rounded-r-xl transition-colors ${
                      layout === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="size-4" />
                  </button>
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-11 rounded-xl border border-border bg-background/50 px-4 text-sm text-foreground transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                >
                  <option value="">Sort by</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 grid grid-cols-2 gap-3 overflow-hidden md:grid-cols-4"
                >
                  <select
                    value={filters.brand}
                    onChange={(e) => handleFilterChange("brand", e.target.value)}
                    className="h-11 rounded-xl border border-border bg-background/50 px-4 text-sm text-foreground transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="">All Brands</option>
                    {BRANDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  <select
                    value={filters.fuel}
                    onChange={(e) => handleFilterChange("fuel", e.target.value)}
                    className="h-11 rounded-xl border border-border bg-background/50 px-4 text-sm text-foreground transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="">All Fuel Types</option>
                    {FUEL_TYPES.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                  <select
                    value={filters.transmission}
                    onChange={(e) => handleFilterChange("transmission", e.target.value)}
                    className="h-11 rounded-xl border border-border bg-background/50 px-4 text-sm text-foreground transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="">All Transmissions</option>
                    {TRANSMISSIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min $"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                      className="h-11 w-full rounded-xl border border-border bg-background/50 px-4 text-sm text-foreground transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground/60"
                    />
                    <span className="text-muted-foreground">-</span>
                    <input
                      type="number"
                      placeholder="Max $"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                      className="h-11 w-full rounded-xl border border-border bg-background/50 px-4 text-sm text-foreground transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground/60"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 pb-24 pt-8">
        <div className="mx-auto max-w-7xl">
          {hasActiveFilters && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {filters.brand && (
                <Badge variant="secondary" className="gap-1">
                  {filters.brand}
                  <button onClick={() => handleFilterChange("brand", "")}><X className="size-3" /></button>
                </Badge>
              )}
              {filters.fuel && (
                <Badge variant="secondary" className="gap-1">
                  {filters.fuel}
                  <button onClick={() => handleFilterChange("fuel", "")}><X className="size-3" /></button>
                </Badge>
              )}
              {filters.transmission && (
                <Badge variant="secondary" className="gap-1">
                  {filters.transmission}
                  <button onClick={() => handleFilterChange("transmission", "")}><X className="size-3" /></button>
                </Badge>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <Badge variant="secondary" className="gap-1">
                  ${filters.minPrice || 0} - ${filters.maxPrice || "∞"}
                  <button onClick={() => { handleFilterChange("minPrice", ""); handleFilterChange("maxPrice", ""); }}><X className="size-3" /></button>
                </Badge>
              )}
              {search && (
                <Badge variant="secondary" className="gap-1">
                  "{search}"
                  <button onClick={() => setSearch("")}><X className="size-3" /></button>
                </Badge>
              )}
              <button
                onClick={clearFilters}
                className="ml-2 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Clear all
              </button>
            </div>
          )}

          {loading ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={layout === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-6"}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div key={i} variants={itemVariants} className={layout === "list" ? "flex" : ""}>
                  <Skeleton className={layout === "grid" ? "aspect-[4/3] w-full rounded-2xl" : "h-48 w-72 shrink-0 rounded-2xl"} />
                  <div className="space-y-3 p-5 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-8 w-28" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : vehicles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent">
                <Search className="size-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">No vehicles found</h3>
              <p className="mb-6 max-w-md text-sm text-muted-foreground">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={layout === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-6"}
              >
                {paginatedVehicles.map((vehicle, i) => (
                  <motion.div key={vehicle.id} variants={itemVariants}>
                    <VehicleCard vehicle={vehicle} index={i} layout={layout} />
                  </motion.div>
                ))}
              </motion.div>

              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={safePage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="h-10 w-10 p-0"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={p === safePage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                      className="h-10 w-10 p-0"
                    >
                      {p}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={safePage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="h-10 w-10 p-0"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
