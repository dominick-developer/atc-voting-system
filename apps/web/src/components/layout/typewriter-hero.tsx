"use client";

import { useEffect, useState } from "react";

type Line = { text: string; accent?: boolean };

const LINES: Line[] = [
  { text: "Your Voice." },
  { text: "Your Choice.", accent: true },
  { text: "Your Democracy." },
];

const CHAR_DELAY  = 55;   // ms per character
const LINE_DELAY  = 350;  // pause after line done
const RESET_DELAY = 2200; // pause before restart

export function TypewriterHero() {
  const [typed, setTyped]           = useState<string[]>(["", "", ""]);
  const [lineIdx, setLineIdx]       = useState(0);
  const [charIdx, setCharIdx]       = useState(0);

  useEffect(() => {
    // All done — pause, then restart
    if (lineIdx >= LINES.length) {
      const t = setTimeout(() => {
        setTyped(["", "", ""]);
        setLineIdx(0);
        setCharIdx(0);
      }, RESET_DELAY);
      return () => clearTimeout(t);
    }

    const currentLineText = LINES[lineIdx].text;

    // Line complete — move to next line
    if (charIdx >= currentLineText.length) {
      const t = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, LINE_DELAY);
      return () => clearTimeout(t);
    }

    // Type next character
    const t = setTimeout(() => {
      setTyped((prev) => {
        const next = [...prev];
        next[lineIdx] = currentLineText.slice(0, charIdx + 1);
        return next;
      });
      setCharIdx((i) => i + 1);
    }, CHAR_DELAY);

    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  return (
    <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-[80px]">
      {LINES.map((line, i) => {
        const isActive = lineIdx === i;
        const isDone   = i < lineIdx;
        const showCursor = isActive && charIdx < line.text.length;
        const lineComplete = isActive && charIdx >= line.text.length;

        return (
          <span
            key={i}
            className={`block transition-opacity duration-300 ${
              line.accent ? "text-[#F47721]" : "text-white"
            } ${isDone || isActive ? "opacity-100" : "opacity-0"}`}
            aria-hidden={!isDone && !isActive}
          >
            {typed[i]}
            {(showCursor || lineComplete) && <span className="cursor-blink" />}
          </span>
        );
      })}
      {/* hidden h1 text for a11y */}
      <span className="sr-only">Your Voice. Your Choice. Your Democracy.</span>
    </h1>
  );
}