"use client";

import { Check, X, UserCheck } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { COMMISSION_NAV } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pendingNominations } from "@/lib/commission-data";

const STATUS: Record<string, { label: string; variant: "success" | "warning" | "default" | "danger" | "info" }> = {
  SUBMITTED: { label: "Submitted", variant: "info" },
  UNDER_REVIEW: { label: "Under review", variant: "warning" },
  APPROVED: { label: "Approved", variant: "success" },
  REJECTED: { label: "Rejected", variant: "danger" },
};

export default function NominationsPage() {
  return (
    <DashboardShell nav={COMMISSION_NAV} subtitle="Electoral Commission" roleLabel="COMMISSION"
      title="Candidate nominations" topbarSubtitle={`${pendingNominations.length} awaiting review`}>
      <Card>
        <CardContent className="divide-y divide-slate-100 p-0">
          {pendingNominations.map((n) => {
            const s = STATUS[n.status];
            return (
              <div key={n.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange/10 text-orange">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-navy">{n.studentName}</p>
                    <Badge variant={s.variant}>{s.label}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">
                    {n.admissionNo} • <span className="text-navy font-medium">{n.position}</span> • {n.submittedAt}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><X className="h-3.5 w-3.5" /> Reject</Button>
                  <Button variant="success" size="sm"><Check className="h-3.5 w-3.5" /> Approve</Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}