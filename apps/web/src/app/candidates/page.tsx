"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { STUDENT_NAV } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { candidates, positions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const filtered = candidates.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.programme.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardShell nav={STUDENT_NAV} subtitle="Student Portal" roleLabel="STUDENT"
      title="Candidates" topbarSubtitle="Meet the students running for office">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates..." className="pl-9" />
        </div>
        <p className="text-sm text-slate-500">{filtered.length} candidates</p>
      </div>

      {positions.map((p) => {
        const posCandidates = filtered.filter((c) => c.positionId === p.id);
        if (posCandidates.length === 0) return null;
        return (
          <section key={p.id} className="mb-8">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-navy">{p.title}</h2>
              <Badge variant="navy">{posCandidates.length} candidate{posCandidates.length !== 1 ? "s" : ""}</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posCandidates.map((c) => (
                <Card key={c.id} className="overflow-hidden">
                  <div className={cn("h-24 bg-gradient-to-br", c.color)} />
                  <CardContent className="relative -mt-10 px-5 pb-5">
                    <div className={cn(
                      "grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-gradient-to-br text-white text-xl font-bold shadow-card",
                      c.color
                    )}>
                      {c.initials}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-navy">{c.name}</h3>
                    <p className="text-xs text-slate-500">{c.programme} • {c.ntaLevel}</p>
                    <p className="mt-3 line-clamp-3 text-sm text-slate-700">{c.manifesto}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-sm text-slate-500">No candidates match your search.</p>
        </Card>
      )}
    </DashboardShell>
  );
}