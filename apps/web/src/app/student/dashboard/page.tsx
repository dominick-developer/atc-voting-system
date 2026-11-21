"use client";

import { Vote, BarChart3, User, Bell, MessageSquare, FileText, GraduationCap } from "lucide-react";
import { CardDashboardShell } from "@/components/layout/card-dashboard-shell";
import { DashboardCard } from "@/components/layout/dashboard-card";

export default function StudentDashboardPage() {
  return (
    <CardDashboardShell title="Student Dashboard" subtitle="Piga kura, angalia matokeo, na simamia akaunti yako">
      <DashboardCard href="/vote/wizard?electionId=soateco-2026" icon={Vote}
        title="Piga Kura Sasa" description="Ingia kwenye karatasi yako ya kupigia kura ya SOATECO 2026."
        tone="orange" badge="LIVE" featured />
      <DashboardCard href="/results" icon={BarChart3} title="Matokeo ya Uchaguzi"
        description="Angalia matokeo ya moja kwa moja na takwimu." tone="blue" />
      <DashboardCard href="/elections" icon={GraduationCap} title="Uchaguzi Unaopatikana"
        description="Angalia uchaguzi wote unaoendelea na ujao." tone="emerald" />
      <DashboardCard href="/profile" icon={User} title="Wasifu Wangu"
        description="Simamia taarifa zako binafsi." tone="purple" />
      <DashboardCard href="/notifications" icon={Bell} title="Arifa"
        description="Tazama arifa na taarifa muhimu." tone="amber" />
      <DashboardCard href="/complaints" icon={MessageSquare} title="Malalamiko"
        description="Wasilisha au fuatilia malalamiko yako." tone="teal" />
      <DashboardCard href="/vote/wizard?electionId=soateco-2026" icon={FileText} title="Risiti Yangu"
        description="Tazama risiti ya kura yako (baada ya kupiga)." tone="slate" />
    </CardDashboardShell>
  );
}