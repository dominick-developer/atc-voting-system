import { FileText, CheckCircle2, Users } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CANDIDATE_NAV = [
  { label: "Dashboard",  href: "/candidate/dashboard",  icon: "🏠" },
  { label: "Nomination", href: "/candidate/nomination", icon: "📝" },
  { label: "Campaign",   href: "/candidate/campaign",   icon: "📢" },
];

export default function CandidateDashboardPage() {
  return (
    <DashboardShell nav={CANDIDATE_NAV} subtitle="Candidate Portal" roleLabel="CANDIDATE"
      title="Candidate Dashboard" topbarSubtitle="Your nomination and campaign status">
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Nomination status" value="Approved" icon={CheckCircle2} tone="emerald" />
        <StatCard label="Position"          value="President" icon={FileText}     tone="orange" />
        <StatCard label="Total candidates"  value={24}        icon={Users}        tone="navy" />
      </div>

      <Card>
        <CardHeader><CardTitle>Your nomination</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-emerald/40 bg-emerald/5 p-4">
            <div>
              <p className="font-semibold text-navy">Nomination approved</p>
              <p className="text-xs text-slate-600">Your candidacy for President has been verified</p>
            </div>
            <Badge variant="success">Verified</Badge>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-medium text-navy">Manifesto</p>
            <p className="mt-1">A transparent SOATECO that listens. Monthly open forums, published budgets, and real action on student welfare.</p>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}