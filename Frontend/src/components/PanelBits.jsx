import React from "react";

export function PanelHeader({ badge, title, text }) {
  return (
    <header className="panel-header">
      <div>
        <span>{badge}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </header>
  );
}

export function Metric({ label, value }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
