import { MessageSquare, ArrowRight } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { COMMISSION_NAV } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { allComplaints } from "@/lib/commission-data";

const STATUS: Record<string, { label: string; variant: "success" | "warning" | "default" | "danger" }> = {
  SUBMITTED: { label: "Submitted", variant: "default" },
  UNDER_REVIEW: { label: "Under review", variant: "warning" },
  RESOLVED: { label: "Resolved", variant: "success" },
  REJECTED: { label: "Rejected", variant: "danger" },
};

export default function CommissionComplaintsPage() {
  return (
    <DashboardShell nav={COMMISSION_NAV} subtitle="Electoral Commission" roleLabel="COMMISSION"
      title="Complaints & appeals" topbarSubtitle="Review and resolve election complaints">
      <Card>
        <CardContent className="divide-y divide-slate-100 p-0">
          {allComplaints.map((c) => {
            const s = STATUS[c.status];
            return (
              <div key={c.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy/5 text-navy">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-xs text-slate-400">{c.id}</p>
                    <Badge variant={s.variant}>{s.label}</Badge>
                  </div>
                  <p className="mt-1 truncate font-medium text-navy">{c.subject}</p>
                  <p className="text-xs text-slate-500">{c.submittedBy} • {c.category} • {c.date}</p>
                </div>
                <Button variant="outline" size="sm">Review <ArrowRight className="h-3.5 w-3.5" /></Button>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}