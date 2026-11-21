import Link from "next/link";
import { Users, Upload, Download, CheckCircle2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { COMMISSION_NAV } from "@/components/layout/sidebar";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { commissionOverview } from "@/lib/commission-data";

export default function VotersPage() {
  return (
    <DashboardShell nav={COMMISSION_NAV} subtitle="Electoral Commission" roleLabel="COMMISSION"
      title="Voter register" topbarSubtitle="Frozen eligible voters per election">
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total students"    value={commissionOverview.totalStudents.toLocaleString()} icon={Users} tone="navy" />
        <StatCard label="Eligible voters"   value={commissionOverview.eligibleVoters.toLocaleString()} icon={CheckCircle2} tone="emerald" />
        <StatCard label="Turnout"           value={`${commissionOverview.turnoutPct}%`} icon={Users} tone="orange" hint={`${commissionOverview.totalVotesCast} votes`} />
        <StatCard label="Total terminals"   value={`${commissionOverview.activeTerminals}/${commissionOverview.totalTerminals}`} icon={Users} tone="warm" hint="online / registered" />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Register management</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5" /> Export</Button>
            <Button variant="orange" size="sm" asChild><Link href="/commission/imports"><Upload className="h-3.5 w-3.5" /> Import</Link></Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald/10 text-emerald">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-navy">SOATECO 2026 voter register — APPROVED</p>
                <p className="mt-1 text-sm text-slate-600">
                  3,756 eligible voters frozen on Feb 15, 2026. Register is now locked and cannot be modified.
                </p>
                <div className="mt-3 flex gap-2">
                  <Badge variant="success">Frozen</Badge>
                  <Badge variant="navy">3,756 voters</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}