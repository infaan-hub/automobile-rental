import { forwardRef } from 'react'

const InputField = forwardRef(({ label, type = 'text', id, ...props }, ref) => (
  <div className="grid gap-2">
    <label htmlFor={id} className="text-sm font-medium text-dark/70 tracking-wide">
      {label}
    </label>
    <input
      ref={ref}
      id={id}
      type={type}
      className="w-full h-12 px-4 rounded-2xl border border-border bg-white/80 outline-none transition-all duration-300 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10"
      {...props}
    />
  </div>
))

InputField.displayName = 'InputField'
export default InputField
