import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-300",
        "border-border focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-destructive focus:border-destructive focus:ring-destructive/30",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
