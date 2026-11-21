"use client";

import {
  Vote, ClipboardList, Users, MapPin, BarChart3,
  MessageSquare, Upload, Shield, Award, FileCheck,
} from "lucide-react";
import { CardDashboardShell } from "@/components/layout/card-dashboard-shell";
import { DashboardCard } from "@/components/layout/dashboard-card";

export default function CommissionDashboardPage() {
  return (
    <CardDashboardShell
      title="Electoral Commission"
      subtitle="Manage elections, nominations, voters, and results — all from here"
    >
      <DashboardCard
        href="/commission/elections"
        icon={Vote}
        title="Elections"
        description="Create, configure and manage all SOATECO and class elections. Set dates, positions and status."
        tone="orange"
        badge="CORE"
        featured
      />
      <DashboardCard
        href="/commission/nominations"
        icon={ClipboardList}
        title="Nominations"
        description="Review candidate submissions, approve or reject nominations, and manage the ballot."
        tone="amber"
      />
      <DashboardCard
        href="/commission/voters"
        icon={Users}
        title="Voter Register"
        description="Manage eligible voters, verify eligibility, and freeze the register before voting opens."
        tone="emerald"
      />
      <DashboardCard
        href="/commission/stations"
        icon={MapPin}
        title="Polling Stations"
        description="Configure polling stations, assign officers, and manage voting terminals."
        tone="teal"
      />
      <DashboardCard
        href="/commission/results"
        icon={BarChart3}
        title="Results & Tally"
        description="Monitor live tallies, verify results, and officially declare the winners."
        tone="blue"
        badge="LIVE"
      />
      <DashboardCard
        href="/commission/complaints"
        icon={MessageSquare}
        title="Complaints"
        description="Handle voter complaints, election disputes, and appeal resolutions."
        tone="purple"
      />
      <DashboardCard
        href="/commission/imports"
        icon={Upload}
        title="Data Imports"
        description="Import student data from ATC API or CSV files. Track import jobs and their reports."
        tone="slate"
      />
      <DashboardCard
        href="/commission/audit"
        icon={Shield}
        title="Audit Log"
        description="Review the hash-chained audit trail of every action taken across the election."
        tone="blue"
      />
    </CardDashboardShell>
  );
}