"use client";

import Link from "next/link";
import {
  Vote, LayoutDashboard, ScrollText, Megaphone, Users,
  ArrowRight, Lock, Sparkles,
} from "lucide-react";
import { isElectionActive } from "@/lib/election-status";

type Tile = {
  label: string;
  description: string;
  href: string;
  icon: typeof Vote;
  tone: "orange" | "blue" | "green" | "purple" | "yellow";
  requiresActive?: boolean;
};

const TILES: Tile[] = [
  {
    label: "Current Elections",
    description: "Vote or view live election status",
    href: "/vote/wizard?electionId=soateco-2026",
    icon: Vote,
    tone: "orange",
  },
  {
    label: "Go to My Dashboard",
    description: "Voting status, notifications, results",
    href: "/dashboard",
    icon: LayoutDashboard,
    tone: "blue",
  },
  {
    label: "Read Election Regulations",
    description: "Official SOATECO rules and procedures",
    href: "#guidelines",
    icon: ScrollText,
    tone: "green",
  },
  {
    label: "View Campaigns",
    description: "Meet the candidates and their manifestos",
    href: "/candidates",
    icon: Megaphone,
    tone: "purple",
    requiresActive: true,
  },
  {
    label: "View Candidates",
    description: "Browse approved candidates for each position",
    href: "/candidates",
    icon: Users,
    tone: "yellow",
    requiresActive: true,
  },
];

const TONE: Record<Tile["tone"], { iconBg: string; iconColor: string; ring: string; hoverBorder: string }> = {
  orange: {
    iconBg:      "bg-[#F47721]/10",
    iconColor:   "text-[#F47721]",
    ring:        "ring-[#F47721]/30",
    hoverBorder: "hover:border-[#F47721]/50",
  },
  blue: {
    iconBg:      "bg-[#1e40af]/10",
    iconColor:   "text-[#1e40af]",
    ring:        "ring-[#1e40af]/30",
    hoverBorder: "hover:border-[#1e40af]/50",
  },
  green: {
    iconBg:      "bg-[#16A36A]/10",
    iconColor:   "text-[#16A36A]",
    ring:        "ring-[#16A36A]/30",
    hoverBorder: "hover:border-[#16A36A]/50",
  },
  purple: {
    iconBg:      "bg-[#7C3AED]/10",
    iconColor:   "text-[#7C3AED]",
    ring:        "ring-[#7C3AED]/30",
    hoverBorder: "hover:border-[#7C3AED]/50",
  },
  yellow: {
    iconBg:      "bg-[#F2C94C]/20",
    iconColor:   "text-[#8a6a00]",
    ring:        "ring-[#F2C94C]/50",
    hoverBorder: "hover:border-[#F2C94C]/60",
  },
};

export function QuickAccessHub() {
  const active = isElectionActive();

  // Hide View Campaigns + View Candidates when election is not active
  const tiles = TILES.filter((t) => !t.requiresActive || active);

  return (
    <section className="relative overflow-hidden bg-[#0a1628] py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(244,119,33,0.10),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0f1f38] via-[#152a4a] to-[#0a1628] p-6 sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_0%,rgba(244,119,33,0.22),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_0%_100%,rgba(30,64,175,0.28),transparent_60%)]" />

          <div className="relative">
            {/* Header */}
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F47721] backdrop-blur-sm">
                  <Sparkles className="h-3 w-3" /> Quick Access
                </span>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Look Arusha Technical<br className="hidden sm:block" /> College Elections Detail
                </h2>
                <p className="mt-3 max-w-xl text-sm text-white/50 sm:text-base">
                  Everything you need — from voting to regulations — in one place. Click any card to get started.
                </p>
              </div>

              {/* Election status pill */}
              <div className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm ${
                active
                  ? "bg-[#16A36A]/20 text-[#16A36A] ring-1 ring-[#16A36A]/40"
                  : "bg-white/[0.06] text-white/50 ring-1 ring-white/10"
              }`}>
                <span className="relative flex h-1.5 w-1.5">
                  {active && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16A36A] opacity-75" />}
                  <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${active ? "bg-[#16A36A]" : "bg-white/40"}`} />
                </span>
                {active ? "Election active" : "No active election"}
              </div>
            </div>

            {/* Tiles grid */}
            <div className={`mt-8 grid gap-3 ${
              tiles.length === 3 ? "sm:grid-cols-3" : tiles.length === 5 ? "sm:grid-cols-2 lg:grid-cols-5" : "sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {tiles.map((tile) => {
                const Icon = tile.icon;
                const tone = TONE[tile.tone];
                return (
                  <Link
                    key={tile.label}
                    href={tile.href}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/20 ${tone.hoverBorder}`}
                  >
                    <div className={`grid h-11 w-11 place-items-center rounded-xl ring-1 transition group-hover:scale-110 ${tone.iconBg} ${tone.iconColor} ${tone.ring}`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-4 flex items-center gap-1 font-bold text-white">
                      {tile.label}
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">
                      {tile.description}
                    </p>

                    {/* Decorative corner dot */}
                    <div className={`absolute -right-4 -top-4 h-12 w-12 rounded-full opacity-0 blur-2xl transition group-hover:opacity-100 ${tone.iconBg}`} />
                  </Link>
                );
              })}
            </div>

            {/* Locked note — when election is not active */}
            {!active && (
              <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white/50">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" />
                <p>
                  <span className="font-semibold text-white/70">Campaigns and candidates</span> will appear here once the Electoral Commission opens the next election period.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}