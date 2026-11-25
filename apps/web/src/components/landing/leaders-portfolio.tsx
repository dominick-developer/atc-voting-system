import {
  Award, Crown, Mail, Sparkles, Users, GraduationCap,
  Trophy, UserCog, CalendarClock, PlusCircle,
} from "lucide-react";
import { leaders } from "@/lib/leaders-data";

export type LeaderTab = "soateco" | "class" | "candidates" | "past";

interface LeadersPortfolioProps {
  activeTab?: LeaderTab;
}

interface Leader {
  id: string;
  name: string;
  position: string;
  term: string;
  programme: string;
  year: string;
  achievement: string;
  email: string;
  initials: string;
  gradient: string;
  category?: LeaderTab; // ← optional; falls back to "soateco"
}

export function LeadersPortfolio({ activeTab = "soateco" }: LeadersPortfolioProps) {
  const pool = (leaders as Leader[]).filter((l) => {
    const cat = l.category ?? "soateco";
    return cat === activeTab;
  });

  // ─── Empty state per tab ─────────────────────────────────
  if (pool.length === 0) {
    return <EmptyState tab={activeTab} />;
  }

  const [featured, ...others] = pool;

  return (
    <>
      {/* Featured card */}
      <article className="group relative overflow-hidden rounded-3xl bg-[#0a1628] shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_0%,rgba(244,119,33,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_0%_100%,rgba(30,64,175,0.25),transparent_60%)]" />

        <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-12 lg:items-center lg:p-12">
          <div className="lg:col-span-4">
            <div className="relative mx-auto w-fit">
              <div
                className={`grid h-40 w-40 place-items-center rounded-3xl bg-gradient-to-br ${featured.gradient} text-white text-5xl font-black shadow-2xl ring-4 ring-white/10`}
              >
                {featured.initials}
              </div>
              <div className="absolute -bottom-3 -right-3 rounded-2xl bg-[#F47721] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                {featured.position.split(" ")[0]}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#F47721] backdrop-blur-sm">
              <Award className="h-3 w-3" /> Featured
            </div>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {featured.name}
            </h3>
            <p className="mt-1.5 text-base text-white/60">
              {featured.position} · {featured.term}
            </p>
            <p className="mt-1 text-sm text-white/40">
              {featured.programme} · {featured.year}
            </p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Key achievement
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                {featured.achievement}
              </p>
            </div>

            <a
              href={`mailto:${featured.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" />
              {featured.email}
            </a>
          </div>
        </div>
      </article>

      {/* Other leaders */}
      {others.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {others.map((leader) => (
            <article
              key={leader.id}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_50px_-20px_rgba(15,23,42,0.15)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_30px_60px_-20px_rgba(15,23,42,0.25)]"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${leader.gradient} text-white text-xl font-black shadow-lg transition duration-500 group-hover:scale-105 group-hover:rotate-3`}
                >
                  {leader.initials}
                </div>
                <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-600">
                  {leader.term.split(" / ")[0]}
                </div>
              </div>

              <h3 className="mt-5 text-lg font-bold tracking-tight text-[#0a1628]">
                {leader.name}
              </h3>
              <p className="mt-0.5 text-sm font-semibold text-[#F47721]">
                {leader.position}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {leader.programme} · {leader.year}
              </p>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Portfolio highlight
                </p>
                <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {leader.achievement}
                </p>
              </div>

              <a
                href={`mailto:${leader.email}`}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition group-hover:text-[#F47721]"
              >
                <Mail className="h-3 w-3" />
                Contact
              </a>
            </article>
          ))}
        </div>
      )}

      {/* Footnote */}
      <div className="mt-10 text-center">
        <p className="inline-flex items-center gap-1.5 text-xs text-slate-500">
          <Sparkles className="h-3 w-3 text-[#F47721]" />
          {footnoteFor(activeTab)}
        </p>
      </div>
    </>
  );
}

// ─── Empty state per tab ───────────────────────────────────
function EmptyState({ tab }: { tab: LeaderTab }) {
  const config = {
    soateco: {
      Icon: Crown,
      title: "No SOATECO leaders yet",
      desc: "Once the election results are declared, elected officials will appear here.",
    },
    class: {
      Icon: GraduationCap,
      title: "No class leaders yet",
      desc: "Class representatives will appear here after their respective class elections.",
    },
    candidates: {
      Icon: Trophy,
      title: "No candidates yet",
      desc: "Approved candidates for the current election will appear here. Check back soon.",
    },
    past: {
      Icon: UserCog,
      title: "Past leaders archive coming soon",
      desc: "Historical leadership records will be available here in a future update.",
    },
  }[tab];

  const Icon = config.Icon;

  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white text-[#F47721] ring-2 ring-[#F47721]/20 shadow-sm">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-[#0a1628]">{config.title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        {config.desc}
      </p>
    </div>
  );
}

function footnoteFor(tab: LeaderTab): string {
  switch (tab) {
    case "soateco":
      return "Leaders are elected annually by ATC students through the SOATECO general election.";
    case "class":
      return "Class leaders are elected by their own class members at the start of the academic year.";
    case "candidates":
      return "Candidates listed here have been approved by the Electoral Commission.";
    case "past":
      return "Archive of previous leadership across all election cycles.";
  }
}