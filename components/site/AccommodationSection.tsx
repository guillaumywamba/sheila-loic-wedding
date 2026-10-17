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
      {title ? (
        <h3 className="font-display text-xl text-primary md:text-2xl">{title}</h3>
      ) : null}
      {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}

      <div className="mt-6 flex flex-wrap justify-center gap-2 px-1 sm:gap-3">
        {tiers.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
              i === active
                ? "bg-primary text-white shadow-sm"
                : "bg-secondary/50 text-foreground hover:bg-secondary/70"
            }`}
          >
            {t.priceRange}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
