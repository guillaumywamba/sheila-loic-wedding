"use client";

import Image from "next/image";
import { useState } from "react";
import type { EventItem } from "@/types/site";

type Props = {
  title: string;
  subtitle: string;
  items: EventItem[];
};

export function EventsSection({ title, subtitle, items }: Props) {
  const [active, setActive] = useState(0);
  const event = items[active];
  if (!event) return null;

  return (
    <section id="evenements" className="scroll-mt-20 bg-[#F9F9F9] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">
            {title}
          </h2>
          <p className="site-justify mx-auto mt-2 max-w-2xl text-sm text-muted md:text-base">
            {subtitle}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                i === active
                  ? "bg-primary text-white"
                  : "bg-white text-foreground shadow-sm hover:bg-primary/10"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
            <Image
              src={event.image}
              alt={event.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h3 className="font-display text-2xl text-primary md:text-3xl">
              {event.title}
            </h3>
            <p className="mt-2 font-medium">{event.date}</p>
            <p className="text-sm text-muted">
              Heure de début : {event.startTime}
            </p>
            <p className="text-sm text-muted">Lieu : {event.location}</p>
            <h4 className="mt-6 font-display text-lg text-primary">
              {event.logisticsTitle}
            </h4>
            <p className="site-justify mt-2 whitespace-pre-line text-foreground/90">
              {event.logisticsDetails}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
