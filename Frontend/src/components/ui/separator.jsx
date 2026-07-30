import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Separator = forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
    const Component = decorative ? "div" : "hr";
    return (
      <Component
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={!decorative ? orientation : undefined}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

export { Separator };
