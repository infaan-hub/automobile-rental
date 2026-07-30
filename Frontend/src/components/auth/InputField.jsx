import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";

const iconMap = {
  email: Mail,
  password: Lock,
  name: User,
  username: User,
  phone: Phone,
  text: User,
};

export default function InputField({ label, type = "text", value, onChange, icon }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const IconComponent = iconMap[icon || (isPassword ? "password" : label?.toLowerCase())] || User;

  return (
    <div className="lux-input-wrap">
      <div className="lux-input-group">
        <IconComponent className="lux-input-icon" />
        <input
          className="lux-input"
          type={isPassword && show ? "text" : type}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
        />
        {isPassword && (
          <button
            className="lux-pw-toggle"
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    </div>
  );
}
