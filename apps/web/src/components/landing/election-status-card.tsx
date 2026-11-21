"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Radio, Clock, Megaphone, AlertCircle, ArrowRight,
  Users, Vote, Layers,
} from "lucide-react";
import { getPrimaryElectionStatus, ElectionPhase } from "@/lib/election-status";

type PhaseTheme = {
  badge: string;
  badgeText: string;
  iconBg: string;
  pulse: boolean;
  dotColor: string;
  countdownLabel: string;
  cta: { label: string; href: string } | null;
  ringClass: string;
};

const THEME: Record<ElectionPhase, PhaseTheme> = {
  LIVE: {
    badge:       "bg-[#16A36A]/10 text-[#16A36A] ring-1 ring-[#16A36A]/30",
    badgeText:   "Voting is LIVE",
    iconBg:      "bg-[#16A36A]",
    pulse:       true,
    dotColor:    "bg-[#16A36A]",
    countdownLabel: "Voting closes in",
    cta:         { label: "Vote now", href: "/login" },
    ringClass:   "ring-[#16A36A]/50",
  },
  CAMPAIGN: {
    badge:       "bg-[#F47721]/10 text-[#F47721] ring-1 ring-[#F47721]/30",
    badgeText:   "Campaign season",
    iconBg:      "bg-[#F47721]",
    pulse:       true,
    dotColor:    "bg-[#F47721]",
    countdownLabel: "Campaign ends in",
    cta:         { label: "View candidates", href: "#elections" },
    ringClass:   "ring-[#F47721]/50",
  },
  UPCOMING: {
    badge:       "bg-[#F2C94C]/20 text-[#8a6a00] ring-1 ring-[#F2C94C]/50",
    badgeText:   "Coming soon",
    iconBg:      "bg-[#F2C94C]",
    pulse:       false,
    dotColor:    "bg-[#F2C94C]",
    countdownLabel: "Starts in",
    cta:         { label: "Learn more", href: "#elections" },
    ringClass:   "ring-[#F2C94C]/50",
  },
  CLOSED: {
    badge:       "bg-slate-200 text-slate-700 ring-1 ring-slate-300",
    badgeText:   "Voting closed",
    iconBg:      "bg-slate-700",
    pulse:       false,
    dotColor:    "bg-slate-500",
    countdownLabel: "Ended",
    cta:         { label: "View results", href: "/results" },
    ringClass:   "ring-slate-300",
  },
  NOT_AVAILABLE: {
    badge:       "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
    badgeText:   "Unavailable",
    iconBg:      "bg-slate-400",
    pulse:       false,
    dotColor:    "bg-slate-400",
    countdownLabel: "",
    cta:         null,
    ringClass:   "ring-slate-200",
  },
};

function parts(ms: number) {
  if (ms <= 0) return { h: "00", m: "00", s: "00", raw: 0 };
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
    raw: total,
  };
}

export function ElectionStatusCard() {
  const [status, setStatus] = useState(getPrimaryElectionStatus());
  const [now, setNow]       = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => {
      setStatus(getPrimaryElectionStatus());
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const theme = THEME[status.phase];
  const Icon = status.phase === "LIVE" ? Radio
             : status.phase === "CAMPAIGN" ? Megaphone
             : status.phase === "UPCOMING" ? Clock
             : AlertCircle;

  // Compute countdown target
  let target: Date | null = null;
  if (status.phase === "LIVE" && status.votingEndsAt)   target = new Date(status.votingEndsAt);
  if (status.phase === "CAMPAIGN" && status.campaignEndsAt) target = new Date(status.campaignEndsAt);
  if (status.phase === "UPCOMING" && status.campaignStartsAt) target = new Date(status.campaignStartsAt);

  const time = target ? parts(target.getTime() - now) : null;
  const isAvailable = status.phase !== "NOT_AVAILABLE";

  return (
    <section className="relative bg-[#1e40af] pt-10 pb-2 sm:pt-14">
      {/* soft glow behind */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(244,119,33,0.15),transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className={`group relative overflow-hidden rounded-3xl bg-white p-6 shadow-2xl ring-4 ring-offset-4 ring-offset-[#1e40af] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)] sm:p-8 ${theme.ringClass}`}>
          {/* Top row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Status badge */}
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${theme.badge}`}>
              <span className="relative flex h-2 w-2">
                {theme.pulse && (
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${theme.dotColor} opacity-60`} />
                )}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${theme.dotColor}`} />
              </span>
              {theme.badgeText}
            </div>

            {/* Election name */}
            {isAvailable && (
              <p className="text-[12px] font-semibold uppercase tracking-widest text-slate-400">
                {status.title}
              </p>
            )}
          </div>

          {/* Main row */}
          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: icon + message */}
            <div className="flex items-start gap-4">
              <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${theme.iconBg} text-white shadow-lg`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-black tracking-tight text-[#10243A] sm:text-xl">
                  {isAvailable ? status.message : "Election is now unavailable"}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {status.phase === "LIVE"      && "Cast your ballot before the countdown ends."}
                  {status.phase === "CAMPAIGN"  && "Meet your candidates. Review their manifestos."}
                  {status.phase === "UPCOMING"  && "The Electoral Commission is preparing the register."}
                  {status.phase === "CLOSED"    && "Results will be published after official declaration."}
                  {status.phase === "NOT_AVAILABLE" && "There is no active election at this moment."}
                </p>
              </div>
            </div>

            {/* Right: countdown OR CTA */}
            {time && (
              <div className="shrink-0">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {theme.countdownLabel}
                </p>
                <div className="flex gap-1.5">
                  {[
                    { v: time.h, l: "HRS" },
                    { v: time.m, l: "MIN" },
                    { v: time.s, l: "SEC" },
                  ].map((b) => (
                    <div key={b.l} className="rounded-xl bg-[#10243A] px-2.5 py-2 text-center min-w-[52px]">
                      <p className="text-lg font-black tabular-nums leading-none text-white">{b.v}</p>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-white/50">{b.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Meta row + CTA */}
          {isAvailable && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <div className="flex flex-wrap items-center gap-4 text-[13px] text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[#F47721]" />
                  <span className="font-semibold text-[#10243A]">3,756</span> eligible
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Vote className="h-3.5 w-3.5 text-[#F47721]" />
                  <span className="font-semibold text-[#10243A]">87</span> candidates
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-[#F47721]" />
                  <span className="font-semibold text-[#10243A]">6</span> positions
                </span>
              </div>

              {theme.cta && (
                <Link
                  href={theme.cta.href}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#F47721] px-4 py-2 text-[13px] font-bold text-white shadow-md shadow-[#F47721]/30 transition hover:bg-[#e6670f] hover:shadow-lg hover:shadow-[#F47721]/40"
                >
                  {theme.cta.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}