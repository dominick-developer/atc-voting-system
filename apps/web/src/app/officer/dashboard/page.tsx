import { UserCheck, Monitor, AlertCircle, Activity } from "lucide-react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OFFICER_NAV = [
  { label: "Dashboard",    href: "/officer/dashboard", icon: "🏠" },
  { label: "Verify voter", href: "/officer/verify",    icon: "✅" },
];

export default function OfficerDashboardPage() {
  return (
    <DashboardShell nav={OFFICER_NAV} subtitle="Election Officer" roleLabel="OFFICER"
      title="Station dashboard" topbarSubtitle="Verify voters and manage your station">
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Students verified" value={128} icon={UserCheck}    tone="emerald" />
        <StatCard label="Station terminals" value="6 / 6" icon={Monitor}     tone="navy" />
        <StatCard label="Incidents"         value={0}   icon={AlertCircle} tone="warm" />
      </div>

      <Card>
        <CardHeader><CardTitle>Quick actions</CardTitle></CardHeader>
        <CardContent>
          <Button asChild variant="orange" size="lg" className="w-full">
            <Link href="/officer/verify">Verify a student</Link>
          </Button>
          <p className="mt-3 text-center text-xs text-slate-500">
            Enter a student admission number to verify eligibility.
          </p>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}