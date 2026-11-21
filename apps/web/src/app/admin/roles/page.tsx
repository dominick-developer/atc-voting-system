"use client";

import { useEffect, useState } from "react";
import { UserCog, Save, Loader2, Users, CheckCircle2, AlertCircle } from "lucide-react";
import { CardDashboardShell } from "@/components/layout/card-dashboard-shell";
import { Button } from "@/components/ui/button";

const ROLES = ["STUDENT","CANDIDATE","ELECTORAL_COMMISSION","ELECTION_OFFICER","RESULTS_OFFICER","OBSERVER","SYSTEM_ADMIN"];
const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type User = { id: string; email: string; fullName: string; roles: string[]; lastLoginAt: string | null; createdAt: string };

export default function AdminRolesPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  function token() { return localStorage.getItem("atc_token"); }

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/users`, { headers: { Authorization: `Bearer ${token()}` } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setUsers(await res.json());
    } catch (e) {
      setMessage({ kind: "err", text: `Failed to load users: ${(e as Error).message}` });
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function toggle(userId: string, role: string) {
    setUsers((prev) => prev.map((u) => {
      if (u.id !== userId) return u;
      const has = u.roles.includes(role);
      return { ...u, roles: has ? u.roles.filter((r) => r !== role) : [...u.roles, role] };
    }));
  }

  async function save(userId: string) {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    setSaving(userId);
    setMessage(null);
    try {
      const res = await fetch(`${API}/api/admin/users/${userId}/roles`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ roles: user.roles }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setMessage({ kind: "ok", text: `Roles updated for ${user.fullName}` });
    } catch (e) {
      setMessage({ kind: "err", text: `Save failed: ${(e as Error).message}` });
    } finally { setSaving(null); }
  }

  return (
    <CardDashboardShell title="User Role Management" subtitle="Assign roles to synced ATC users">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-violet-600">
            <UserCog className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#0a1628]">{users.length} users</p>
            <p className="text-xs text-slate-500">Synced from ATC</p>
          </div>
        </div>
        <Button onClick={load} variant="outline" className="border-2 border-slate-200">Refresh</Button>
      </div>

      {message && (
        <div className={`mb-4 flex items-start gap-2 rounded-xl p-3 text-sm ${message.kind === "ok" ? "border border-emerald-200 bg-emerald-50 text-emerald-800" : "border border-red-200 bg-red-50 text-red-700"}`}>
          {message.kind === "ok" ? <CheckCircle2 className="mt-0.5 h-4 w-4" /> : <AlertCircle className="mt-0.5 h-4 w-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {loading ? (
        <div className="grid place-items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#F47721]" />
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((u) => (
            <div key={u.id} className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-[#0a1628]">{u.fullName}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </div>
                <Button onClick={() => save(u.id)} disabled={saving === u.id} className="h-9 bg-[#F47721] text-white hover:bg-[#e6670f]">
                  {saving === u.id ? <><Loader2 className="h-3 w-3 animate-spin" /> Saving...</> : <><Save className="h-3 w-3" /> Save</>}
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {ROLES.map((role) => {
                  const active = u.roles.includes(role);
                  return (
                    <button key={role} onClick={() => toggle(u.id, role)}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${active ? "bg-[#F47721] text-white shadow-md shadow-orange-200" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                      {role.replace(/_/g, " ")}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </CardDashboardShell>
  );
}
