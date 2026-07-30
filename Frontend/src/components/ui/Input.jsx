import { forwardRef } from "react";

const Input = forwardRef(({ label, type = "text", id, icon, className = "", ...props }, ref) => (
  <div className="grid gap-1.5">
    {label && (
      <label htmlFor={id} className="text-xs font-semibold text-muted tracking-wide uppercase">
        {label}
      </label>
    )}
    <div className="relative">
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">{icon}</span>
      )}
      {type === "textarea" ? (
        <textarea
          ref={ref}
          id={id}
          className={`w-full min-h-[92px] px-4 py-3 rounded-2xl border border-border bg-white/80 outline-none transition-all duration-300 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 resize-y ${icon ? "pl-10" : ""} ${className}`}
          {...props}
        />
      ) : (
        <input
          ref={ref}
          id={id}
          type={type}
          className={`w-full h-12 px-4 rounded-2xl border border-border bg-white/80 outline-none transition-all duration-300 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 ${icon ? "pl-10" : ""} ${className}`}
          {...props}
        />
      )}
    </div>
  </div>
));

Input.displayName = "Input";
export default Input;
