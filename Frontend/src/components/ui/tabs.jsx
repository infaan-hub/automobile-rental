import { forwardRef, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef(({ className, ...props }, ref) => {
  const [activeRect, setActiveRect] = useState(null);
  const [canAnimate, setCanAnimate] = useState(false);

  const handleUpdate = (node) => {
    if (node) {
      const activeChild = node.querySelector('[data-state="active"]');
      if (activeChild) {
        const rect = {
          left: activeChild.offsetLeft,
          width: activeChild.offsetWidth,
          height: activeChild.offsetHeight,
          top: activeChild.offsetTop,
        };
        setActiveRect(rect);
        requestAnimationFrame(() => setCanAnimate(true));
      }
    }
  };

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "relative inline-flex h-11 items-center rounded-xl bg-accent p-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      {activeRect && (
        <motion.div
          className="absolute rounded-lg bg-background shadow-sm"
          animate={{
            left: activeRect.left,
            width: activeRect.width,
            height: activeRect.height,
            top: activeRect.top,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            duration: canAnimate ? undefined : 0,
          }}
        />
      )}
      <div ref={handleUpdate} className="relative flex w-full">
        {props.children}
      </div>
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
      "data-[state=active]:text-foreground",
      "data-[state=inactive]:text-muted-foreground hover:text-foreground/80",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
