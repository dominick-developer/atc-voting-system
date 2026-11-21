"use client";

import { Users, Settings, Shield, Database, BarChart3, FileText, Vote } from "lucide-react";
import { CardDashboardShell } from "@/components/layout/card-dashboard-shell";
import { DashboardCard } from "@/components/layout/dashboard-card";

export default function AdminDashboardPage() {
  return (
    <CardDashboardShell title="Admin Dashboard" subtitle="Platform configuration and system health">
      <DashboardCard href="/admin/roles" icon={Shield} title="Assign Roles" description="Assign STUDENT, CANDIDATE, COMMISSION, OFFICER, OBSERVER or ADMIN to synced ATC users." tone="purple" featured />\n      <DashboardCard href="/admin/users" icon={Users} title="Manage Users"
        description="View, create, edit and disable user accounts across all roles." tone="purple" />
      <DashboardCard href="/admin/settings" icon={Settings} title="System Settings"
        description="Configure system-wide preferences and integrations." tone="slate" />
      <DashboardCard href="/commission/audit" icon={Shield} title="Audit Log"
        description="Review the hash-chained audit trail of every action." tone="blue" />
      <DashboardCard href="http://localhost:4000/api/docs" icon={FileText} title="API Documentation"
        description="Swagger UI for the ATC Voting REST API." tone="emerald" />
      <DashboardCard href="/results" icon={BarChart3} title="View Results"
        description="Public election results and tallies." tone="orange" />
      <DashboardCard href="/commission/dashboard" icon={Vote} title="Commission Tools"
        description="Cross-role access to electoral commission tools." tone="amber" />
    </CardDashboardShell>
  );
}

