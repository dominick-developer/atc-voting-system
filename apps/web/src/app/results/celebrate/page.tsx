"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Award, ArrowRight, SkipForward, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { declaredResults, candidates, positions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const FLOWERS = ["🌸", "🌺", "🌼", "🌷", "💐", "🏵️", "🌻", "🌹"];

function CelebrationContent() {
  const router = useRouter();
  const params = useSearchParams();
  const positionId = params.get("position");
  const [celebrated, setCelebrated] = useState(false);

  // Find winning candidates from declared results
  const winners = declaredResults
    .filter((r) => !positionId || r.positionId === positionId)
    .map((r) => {
      const cand = candidates.find((c) => c.id === r.winner);
      const pos = positions.find((p) => p.id === r.positionId);
      return { candidate: cand, position: pos };
    })
    .filter((w) => w.candidate && w.position);

  function goToResults() {
    router.push("/results");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#152a4a] to-[#0a1628]">
      {/* Decorative flowers background */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => {
          const flower = FLOWERS[i % FLOWERS.length];
          const left = (i * 37) % 100;
          const top = (i * 53) % 100;
          const size = 16 + ((i * 7) % 24);
          const opacity = 0.1 + ((i * 3) % 30) / 100;
          return (
            <span
              key={i}
              className="absolute select-none animate-float"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                fontSize: `${size}px`,
                opacity,
                animationDelay: `${(i % 5) * 0.4}s`,
              }}
            >
              {flower}
            </span>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Skip button */}
        <button
          onClick={goToResults}
          className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
        >
          <SkipForward className="h-3 w-3" /> Skip animation
        </button>

        {!celebrated && winners.length > 0 ? (
          <>
            <div className="flex items-center gap-2 rounded-full border border-[#F47721]/30 bg-[#F47721]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#F47721] backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" /> Congratulations
            </div>

            <h1 className="mt-6 text-center text-3xl font-black tracking-tight text-white sm:text-5xl">
              You&apos;ve been <span className="bg-gradient-to-r from-[#F47721] to-[#ff9a54] bg-clip-text text-transparent">elected!</span>
            </h1>

            <div className="mt-12 space-y-8">
              {winners.map(({ candidate, position }) => (
                <div key={position?.id} className="flex flex-col items-center">
                  {/* Photo with flowers */}
                  <div className="relative">
                    {/* Flowers around photo */}
                    {FLOWERS.map((flower, i) => {
                      const angle = (i / FLOWERS.length) * 2 * Math.PI;
                      const radius = 110;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      return (
                        <span
                          key={i}
                          className="absolute select-none text-3xl"
                          style={{
                            left: `calc(50% + ${x}px - 16px)`,
                            top: `calc(50% + ${y}px - 16px)`,
                            animation: `float 3s ease-in-out ${i * 0.15}s infinite`,
                          }}
                        >
                          {flower}
                        </span>
                      );
                    })}

                    <div className={cn(
                      "relative grid h-40 w-40 place-items-center rounded-full bg-gradient-to-br text-white text-5xl font-black shadow-2xl ring-4 ring-white/20 sm:h-48 sm:w-48",
                      candidate!.color
                    )}>
                      {candidate!.initials}
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F47721]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F47721]">
                      <Award className="h-3 w-3" /> {position?.title}
                    </div>
                    <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                      {candidate!.name}
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
                      Your leadership journey begins today. We wish you success in serving the students and the institution.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Button variant="orange" size="lg" onClick={() => setCelebrated(true)}>
                Continue to results <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <Button variant="orange" size="lg" onClick={goToResults}>
            View official results <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default function CelebrationPage() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#0a1628]"><Loader2 className="h-6 w-6 animate-spin text-white" /></div>}>
      <CelebrationContent />
    </Suspense>
  );
}