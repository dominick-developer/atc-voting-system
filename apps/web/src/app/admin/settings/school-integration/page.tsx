"use client";

import { useEffect, useState } from "react";
import {
  Building2, KeyRound, Globe, Clock, Save, Loader2,
  CheckCircle2, XCircle, Eye, EyeOff, Trash2, RefreshCw,
  AlertTriangle, ExternalLink, Activity,
} from "lucide-react";
import Link from "next/link";
import { api, ApiError } from "@/lib/api/client";
import { useToast } from "@/components/shared/toast";
import { Button } from "@/components/ui/button";

interface AtcConfig {
  enabled: boolean;
  baseUrl: string;
  apiKeyMasked: string | null;
  hasApiKey: boolean;
  timeoutMs: number;
  lastTestedAt: string | null;
  lastTestStatus: "SUCCESS" | "FAILED" | null;
}

interface TestResult {
  success: boolean;
  statusCode?: number | null;
  message?: string;
  durationMs?: number;
  testedAt?: string;
  endpoint?: string;
}

interface SyncLog {
  id: string;
  status: string;
  message: string | null;
  records: number;
  createdAt: string;
}

export default function SchoolIntegrationPage() {
  const toast = useToast();
  const [config, setConfig] = useState<AtcConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([]);

  // Form state
  const [enabled, setEnabled] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [timeoutMs, setTimeoutMs] = useState(10000);
  const [apiKeyInput, setApiKeyInput] = useState(""); // empty = unchanged
  const [showKey, setShowKey] = useState(false);
  const [clearKey, setClearKey] = useState(false);

  // ─── Load ──────────────────────────────────────────────────────
  const load = async () => {
    setLoading(true);
    try {
      const [cfg, logs] = await Promise.all([
        api.get<AtcConfig>("/settings/integrations/atc"),
        api.get<SyncLog[]>("/settings/integrations/atc/sync-logs").catch(() => []),
      ]);
      setConfig(cfg);
      setEnabled(cfg.enabled);
      setBaseUrl(cfg.baseUrl);
      setTimeoutMs(cfg.timeoutMs);
      setApiKeyInput("");
      setClearKey(false);
      setSyncLogs(logs);
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "Failed to load config");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Save ──────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!baseUrl.trim()) {
      toast.error("Base URL is required");
      return;
    }
    try {
      new URL(baseUrl);
    } catch {
      toast.error("Base URL must be a valid URL (e.g. https://api.atc.ac.tz)");
      return;
    }

    setSaving(true);
    try {
      const body: any = { enabled, baseUrl: baseUrl.trim(), timeoutMs };
      if (clearKey) body.apiKey = "";
      else if (apiKeyInput) body.apiKey = apiKeyInput;

      const updated = await api.put<AtcConfig>(
        "/settings/integrations/atc",
        body,
      );
      setConfig(updated);
      setApiKeyInput("");
      setClearKey(false);
      toast.success("School integration settings saved");
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // ─── Test ──────────────────────────────────────────────────────
  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const result = await api.post<TestResult>(
        "/settings/integrations/atc/test",
      );
      setTestResult(result);
      if (result.success) toast.success("Connection successful");
      else toast.error(result.message || "Connection failed");
      // Refresh config so lastTestedAt updates
      const cfg = await api.get<AtcConfig>("/settings/integrations/atc");
      setConfig(cfg);
    } catch (e) {
      const message = e instanceof ApiError ? e.message : "Test failed";
      setTestResult({ success: false, message });
      toast.error(message);
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/admin/dashboard" className="hover:text-slate-900">
          Admin
        </Link>
        <span>/</span>
        <span className="text-slate-900">School Integration</span>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <Building2 className="h-6 w-6 text-[#F47721]" />
            School Integration
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Configure the connection to Arusha Technical College&apos;s student
            information system. When enabled, student records can be pulled
            automatically instead of manually importing files.
          </p>
        </div>
        <StatusPill enabled={config?.enabled ?? false} />
      </div>

      {/* Status card */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Activity}
          label="Status"
          value={config?.enabled ? "Enabled" : "Disabled"}
          color={config?.enabled ? "text-emerald-600" : "text-slate-500"}
        />
        <StatCard
          icon={CheckCircle2}
          label="Last Test"
          value={
            config?.lastTestedAt
              ? `${new Date(config.lastTestedAt).toLocaleString()} · ${config.lastTestStatus}`
              : "Never tested"
          }
          color={
            config?.lastTestStatus === "SUCCESS"
              ? "text-emerald-600"
              : config?.lastTestStatus === "FAILED"
              ? "text-red-600"
              : "text-slate-500"
          }
        />
        <StatCard
          icon={KeyRound}
          label="API Key"
          value={config?.hasApiKey ? config.apiKeyMasked || "Configured" : "Not set"}
          color={config?.hasApiKey ? "text-slate-900" : "text-amber-600"}
        />
      </div>

      {/* Main form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Connection Settings
          </h2>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <span className="text-slate-600">Enable</span>
            <button
              type="button"
              onClick={() => setEnabled((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition ${
                enabled ? "bg-emerald-500" : "bg-slate-300"
              }`}
              role="switch"
              aria-checked={enabled}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                  enabled ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </label>
        </div>

        <div className="mt-6 space-y-5">
          {/* Base URL */}
          <Field
            icon={Globe}
            label="API Base URL"
            hint="e.g. https://api.atc.ac.tz/v1 — must be HTTPS in production"
          >
            <input
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.atc.ac.tz/v1"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </Field>

          {/* API Key */}
          <Field
            icon={KeyRound}
            label="API Key"
            hint={
              config?.hasApiKey
                ? `Current: ${config.apiKeyMasked}. Leave blank to keep unchanged.`
                : "Provided by ATC IT department"
            }
          >
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKeyInput}
                onChange={(e) => {
                  setApiKeyInput(e.target.value);
                  setClearKey(false);
                }}
                placeholder={
                  config?.hasApiKey
                    ? "Leave blank to keep current key"
                    : "Paste API key here"
                }
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-10 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {config?.hasApiKey && (
              <button
                type="button"
                onClick={() => {
                  setClearKey((v) => !v);
                  setApiKeyInput("");
                }}
                className={`mt-2 inline-flex items-center gap-1.5 text-xs font-medium ${
                  clearKey ? "text-red-600" : "text-slate-500 hover:text-red-600"
                }`}
              >
                <Trash2 className="h-3.5 w-3.5" />
                {clearKey ? "Key will be cleared on save — click to undo" : "Clear current key"}
              </button>
            )}
          </Field>

          {/* Timeout */}
          <Field
            icon={Clock}
            label="Request Timeout (ms)"
            hint="Between 1000 and 60000 ms. Default 10000."
          >
            <input
              type="number"
              min={1000}
              max={60000}
              step={500}
              value={timeoutMs}
              onChange={(e) => setTimeoutMs(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </Field>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
          <Button
            onClick={handleSave}
            variant="orange"
            size="md"
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "Saving…" : "Save Settings"}
          </Button>
          <Button
            onClick={handleTest}
            variant="outline"
            size="md"
            disabled={testing || !config?.hasApiKey}
          >
            {testing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {testing ? "Testing…" : "Test Connection"}
          </Button>
          {!config?.hasApiKey && (
            <span className="text-xs text-amber-600">
              Save an API key first, then test.
            </span>
          )}
        </div>

        {/* Test result */}
        {testResult && (
          <div
            className={`mt-6 rounded-xl border p-4 text-sm ${
              testResult.success
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            <div className="flex items-start gap-2">
              {testResult.success ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-semibold">
                  {testResult.success ? "Connection successful" : "Connection failed"}
                </p>
                <p className="mt-1 text-xs opacity-90">
                  {testResult.success
                    ? `HTTP ${testResult.statusCode} · ${testResult.durationMs}ms · endpoint ${testResult.endpoint}`
                    : testResult.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sync logs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Sync Activity
          </h2>
          <span className="text-xs text-slate-500">
            Last {syncLogs.length} records
          </span>
        </div>
        {syncLogs.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No sync activity yet. Logs will appear here when data is pulled
            from the school system.
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-600">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Status</th>
                  <th className="px-4 py-2.5 font-semibold">Message</th>
                  <th className="px-4 py-2.5 font-semibold">Records</th>
                  <th className="px-4 py-2.5 font-semibold">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {syncLogs.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          l.status === "SUCCESS"
                            ? "bg-emerald-100 text-emerald-700"
                            : l.status === "FAILED"
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-700">
                      {l.message || "—"}
                    </td>
                    <td className="px-4 py-2.5 text-slate-600">{l.records}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">
                      {new Date(l.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Security note */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div className="text-sm text-amber-900">
            <p className="font-semibold">Security notes</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-xs">
              <li>The API key is encrypted at rest (AES-256-GCM).</li>
              <li>It is never logged and never returned in API responses.</li>
              <li>Only SYSTEM_ADMIN can view or modify these settings.</li>
              <li>All changes are recorded in the audit trail.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Small components ───────────────────────────────────────────────
function StatusPill({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        enabled
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          enabled ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />
      {enabled ? "Active" : "Inactive"}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className={`mt-2 text-sm font-semibold ${color}`}>{value}</p>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  hint,
  children,
}: {
  icon: any;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
        <Icon className="h-4 w-4 text-slate-400" />
        {label}
      </label>
      {hint && <p className="mt-0.5 mb-2 text-xs text-slate-500">{hint}</p>}
      {children}
    </div>
  );
}