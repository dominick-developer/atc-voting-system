"use client";
import { Search } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Topbar({ title, subtitle, actions }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-white px-4 shadow-topbar sm:px-6">
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-[19px] font-extrabold text-navy">{title}</h1>
        {subtitle && <p className="truncate text-[13px] text-muted">{subtitle}</p>}
      </div>

      <div className="hidden md:flex md:items-center md:gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-64 rounded-lg border border-border bg-white pl-9 pr-3 text-sm outline-none transition focus:border-orange focus:shadow-[0_0_0_3px_rgba(244,119,33,0.1)]"
          />
        </div>
        <button className="relative grid h-10 w-10 place-items-center rounded-lg border border-border hover:bg-surface-alt transition-colors">
          <span className="text-lg" aria-hidden>🔔</span>
        </button>
      </div>

      {actions}
    </header>
  );
}