"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TONES = {
  orange:  { icon: "bg-orange-100 text-orange-600 ring-orange-200",   hover: "hover:border-orange-300 hover:shadow-orange-200/50" },
  blue:    { icon: "bg-blue-100 text-blue-600 ring-blue-200",         hover: "hover:border-blue-300 hover:shadow-blue-200/50" },
  emerald: { icon: "bg-emerald-100 text-emerald-600 ring-emerald-200", hover: "hover:border-emerald-300 hover:shadow-emerald-200/50" },
  purple:  { icon: "bg-violet-100 text-violet-600 ring-violet-200",   hover: "hover:border-violet-300 hover:shadow-violet-200/50" },
  amber:   { icon: "bg-amber-100 text-amber-600 ring-amber-200",      hover: "hover:border-amber-300 hover:shadow-amber-200/50" },
  teal:    { icon: "bg-teal-100 text-teal-600 ring-teal-200",         hover: "hover:border-teal-300 hover:shadow-teal-200/50" },
  slate:   { icon: "bg-slate-100 text-slate-600 ring-slate-200",      hover: "hover:border-slate-300 hover:shadow-slate-200/50" },
} as const;

export type CardTone = keyof typeof TONES;

export interface DashboardCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description?: string;
  tone?: CardTone;
  badge?: string;
  featured?: boolean;
}

export function DashboardCard({
  href, icon: Icon, title, description, tone = "orange", badge, featured,
}: DashboardCardProps) {
  const t = TONES[tone] ?? TONES.orange;
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-4 rounded-3xl border-2 border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
        t.hover,
        featured && "sm:col-span-2 sm:flex-row sm:items-center"
      )}
    >
      {badge && (
        <span className="absolute right-5 top-5 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-orange-200">
          {badge}
        </span>
      )}
      <div className={cn("grid h-14 w-14 shrink-0 place-items-center rounded-2xl ring-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3", t.icon)}>
        <Icon className="h-7 w-7" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-black tracking-tight text-[#0a1628]">{title}</h3>
          <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 text-slate-500" />
        </div>
        {description && (
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
        )}
      </div>
    </Link>
  );
}
