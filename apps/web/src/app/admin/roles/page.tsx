"use client";

import { useState, useMemo } from "react";
import {
  Search, Shield, ShieldCheck, ShieldX, UserPlus, X,
  Loader2, Users as UsersIcon, ChevronLeft, ChevronRight,
} from "lucide-react";
import { api } from "@/lib/api/client";
import { useApi } from "@/hooks/use-api";
import { useToast } from "@/components/shared/toast";
import { Button } from "@/components/ui/button";

// ─── Types (match your Prisma RoleName enum) ────────────────────────────
type RoleName =
  | "SYSTEM_ADMIN"
  | "ELECTORAL_COMMISSION"
  | "ELECTION_OFFICER"
  | "RESULTS_OFFICER"
  | "OBSERVER"
  | "CANDIDATE"
  | "STUDENT";

interface Role {
  id: string;
  name: RoleName;
  description?: string | null;
}

interface UserRow {
  id: string;
  fullName: string;
  email: string | null;
  phoneNumber: string | null;
  isActive: boolean;
  roles: Role[];
}

interface UsersResponse {
  data: UserRow[];
  total: number;
  page: number;
  pageSize: number;
}

const ROLE_COLORS: Record<RoleName, string> = {
  SYSTEM_ADMIN: "bg-red-100 text-red-700 ring-red-200",
  ELECTORAL_COMMISSION: "bg-purple-100 text-purple-700 ring-purple-200",
  ELECTION_OFFICER: "bg-blue-100 text-blue-700 ring-blue-200",
  RESULTS_OFFICER: "bg-indigo-100 text-indigo-700 ring-indigo-200",
  OBSERVER: "bg-teal-100 text-teal-700 ring-teal-200",
  CANDIDATE: "bg-amber-100 text-amber-700 ring-amber-200",
  STUDENT: "bg-slate-100 text-slate-700 ring-slate-200",
};

export default function AssignRolesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [target, setTarget] = useState<UserRow | null>(null);
  const pageSize = 10;

  const toast = useToast();

  const { data, loading, error, refetch } = useApi<UsersResponse>(
    "/users",
    { page, pageSize, search: search || undefined, includeRoles: true },
  );

  // All available roles (fetched once)
  const { data: allRoles } = useApi<Role[]>("/roles");

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Assign Roles</h1>
        <p className="mt-1 text-sm text-slate-600">
          Manage who can access which parts of the system.
        </p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email or phone…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <Button onClick={() => refetch()} variant="outline" size="md">
          Refresh
        </Button>
      </div>

      {/* Loading skeleton */}
      {loading && !data && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-semibold">Imeshindwa kupakia users</p>
          <p className="mt-1">{error}</p>
          <Button onClick={() => refetch()} variant="outline" size="sm" className="mt-3">
            Jaribu tena
          </Button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && data && data.data.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <UsersIcon className="mx-auto h-10 w-10 text-slate-400" />
          <p className="mt-3 text-sm font-medium text-slate-700">
            {search ? "Hakuna users wanaolingana na search yako" : "Hakuna users bado"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {search ? "Badilisha search" : "Ingiza users kutoka system ya ATC kwanza"}
          </p>
        </div>
      )}

      {/* Users table */}
      {data && data.data.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Roles</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.data.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{u.fullName}</p>
                    <p className="text-xs text-slate-500">
                      {u.email || u.phoneNumber || "—"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {u.roles.length === 0 && (
                        <span className="text-xs italic text-slate-400">No roles</span>
                      )}
                      {u.roles.map((r) => (
                        <span
                          key={r.id}
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${ROLE_COLORS[r.name] ?? "bg-slate-100 text-slate-700 ring-slate-200"}`}
                        >
                          {r.name.replace(/_/g, " ")}
                          <button
                            onClick={() => handleRemove(u, r, toast, refetch)}
                            className="ml-0.5 rounded-full p-0.5 hover:bg-black/10"
                            aria-label={`Remove ${r.name}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      onClick={() => setTarget(u)}
                      variant="outline"
                      size="sm"
                    >
                      <UserPlus className="h-3.5 w-3.5" /> Assign Role
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
              <p>
                Showing {(page - 1) * pageSize + 1}–
                {Math.min(page * pageSize, data.total)} of {data.total}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-slate-300 p-1.5 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-3 text-xs">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-slate-300 p-1.5 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Assign modal */}
      {target && allRoles && (
        <AssignRoleModal
          user={target}
          roles={allRoles}
          onClose={() => setTarget(null)}
          onSuccess={() => {
            setTarget(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}

// ─── Modal component ───────────────────────────────────────────────────
function AssignRoleModal({
  user,
  roles,
  onClose,
  onSuccess,
}: {
  user: UserRow;
  roles: Role[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [selected, setSelected] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const available = useMemo(
    () => roles.filter((r) => !user.roles.some((ur) => ur.id === r.id)),
    [roles, user.roles],
  );

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await api.post(`/users/${user.id}/roles`, { roleId: selected });
      const roleName = roles.find((r) => r.id === selected)?.name ?? "Role";
      toast.success(`${roleName.replace(/_/g, " ")} assigned to ${user.fullName}`);
      onSuccess();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to assign role");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-slate-900">Assign Role</h3>
        <p className="mt-1 text-sm text-slate-600">
          To <span className="font-semibold">{user.fullName}</span>
        </p>

        {available.length === 0 ? (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            User already has all available roles.
          </div>
        ) : (
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">— Chagua role —</option>
            {available.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={onClose} variant="outline" size="md" disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="orange"
            size="md"
            disabled={!selected || saving}
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? "Saving…" : "Assign"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────
async function handleRemove(
  user: UserRow,
  role: Role,
  toast: ReturnType<typeof useToast>,
  refetch: () => void,
) {
  if (!confirm(`Remove ${role.name.replace(/_/g, " ")} from ${user.fullName}?`)) return;
  try {
    await api.delete(`/users/${user.id}/roles/${role.id}`);
    toast.success(`${role.name.replace(/_/g, " ")} removed from ${user.fullName}`);
    refetch();
  } catch (e) {
    toast.error(e instanceof Error ? e.message : "Failed to remove role");
  }
}