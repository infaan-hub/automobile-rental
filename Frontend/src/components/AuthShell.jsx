import React from "react";
import { homeHeroImage } from "../lib/data";
import { navigate } from "../lib/navigation";

export default function AuthShell({ badge, title, text, altLabel, altPath, children }) {
  return (
    <section className="auth-page">
      <div className="auth-backdrop" />
      <div className="auth-overlay" />
      <div className="auth-stage">
        <div className="auth-intro">
          <button className="logo nav-button auth-home-link" type="button" onClick={() => navigate("/home")}>
            <span>r</span>rw
          </button>
          <p>Welcome to</p>
          <h1>Cobra.</h1>
          <small>{badge}</small>
        </div>
        <img className="auth-floating-car" src={homeHeroImage} alt="" />
        <div className="auth-card">
          <div className="auth-card-glow" />
          <div className="auth-card-inner">
            <div className="auth-copy">
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
            {children}
            <div className="auth-divider">
              <span />
              <p>or</p>
              <span />
            </div>
            <div className="auth-fingerprint">
              <span className="auth-fingerprint-icon">🖐</span>
              <small>Secured with 256‑bit encryption</small>
            </div>
          </div>
        </div>
        <button className="footer-link inline-link auth-alt-link" type="button" onClick={() => navigate(altPath)}>
          {altLabel}
        </button>
      </div>
    </section>
  );
}
