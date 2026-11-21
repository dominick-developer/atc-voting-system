import { Shield, Hash, Activity } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { COMMISSION_NAV } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auditEvents } from "@/lib/commission-data";

export default function AuditPage() {
  return (
    <DashboardShell nav={COMMISSION_NAV} subtitle="Electoral Commission" roleLabel="COMMISSION"
      title="Election audit log" topbarSubtitle="Tamper-evident event history">
      <Card className="mb-6 border-emerald/40 bg-emerald/5">
        <CardContent className="flex items-center gap-3 p-4 text-sm">
          <Shield className="h-4 w-4 text-emerald" />
          <p className="text-slate-700">
            All events are hash-chained. Modifications to prior entries would break the chain and be detected.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="divide-y divide-slate-100 p-0">
          {auditEvents.map((e) => (
            <div key={e.id} className="flex items-start gap-4 p-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy/5 text-navy">
                <Activity className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-xs text-slate-400">{e.id}</p>
                  {e.electionId && <Badge variant="navy">{e.electionId}</Badge>}
                </div>
                <p className="mt-1 font-medium text-navy">{e.event}</p>
                <p className="text-xs text-slate-500">{e.actor} • {e.time}</p>
              </div>
              <div className="hidden shrink-0 items-center gap-1 text-xs text-slate-400 sm:flex">
                <Hash className="h-3 w-3" /> {e.hash}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}