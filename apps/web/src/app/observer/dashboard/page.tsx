import { Eye, Activity, Users } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auditEvents } from "@/lib/commission-data";

const OBSERVER_NAV = [{ label: "Dashboard", href: "/observer/dashboard", icon: "👁" }];

export default function ObserverDashboardPage() {
  return (
    <DashboardShell nav={OBSERVER_NAV} subtitle="Independent Observer" roleLabel="OBSERVER"
      title="Observer Dashboard" topbarSubtitle="Read-only view of election progress">
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Election status"    value="Voting open"    icon={Activity} tone="emerald" />
        <StatCard label="Voter turnout"       value="16.8%"           icon={Users}    tone="orange" />
        <StatCard label="Recent events"       value={auditEvents.length} icon={Eye}   tone="navy" />
      </div>

      <Card>
        <CardHeader><CardTitle>Recent election events</CardTitle></CardHeader>
        <CardContent className="divide-y divide-slate-100">
          {auditEvents.slice(0, 5).map((e) => (
            <div key={e.id} className="py-3 first:pt-0 last:pb-0">
              <p className="text-sm font-medium text-navy">{e.event}</p>
              <p className="text-xs text-slate-500">{e.actor} â€¢ {e.time}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}