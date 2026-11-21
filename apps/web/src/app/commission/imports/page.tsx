import { Upload, FileSpreadsheet, CheckCircle2, XCircle, Clock } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { COMMISSION_NAV } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { importJobs } from "@/lib/commission-data";

const STATUS: Record<string, { label: string; variant: "success" | "danger" | "info"; icon: any }> = {
  COMPLETED: { label: "Completed", variant: "success", icon: CheckCircle2 },
  FAILED: { label: "Failed", variant: "danger", icon: XCircle },
  IN_PROGRESS: { label: "In progress", variant: "info", icon: Clock },
};

export default function ImportsPage() {
  return (
    <DashboardShell nav={COMMISSION_NAV} subtitle="Electoral Commission" roleLabel="COMMISSION"
      title="Student data imports" topbarSubtitle="Upload and validate CSV / Excel files">

      <Card className="mb-6 border-dashed border-2 border-slate-300 bg-slate-50">
        <CardContent className="p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-orange/10 text-orange">
            <Upload className="h-6 w-6" />
          </div>
          <p className="mt-3 font-semibold text-navy">Upload a new student file</p>
          <p className="mt-1 text-sm text-slate-600">Drag & drop .xlsx or .csv, or click to browse</p>
          <Button variant="orange" className="mt-4">Choose file</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="divide-y divide-slate-100 p-0">
          {importJobs.map((j) => {
            const s = STATUS[j.status];
            const Icon = s.icon;
            return (
              <div key={j.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy/5 text-navy">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-navy">{j.fileName}</p>
                    <Badge variant={s.variant}><Icon className="mr-1 h-3 w-3" />{s.label}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">
                    {j.uploadedBy} • {j.rows} rows • <span className="text-emerald font-medium">{j.valid} valid</span>
                    {j.errors > 0 && <> • <span className="text-danger font-medium">{j.errors} errors</span></>}
                    {" "} • {j.date}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}