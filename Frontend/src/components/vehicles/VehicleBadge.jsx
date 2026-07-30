import React from "react";

const labelMap = {
  luxury: { text: "Luxury", cls: "badge--luxury" },
  suv: { text: "SUV", cls: "badge--suv" },
  electric: { text: "Electric", cls: "badge--electric" },
  sports: { text: "Sports", cls: "badge--sports" },
  premium: { text: "Premium", cls: "badge--premium" },
};

export default function VehicleBadge({ type = "premium" }) {
  const cfg = labelMap[type?.toLowerCase()] || labelMap.premium;
  return <span className={`v-badge ${cfg.cls}`}>{cfg.text}</span>;
}
