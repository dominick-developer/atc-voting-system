"use client";

import { useState } from "react";
import { MessageSquare, Plus, Send } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { STUDENT_NAV } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { complaints } from "@/lib/mock-data";

const STATUS_MAP: Record<string, { label: string; variant: "success" | "warning" | "default" | "danger" }> = {
  SUBMITTED: { label: "Submitted", variant: "default" },
  UNDER_REVIEW: { label: "Under review", variant: "warning" },
  RESOLVED: { label: "Resolved", variant: "success" },
  REJECTED: { label: "Rejected", variant: "danger" },
};

export default function ComplaintsPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <DashboardShell nav={STUDENT_NAV} subtitle="Student Portal" roleLabel="STUDENT"
      title="Complaints" topbarSubtitle="Submit and track election complaints">
      <div className="mb-4 flex justify-end">
        <Button variant="orange" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" /> New complaint
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader><CardTitle>Submit a new complaint</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cat">Category</Label>
                <select id="cat" className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-orange">
                  <option>Voter eligibility</option>
                  <option>Candidate nomination</option>
                  <option>Technical issue</option>
                  <option>Election misconduct</option>
                  <option>Results dispute</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sub">Subject</Label>
                <Input id="sub" placeholder="Short summary" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <textarea id="desc" rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange"
                placeholder="Describe your complaint in detail..." />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button variant="orange" className="flex-1">
                <Send className="h-4 w-4" /> Submit complaint
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="divide-y divide-slate-100 p-0">
          {complaints.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-3 text-sm text-slate-500">You have no complaints yet.</p>
            </div>
          ) : complaints.map((c) => {
            const s = STATUS_MAP[c.status] ?? STATUS_MAP.SUBMITTED;
            return (
              <div key={c.id} className="flex items-start gap-4 p-5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy/5 text-navy">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-xs text-slate-400">{c.id}</p>
                    <Badge variant={s.variant}>{s.label}</Badge>
                  </div>
                  <p className="mt-1 font-medium text-navy">{c.subject}</p>
                  <p className="text-xs text-slate-500">{c.category} • {c.date}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}