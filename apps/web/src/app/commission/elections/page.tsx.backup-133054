import Link from "next/link";
import { Plus, Vote, Users, Calendar, ArrowRight } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { COMMISSION_NAV } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  return (
    <DashboardShell nav={COMMISSION_NAV} subtitle="Electoral Commission" roleLabel="COMMISSION"
      title="Elections" topbarSubtitle="Create, configure and manage elections"
      actions={<Button variant="orange"><Plus className="h-4 w-4" /> New election</Button>}>
      <div className="space-y-3">
        {commissionElections.map((e) => {
          const s = STATUS[e.status] ?? STATUS.DRAFT;
          return (
            <Card key={e.id}>
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy/5 text-navy">
                  <Vote className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold text-navy">{e.title}</h3>
                    <Badge variant={s.variant}>{s.label}</Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {e.eligibleVoters.toLocaleString()} voters</span>
                    <span className="inline-flex items-center gap-1"><Vote className="h-3 w-3" /> {e.candidates} candidates</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(e.startsAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/commission/elections/${e.id}`}>Manage <ArrowRight className="h-3.5 w-3.5" /></Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DashboardShell>
  );
}