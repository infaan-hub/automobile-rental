import React, { useEffect, useState } from "react";
import Notice from "../components/Notice";
import { apiRequest } from "../lib/api";
import { CUSTOMER_TOKEN_KEY } from "../lib/config";
import { money, moneyAmount } from "../lib/formatters";
import { navigate } from "../lib/navigation";
import BackgroundShapes from "../components/ui/BackgroundShapes";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import StatsCard from "../components/ui/StatsCard";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import { Car, Eye, ArrowRight } from "lucide-react";

export default function CustomerDashboardPage() {
  const token = localStorage.getItem(CUSTOMER_TOKEN_KEY) || "";
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        setData(await apiRequest("/customer/dashboard/", {}, token));
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, [token]);

  if (!data) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Loader text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg relative">
      <BackgroundShapes />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <PageHeader badge="Customer" title={`Welcome ${data.user.firstName || data.user.username}`} text="Browse dealer-posted vehicles, compare details, and move straight into the rental flow." />

        <Notice error={error} />

        <GlassCard className="p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Your Bookings</p>
            <p className="text-3xl font-bold mt-1">{data.bookings.length}</p>
          </div>
          <Button variant="secondary" onClick={() => navigate("/home")}>Back Home</Button>
        </GlassCard>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Available Vehicles</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.vehicles.map((vehicle) => (
              <GlassCard key={vehicle.id} className="p-5">
                <button onClick={() => navigate(`/view?vehicle=${vehicle.id}`)} className="w-full mb-4">
                  <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-36 object-contain rounded-2xl bg-bg" />
                </button>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">{vehicle.bodyTypeLabel}</p>
                  <h3 className="font-bold text-base mt-1">{vehicle.name}</h3>
                  <p className="text-xs text-muted mt-1 line-clamp-2">{vehicle.description || `${vehicle.brand} ${vehicle.model} | ${vehicle.transmission} | ${vehicle.fuelType}`}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{money(vehicle.dailyRate)}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => navigate(`/view?vehicle=${vehicle.id}`)}><Eye size={16} /> View</Button>
                    <Button onClick={() => navigate(`/rent?vehicle=${vehicle.id}`)}>Rent <ArrowRight size={16} /></Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Recent Bookings</h2>
          </div>
          {data.bookings.length ? (
            <div className="grid gap-3">
              {data.bookings.map((booking) => (
                <GlassCard key={booking.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {booking.vehicle.imageUrl && (
                      <img src={booking.vehicle.imageUrl} alt="" className="w-16 h-12 rounded-xl object-cover bg-bg shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-bold">#{booking.id} {booking.vehicle.name}</p>
                      <p className="text-xs text-muted">{booking.pickupDate} to {booking.returnDate}</p>
                      <span className="text-xs font-semibold text-primary">{booking.status} | {booking.returnLocation}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary shrink-0">{moneyAmount(booking.totalCost)}</span>
                </GlassCard>
              ))}
            </div>
          ) : (
            <EmptyState message="No bookings yet. Your rentals will appear here after checkout." />
          )}
        </div>
      </div>
    </main>
  );
}
