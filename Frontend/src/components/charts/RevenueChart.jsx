"use client";

import { useTheme } from "next-themes";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 18500 },
  { month: "Feb", revenue: 22300 },
  { month: "Mar", revenue: 19800 },
  { month: "Apr", revenue: 27600 },
  { month: "May", revenue: 30200 },
  { month: "Jun", revenue: 28900 },
  { month: "Jul", revenue: 34500 },
  { month: "Aug", revenue: 38200 },
  { month: "Sep", revenue: 35900 },
  { month: "Oct", revenue: 41100 },
  { month: "Nov", revenue: 39800 },
  { month: "Dec", revenue: 45200 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card !shadow-glass-lg px-4 py-2.5 text-sm">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="font-semibold text-foreground">
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

function RevenueChart() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-base">Revenue Overview</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monthly revenue in {new Date().getFullYear()}
          </p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.5 0.15 270)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="oklch(0.5 0.15 270)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "oklch(1 0 0 / 0.05)" : "oklch(0 0 0 / 0.05)"}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "oklch(0.55 0.015 270)" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "oklch(0.55 0.015 270)" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="oklch(0.5 0.15 270)"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              dot={false}
              activeDot={{ r: 5, fill: "oklch(0.5 0.15 270)", stroke: "oklch(1 0 0)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export { RevenueChart };
