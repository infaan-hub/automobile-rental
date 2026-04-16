import React from "react";
import { navigate } from "../lib/navigation";

export function PanelHeader({ badge, title, text, onLogout, showDealerLink }) {
  return (
    <header className="panel-header">
      <div>
        <span>{badge}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <div className="row-actions">
        {showDealerLink && (
          <button className="ghost-button" type="button" onClick={() => navigate("/car-dealer/login")}>
            Dealer login
          </button>
        )}
        <button className="ghost-button danger" type="button" onClick={onLogout}>
          Logout
        </button>
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
