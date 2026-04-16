import React from "react";
import { navigate } from "../lib/navigation";

export default function AuthShell({ badge, title, text, altLabel, altPath, children }) {
  return (
    <section className="auth-page">
      <div className="auth-intro">
        <button className="logo nav-button" type="button" onClick={() => navigate("/home")}>
          <span>r</span>rw
        </button>
        <span>{badge}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        <button className="footer-link inline-link" type="button" onClick={() => navigate(altPath)}>
          {altLabel}
        </button>
      </div>
      <div className="panel-card form-card">{children}</div>
    </section>
  );
}
