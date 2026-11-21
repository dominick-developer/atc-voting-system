"use client";
import { useEffect, useState } from "react";

interface CountdownProps {
  target: string; // ISO date
}

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function ElectionCountdown({ target }: CountdownProps) {
  const [t, setT] = useState(() => diff(new Date(target)));

  useEffect(() => {
    const id = setInterval(() => setT(diff(new Date(target))), 1000);
    return () => clearInterval(id);
  }, [target]);

  const boxes = [
    { v: t.days,    l: "Days" },
    { v: t.hours,   l: "Hours" },
    { v: t.minutes, l: "Min" },
    { v: t.seconds, l: "Sec" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {boxes.map((b) => (
        <div key={b.l} className="rounded-xl bg-white/10 px-2 py-3 text-center text-white">
          <p className="text-xl font-bold tabular-nums">{String(b.v).padStart(2, "0")}</p>
          <p className="text-[10px] uppercase tracking-wide opacity-70">{b.l}</p>
        </div>
      ))}
    </div>
  );
}
