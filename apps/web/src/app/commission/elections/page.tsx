"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus, Vote, Users, Calendar, ArrowRight, X, Save, Loader2,
  AlertCircle, CheckCircle2,
} from "lucide-react";
import { CardDashboardShell } from "@/components/layout/card-dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { commissionElections } from "@/lib/commission-data";

const STATUS: Record<string, { label: string; variant: "success" | "warning" | "default" | "info" | "danger" }> = {
  DRAFT: { label: "Draft", variant: "default" },
  NOMINATION_OPEN: { label: "Nominations", variant: "info" },
  READY: { label: "Ready", variant: "warning" },
  VOTING_OPEN: { label: "Voting open", variant: "success" },
  VOTING_CLOSED: { label: "Voting closed", variant: "default" },
  DECLARED: { label: "Declared", variant: "success" },
};

export default function CommissionElectionsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", category: "GENERAL", votingStartsAt: "", votingEndsAt: "" });

  async function handleCreate() {
    if (!form.title.trim()) { setToast("Title is required"); return; }
    setBusy(true);
    // TODO: POST /api/elections
    await new Promise((r) => setTimeout(r, 800));
    setToast(`✅ "${form.title}" created (demo — not saved to DB yet)`);
    setBusy(false);
    setShowCreate(false);
    setForm({ title: "", category: "GENERAL", votingStartsAt: "", votingEndsAt: "" });
  }

  return (
    <CardDashboardShell title="Elections" subtitle="Create, configure and manage all elections">
      <div className="col-span-full mb-2 flex items-center justify-between">
        <p className="text-sm text-slate-500">{commissionElections.length} elections</p>
        <Button onClick={() => setShowCreate(true)} className="h-11 bg-[#F47721] text-white hover:bg-[#e6670f] shadow-lg shadow-orange-200">
          <Plus className="h-4 w-4" /> New election
        </Button>
      </div>

      {toast && (
        <div className="col-span-full flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-4 w-4" /> {toast}
        </div>
      )}

      {commissionElections.map((e) => {
        const s = STATUS[e.status] ?? STATUS.DRAFT;
        return (
          <div key={e.id} className="group flex flex-col gap-4 rounded-3xl border-2 border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#F47721]/40 hover:shadow-2xl hover:shadow-orange-100/50">
            <div className="flex items-start justify-between gap-2">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F47721]/10 text-[#F47721] ring-2 ring-[#F47721]/20 transition group-hover:scale-110">
                <Vote className="h-7 w-7" />
              </div>
              <Badge variant={s.variant}>{s.label}</Badge>
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-[#0a1628]">{e.title}</h3>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {e.eligibleVoters.toLocaleString()} voters</span>
                <span className="inline-flex items-center gap-1"><Vote className="h-3 w-3" /> {e.candidates} candidates</span>
              </div>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="h-3 w-3" /> Starts {new Date(e.startsAt).toLocaleDateString()}
              </p>
            </div>
            <Link
              href={`/commission/elections/${e.id}`}
              className="mt-auto inline-flex items-center justify-between gap-1 rounded-xl bg-[#10243A] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1a3a5c]"
            >
              Manage <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        );
      })}

      {showCreate && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-[#0a1628]">Create new election</h2>
              <button onClick={() => setShowCreate(false)} className="rounded-full p-1 hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <Label className="text-sm font-bold">Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. SOATECO General Election 2027" className="mt-1 h-11" />
              </div>
              <div>
                <Label className="text-sm font-bold">Category</Label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm">
                  <option value="GENERAL">General (SOATECO)</option>
                  <option value="CLASS">Class</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-sm font-bold">Voting starts</Label>
                  <Input type="date" value={form.votingStartsAt} onChange={(e) => setForm({ ...form, votingStartsAt: e.target.value })} className="mt-1 h-11" />
                </div>
                <div>
                  <Label className="text-sm font-bold">Voting ends</Label>
                  <Input type="date" value={form.votingEndsAt} onChange={(e) => setForm({ ...form, votingEndsAt: e.target.value })} className="mt-1 h-11" />
                </div>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                <AlertCircle className="mb-1 inline h-3.5 w-3.5" /> Demo only — will connect to `/api/elections` next.
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowCreate(false)} className="flex-1 border-2 border-slate-200">Cancel</Button>
                <Button onClick={handleCreate} disabled={busy} className="flex-1 bg-[#F47721] text-white hover:bg-[#e6670f]">
                  {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating...</> : <><Save className="h-4 w-4" /> Create</>}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CardDashboardShell>
  );
}