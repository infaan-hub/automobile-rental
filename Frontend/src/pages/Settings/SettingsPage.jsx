import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Shield,
  Bell,
  Palette,
  Eye,
  Moon,
  Sun,
  Monitor,
  Save,
  Check,
} from "lucide-react";
import { Button, Input } from "@/components/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui";
import { useTheme } from "next-themes";
import { FadeIn, FadeInItem } from "@/components/animations";
import { cn } from "@/utils/cn";

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          checked ? "bg-primary" : "bg-accent"
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-sm ring-0 transition-transform duration-200",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-11 w-full rounded-xl border border-border bg-transparent px-4 py-2 text-sm text-foreground transition-all duration-300 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const sections = {
  general: {
    icon: Globe,
    label: "General",
    fields: [
      { label: "Site Language", key: "language", options: [
        { value: "en", label: "English" },
        { value: "es", label: "Spanish" },
        { value: "fr", label: "French" },
        { value: "de", label: "German" },
      ]},
      { label: "Timezone", key: "timezone", options: [
        { value: "est", label: "Eastern Time (EST)" },
        { value: "pst", label: "Pacific Time (PST)" },
        { value: "cst", label: "Central Time (CST)" },
        { value: "gmt", label: "Greenwich Mean Time (GMT)" },
      ]},
      { label: "Currency", key: "currency", options: [
        { value: "usd", label: "USD ($)" },
        { value: "eur", label: "EUR (€)" },
        { value: "gbp", label: "GBP (£)" },
        { value: "aed", label: "AED (د.إ)" },
      ]},
    ],
  },
  security: {
    icon: Shield,
    label: "Security",
    type: "password",
  },
  notifications: {
    icon: Bell,
    label: "Notifications",
    type: "toggles",
    toggles: [
      { key: "email", label: "Email Notifications", description: "Receive booking confirmations and offers via email" },
      { key: "sms", label: "SMS Notifications", description: "Get text alerts for booking updates" },
      { key: "push", label: "Push Notifications", description: "Receive real-time alerts in your browser" },
    ],
  },
  appearance: {
    icon: Palette,
    label: "Appearance",
    type: "appearance",
  },
  privacy: {
    icon: Eye,
    label: "Privacy",
    type: "toggles",
    toggles: [
      { key: "visibility", label: "Profile Visibility", description: "Allow other users to see your profile" },
      { key: "onlineStatus", label: "Show Online Status", description: "Display when you're active on the platform" },
      { key: "shareData", label: "Share Usage Data", description: "Help us improve with anonymous usage data" },
    ],
  },
};

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [general, setGeneral] = useState({ language: "en", timezone: "est", currency: "usd" });
  const [password, setPassword] = useState({ current: "", newPass: "", confirm: "" });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [privacy, setPrivacy] = useState({
    visibility: true,
    onlineStatus: true,
    shareData: false,
  });
  const [fontSize, setFontSize] = useState("medium");
  const [saved, setSaved] = useState({});

  const handleSave = (section) => {
    setSaved((prev) => ({ ...prev, [section]: true }));
    setTimeout(() => setSaved((prev) => ({ ...prev, [section]: false })), 2000);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <FadeIn stagger className="space-y-6">
        <FadeInItem>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account preferences and configuration.
            </p>
          </div>
        </FadeInItem>

        <FadeInItem>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              {Object.entries(sections).map(([key, section]) => (
                <TabsTrigger key={key} value={key}>
                  <section.icon className="h-4 w-4 mr-2" />
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="general">
              <div className="glass-card p-6 space-y-5">
                {sections.general.fields.map((field) => (
                  <Select
                    key={field.key}
                    label={field.label}
                    value={general[field.key]}
                    options={field.options}
                    onChange={(v) => setGeneral((prev) => ({ ...prev, [field.key]: v }))}
                  />
                ))}
                <div className="flex justify-end pt-2">
                  <Button onClick={() => handleSave("general")} disabled={saved.general}>
                    <Save className="h-4 w-4 mr-2" />
                    {saved.general ? "Saved!" : "Save Changes"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="glass-card p-6 space-y-5">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Current Password</label>
                    <Input type="password" value={password.current} onChange={(e) => setPassword((p) => ({ ...p, current: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">New Password</label>
                    <Input type="password" value={password.newPass} onChange={(e) => setPassword((p) => ({ ...p, newPass: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Confirm New Password</label>
                    <Input type="password" value={password.confirm} onChange={(e) => setPassword((p) => ({ ...p, confirm: e.target.value }))} />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Toggle
                    label="Two-Factor Authentication"
                    description="Add an extra layer of security to your account"
                    checked={false}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => handleSave("security")} disabled={saved.security}>
                    <Save className="h-4 w-4 mr-2" />
                    {saved.security ? "Saved!" : "Update Password"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div className="glass-card p-6 space-y-5">
                {sections.notifications.toggles.map((t) => (
                  <Toggle
                    key={t.key}
                    label={t.label}
                    description={t.description}
                    checked={notifications[t.key]}
                    onChange={(v) => setNotifications((prev) => ({ ...prev, [t.key]: v }))}
                  />
                ))}
                <div className="flex justify-end pt-2">
                  <Button onClick={() => handleSave("notifications")} disabled={saved.notifications}>
                    <Save className="h-4 w-4 mr-2" />
                    {saved.notifications ? "Saved!" : "Save Preferences"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance">
              <div className="glass-card p-6 space-y-6">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-3 block">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "light", icon: Sun, label: "Light" },
                      { value: "dark", icon: Moon, label: "Dark" },
                      { value: "system", icon: Monitor, label: "System" },
                    ].map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setTheme(t.value)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300",
                          theme === t.value
                            ? "border-primary/50 bg-primary/5 shadow-sm"
                            : "border-border hover:border-muted-foreground/30 bg-accent/30"
                        )}
                      >
                        <t.icon className={cn("h-5 w-5", theme === t.value ? "text-primary" : "text-muted-foreground")} />
                        <span className={cn("text-xs font-medium", theme === t.value ? "text-foreground" : "text-muted-foreground")}>
                          {t.label}
                        </span>
                        {theme === t.value && <Check className="h-3 w-3 text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
                <Select
                  label="Font Size"
                  value={fontSize}
                  options={[
                    { value: "small", label: "Small" },
                    { value: "medium", label: "Medium" },
                    { value: "large", label: "Large" },
                  ]}
                  onChange={setFontSize}
                />
                <div className="flex justify-end pt-2">
                  <Button onClick={() => handleSave("appearance")} disabled={saved.appearance}>
                    <Save className="h-4 w-4 mr-2" />
                    {saved.appearance ? "Saved!" : "Save Changes"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy">
              <div className="glass-card p-6 space-y-5">
                {sections.privacy.toggles.map((t) => (
                  <Toggle
                    key={t.key}
                    label={t.label}
                    description={t.description}
                    checked={privacy[t.key]}
                    onChange={(v) => setPrivacy((prev) => ({ ...prev, [t.key]: v }))}
                  />
                ))}
                <div className="flex justify-end pt-2">
                  <Button onClick={() => handleSave("privacy")} disabled={saved.privacy}>
                    <Save className="h-4 w-4 mr-2" />
                    {saved.privacy ? "Saved!" : "Save Preferences"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </FadeInItem>
      </FadeIn>
    </div>
  );
}

export default SettingsPage;
