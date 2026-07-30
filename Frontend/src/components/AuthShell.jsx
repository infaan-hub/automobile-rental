import React from "react";
import AuthLayout from "./auth/AuthLayout";
import { navigate } from "../lib/navigation";

export default function AuthShell({ badge, title, text, altLabel, altPath, children }) {
  return (
    <AuthLayout badge={badge}>
      <div className="lux-card-logo">
        <button type="button" onClick={() => navigate("/home")}><span>r</span>rw</button>
      </div>
      <div className="lux-card-header">
        <h2 className="lux-card-title">{title}</h2>
        <p className="lux-card-sub">{text}</p>
      </div>
      {children}
      <div className="lux-alt-wrap">
        <span className="lux-alt-text">{altLabel}</span>
        <button className="lux-alt-link" type="button" onClick={() => navigate(altPath)}>
          {altPath?.includes("register") ? "Register" : "Login"}
        </button>
      </div>
    </AuthLayout>
  );
}
