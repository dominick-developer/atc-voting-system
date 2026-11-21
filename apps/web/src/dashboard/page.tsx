import { Vote, Trophy, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { STUDENT_NAV } from "@/components/layout/sidebar";
import { StatCard } from "@/components/dashboard/stat-card";
import { ElectionCountdown } from "@/components/dashboard/election-countdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currentStudent, activeElections, studentStats } from "@/lib/mock-data";

export default function StudentDashboardPage() {
  return (
    <DashboardShell
      nav={STUDENT_NAV}
      subtitle="Student Portal"
      roleLabel="STUDENT"
      title={`Hello, ${currentStudent.fullName.split(" ")[0]}`}
      topbarSubtitle="Welcome to your ATC voting dashboard"
    >
      {/* Hero — active election */}
      <section className="mb-6 overflow-hidden rounded-3xl bg-navy p-6 text-white sm:p-8">
        <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Badge variant="success" className="bg-emerald/20 text-emerald">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald" /> Voting is OPEN
              </Badge>
              <span className="text-xs text-white/60">SOATECO 2026</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              SOATECO General Election
            </h2>
            <p className="mt-2 max-w-lg text-sm text-white/70">
              Cast your vote for President, Vice President, Secretary and other executive positions.
              Your ballot is anonymous.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="orange" size="lg">
                <Link href="/vote/soateco-2026">
                  Vote now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                <Link href="/candidates">View candidates</Link>
              </Button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-white/60">Closes in</p>
            <ElectionCountdown target={activeElections[0].votingEndsAt} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active elections" value={studentStats.activeElections} icon={Vote} tone="navy" />
        <StatCard label="Upcoming"         value={studentStats.upcomingElections} icon={Clock} tone="orange" />
        <StatCard label="Votes submitted"  value={studentStats.votesSubmitted} icon={CheckCircle2} tone="emerald" />
        <StatCard label="Completed"        value={studentStats.completedElections} icon={Trophy} tone="warm" />
      </section>

      {/* Elections list */}
      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your elections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeElections.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-navy">{e.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {e.positions} positions • {e.candidates} candidates
                  </p>
                </div>
                <Badge variant={e.status === "VOTING_OPEN" ? "success" : "warning"}>
                  {e.status === "VOTING_OPEN" ? "Open" : "Upcoming"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {[
              { label: "View results",      href: "/results" },
              { label: "Candidates",        href: "/candidates" },
              { label: "Notifications",     href: "/notifications" },
              { label: "Submit complaint",  href: "/complaints" },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="rounded-xl border border-slate-200 p-4 text-sm font-medium text-navy hover:bg-slate-50"
              >
                {a.label}
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
    </DashboardShell>
  );
}
