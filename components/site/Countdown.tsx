"use client";

import { useEffect, useState } from "react";

type Props = {
  targetDate: string;
  targetTime?: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function computeTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ targetDate, targetTime }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(`${targetDate}T${targetTime ?? "00:00"}:00`);
    setTimeLeft(computeTimeLeft(target));
    const id = setInterval(() => setTimeLeft(computeTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetDate, targetTime]);

  const units = [
    { value: timeLeft.days, label: "JOURS" },
    { value: timeLeft.hours, label: "HEURES" },
    { value: timeLeft.minutes, label: "MINUTES" },
    { value: timeLeft.seconds, label: "SECONDES" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 md:justify-end md:gap-3">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="min-w-[70px] rounded-xl bg-black/45 px-3 py-3 text-center backdrop-blur-md md:min-w-[80px] md:px-4 md:py-4"
        >
          <div
            className="font-display text-2xl font-bold text-accent-pink md:text-3xl"
            suppressHydrationWarning
          >
            {mounted
              ? String(unit.value).padStart(unit.label === "JOURS" ? 3 : 2, "0")
              : "—"}
          </div>
          <div className="text-[10px] font-semibold tracking-widest text-white/90 md:text-xs">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
