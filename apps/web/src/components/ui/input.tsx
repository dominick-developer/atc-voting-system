import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-lg border border-border bg-white px-3.5 py-3 text-[16px] text-foreground",
        "placeholder:text-muted/60 transition-colors",
        "focus-visible:outline-none focus-visible:border-orange focus-visible:shadow-[0_0_0_3px_rgba(244,119,33,0.1)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";