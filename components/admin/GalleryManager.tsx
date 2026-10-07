"use client";

import type { SiteContent } from "@/types/site";
import { useRef, useState } from "react";

type Props = {
  gallery: SiteContent["gallery"];
  onChange: (gallery: SiteContent["gallery"]) => void;
  onUploaded?: (gallery: SiteContent["gallery"]) => Promise<void>;
};

export function GalleryManager({ gallery, onChange, onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    setUploading(true);
    setFeedback("");

    let photos = [...gallery.photos];
    let added = 0;

    for (const file of Array.from(fileList)) {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", "gallery");

      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setFeedback(data.error ?? "Échec de l'ajout d'une photo.");
        continue;
      }

      photos = [
        ...photos,
        {
          url: data.url,
          alt: `Photo ${photos.length + 1}`,
        },
      ];
      added += 1;
    }

    if (added > 0) {
      const nextGallery = { ...gallery, photos };
      onChange(nextGallery);
      if (onUploaded) await onUploaded(nextGallery);
      setFeedback(
        added === 1
          ? "Photo ajoutée et enregistrée."
          : `${added} photos ajoutées et enregistrées.`,
      );
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removePhoto(index: number) {
    onChange({
      ...gallery,
      photos: gallery.photos.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none" />
            <path d="M3 16l5.5-5 4 3.5L17 10l4 4" />
          </svg>
          {uploading ? "Import..." : "Ajouter depuis la galerie"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => void handleFiles(e.target.files)}
        />
        <p className="text-xs text-muted">
          Touchez l&apos;icône pour ouvrir la galerie de votre téléphone ou
          l&apos;explorateur de fichiers.
        </p>
      </div>

      {feedback && (
        <p className="rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary">
          {feedback}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {gallery.photos.map((photo, i) => (
          <div
            key={photo.url + i}
            className="group relative overflow-hidden rounded-xl border border-black/10 bg-black/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.alt}
              className="aspect-square w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePhoto(i)}
              className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100"
            >
              Supprimer
            </button>
          </div>
        ))}

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/35 bg-primary/5 text-primary transition hover:bg-primary/10 disabled:opacity-60"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-10 w-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          <span className="text-xs font-medium">Ajouter</span>
        </button>
      </div>
    </div>
  );
}
