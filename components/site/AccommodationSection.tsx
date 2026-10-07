"use client";

import { useState } from "react";
import type { AccommodationTier } from "@/types/site";

type Props = {
  title: string;
  subtitle: string;
  tiers: AccommodationTier[];
};

export function AccommodationSection({ title, subtitle, tiers }: Props) {
  const [active, setActive] = useState(0);
  const tier = tiers[active];
  if (!tier) return null;

  return (
    <div className="mt-10">
      <h3 className="font-display text-xl text-primary md:text-2xl">{title}</h3>
      <p className="mt-1 text-sm text-muted">{subtitle}</p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tiers.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              i === active
                ? "bg-primary text-white"
                : "bg-secondary/40 text-foreground hover:bg-secondary/60"
            }`}
          >
            {t.priceRange}
          </button>
        ))}
      </div>

      <h4 className="mt-6 font-display text-lg text-primary">{tier.priceRange}</h4>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {tier.hotels.map((hotel) => (
          <a
            key={hotel.name + hotel.address}
            href={hotel.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-black/10 bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
          >
            <p className="font-semibold text-primary">{hotel.name}</p>
            <p className="site-justify mt-1 text-sm text-muted">{hotel.address}</p>
            <p className="mt-2 text-sm font-medium text-primary">
              Voir sur Google Maps →
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
