import { User, Mail, GraduationCap, ShieldCheck, Phone, Calendar } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { STUDENT_NAV } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { currentStudent } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <DashboardShell nav={STUDENT_NAV} subtitle="Student Portal" roleLabel="STUDENT"
      title="Profile" topbarSubtitle="Your student information">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-navy to-slate-700 text-white text-3xl font-bold">
              {currentStudent.fullName.split(" ").map((n) => n[0]).join("")}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-navy">{currentStudent.fullName}</h2>
            <p className="text-sm text-slate-500">{currentStudent.admissionNumber}</p>
            <div className="mt-3 flex justify-center">
              <Badge variant={currentStudent.verified ? "success" : "warning"}>
                <ShieldCheck className="mr-1 h-3 w-3" />
                {currentStudent.verified ? "Verified student" : "Not verified"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Student details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: User, label: "Full name", value: currentStudent.fullName },
              { icon: GraduationCap, label: "Programme", value: currentStudent.programme },
              { icon: GraduationCap, label: "Class", value: currentStudent.class },
              { icon: Calendar, label: "Year of birth", value: currentStudent.yearOfBirth },
              { icon: Mail, label: "Email", value: "john.doe@atc.ac.tz" },
              { icon: Phone, label: "Phone", value: "+255 7xx xxx xxx" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-50 text-navy">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="truncate text-sm font-medium text-navy">{value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}