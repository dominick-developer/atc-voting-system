import Link from "next/link";
import { Calendar, ArrowRight, Vote } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { STUDENT_NAV } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { activeElections } from "@/lib/mock-data";

const STATUS_LABEL: Record<string, { label: string; variant: "success" | "warning" | "default" }> = {
  VOTING_OPEN: { label: "Voting open",  variant: "success" },
  UPCOMING:    { label: "Upcoming",     variant: "warning" },
  CLOSED:      { label: "Closed",       variant: "default" },
};

export default function ElectionsPage() {
  return (
    <DashboardShell
      nav={STUDENT_NAV}
      subtitle="Student Portal"
      roleLabel="STUDENT"
      title="Elections"
      topbarSubtitle="All elections you are eligible for"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {activeElections.map((e) => {
          const s = STATUS_LABEL[e.status] ?? STATUS_LABEL.UPCOMING;
          return (
            <Card key={e.id} className="overflow-hidden">
              <div className="bg-navy p-5 text-white">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Badge variant={s.variant}>{s.label}</Badge>
                    <h3 className="mt-3 truncate text-lg font-semibold">{e.title}</h3>
                    <p className="mt-1 text-xs text-white/60">
                      {e.category === "GENERAL" ? "SOATECO General" : "Class Election"}
                    </p>
                  </div>
                  <Vote className="h-8 w-8 text-orange" />
                </div>
              </div>
              <CardContent className="space-y-4 p-5">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Positions</p>
                    <p className="mt-1 text-lg font-bold text-navy">{e.positions}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Candidates</p>
                    <p className="mt-1 text-lg font-bold text-navy">{e.candidates}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  Closes {new Date(e.votingEndsAt).toLocaleString()}
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="orange" className="flex-1">
                    <Link href={`/vote/${e.id}`}>
                      {e.status === "VOTING_OPEN" ? "Vote now" : "View details"} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/candidates">Candidates</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </DashboardShell>
  );
}