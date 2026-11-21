"use client";

import Link from "next/link";
import { ArrowLeft, Home, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import type { NavItem } from "./sidebar";
import type { ReactNode } from "react";

interface DashboardShellProps {
  nav?: NavItem[];
  subtitle?: string;
  roleLabel?: string;
  title: string;
  topbarSubtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  showBack?: boolean;
}

export function DashboardShell({
  subtitle,
  roleLabel,
  title,
  topbarSubtitle,
  actions,
  children,
  showBack = true,
}: DashboardShellProps) {
  const { user, logout } = useAuth();
  const displayName = user?.fullName ?? "Guest";
  const role = user?.role ?? roleLabel ?? "STUDENT";
  const initials = displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-orange-50/40">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={() => history.back()}
                className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-[#0a1628]"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <Link href="/" className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#F47721] text-white text-xs font-black shadow-md shadow-orange-200">
                ATC
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-extrabold text-[#0a1628] tracking-tight">
                  ATC DIGITAL DEMOCRACY
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">
                  {subtitle ?? "Online Voting System"}
                </p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#0a1628]"
            >
              <Home className="h-4 w-4" /> Home
            </Link>
            <div className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-[#F47721] text-[10px] font-black text-white">
                {initials}
              </div>
              <div>
                <p className="text-xs font-bold text-[#0a1628] leading-tight">{displayName}</p>
                <p className="text-[10px] text-slate-500 leading-tight">
                  {role.replace(/_/g, " ")}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-black tracking-tight text-[#0a1628] sm:text-3xl">
              {title}
            </h1>
            {topbarSubtitle && (
              <p className="mt-1 text-sm text-slate-500">{topbarSubtitle}</p>
            )}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
        {children}
        <p className="mt-12 text-center text-xs text-slate-400">
          🔒 Secure · Anonymous · Auditable · Protected by ATC Digital Democracy
        </p>
      </main>
    </div>
  );
}