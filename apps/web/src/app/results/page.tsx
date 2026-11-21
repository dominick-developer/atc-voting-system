"use client";

import { useEffect, useState } from "react";
import { Trophy, BarChart3, RefreshCw, TrendingUp, Users } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { STUDENT_NAV } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { candidates as ALL_CANDIDATES, positions as ALL_POSITIONS, activeElections } from "@/lib/mock-data";
import { api } from "@/lib/api/client";
import { cn } from "@/lib/utils";

type TallyRow = { positionId: string; candidateId: string; votes: number };
type Tally = { electionId: string; totalBallots: number; results: TallyRow[]; updatedAt: string };

export default function ResultsPage() {
  const election = activeElections[0];
  const [tally, setTally]     = useState<Tally | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastAt, setLastAt]   = useState<Date | null>(null);

  async function load() {
    setLoading(true);
    try {
      const data = await api<Tally>(`/tally/${election.id}`);
      setTally(data);
      setLastAt(new Date());
    } catch {
      // Backend offline — show empty
      setTally({ electionId: election.id, totalBallots: 0, results: [], updatedAt: new Date().toISOString() });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const positionsWithResults = ALL_POSITIONS.filter((p) => p.electionId === election.id).map((p) => {
    const candidates = ALL_CANDIDATES.filter((c) => c.positionId === p.id).map((c) => {
      const row = tally?.results.find((r) => r.positionId === p.id && r.candidateId === c.id);
      return { ...c, votes: row?.votes ?? 0 };
    });
    const totalVotes = candidates.reduce((s, c) => s + c.votes, 0);
    const sorted = [...candidates].sort((a, b) => b.votes - a.votes);
    const winner = sorted[0]?.votes > 0 && sorted[0]?.votes > (sorted[1]?.votes ?? 0)
      ? sorted[0].id
      : null;
    return { position: p, candidates: sorted, totalVotes, winner };
  });

  const totalBallots = tally?.totalBallots ?? 0;

  return (
    <DashboardShell nav={STUDENT_NAV} subtitle="Student Portal" roleLabel="STUDENT"
      title="Live results" topbarSubtitle="Updates every 5 seconds"
      actions={
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} /> Refresh
        </Button>
      }>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Total ballots</p>
              <p className="mt-2 text-3xl font-black text-navy">{totalBallots.toLocaleString()}</p>
              <p className="mt-1 text-xs text-slate-500">received so far</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#F47721]/10 text-[#F47721]">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Positions</p>
              <p className="mt-2 text-3xl font-black text-navy">{positionsWithResults.length}</p>
              <p className="mt-1 text-xs text-slate-500">on this ballot</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#16A36A]/10 text-[#16A36A]">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Last updated</p>
              <p className="mt-2 text-lg font-bold text-navy">
                {lastAt ? lastAt.toLocaleTimeString() : "—"}
              </p>
              <p className="mt-1 text-xs text-slate-500">auto-refreshes every 5s</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald/10 text-emerald">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      <div className="rounded-2xl bg-navy p-6 text-white">
        <Badge variant="success" className="bg-emerald/20 text-emerald">
          <Trophy className="mr-1 h-3 w-3" /> Live tally · {election.title}
        </Badge>
        <p className="mt-2 text-sm text-white/70">
          These are live results from actual submitted ballots. Official declaration is done by the Electoral Commission.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {positionsWithResults.map(({ position, candidates, totalVotes, winner }) => {
          const max = Math.max(1, ...candidates.map((c) => c.votes));
          return (
            <Card key={position.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{position.title}</span>
                  <span className="text-sm font-normal text-slate-500">
                    {totalVotes.toLocaleString()} votes
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidates.map((c) => {
                  const pct = totalVotes > 0 ? (c.votes / totalVotes) * 100 : 0;
                  const isWinner = winner === c.id;
                  return (
                    <div key={c.id}>
                      <div className="mb-2 flex items-center gap-3">
                        <div className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-white text-xs font-bold",
                          c.color
                        )}>
                          {c.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate font-medium text-navy">{c.name}</p>
                            {isWinner && <Badge variant="success">Leading</Badge>}
                          </div>
                          <p className="text-xs text-slate-500">
                            {c.votes.toLocaleString()} votes ({pct.toFixed(1)}%)
                          </p>
                        </div>
                        {isWinner && <Trophy className="h-5 w-5 text-warm" />}
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className={cn(
                          "h-full rounded-full bg-gradient-to-r transition-all duration-500",
                          isWinner ? "from-orange to-red-500" : c.color
                        )}
                          style={{ width: `${(c.votes / max) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
                {totalVotes === 0 && (
                  <p className="py-4 text-center text-sm text-slate-500">
                    No votes recorded for this position yet.
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 border-warm/40 bg-warm/5 p-5">
        <p className="text-sm text-slate-700">
          <strong className="text-navy">Note:</strong> These results reflect actual submitted ballots in real time.
          Official results require Electoral Commission verification before declaration.
        </p>
      </Card>
    </DashboardShell>
  );
}