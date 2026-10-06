"use client";

import Image from "next/image";
import { useState } from "react";

type Slide = { url: string; alt: string };

type Props = {
  images: Slide[];
  className?: string;
  aspectClass?: string;
};

export function ImageCarousel({
  images,
  className = "",
  aspectClass = "aspect-[4/3]",
}: Props) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <div className={`relative w-full ${aspectClass}`}>
        <Image
          src={images[index].url}
          alt={images[index].alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
            aria-label="Image précédente"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
            aria-label="Image suivante"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
