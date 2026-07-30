import { cn } from "@/utils/cn";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-muted/30",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
