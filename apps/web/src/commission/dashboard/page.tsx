import {
  Users, UserCheck, Vote, BarChart3, Monitor, AlertCircle,
  FileText, Activity
} from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { COMMISSION_NAV } from "@/components/layout/sidebar";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { commissionStats, recentAudit } from "@/lib/mock-data";

export default function CommissionDashboardPage() {
  return (
    <DashboardShell
      nav={COMMISSION_NAV}
      subtitle="Electoral Commission"
      roleLabel="COMMISSION"
      title="Election Control Center"
      topbarSubtitle="Real-time overview of the ongoing election"
    >
      {/* Stat grid */}
      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Eligible voters"       value={commissionStats.eligibleVoters.toLocaleString()} icon={Users}       tone="navy" hint={`${commissionStats.totalStudents.toLocaleString()} total students`} />
        <StatCard label="Registered candidates" value={commissionStats.registeredCandidates}                icon={UserCheck}   tone="orange" />
        <StatCard label="Active elections"      value={commissionStats.activeElections}                     icon={Vote}        tone="emerald" />
        <StatCard label="Active terminals"      value={commissionStats.activeTerminals}                     icon={Monitor}     tone="warm" hint={`${commissionStats.activeStations} stations`} />
      </section>

      {/* Alerts row */}
      <section className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card className="border-warm/40 bg-warm/5">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-warm/30 text-[#8a6a00]">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-navy">Pending nominations</p>
              <p className="text-sm text-slate-600">{commissionStats.pendingNominations} applications awaiting review</p>
            </div>
            <Badge variant="warning">Review</Badge>
          </CardContent>
        </Card>

        <Card className="border-danger/30 bg-danger/5">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-danger/10 text-danger">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-navy">Open complaints</p>
              <p className="text-sm text-slate-600">{commissionStats.pendingComplaints} complaints need attention</p>
            </div>
            <Badge variant="danger">Action</Badge>
          </CardContent>
        </Card>
      </section>

      {/* Audit + progress */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent activity</CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent className="divide-y divide-slate-100">
            {recentAudit.map((r) => (
              <div key={r.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-navy">{r.event}</p>
                  <p className="text-xs text-slate-500">
                    {r.actor} • {r.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Election progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { l: "Voter registration", v: 100 },
              { l: "Candidate verification", v: 92 },
              { l: "Voting terminals online", v: 100 },
              { l: "Results verification",   v: 0 },
            ].map((p) => (
              <div key={p.l}>
                <div className="mb-1 flex justify-between text-xs text-slate-600">
                  <span>{p.l}</span>
                  <span className="font-semibold text-navy">{p.v}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-orange" style={{ width: `${p.v}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </DashboardShell>
  );
}
