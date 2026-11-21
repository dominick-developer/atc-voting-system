"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-orange text-white hover:bg-orange-hover shadow-sm",
        orange:  "bg-orange text-white hover:bg-orange-hover shadow-sm",
        navy:    "bg-navy text-white hover:bg-navy-900 shadow-sm",
        outline: "border border-border bg-white text-navy hover:bg-surface-alt",
        secondary:"border border-border bg-white text-navy hover:bg-surface-alt",
        ghost:   "text-navy hover:bg-surface-alt2",
        danger:  "bg-danger text-white hover:bg-red-700",
        success: "bg-success text-white hover:bg-green-700",
      },
      size: {
        sm: "h-8 px-3.5 text-[14px]",
        md: "h-11 px-[22px]",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "orange", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";