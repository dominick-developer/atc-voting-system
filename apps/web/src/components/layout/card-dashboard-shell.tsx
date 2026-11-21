"use client";

import Link from "next/link";
import { LogOut, Home, ShieldCheck, ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const ROLE_GRADIENTS: Record<string, string> = {
  STUDENT: "from-orange-500 to-orange-600",
  CANDIDATE: "from-amber-500 to-amber-600",
  ELECTORAL_COMMISSION: "from-blue-500 to-blue-600",
  ELECTION_OFFICER: "from-emerald-500 to-emerald-600",
  OBSERVER: "from-teal-500 to-teal-600",
  SYSTEM_ADMIN: "from-violet-500 to-violet-600",
};

export interface CardDashboardShellProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  children: ReactNode;
}

export function CardDashboardShell({ title, subtitle, showBack, children }: CardDashboardShellProps) {
  const { user, logout } = useAuth();
  const role = user?.role ?? "STUDENT";
  const gradient = ROLE_GRADIENTS[role] ?? ROLE_GRADIENTS.STUDENT;
  const initials = (user?.fullName ?? "Guest").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-orange-50/40">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {showBack && (
              <button onClick={() => history.back()}
                className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-[#0a1628]">
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <Link href="/" className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#F47721] text-white text-xs font-black shadow-md shadow-orange-200">ATC</div>
              <div className="hidden sm:block">
                <p className="text-sm font-extrabold text-[#0a1628] tracking-tight">ATC DIGITAL DEMOCRACY</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">Online Voting System</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#0a1628]">
              <Home className="h-4 w-4" /> Home
            </Link>
            <button onClick={logout} className="inline-flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100">
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-10 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200/80 sm:p-8">
          <div className="flex items-center gap-5">
            <div className={cn("grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br text-2xl font-black text-white shadow-lg", gradient)}>
              {initials}
            </div>
            <div className="min-w-0">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                <ShieldCheck className="h-3 w-3" /> {role.replace("_", " ")}
              </p>
              <h1 className="mt-1.5 text-2xl font-black tracking-tight text-[#0a1628] sm:text-3xl">
                Karibu, {user?.fullName?.split(" ")[0] ?? "Guest"} 👋
              </h1>
              <p className="mt-1 text-sm text-slate-600">{subtitle ?? "What would you like to do today?"}</p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-black tracking-tight text-[#0a1628]">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">Chagua action yako hapa chini</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
        <p className="mt-12 text-center text-xs text-slate-400">
          🔒 Secure · Anonymous · Auditable · Protected by ATC Digital Democracy
        </p>
      </main>
    </div>
  );
}