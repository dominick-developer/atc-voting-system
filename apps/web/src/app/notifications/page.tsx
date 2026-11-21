import { Bell } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { STUDENT_NAV } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <DashboardShell nav={STUDENT_NAV} subtitle="Student Portal" roleLabel="STUDENT"
      title="Notifications" topbarSubtitle={`${unread} unread`}>
      <Card>
        <CardContent className="divide-y divide-slate-100 p-0">
          {notifications.map((n) => (
            <div key={n.id} className={cn("flex items-start gap-4 p-5", !n.read && "bg-orange/5")}>
              <div className={cn(
                "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                n.read ? "bg-slate-100 text-slate-500" : "bg-orange/10 text-orange"
              )}>
                <Bell className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-navy">{n.title}</p>
                  {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-orange" />}
                </div>
                <p className="mt-0.5 text-sm text-slate-600">{n.body}</p>
                <p className="mt-1 text-xs text-slate-400">{n.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}