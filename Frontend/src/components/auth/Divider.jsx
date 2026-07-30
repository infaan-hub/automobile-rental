import React from "react";

export default function Divider({ text = "or continue with" }) {
  return (
    <div className="lux-divider">
      <span className="lux-divider-line" />
      <span className="lux-divider-text">{text}</span>
      <span className="lux-divider-line" />
    </div>
  );
}
