"use client";

import { uploadImageFile } from "@/lib/upload-image-client";
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
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [deleting, setDeleting] = useState(false);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    setUploading(true);
    setFeedback("");

    let photos = [...gallery.photos];
    let added = 0;

    for (const file of Array.from(fileList)) {
      try {
        const url = await uploadImageFile(file, "gallery");
        photos = [
          ...photos,
          {
            url,
            alt: `Photo ${photos.length + 1}`,
          },
        ];
        added += 1;
      } catch (err) {
        setFeedback(
          err instanceof Error ? err.message : "Échec de l'ajout d'une photo.",
        );
      }
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

  function toggleSelect(index: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  async function deleteSelected() {
    if (selected.size === 0) return;
    const count = selected.size;
    const photos = gallery.photos.filter((_, i) => !selected.has(i));
    const nextGallery = { ...gallery, photos };

    setDeleting(true);
    setFeedback("");
    onChange(nextGallery);
    setSelected(new Set());

    try {
      if (onUploaded) await onUploaded(nextGallery);
      setFeedback(
        count === 1
          ? "Photo supprimée et galerie enregistrée."
          : `${count} photos supprimées et galerie enregistrée.`,
      );
    } catch (err) {
      setFeedback(
        err instanceof Error
          ? err.message
          : "Suppression locale — enregistrement échoué.",
      );
    } finally {
      setDeleting(false);
    }
  }

  const selectionCount = selected.size;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={uploading || deleting}
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
          {uploading ? "Import..." : "Choisir une image"}
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
          Pour supprimer : sélectionnez une ou plusieurs photos ci-dessous, puis
          appuyez sur « Supprimer la sélection ».
        </p>
      </div>

      {gallery.photos.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3">
          <span className="text-sm text-foreground">
            {selectionCount === 0
              ? "Aucune photo sélectionnée"
              : `${selectionCount} photo${selectionCount > 1 ? "s" : ""} sélectionnée${selectionCount > 1 ? "s" : ""}`}
          </span>
          <button
            type="button"
            disabled={selectionCount === 0 || deleting || uploading}
            onClick={() => void deleteSelected()}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {deleting ? "Suppression..." : "Supprimer la sélection"}
          </button>
          {selectionCount > 0 && (
            <button
              type="button"
              className="text-sm text-primary underline"
              onClick={() => setSelected(new Set())}
            >
              Tout désélectionner
            </button>
          )}
          {selectionCount < gallery.photos.length && (
            <button
              type="button"
              className="text-sm text-muted underline"
              onClick={() =>
                setSelected(new Set(gallery.photos.map((_, i) => i)))
              }
            >
              Tout sélectionner
            </button>
          )}
        </div>
      )}

      {feedback && (
        <p className="rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary">
          {feedback}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {gallery.photos.map((photo, i) => {
          const isSelected = selected.has(i);
          return (
            <button
              key={photo.url + i}
              type="button"
              onClick={() => toggleSelect(i)}
              className={`group relative overflow-hidden rounded-xl border-2 bg-black/5 text-left transition ${
                isSelected
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-black/10 hover:border-primary/40"
              }`}
              aria-pressed={isSelected}
              aria-label={`${isSelected ? "Désélectionner" : "Sélectionner"} ${photo.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.alt}
                className="aspect-square w-full object-cover"
              />
              <span
                className={`absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition ${
                  isSelected
                    ? "border-white bg-primary text-white"
                    : "border-white/90 bg-black/40 text-white"
                }`}
              >
                {isSelected ? "✓" : ""}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          disabled={uploading || deleting}
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
