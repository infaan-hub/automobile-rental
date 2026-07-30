import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  CreditCard,
  Shield,
  Clock,
  Save,
  Edit2,
  Plus,
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import { Button, Input, Avatar, AvatarFallback, AvatarImage, Badge } from "@/components/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui";
import { FadeIn, FadeInItem } from "@/components/animations";
import { cn } from "@/utils/cn";

const savedCards = [
  { id: 1, brand: "Visa", last4: "4242", exp: "09/28", color: "from-blue-500 to-blue-700" },
  { id: 2, brand: "Mastercard", last4: "8888", exp: "12/27", color: "from-rose-500 to-rose-700" },
  { id: 3, brand: "Amex", last4: "0005", exp: "03/29", color: "from-amber-500 to-amber-700" },
];

const pastBookings = [
  { id: "BK-1019", vehicle: "Range Rover Velar", date: "Apr 10-15, 2026", price: 1875, status: "completed" },
  { id: "BK-1018", vehicle: "Tesla Model S Plaid", date: "Mar 3-8, 2026", price: 2240, status: "completed" },
  { id: "BK-1017", vehicle: "Ferrari Roma", date: "Feb 14-17, 2026", price: 4200, status: "completed" },
  { id: "BK-1016", vehicle: "Bentley Continental GT", date: "Jan 20-25, 2026", price: 5500, status: "completed" },
];

function ProfilePage() {
  const user = {
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1 (555) 123-4567",
    address: "742 Park Avenue, New York, NY 10021",
    memberSince: "January 2025",
    license: { number: "NY-DL-88492-1", expiry: "2028-06-15", country: "United States" },
  };

  const [form, setForm] = useState({ ...user });
  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
      <FadeIn stagger className="space-y-6">
        <FadeInItem>
          <div className="relative rounded-[var(--radius)] overflow-hidden h-48 md:h-56">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-600/30 to-rose-600/40" />
            <div className="absolute inset-0 bg-glass backdrop-blur-[2px]" />
            <div className="absolute inset-0 hero-gradient" />
          </div>

          <div className="relative -mt-16 flex flex-col items-center px-6">
            <Avatar className="h-28 w-28 ring-4 ring-background shadow-glass-lg">
              <AvatarImage src="" />
              <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                JW
              </AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold mt-3 gradient-text">{user.name}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <Clock className="h-3.5 w-3.5" />
              Member since {user.memberSince}
            </p>
          </div>
        </FadeInItem>

        <FadeInItem>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="personal"><User className="h-4 w-4 mr-2" />Personal Info</TabsTrigger>
              <TabsTrigger value="license"><Shield className="h-4 w-4 mr-2" />License Info</TabsTrigger>
              <TabsTrigger value="payment"><CreditCard className="h-4 w-4 mr-2" />Payment Methods</TabsTrigger>
              <TabsTrigger value="history"><Clock className="h-4 w-4 mr-2" />Booking History</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <div className="glass-card p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                    <Input value={form.name} onChange={handleChange("name")} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                    <Input value={form.email} onChange={handleChange("email")} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone</label>
                    <Input value={form.phone} onChange={handleChange("phone")} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Address</label>
                    <Input value={form.address} onChange={handleChange("address")} />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={handleSave} disabled={saved}>
                    <Save className="h-4 w-4 mr-2" />
                    {saved ? "Saved!" : "Save Changes"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="license">
              <div className="glass-card p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">License Number</label>
                    <div className="relative">
                      <Input value={user.license.number} readOnly className="pr-10" />
                      <Edit2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Expiry Date</label>
                    <Input value={user.license.expiry} readOnly />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Country</label>
                    <Input value={user.license.country} readOnly />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <Shield className="h-4 w-4 text-amber-500 shrink-0" />
                  <p className="text-xs text-muted-foreground">Your license is verified and up to date.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment">
              <div className="space-y-3">
                {savedCards.map((card) => (
                  <div key={card.id} className="glass-card p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-12 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center", card.color)}>
                        <CreditCard className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{card.brand}</p>
                        <p className="text-xs text-muted-foreground">
                          **** {card.last4} &middot; Expires {card.exp}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">Default</Badge>
                  </div>
                ))}
                <Button variant="secondary" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-3">
                {pastBookings.map((b) => (
                  <div key={b.id} className="glass-card p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{b.vehicle}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {b.date} &middot; {b.id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">${b.price.toLocaleString()}</p>
                      <Badge variant="outline" className="text-[10px] mt-1 capitalize">
                        {b.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </FadeInItem>
      </FadeIn>
    </div>
  );
}

export default ProfilePage;
