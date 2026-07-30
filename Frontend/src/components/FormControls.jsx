import React from "react";

function getIcon(label, type) {
  const lower = `${label} ${type}`.toLowerCase();
  if (lower.includes("password")) return "◌";
  if (lower.includes("email")) return "@";
  if (lower.includes("time")) return "◷";
  if (lower.includes("name")) return "◉";
  return "•";
}

export function Field({ label, value, onChange, type = "text" }) {
  return (
    <label className="field">
      <span className="sr-only">{label}</span>
      <div className="field-shell">
        <b>{getIcon(label, type)}</b>
        <input type={type} placeholder={label} value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    </label>
  );
}

export function Area({ label, value, onChange }) {
  return (
    <label className="field">
      <span className="sr-only">{label}</span>
      <div className="field-shell area-shell">
        <b>≡</b>
        <textarea placeholder={label} value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    </label>
  );
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <label className="field">
      <span className="sr-only">{label}</span>
      <div className="field-shell">
        <b>▾</b>
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map(([optionValue, optionLabel]) => (
            <option key={`${label}-${optionValue}`} value={optionValue}>
              {optionLabel}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}
