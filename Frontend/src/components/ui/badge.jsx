import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm",
        secondary:
          "border-transparent bg-accent text-accent-foreground",
        outline: "text-foreground",
        premium:
          "border-transparent bg-gradient-to-r from-amber-400 to-yellow-600 text-white shadow-sm",
      },
      size: {
        sm: "px-2 py-0 text-[10px]",
        default: "px-3 py-0.5 text-xs",
        lg: "px-4 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Badge({ className, variant, size, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
