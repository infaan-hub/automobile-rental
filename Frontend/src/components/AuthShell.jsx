import React from "react";
import VideoBackground from "./VideoBackground";
import { navigate } from "../lib/navigation";

export default function AuthShell({ badge, title, text, altLabel, altPath, children }) {
  return (
    <section className="auth-page">
      <VideoBackground name="auth" />
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
        <div className="auth-card">
          <div className="auth-card-inner">
            <div className="auth-copy">
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
            {children}
          </div>
        </div>
        <button className="footer-link inline-link auth-alt-link" type="button" onClick={() => navigate(altPath)}>
          {altLabel}
        </button>
      </div>
    </section>
  );
}
