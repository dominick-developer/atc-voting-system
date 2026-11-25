import Link from "next/link";
import {
  ShieldCheck, Users, Settings, ScrollText, BookOpen,
  BarChart3, Vote, Building2, ArrowRight,
} from "lucide-react";

type CardTone =
  | "blue" | "green" | "purple" | "red"
  | "slate" | "teal" | "amber" | "orange";

interface DashboardCard {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: CardTone;
}

const cards: DashboardCard[] = [
  {
    title: "Assign Roles",
    description:
      "Assign STUDENT, CANDIDATE, COMMISSION, OFFICER, OBSERVER or ADMIN to synced ATC users.",
    href: "/admin/roles",
    icon: ShieldCheck,
    tone: "blue",
  },
  {
    title: "Manage Users",
    description:
      "View, create, edit and disable user accounts across all roles.",
    href: "/admin/users",
    icon: Users,
    tone: "green",
  },
  {
    title: "System Settings",
    description:
      "Configure system-wide preferences and integrations.",
    href: "/admin/settings",
    icon: Settings,
    tone: "purple",
  },
  {
    title: "Audit Log",
    description:
      "Review the hash-chained audit trail of every action.",
    href: "/admin/audit",
    icon: ScrollText,
    tone: "red",
  },
  {
    title: "API Documentation",
    description:
      "Swagger UI for the ATC Voting REST API.",
    href: "/api/docs",
    icon: BookOpen,
    tone: "slate",
  },
  {
    title: "View Results",
    description:
      "Public election results and tallies.",
    href: "/results",
    icon: BarChart3,
    tone: "teal",
  },
  {
    title: "Commission Tools",
    description:
      "Cross-role access to electoral commission tools.",
    href: "/commission/dashboard",
    icon: Vote,
    tone: "amber",
  },
  {
    title: "School Integration",
    description:
      "Configure ATC API keys for automatic student data sync.",
    href: "/admin/settings/school-integration",
    icon: Building2,
    tone: "orange",
  },
];

const toneStyles: Record<CardTone, string> = {
  blue: "bg-blue-50 text-blue-600 ring-blue-100",
  green: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  purple: "bg-purple-50 text-purple-600 ring-purple-100",
  red: "bg-red-50 text-red-600 ring-red-100",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
  teal: "bg-teal-50 text-teal-600 ring-teal-100",
  amber: "bg-amber-50 text-amber-600 ring-amber-100",
  orange: "bg-orange-50 text-orange-600 ring-orange-100",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Chagua action yako hapa chini.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          const tone = toneStyles[card.tone];
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div
                className={`grid h-10 w-10 place-items-center rounded-lg ring-1 ${tone}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 flex items-center gap-1.5 text-base font-semibold text-slate-900">
                {card.title}
                <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}