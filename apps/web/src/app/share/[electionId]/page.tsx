"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
  Printer, Share2, Copy, ArrowLeft, Vote, ShieldCheck,
  Calendar, Check, Loader2, QrCode, Users, Image as ImageIcon,
  Mail, MessageCircle, Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  { n: "01", t: "Open the voting platform", d: "Visit the link or scan the QR code" },
  { n: "02", t: "Enter your admission number", d: "Your official ATC ID" },
  { n: "03", t: "Verify your identity", d: "Answer a quick security question" },
  { n: "04", t: "Cast your ballot", d: "One vote per position — anonymous" },
];

export default function SharePage() {
  const params = useParams();
  const electionId = (params?.electionId as string) ?? "soateco-2026";
  const posterRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined" ? window.location.origin : "https://atc-voting-system.vercel.app");
  const posterUrl = `${siteUrl}/share/${electionId}`;
  const voteUrl   = `${siteUrl}/vote/wizard?electionId=${electionId}`;
  const qrSrc     = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&ecc=H&margin=15&data=${encodeURIComponent(voteUrl)}`;

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 2500); }

  async function generateImage(): Promise<string | null> {
    if (!posterRef.current) return null;
    try {
      return await toPng(posterRef.current, {
        quality: 1, pixelRatio: 3, backgroundColor: "#ffffff", cacheBust: true,
      });
    } catch (err) {
      console.error("Image generation failed:", err);
      return null;
    }
  }

  async function downloadImage() {
    setBusy("image");
    const dataUrl = await generateImage();
    if (!dataUrl) { showToast("❌ Failed to generate image"); setBusy(null); return; }
    const link = document.createElement("a");
    link.download = `${electionId}-flyer.png`;
    link.href = dataUrl;
    link.click();
    showToast("✅ Image downloaded");
    setBusy(null);
  }

  async function shareNative(imageFile?: File | null, title?: string, text?: string, url?: string) {
    if (!navigator.share) return false;
    try {
      if (imageFile && navigator.canShare?.({ files: [imageFile] })) {
        await navigator.share({ files: [imageFile], title, text });
      } else {
        await navigator.share({ title, text, url });
      }
      return true;
    } catch { return false; }
  }

  async function shareWhatsApp() {
    setBusy("whatsapp");
    const text = `🗳️ SOATECO 2026 Election — Arusha Technical College\n\nVote online: ${voteUrl}\n\nSecure · Anonymous · Auditable`;
    const dataUrl = await generateImage();
    let file: File | null = null;
    if (dataUrl) {
      const blob = await (await fetch(dataUrl)).blob();
      file = new File([blob], `${electionId}-flyer.png`, { type: "image/png" });
    }
    if (await shareNative(file, "SOATECO 2026 Election", text, voteUrl)) { setBusy(null); return; }
    if (dataUrl) {
      const link = document.createElement("a");
      link.download = `${electionId}-flyer.png`;
      link.href = dataUrl;
      link.click();
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    showToast("✅ Image downloaded — attach it in WhatsApp");
    setBusy(null);
  }

  async function shareEmail() {
    setBusy("email");
    const subject = "SOATECO 2026 Election — Vote Online";
    const body = `Hello,\n\nThe SOATECO General Election 2026 is live at Arusha Technical College.\n\nVote online: ${voteUrl}\n\nYour vote is secure, anonymous, and auditable.\n\n— ATC Voting System`;
    const dataUrl = await generateImage();
    let file: File | null = null;
    if (dataUrl) {
      const blob = await (await fetch(dataUrl)).blob();
      file = new File([blob], `${electionId}-flyer.png`, { type: "image/png" });
    }
    if (await shareNative(file, subject, body, voteUrl)) { setBusy(null); return; }
    if (dataUrl) {
      const link = document.createElement("a");
      link.download = `${electionId}-flyer.png`;
      link.href = dataUrl;
      link.click();
    }
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast("✅ Image downloaded — attach it in your email");
    setBusy(null);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(posterUrl);
      showToast("✅ Link copied");
    } catch { showToast("❌ Copy failed"); }
  }

  const ActionButtons = (
    <div className="no-print grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      <Button onClick={shareWhatsApp} disabled={busy !== null}
        className="h-12 bg-[#25D366] text-white hover:bg-[#1fb855] shadow-md">
        {busy === "whatsapp" ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
        WhatsApp
      </Button>
      <Button onClick={shareEmail} disabled={busy !== null}
        className="h-12 bg-[#EA4335] text-white hover:bg-[#d33426] shadow-md">
        {busy === "email" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
        Email
      </Button>
      <Button onClick={downloadImage} disabled={busy !== null}
        className="h-12 bg-[#1EB53A] text-white hover:bg-[#169b2f] shadow-md">
        {busy === "image" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
        Image (PNG)
      </Button>
      <Button onClick={() => window.print()}
        className="h-12 bg-[#10243A] text-white hover:bg-[#1a3a5c] shadow-md">
        <Download className="h-4 w-4" /> PDF (A4)
      </Button>
      <Button onClick={copyLink}
        className="h-12 bg-[#F47721] text-white hover:bg-[#e6670f] shadow-md">
        <Copy className="h-4 w-4" /> Copy Link
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">

      {/* Toolbar */}
      <div className="no-print sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#10243A]">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <p className="text-sm font-black text-[#10243A]">Share SOATECO 2026</p>
          <span className="w-16" />
        </div>
      </div>

      <div className="no-print mx-auto max-w-5xl px-4 py-6">
        <div className="mb-3 flex items-center gap-2 rounded-2xl border-2 border-[#F47721]/30 bg-orange-50 p-3">
          <Share2 className="h-5 w-5 text-[#F47721]" />
          <p className="text-sm font-semibold text-[#10243A]">
            Share this flyer as an <strong>image</strong> to WhatsApp / Email, or download it as <strong>PDF</strong>.
          </p>
        </div>
        {ActionButtons}
        {toast && (
          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-800">
            {toast}
          </div>
        )}
      </div>

      {/* A4 Poster */}
      <div className="flex justify-center overflow-x-auto px-4 pb-8 print:p-0 print:overflow-visible">
        <div ref={posterRef} className="a4-page relative overflow-hidden rounded-lg shadow-2xl ring-1 ring-slate-200">

          <div className="flex h-4 shrink-0">
            <div className="flex-[4] bg-[#1EB53A]" />
            <div className="flex-[1] bg-[#FCD116]" />
            <div className="flex-[4] bg-black" />
            <div className="flex-[1] bg-[#FCD116]" />
            <div className="flex-[4] bg-[#00A3DD]" />
          </div>

          <div className="flex h-[28mm] shrink-0 items-center justify-between gap-4 border-b-2 border-[#FCD116] px-8">
            <img src="/images/voting-logo.png" alt="ATC Voting" className="h-[18mm] w-[18mm] rounded-full ring-2 ring-[#FCD116]" />
            <div className="flex-1 text-center">
              <p className="text-[8px] font-bold uppercase tracking-[0.32em] text-[#1EB53A]">The United Republic of Tanzania</p>
              <p className="mt-0.5 text-xl font-black leading-tight text-[#10243A] sm:text-2xl">ARUSHA TECHNICAL COLLEGE</p>
              <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F47721]">ATC Voting System</p>
            </div>
            <img src="/images/atc-logo.png" alt="Arusha Technical College" className="h-[18mm] w-[18mm] rounded-full ring-2 ring-[#FCD116]" />
          </div>

          <div className="relative flex h-[45mm] shrink-0 flex-col items-center justify-center overflow-hidden bg-[#10243A] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,119,33,0.35),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(30,181,58,0.25),transparent_55%),radial-gradient(circle_at_50%_0%,rgba(0,163,221,0.2),transparent_60%)]" />
            <div className="relative text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FCD116]">Students Organization · General Election</p>
              <h1 className="mt-1 text-5xl font-black leading-none tracking-tight sm:text-6xl">
                SOATECO <span className="text-[#F47721]">2026</span>
              </h1>
              <p className="mt-2 text-sm font-medium text-white/75">Your Voice · Your Future · Your College</p>
            </div>
          </div>

          <div className="flex h-[18mm] shrink-0 items-center justify-center gap-2 border-b border-slate-200 px-4">
            {[
              { icon: Calendar, text: "21–28 Nov 2026", color: "#F47721", bg: "rgba(244,119,33,0.10)" },
              { icon: Users, text: "2 Positions · 4 Candidates", color: "#1EB53A", bg: "rgba(30,181,58,0.10)" },
              { icon: ShieldCheck, text: "100% Anonymous", color: "#00A3DD", bg: "rgba(0,163,221,0.10)" },
            ].map((chip) => {
              const Icon = chip.icon;
              return (
                <div key={chip.text} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold text-[#10243A]" style={{ background: chip.bg }}>
                  <Icon className="h-3 w-3" style={{ color: chip.color }} />
                  {chip.text}
                </div>
              );
            })}
          </div>

          <div className="flex h-[105mm] shrink-0 gap-4 px-6 py-3">
            <div className="flex w-[95mm] shrink-0 flex-col items-center justify-center rounded-2xl border-4 border-[#F47721] bg-white px-2 py-2 text-center shadow-lg">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F47721] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
                <QrCode className="h-3.5 w-3.5" /> Scan to vote
              </div>
              <img src={qrSrc} alt="Scan to open the voting wizard" crossOrigin="anonymous" className="mt-1.5 h-[75mm] w-[75mm]" />
              <p className="mt-1 text-[8px] font-semibold text-slate-600">Open your phone camera · Point &amp; scan</p>
              <p className="mt-0.5 w-full break-all text-center text-[6.5px] font-mono leading-tight text-slate-400">
                {voteUrl.replace("https://", "").replace("http://", "")}
              </p>
            </div>

            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-2 flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#F47721] text-white shadow-md"><Vote className="h-4 w-4" /></span>
                <div>
                  <h2 className="text-base font-black uppercase tracking-tight text-[#10243A]">How to Vote</h2>
                  <p className="text-[10px] text-slate-500">In under two minutes</p>
                </div>
              </div>
              <div className="space-y-1.5">
                {STEPS.map((s) => (
                  <div key={s.n} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#10243A] text-[10px] font-black text-white">{s.n}</span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-[11px] font-bold leading-tight text-[#10243A]">{s.t}</p>
                      <p className="text-[9px] leading-tight text-slate-500">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center border-t-4 border-[#FCD116] bg-gradient-to-b from-slate-50 via-white to-slate-50 px-8 py-3">
            <p className="text-[8px] font-bold uppercase tracking-[0.35em] text-slate-400">Sponsored by</p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="relative grid h-11 w-11 place-items-center rounded-full bg-white ring-2 ring-[#1EB53A]">
                  <span className="text-[9px] font-black text-[#1EB53A]">SOA</span>
                </div>
                <div>
                  <p className="text-sm font-black leading-tight text-[#10243A]">SOATECO</p>
                  <p className="text-[8px] uppercase tracking-widest text-slate-500">Students Organization · ATC</p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-300" />
              <div className="flex items-center gap-2.5">
                <div className="relative grid h-11 w-11 place-items-center rounded-full bg-white ring-2 ring-[#F47721]">
                  <span className="text-[8px] font-black text-[#F47721]">STT</span>
                </div>
                <div>
                  <p className="text-sm font-black leading-tight text-[#10243A]">Smart Tanzania</p>
                  <p className="text-[8px] uppercase tracking-widest text-slate-500">Technology Group Network Ltd</p>
                </div>
              </div>
            </div>
            <p className="mt-3 inline-flex items-center gap-1 text-[9px] text-slate-400">
              <ShieldCheck className="h-3 w-3 text-[#1EB53A]" />
              Secure · Anonymous · Auditable · Protected by ATC Digital Democracy
            </p>
          </div>

          <div className="flex h-4 shrink-0">
            <div className="flex-[4] bg-[#1EB53A]" />
            <div className="flex-[1] bg-[#FCD116]" />
            <div className="flex-[4] bg-black" />
            <div className="flex-[1] bg-[#FCD116]" />
            <div className="flex-[4] bg-[#00A3DD]" />
          </div>

        </div>
      </div>

      {/* Bottom action bar (mobile convenience) */}
      <div className="no-print mx-auto max-w-5xl px-4 pb-10">
        {ActionButtons}
      </div>
    </div>
  );
}