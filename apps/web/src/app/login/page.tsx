"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck, ArrowLeft, Loader2, Fingerprint, LockKeyhole,
  Users, Vote, BarChart3, Eye, GraduationCap, Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const ROUTES: Record<string, string> = {
  SYSTEM_ADMIN: "/admin/dashboard",
  ELECTORAL_COMMISSION: "/commission/dashboard",
  ELECTION_OFFICER: "/officer/dashboard",
  OBSERVER: "/observer/dashboard",
  CANDIDATE: "/candidate/dashboard",
  STUDENT: "/student/dashboard",
};

export default function LoginPage() {
  const router = useRouter();
  const { atcLogin } = useAuth();
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await atcLogin(admissionNumber.trim(), password);
      router.push(ROUTES[user.role] ?? "/student/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  function devLogin(role: string, name: string) {
    localStorage.setItem("atc_token", `dev-${role}`);
    localStorage.setItem("atc_user", JSON.stringify({
      id: `dev-${role}`, admissionNumber: "DEV", fullName: name,
      email: "dev@atc.ac.tz", role, programme: "ICT", class: "NTA 5A",
    }));
    window.location.href = ROUTES[role] ?? "/student/dashboard";
  }

  const DEV_ROLES = [
    { role: "STUDENT", name: "Amina Student", icon: GraduationCap, tone: "orange" },
    { role: "CANDIDATE", name: "Baraka Candidate", icon: Crown, tone: "amber" },
    { role: "ELECTORAL_COMMISSION", name: "Fatuma Commission", icon: Vote, tone: "blue" },
    { role: "ELECTION_OFFICER", name: "Joseph Officer", icon: ShieldCheck, tone: "emerald" },
    { role: "OBSERVER", name: "Neema Observer", icon: Eye, tone: "teal" },
    { role: "SYSTEM_ADMIN", name: "Daudi Admin", icon: Users, tone: "purple" },
  ];

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left â€” form */}
      <div className="flex flex-col bg-gradient-to-br from-white via-slate-50 to-orange-50/40 px-6 py-8 sm:px-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#0a1628]">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#F47721] text-white font-black shadow-md shadow-orange-200">ATC</div>
              <div>
                <p className="text-sm font-extrabold text-[#0a1628]">ATC DIGITAL DEMOCRACY</p>
                <p className="text-xs text-slate-500">Arusha Technical College</p>
              </div>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-[#0a1628]">Karibu tena</h1>
            <p className="mt-2 text-sm text-slate-600">Ingia kwa admission number yako.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="admission" className="text-sm font-bold text-[#0a1628] flex items-center gap-1.5">
                  <Fingerprint className="h-4 w-4" /> Admission Number
                </Label>
                <Input id="admission" placeholder="e.g. ATC/2024/0001"
                  value={admissionNumber} onChange={(e) => setAdmissionNumber(e.target.value)}
                  autoComplete="off" required className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm font-bold text-[#0a1628] flex items-center gap-1.5">
                  <LockKeyhole className="h-4 w-4" /> Password
                </Label>
                <Input id="pwd" type="password" placeholder="Your ATC password" value={password} onChange={(e) => setPassword(e.target.value)}
                  required className="h-12" />
              </div>
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
              )}
              <Button type="submit" disabled={loading}
                className="h-12 w-full bg-[#F47721] text-white hover:bg-[#e6670f] shadow-lg shadow-orange-200">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Verifying with ATC...</> : "Sign in"}
              </Button>
            </form>

            {/* Dev shortcuts */}
            <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-300 bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Dev Quick Login</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {DEV_ROLES.map((d) => {
                  const Icon = d.icon;
                  return (
                    <button key={d.role} onClick={() => devLogin(d.role, d.name)}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs font-semibold text-slate-700 transition hover:border-[#F47721] hover:bg-orange-50">
                      <Icon className="h-4 w-4 text-[#F47721]" />
                      <span className="truncate">{d.role.replace("_", " ")}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right â€” brand panel */}
      <div className="relative hidden overflow-hidden bg-[#1e40af] lg:block">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,119,33,0.25),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(22,163,106,0.18),transparent_50%)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
              <ShieldCheck className="h-3.5 w-3.5" /> Secure voting
            </span>
            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight">
              One vote. One voice.<br />A better ATC.
            </h2>
            <p className="mt-4 max-w-md text-sm text-white/75 leading-relaxed">
              Your ballot is anonymous and encrypted. Nobody â€” not even administrators â€” can see your selections.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[{ v: "3,842", l: "Students" }, { v: "87", l: "Candidates" }, { v: "100%", l: "Anonymous" }].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-black">{s.v}</p>
                <p className="text-[11px] uppercase tracking-wide opacity-70">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
