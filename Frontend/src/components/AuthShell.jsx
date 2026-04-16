import React from "react";
import { navigate } from "../lib/navigation";

export default function AuthShell({ badge, title, text, altLabel, altPath, children }) {
  return (
    <section className="auth-page">
      <div className="auth-stage">
        <div className="auth-backdrop" />
        <div className="auth-overlay" />
        <div className="auth-intro">
          <button className="logo nav-button auth-home-link" type="button" onClick={() => navigate("/home")}>
            <span>r</span>rw
          </button>
          <p>Hi, Welcome to</p>
          <h1>Cobra.</h1>
          <small>{badge}</small>
        </div>
        <img
          className="auth-floating-car"
          src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=80"
          alt="Sport wagon on a dark road"
        />
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
              <p>Or</p>
              <span />
            </div>
            <div className="auth-fingerprint">
              <div className="auth-fingerprint-icon">✣</div>
              <small>use Fingerprint</small>
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
