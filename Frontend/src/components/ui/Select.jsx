import { forwardRef } from "react";

const Select = forwardRef(({ label, id, options = [], className = "", ...props }, ref) => (
  <div className="grid gap-1.5">
    {label && (
      <label htmlFor={id} className="text-xs font-semibold text-muted tracking-wide uppercase">
        {label}
      </label>
    )}
    <select
      ref={ref}
      id={id}
      className={`w-full h-12 px-4 rounded-2xl border border-border bg-white/80 outline-none transition-all duration-300 text-sm appearance-none cursor-pointer focus:border-primary focus:ring-2 focus:ring-primary/10 ${className}`}
      {...props}
    >
      {options.map(([value, label]) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  </div>
));

Select.displayName = "Select";
export default Select;
