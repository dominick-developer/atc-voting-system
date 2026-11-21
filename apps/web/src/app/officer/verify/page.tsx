"use client";

import { useState } from "react";
import { Search, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OFFICER_NAV = [
  { label: "Dashboard",    href: "/officer/dashboard", icon: "🏠" },
  { label: "Verify voter", href: "/officer/verify",    icon: "✅" },
];

export default function VerifyPage() {
  const [admission, setAdmission] = useState("");
  const [result, setResult] = useState<null | "found" | "not-found" | "voted">(null);

  function handleVerify() {
    if (!admission.trim()) return;
    const rand = Math.random();
    setResult(rand > 0.5 ? "found" : rand > 0.2 ? "not-found" : "voted");
  }

  return (
    <DashboardShell nav={OFFICER_NAV} subtitle="Election Officer" roleLabel="OFFICER"
      title="Verify student" topbarSubtitle="Confirm voter eligibility before issuing credential">
      <div className="mx-auto max-w-xl">
        <Card>
          <CardHeader><CardTitle>Student verification</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adm">Admission number</Label>
              <Input id="adm" value={admission} onChange={(e) => setAdmission(e.target.value)}
                placeholder="e.g. ATC/2024/0001" />
            </div>
            <Button variant="orange" className="w-full" onClick={handleVerify}>
              <Search className="h-4 w-4" /> Verify student
            </Button>

            {result === "found" && (
              <div className="rounded-xl border border-emerald/40 bg-emerald/5 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald" />
                  <p className="font-semibold text-navy">Eligible to vote</p>
                  <Badge variant="success" className="ml-auto">Verified</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-700">Student found and eligible. Issue one-time voting credential.</p>
                <Button variant="success" className="mt-3 w-full">Issue credential</Button>
              </div>
            )}
            {result === "not-found" && (
              <div className="rounded-xl border border-danger/30 bg-danger/5 p-4">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-danger" />
                  <p className="font-semibold text-navy">Not eligible</p>
                </div>
                <p className="mt-2 text-sm text-slate-700">Student not found or not eligible for the active election.</p>
              </div>
            )}
            {result === "voted" && (
              <div className="rounded-xl border border-warm/40 bg-warm/5 p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#8a6a00]" />
                  <p className="font-semibold text-navy">Already voted</p>
                </div>
                <p className="mt-2 text-sm text-slate-700">This student has already submitted a ballot for this election.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}