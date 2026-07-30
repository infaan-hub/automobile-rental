import React from "react";

export default function SectionHeader({ title, subtitle, action, actionLabel }) {
  return (
    <div className="v-section-head">
      <div>
        <h2 className="v-section-title">{title}</h2>
        {subtitle && <p className="v-section-sub">{subtitle}</p>}
      </div>
      {action && (
        <button className="v-section-action" type="button" onClick={action}>
          {actionLabel || "View All"}
        </button>
      )}
    </div>
  );
}
