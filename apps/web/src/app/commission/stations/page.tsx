import { Monitor, Wifi, WifiOff, Wrench, Activity } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { COMMISSION_NAV } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { terminals, commissionOverview } from "@/lib/commission-data";

const STATUS: Record<string, { label: string; variant: "success" | "danger" | "warning"; icon: any }> = {
  ONLINE: { label: "Online", variant: "success", icon: Wifi },
  OFFLINE: { label: "Offline", variant: "danger", icon: WifiOff },
  MAINTENANCE: { label: "Maintenance", variant: "warning", icon: Wrench },
};

export default function StationsPage() {
  return (
    <DashboardShell nav={COMMISSION_NAV} subtitle="Electoral Commission" roleLabel="COMMISSION"
      title="Voting stations" topbarSubtitle={`${commissionOverview.activeTerminals} of ${commissionOverview.totalTerminals} terminals online`}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {terminals.map((t) => {
          const s = STATUS[t.status];
          const Icon = s.icon;
          return (
            <Card key={t.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-navy/5 text-navy">
                    <Monitor className="h-4 w-4" />
                  </div>
                  <Badge variant={s.variant}><Icon className="mr-1 h-3 w-3" /> {s.label}</Badge>
                </div>
                <p className="mt-3 font-semibold text-navy">{t.id}</p>
                <p className="text-xs text-slate-500">{t.station}</p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Activity className="h-3.5 w-3.5 text-slate-400" />
                  <span className="font-semibold text-navy">{t.votesCast}</span>
                  <span className="text-xs text-slate-500">votes cast</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DashboardShell>
  );
}