"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShieldCheck, Vote, Users, CheckCircle2, ArrowRight,
  Fingerprint, EyeOff, ShieldAlert, Building2, ScrollText,
  LockKeyhole, GraduationCap, Globe2, Award, FileCheck,
  Sparkles, Zap, Menu, X, ChevronDown, Mail, Phone, MapPin,
  Facebook, Instagram, Twitter, Youtube, Scale, Gavel, HelpCircle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypewriterHero } from "@/components/layout/typewriter-hero";
import { QuickAccessHub } from "@/components/landing/quick-access-hub";
import { LeadersPortfolio } from "@/components/landing/leaders-portfolio";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1e40af]">
      <Nav />
      <Hero />
      <TrustBar />
      <QuickAccessHub />
      <Categories />
      <div id="leaders">
        <LeadersPortfolio />
      </div>
      <HowItWorks />
      <Security />
      <FAQ />
      <Regulations />
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAV — Desktop + Mobile drawer
═══════════════════════════════════════════════════════════ */
function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { l: "Home", h: "#" },
    { l: "Elections", h: "#elections" },
    { l: "SOATECO Leaders", h: "#leaders" },
    { l: "How It Works", h: "#how" },
    { l: "Security", h: "#security" },
    { l: "FAQs", h: "#faq" },
    { l: "Regulations", h: "#regulations" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#1e40af]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
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

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((x) => (
            <a
              key={x.l}
              href={x.h}
              className="group relative rounded-lg px-3 py-2 text-[13px] font-medium text-blue-100 transition-colors hover:text-white"
            >
              {x.l}
              <span className="pointer-events-none absolute inset-x-3 bottom-1 h-[2px] scale-x-0 rounded-full bg-[#F47721] transition-transform duration-300 origin-center group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
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

          <Button
            asChild
            variant="orange"
            size="md"
            className="hidden sm:inline-flex ring-2 ring-[#F47721]/40 ring-offset-2 ring-offset-[#1e40af] transition hover:ring-offset-4"
          >
            <Link href="/login">
              Student Login <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#1e40af]">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {links.map((x) => (
              <a
                key={x.l}
                href={x.h}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white"
              >
                {x.l}
              </a>
            ))}
            <div className="pt-2">
              <Button asChild variant="orange" size="md" className="w-full">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  Student Login <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1e40af]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,119,33,0.20),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(22,163,106,0.12),transparent_50%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-blue-100 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16A36A] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#16A36A]" />
              </span>
              Voting is LIVE · SOATECO 2026
            </div>

            <div className="mt-6 min-h-[200px] sm:min-h-[240px]">
              <TypewriterHero />
            </div>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-blue-100">
              <span className="font-semibold text-white">Secure. Transparent. Accountable.</span>{" "}
              Run student elections the modern way — verified voters, anonymous ballots, auditable results.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-blue-200">
              {["Anonymous ballots", "Verified voters", "Auditable results"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#16A36A]" /> {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="group relative overflow-hidden rounded-3xl ring-4 ring-[#F47721] ring-offset-8 ring-offset-[#1e40af] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                alt="ATC students on campus"
                className="h-[400px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10243A]/40 via-transparent to-transparent" />
            </div>

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

/* ═══════════════════════════════════════════════════════════
   TRUST BAR
═══════════════════════════════════════════════════════════ */
function TrustBar() {
  const stats = [
    { v: "3,842", l: "Registered students" },
    { v: "87", l: "Approved candidates" },
    { v: "12", l: "Elections completed" },
    { v: "100%", l: "Anonymous ballots" },
  ];
  return (
    <section className="border-y border-white/5 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
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

/* ═══════════════════════════════════════════════════════════
   CATEGORIES
═══════════════════════════════════════════════════════════ */
function Categories() {
  const items = [
    {
      title: "SOATECO Elections",
      tag: "All Students",
      Icon: Globe2,
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
      desc: "The general student government. Choose President, Vice President, Secretary and more.",
      features: ["All active students eligible", "Multiple executive positions", "One anonymous ballot"],
    },
    {
      title: "Class Elections",
      tag: "Class Only",
      Icon: GraduationCap,
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      desc: "Leadership inside your own class. Pick your Class Representative and assistants.",
      features: ["Class-specific eligibility", "NTA-level leadership", "Frozen class register"],
    },
  ];

  return (
    <section id="elections" className="relative bg-[#1e40af] py-20 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center text-white">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-100">
            <Sparkles className="h-3 w-3 text-[#F47721]" /> Elections
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Two tracks. One platform.
          </h2>
          <p className="mt-3 text-lg text-blue-100">
            Everyone stays in their lane. Every election is fully independent.
          </p>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {items.map((c) => {
            const Icon = c.Icon;
            return (
              <article
                key={c.title}
                className="group overflow-hidden rounded-3xl bg-white shadow-2xl ring-4 ring-[#F47721]/60 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-15px_rgba(244,119,33,0.5)] hover:ring-[#F47721]"
              >
                <div className="relative h-56 overflow-hidden">
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
                <div className="p-7">
                  <h3 className="text-2xl font-extrabold tracking-tight text-[#10243A]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{c.desc}</p>
                  <ul className="mt-4 space-y-2">
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

/* ═══════════════════════════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { n: "01", Icon: Fingerprint, title: "Verify identity", desc: "Sign in with your admission number and a quick security challenge." },
    { n: "02", Icon: Users, title: "Explore candidates", desc: "Read every manifesto. Compare. Decide without pressure." },
    { n: "03", Icon: Vote, title: "Cast your ballot", desc: "One candidate per position. Review everything before you submit." },
    { n: "04", Icon: FileCheck, title: "Get confirmation", desc: "Receive an anonymous receipt. Your identity never touches the ballot." },
  ];

  return (
    <section id="how" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#10243A]">
            <Zap className="h-3 w-3 text-[#F47721]" /> How it works
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#10243A] sm:text-5xl">
            First login → sealed ballot<br />in under two minutes.
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Four simple steps. Zero shortcuts on security.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.Icon;
            return (
              <div key={s.n} className="relative">
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-[72px] hidden h-px w-6 bg-gradient-to-r from-slate-300 to-transparent lg:block" />
                )}
                <div className="group relative h-full rounded-3xl bg-white p-7 ring-2 ring-[#F47721]/20 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#F47721]/15 hover:ring-4 hover:ring-[#F47721]">
                  <div className="flex items-start justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F47721]/10 text-[#F47721] ring-2 ring-[#F47721]/20 transition group-hover:bg-[#F47721] group-hover:text-white group-hover:ring-[#F47721]/40">
                      <Icon className="h-6 w-6 transition group-hover:scale-110" />
                    </div>
                    <span className="text-5xl font-black leading-none text-slate-100 transition-colors duration-500 group-hover:text-[#F47721]/30">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-[#10243A]">
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

/* ═══════════════════════════════════════════════════════════
   SECURITY
═══════════════════════════════════════════════════════════ */
function Security() {
  const pillars = [
    { Icon: ShieldCheck, title: "Identity verified", desc: "Admission number, security challenge and OTP where available." },
    { Icon: EyeOff, title: "Ballot anonymous", desc: "Cryptographically separated from your identity. Forever." },
    { Icon: ShieldAlert, title: "No duplicate votes", desc: "One accepted ballot per voter per election. Enforced atomically." },
    { Icon: Building2, title: "Authorized only", desc: "Only the ATC Electoral Commission runs elections." },
    { Icon: ScrollText, title: "Fully auditable", desc: "Every action hash-chained. Tampering breaks the chain." },
    { Icon: Award, title: "Independent review", desc: "Security review is required before any real election." },
  ];

  return (
    <section id="security" className="relative bg-[#1e40af] py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(244,119,33,0.15),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center text-white">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-100">
            <LockKeyhole className="h-3 w-3 text-[#16A36A]" /> Security
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Trust isn&apos;t promised.<br />It&apos;s engineered.
          </h2>
          <p className="mt-3 text-lg text-blue-100">
            Six layers of protection. Zero shortcuts.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.Icon;
            return (
              <div
                key={p.title}
                className="group rounded-3xl bg-white p-7 shadow-2xl ring-4 ring-[#F47721]/40 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-15px_rgba(244,119,33,0.5)] hover:ring-[#F47721]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F47721]/10 text-[#F47721] ring-2 ring-[#F47721]/20 transition group-hover:bg-[#F47721] group-hover:text-white group-hover:ring-[#F47721]/40">
                  <Icon className="h-5 w-5 transition group-hover:scale-110" />
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-[#10243A]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-white p-5 text-center ring-4 ring-[#F2C94C]/60 transition hover:ring-[#F2C94C]">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#10243A]">
            <LockKeyhole className="h-4 w-4 text-[#F47721]" />
            Independent verification is required before any real election
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAQ — accordion (closed by default = saves visual length)
═══════════════════════════════════════════════════════════ */
function FAQ() {
  const faqs = [
    { q: "Who is eligible to vote?", a: "All active ATC students registered in the current academic year whose data has been verified and approved by the Electoral Commission." },
    { q: "How do I verify my identity?", a: "Sign in with your admission number and answer a personal security challenge. If OTP is enabled, you'll receive a one-time code by SMS." },
    { q: "Can I vote more than once?", a: "No. The system enforces one accepted ballot per voter per election, atomically. Any attempt to vote again is blocked and audited." },
    { q: "Is my vote anonymous?", a: "Yes. Your identity is cryptographically separated from your ballot. Even system administrators cannot link a vote back to a voter." },
    { q: "What if I forget my admission number?", a: "Contact the Electoral Commission with a valid student ID. They will help verify your identity through alternative means." },
    { q: "Can I change my vote after submitting?", a: "No. Once your ballot is submitted and a receipt is issued, it cannot be modified. Review all selections carefully before confirming." },
    { q: "How do I know my vote was counted?", a: "You'll receive an anonymous receipt with a unique hash. You can verify it publicly without revealing your choices." },
    { q: "What if the system goes down during voting?", a: "Polling stations have offline capability. Ballots are queued locally and synced when connectivity returns, with full audit trails." },
  ];

  return (
    <section id="faq" className="relative bg-white py-20 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(226 232 240) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#10243A]">
            <HelpCircle className="h-3 w-3 text-[#F47721]" /> Frequently Asked
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#10243A] sm:text-5xl">
            Questions, answered.
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Everything you need to know before casting your ballot.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#F47721]/40 hover:shadow-md open:border-[#F47721]/60 open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-[15px] font-semibold text-[#10243A]">{f.q}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-[#F47721] transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-600">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   REGULATIONS
═══════════════════════════════════════════════════════════ */
function Regulations() {
  const rules = [
    { Icon: Users, title: "Eligibility", items: ["Must be an active ATC student", "Registered in voter register", "Identity verified before voting"] },
    { Icon: Scale, title: "Fair Play", items: ["No campaigning on voting day", "No bribery or coercion", "One vote per position"] },
    { Icon: Gavel, title: "Compliance", items: ["Follow EC guidelines", "Respect other candidates", "Violations lead to disqualification"] },
    { Icon: BookOpen, title: "Results", items: ["Published within 24 hours", "Verified by EC before declaration", "Challenges within 7 days"] },
  ];

  return (
    <section id="regulations" className="relative bg-[#1e40af] py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(244,119,33,0.15),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center text-white">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-100">
            <Scale className="h-3 w-3 text-[#F47721]" /> Regulations
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            The rules of the game.
          </h2>
          <p className="mt-3 text-lg text-blue-100">
            Clear rules. Fair play. Accountable outcomes.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rules.map((r) => {
            const Icon = r.Icon;
            return (
              <div
                key={r.title}
                className="group rounded-2xl bg-white p-6 shadow-xl ring-2 ring-[#F47721]/20 transition-all duration-300 hover:-translate-y-1 hover:ring-[#F47721]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#F47721]/10 text-[#F47721] ring-2 ring-[#F47721]/20 transition group-hover:bg-[#F47721] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold tracking-tight text-[#10243A]">{r.title}</h3>
                <ul className="mt-3 space-y-2">
                  {r.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#16A36A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="orange"
            size="lg"
            className="ring-2 ring-white/20 ring-offset-2 ring-offset-[#1e40af]"
          >
            <a href="/docs/regulations.pdf" target="_blank" rel="noopener noreferrer">
              <FileCheck className="h-4 w-4" /> Download Full Regulations
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER — categorized + professional
═══════════════════════════════════════════════════════════ */
function Footer() {
  const cols = [
    {
      h: "Platform",
      links: [
        { l: "Elections", h: "#elections" },
        { l: "SOATECO Leaders", h: "#leaders" },
        { l: "How It Works", h: "#how" },
        { l: "Results", h: "/results" },
      ],
    },
    {
      h: "For Voters",
      links: [
        { l: "Login", h: "/login" },
        { l: "Verify Identity", h: "/verify" },
        { l: "Cast Your Vote", h: "/vote/enter" },
        { l: "Verify Receipt", h: "/verify-receipt" },
      ],
    },
    {
      h: "Legal",
      links: [
        { l: "Regulations", h: "#regulations" },
        { l: "FAQs", h: "#faq" },
        { l: "Privacy Policy", h: "/privacy" },
        { l: "Terms of Service", h: "/terms" },
      ],
    },
  ];

  const socials = [
    { Icon: Facebook, h: "#", label: "Facebook" },
    { Icon: Instagram, h: "#", label: "Instagram" },
    { Icon: Twitter, h: "#", label: "Twitter" },
    { Icon: Youtube, h: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative bg-[#0f1f4a] text-blue-100 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Orange accent line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F47721] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#F47721] text-white text-sm font-black ring-2 ring-[#F47721]/40">
                ATC
              </div>
              <div>
                <p className="text-sm font-extrabold tracking-tight text-white">
                  ATC DIGITAL DEMOCRACY
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-blue-300/80">
                  Arusha Technical College
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-blue-200">
              A modern digital platform for secure, transparent and accountable
              student elections at Arusha Technical College.
            </p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Secure", "Anonymous", "Auditable"].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/20"
                >
                  <ShieldCheck className="h-3 w-3 text-[#16A36A]" /> {b}
                </span>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.Icon;
                return (
                  <a
                    key={s.label}
                    href={s.h}
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-blue-200 ring-1 ring-white/10 transition hover:bg-[#F47721] hover:text-white hover:ring-[#F47721]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.h} className="lg:col-span-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#F47721]">
                {col.h}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.l}>
                    <a
                      href={l.h}
                      className="group inline-flex items-center gap-1 text-blue-200 transition hover:text-white"
                    >
                      {l.l}
                      <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="lg:col-span-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#F47721]">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-blue-200">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F47721]" />
                <span>Arusha Technical College, Arusha, Tanzania</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F47721]" />
                <a href="mailto:ec@atc.ac.tz" className="hover:text-white">
                  ec@atc.ac.tz
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F47721]" />
                <a href="tel:+255000000000" className="hover:text-white">
                  +255 (0) 000 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-blue-300 sm:flex-row">
          <p>
            © {new Date().getFullYear()} ATC DIGITAL DEMOCRACY · Arusha Technical College
          </p>
          <p className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#16A36A]" />
            Secure · Anonymous · Auditable
          </p>
        </div>
      </div>
    </footer>
  );
}