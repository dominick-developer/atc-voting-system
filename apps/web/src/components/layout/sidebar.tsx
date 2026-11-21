// Navigation data only — the Sidebar component has been removed.
// Dashboards are now card-based, and sub-pages use DashboardShell (sidebar-free).

export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export const STUDENT_NAV: NavItem[] = [
  { label: "Dashboard",     href: "/student/dashboard", icon: "dashboard" },
  { label: "Elections",     href: "/elections",         icon: "elections" },
  { label: "Candidates",    href: "/candidates",        icon: "candidates" },
  { label: "Results",       href: "/results",           icon: "results" },
  { label: "Notifications", href: "/notifications",     icon: "notifications" },
  { label: "Complaints",    href: "/complaints",        icon: "complaints" },
  { label: "Profile",       href: "/profile",           icon: "profile" },
];

export const COMMISSION_NAV: NavItem[] = [
  { label: "Dashboard",   href: "/commission/dashboard",   icon: "dashboard" },
  { label: "Elections",   href: "/commission/elections",   icon: "elections" },
  { label: "Nominations", href: "/commission/nominations", icon: "nominations" },
  { label: "Results",     href: "/commission/results",     icon: "results" },
  { label: "Complaints",  href: "/commission/complaints",  icon: "complaints" },
  { label: "Imports",     href: "/commission/imports",     icon: "imports" },
  { label: "Audit",       href: "/commission/audit",       icon: "audit" },
];