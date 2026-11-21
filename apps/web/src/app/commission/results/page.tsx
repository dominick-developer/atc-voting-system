import { BarChart3, Trophy, CheckCircle2, Lock } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { COMMISSION_NAV } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { declaredResults } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function CommissionResultsPage() {
  return (
    <DashboardShell nav={COMMISSION_NAV} subtitle="Electoral Commission" roleLabel="COMMISSION"
      title="Results & tallying" topbarSubtitle="Verify, reconcile and declare official results">

      <Card className="mb-6 border-emerald/40 bg-emerald/5">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald/20 text-emerald">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-navy">Tallying complete — ready for verification</p>
            <p className="mt-1 text-sm text-slate-600">
              All accepted ballots accounted for. Results Officers must verify, then Commission declares.
            </p>
          </div>
          <Button variant="success">Declare results</Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {declaredResults.map((r) => {
          const max = Math.max(...r.candidates.map((c) => c.votes));
          return (
            <Card key={r.positionId}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-slate-400" /> {r.positionTitle}
                </CardTitle>
                <span className="text-sm text-slate-500">{r.totalVotes.toLocaleString()} votes total</span>
              </CardHeader>
              <CardContent className="space-y-4">
                {r.candidates.slice().sort((a, b) => b.votes - a.votes).map((c, idx) => {
                  const pct = (c.votes / r.totalVotes) * 100;
                  const isWinner = c.candidateId === r.winner;
                  return (
                    <div key={c.candidateId}>
                      <div className="mb-2 flex items-center gap-3">
                        <div className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-white text-xs font-bold",
                          c.color
                        )}>
                          {c.initials}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-navy">{c.name}</p>
                            {isWinner && <Badge variant="success">Winner</Badge>}
                          </div>
                          <p className="text-xs text-slate-500">{c.votes.toLocaleString()} votes ({pct.toFixed(1)}%)</p>
                        </div>
                        {idx === 0 && <Trophy className="h-5 w-5 text-warm" />}
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className={cn("h-full rounded-full bg-gradient-to-r", isWinner ? "from-orange to-red-500" : c.color)}
                          style={{ width: `${(c.votes / max) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 border-warm/40 bg-warm/5">
        <CardContent className="flex items-center gap-3 p-4 text-sm">
          <Lock className="h-4 w-4 text-[#8a6a00]" />
          <p className="text-slate-700">Results cannot be published until all Commission approvals are complete.</p>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}