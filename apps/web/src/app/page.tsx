import Link from "next/link";
import {
  ShieldCheck, Vote, BarChart3, Users, CheckCircle2, ArrowRight, Share2,
  Fingerprint, EyeOff, ShieldAlert, Building2, ScrollText,
  LockKeyhole, GraduationCap, Globe2, Award, FileCheck,
  Sparkles, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypewriterHero } from "@/components/layout/typewriter-hero";
import { QuickAccessHub } from "@/components/landing/quick-access-hub";
import { LeadersPortfolio } from "@/components/landing/leaders-portfolio";
import { GovBanner } from "@/components/landing/gov-banner";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1e40af]">
      <GovBanner />
      <Nav />
      <Hero />
      <TrustBar />
      <QuickAccessHub />
      <Categories />
      <LeadersPortfolio />
      <HowItWorks />
      <Security />
      <CTA />
      <Footer />
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MODERN NAV
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function Nav() {
  const links = [
    { l: "Home",         h: "#" },
    { l: "Elections",    h: "#elections" },
    { l: "How It Works", h: "#how" },
    { l: "Security",     h: "#security" },
    { l: "Guidelines",   h: "#guidelines" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#1e40af]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-[#F47721] text-white text-sm font-black ring-2 ring-[#F47721]/30 ring-offset-2 ring-offset-[#1e40af] transition group-hover:ring-offset-4">
            ATC
          </div>
          <div className="hidden sm:block">
            <p className="text-[13px] font-extrabold tracking-[0.02em] text-white">
              ATC DIGITAL DEMOCRACY
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-blue-200/80">
              Arusha Technical College
            </p>
          </div>
        </Link>

        {/* Center links â€” modern underline */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((x) => (
            <a
              key={x.l}
              href={x.h}
              className="group relative rounded-lg px-3.5 py-2 text-[14px] font-medium text-blue-100 transition-colors hover:text-white"
            >
              {x.l}
              <span className="pointer-events-none absolute inset-x-3.5 bottom-1 h-[2px] scale-x-0 rounded-full bg-[#F47721] transition-transform duration-300 origin-center group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          {/* Language pill */}
          <div className="hidden items-center rounded-full border border-white/15 bg-white/5 p-0.5 backdrop-blur-sm sm:flex">
            <button
              type="button"
              className="rounded-full bg-white px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-[#1e40af] shadow-sm"
            >
              EN
            </button>
            <button
              type="button"
              className="rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide text-blue-200 transition hover:text-white"
            >
              SW
            </button>
          </div>

          <Link
            href="/share/soateco-2026"
            target="_blank"
            className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-blue-100 backdrop-blur-sm transition hover:bg-white/10 hover:text-white sm:flex"
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </Link>

          <Button
            asChild
            variant="orange"
            size="md"
            className="ring-2 ring-[#F47721]/40 ring-offset-2 ring-offset-[#1e40af] transition hover:ring-offset-4"
          >
            <Link href="/login">
              Sign In <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HERO
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1e40af]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,119,33,0.20),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(22,163,106,0.12),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-blue-100 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16A36A] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#16A36A]" />
              </span>
              Voting is LIVE Â· SOATECO 2026
            </div>

            <div className="mt-8 min-h-[240px] sm:min-h-[280px]">
              <TypewriterHero />
            </div>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-100 sm:text-xl">
              <span className="font-semibold text-white">Secure. Transparent. Accountable.</span>{" "}
              Run student elections the modern way â€” verified voters, anonymous ballots, auditable results.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                variant="orange"
                size="lg"
                className="ring-2 ring-white/20 transition hover:ring-offset-2 hover:ring-offset-[#1e40af]"
              >
                <Link href="/login">
                  Access Voting Platform <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/25 bg-white/5 text-white transition hover:bg-white/10"
              >
                <a href="#elections">Explore Elections</a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-blue-200">
              {["Anonymous ballots", "Verified voters", "Auditable results"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#16A36A]" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right â€” image with ring */}
          <div className="relative">
            <div className="group relative overflow-hidden rounded-3xl ring-4 ring-[#F47721] ring-offset-8 ring-offset-[#1e40af] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                alt="ATC students on campus"
                className="h-[440px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10243A]/40 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 left-6 rounded-2xl bg-white px-4 py-3 shadow-2xl ring-4 ring-[#F47721]/40 transition hover:ring-[#F47721]">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-[#16A36A]">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Verified
                  </p>
                  <p className="text-sm font-bold text-[#10243A]">3,756 eligible voters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   TRUST BAR
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function TrustBar() {
  const stats = [
    { v: "3,842", l: "Registered students" },
    { v: "87",    l: "Approved candidates" },
    { v: "12",    l: "Elections completed" },
    { v: "100%",  l: "Anonymous ballots" },
  ];
  return (
    <section className="border-y border-white/5 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <p className="text-3xl font-black text-[#10243A] sm:text-4xl">{s.v}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
              {s.l}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CATEGORIES
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function Categories() {
  const items = [
    {
      title: "SOATECO Elections",
      tag: "All Students",
      Icon: Globe2,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
      desc: "The general student government. Choose President, Vice President, Secretary and more.",
      features: ["All active students eligible", "Multiple executive positions", "One anonymous ballot"],
    },
    {
      title: "Class Elections",
      tag: "Class Only",
      Icon: GraduationCap,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      desc: "Leadership inside your own class. Pick your Class Representative and assistants.",
      features: ["Class-specific eligibility", "NTA-level leadership", "Frozen class register"],
    },
  ];

  return (
    <section id="elections" className="bg-[#1e40af] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center text-white">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-100">
            <Sparkles className="h-3 w-3 text-[#F47721]" /> Elections
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Two tracks. One platform.
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Everyone stays in their lane. Every election is fully independent.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {items.map((c) => {
            const Icon = c.Icon;
            return (
              <article
                key={c.title}
                className="group overflow-hidden rounded-3xl bg-white shadow-2xl ring-4 ring-[#F47721]/60 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-15px_rgba(244,119,33,0.5)] hover:ring-[#F47721]"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10243A]/80 via-[#10243A]/30 to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#10243A] shadow-lg ring-2 ring-[#F47721]/40">
                    <Icon className="h-3.5 w-3.5 text-[#F47721]" />
                    {c.tag}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-extrabold tracking-tight text-[#10243A]">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{c.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {c.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#16A36A]/10">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#16A36A]" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HOW IT WORKS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function HowItWorks() {
  const steps = [
    { n: "01", Icon: Fingerprint,  title: "Verify identity",   desc: "Sign in with your admission number and a quick security challenge." },
    { n: "02", Icon: Users,        title: "Explore candidates", desc: "Read every manifesto. Compare. Decide without pressure." },
    { n: "03", Icon: Vote,         title: "Cast your ballot",   desc: "One candidate per position. Review everything before you submit." },
    { n: "04", Icon: FileCheck,    title: "Get confirmation",   desc: "Receive an anonymous receipt. Your identity never touches the ballot." },
  ];

  return (
    <section id="how" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#10243A]">
            <Zap className="h-3 w-3 text-[#F47721]" /> How it works
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#10243A] sm:text-5xl">
            First login â†’ sealed ballot<br />in under two minutes.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Four simple steps. Zero shortcuts on security.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.Icon;
            return (
              <div key={s.n} className="relative">
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-[72px] hidden h-px w-6 bg-gradient-to-r from-slate-300 to-transparent lg:block" />
                )}
                <div className="group relative h-full rounded-3xl bg-white p-8 ring-2 ring-[#F47721]/20 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#F47721]/15 hover:ring-4 hover:ring-[#F47721]">
                  <div className="flex items-start justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F47721]/10 text-[#F47721] ring-2 ring-[#F47721]/20 transition group-hover:bg-[#F47721] group-hover:text-white group-hover:ring-[#F47721]/40">
                      <Icon className="h-6 w-6 transition group-hover:scale-110" />
                    </div>
                    <span className="text-5xl font-black leading-none text-slate-100 transition-colors duration-500 group-hover:text-[#F47721]/30">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold tracking-tight text-[#10243A]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECURITY
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function Security() {
  const pillars = [
    { Icon: ShieldCheck, title: "Identity verified",  desc: "Admission number, security challenge and OTP where available." },
    { Icon: EyeOff,      title: "Ballot anonymous",   desc: "Cryptographically separated from your identity. Forever." },
    { Icon: ShieldAlert, title: "No duplicate votes", desc: "One accepted ballot per voter per election. Enforced atomically." },
    { Icon: Building2,   title: "Authorized only",    desc: "Only the ATC Electoral Commission runs elections." },
    { Icon: ScrollText,  title: "Fully auditable",    desc: "Every action hash-chained. Tampering breaks the chain." },
    { Icon: Award,       title: "Independent review", desc: "Security review is required before any real election." },
  ];

  return (
    <section id="security" className="bg-[#1e40af] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center text-white">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-100">
            <LockKeyhole className="h-3 w-3 text-[#16A36A]" /> Security
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Trust isn&apos;t promised.<br />It&apos;s engineered.
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Six layers of protection. Zero shortcuts.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.Icon;
            return (
              <div
                key={p.title}
                className="group rounded-3xl bg-white p-8 shadow-2xl ring-4 ring-[#F47721]/40 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-15px_rgba(244,119,33,0.5)] hover:ring-[#F47721]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F47721]/10 text-[#F47721] ring-2 ring-[#F47721]/20 transition group-hover:bg-[#F47721] group-hover:text-white group-hover:ring-[#F47721]/40">
                  <Icon className="h-5 w-5 transition group-hover:scale-110" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-[#10243A]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white p-6 text-center ring-4 ring-[#F2C94C]/60 transition hover:ring-[#F2C94C]">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#10243A]">
            <LockKeyhole className="h-4 w-4 text-[#F47721]" />
            Independent verification is required before any real election
          </p>
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CTA
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function CTA() {
  return (
    <section className="bg-[#1e40af] py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-10 text-center shadow-2xl ring-4 ring-[#F47721] sm:p-16">
          <h2 className="text-4xl font-black leading-tight tracking-tight text-[#10243A] sm:text-5xl">
            Ready to make<br />your voice count?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            Sign in with your ATC admission number. Verify. Vote. Done â€” in under two minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              variant="orange"
              size="lg"
              className="ring-2 ring-[#F47721]/30 ring-offset-2 transition hover:ring-offset-4"
            >
              <Link href="/login">
                Access Voting Platform <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#guidelines">Read guidelines</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FOOTER
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function Footer() {
  return (
    <footer id="guidelines" className="border-t border-white/10 bg-[#1e40af]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#F47721] text-white text-sm font-black ring-2 ring-[#F47721]/40">
                ATC
              </div>
              <div>
                <p className="text-sm font-extrabold tracking-tight text-white">
                  ATC DIGITAL DEMOCRACY
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-blue-200/80">
                  Arusha Technical College
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-blue-100">
              A modern digital platform for secure, transparent and accountable student elections.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Secure", "Anonymous", "Auditable"].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/20"
                >
                  <ShieldCheck className="h-3 w-3 text-[#16A36A]" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {[
            { h: "Platform",    l: ["Elections", "How It Works", "Results"] },
            { h: "Legal",       l: ["Privacy Policy", "Terms", "Guidelines"] },
            { h: "Support",     l: ["Help Center", "FAQ", "Contact EC"] },
            { h: "Institution", l: ["ATC Website", "SOATECO", "Student Portal"] },
          ].map((col) => (
            <div key={col.h} className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-200">{col.h}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.l.map((l) => (
                  <li key={l}>
                    <a href="#" className="group inline-flex items-center gap-1 text-blue-100 transition hover:text-white">
                      {l}
                      <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-blue-200 sm:flex-row">
          <p>Â© {new Date().getFullYear()} ATC DIGITAL DEMOCRACY Â· Arusha Technical College</p>
          <p className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#16A36A]" />
            Secure Â· Anonymous Â· Auditable
          </p>
        </div>
      </div>
    </footer>
  );
}



