import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-bold",
  {
    variants: {
      variant: {
        default: "bg-slate-100 text-slate-700",
        success: "bg-[#dcfce7] text-[#16A34A]",
        warning: "bg-[#fef3c7] text-[#92400e]",
        danger:  "bg-[#fee2e2] text-[#DC2626]",
        info:    "bg-[#dbeafe] text-[#2563EB]",
        navy:    "bg-[#e5e7eb] text-[#6b7280]",
        orange:  "bg-[#FEF1E8] text-[#e6670f]",
        purple:  "bg-[#ede9fe] text-[#7C3AED]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}