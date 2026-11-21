"use client";

import { Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2, LockKeyhole, ArrowRight, Loader2, BarChart3,
  Receipt, ShieldCheck, Home, Calendar, Hash, FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { activeElections } from "@/lib/mock-data";

function ReceiptContent() {
  const params       = useParams();
  const searchParams = useSearchParams();
  const electionId   = (params?.electionId as string) ?? "soateco-2026";
  const receiptId    = searchParams.get("ref") ?? "ATC-E2026-000001";

  const election = activeElections.find((e) => e.id === electionId) ?? activeElections[0];

  const details = [
    { icon: Hash,         label: "Receipt reference", value: receiptId, mono: true },
    { icon: FileCheck,    label: "Election",          value: election.title },
    { icon: Calendar,     label: "Submitted",         value: new Date().toLocaleString() },
    { icon: ShieldCheck,  label: "Status",            value: "Accepted", tone: "emerald" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1e40af]">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,119,33,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(22,163,106,0.12),transparent_50%)]" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-[#1e40af]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#F47721] text-white text-xs font-black">ATC</div>
            <div>
              <p className="text-sm font-extrabold text-white">ATC DIGITAL DEMOCRACY</p>
              <p className="text-[10px] uppercase tracking-widest text-blue-200/70">Vote Receipt</p>
            </div>
          </Link>
          <Link href="/" className="text-sm text-blue-100 transition hover:text-white">Home</Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-2xl px-4 py-10 sm:py-14">

        {/* Success banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#16A36A] to-teal-700 p-8 text-center text-white shadow-2xl sm:p-10">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/20 ring-4 ring-white/30 backdrop-blur animate-pulse">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="mt-5 text-2xl font-black tracking-tight sm:text-3xl">
            Ballot successfully received
          </h1>
          <p className="mt-2 text-sm text-white/85">
            Your ballot has been securely and anonymously stored.
          </p>
        </div>

        {/* Receipt card */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-white/20 sm:p-8">

          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F47721]/10 text-[#F47721]">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#F47721]">Vote Receipt</p>
              <h2 className="text-lg font-black text-[#0a1628]">Official confirmation</h2>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            {details.map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={d.label}
                  className={`flex items-center justify-between gap-3 px-4 py-3.5 ${i < details.length - 1 ? "border-b border-slate-200" : ""}`}>
                  <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <Icon className="h-4 w-4" /> {d.label}
                  </span>
                  {d.tone === "emerald" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="h-3 w-3" /> {d.value}
                    </span>
                  ) : (
                    <span className={`text-sm font-semibold text-[#0a1628] ${d.mono ? "font-mono" : ""}`}>
                      {d.value}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Confidentiality notice */}
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                <LockKeyhole className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-900">Your selections remain confidential</p>
                <p className="mt-1 text-xs leading-relaxed text-emerald-800/90">
                  This receipt confirms your ballot was accepted. It does not reveal who you voted for. Even administrators cannot see your choices.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="outline" className="flex-1 border-2 border-slate-200 h-11">
              <Link href="/">
                <Home className="h-4 w-4" /> Home
              </Link>
            </Button>
            <Button asChild className="flex-1 h-11 bg-[#F47721] text-white hover:bg-[#e6670f] shadow-lg shadow-orange-300/50">
              <Link href={`/vote/waiting?electionId=${electionId}&ref=${encodeURIComponent(receiptId)}`}>
                Continue <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-center text-[11px] text-slate-400">
            Keep this receipt reference. It is the only proof of your vote.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-blue-200/60">
          🔒 Secure · Anonymous · Auditable · Protected by ATC Digital Democracy
        </p>
      </main>
    </div>
  );
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={
      <div className="grid min-h-screen place-items-center bg-[#1e40af]">
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      </div>
    }>
      <ReceiptContent />
    </Suspense>
  );
}