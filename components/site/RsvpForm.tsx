"use client";

import { useState } from "react";
import type { RsvpContent } from "@/types/site";

type Props = {
  content: RsvpContent;
};

export function RsvpForm({ content }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const attendance = data.get("attendance") as string;

    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: data.get("fullName"),
        email: data.get("email"),
        phone: data.get("phone") || undefined,
        attendance: attendance === "present" ? "present" : "absent",
        message: data.get("message") || undefined,
      }),
    });

    if (!res.ok) {
      setStatus("error");
      setError("Une erreur est survenue. Veuillez réessayer.");
      return;
    }

    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-primary/20 bg-white p-8 text-center shadow-sm">
        <h3 className="font-display text-3xl text-primary">{content.successTitle}</h3>
        <p className="mt-3 text-muted">{content.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-primary underline"
        >
          Envoyer une autre réponse
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-lg space-y-5 rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:p-8"
    >
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="fullName">
          Nom complet
        </label>
        <input
          id="fullName"
          name="fullName"
          required
          placeholder="Votre nom"
          className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="votre@email.com"
          className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="phone">
          Téléphone
        </label>
        <input
          id="phone"
          name="phone"
          placeholder="+237 6XX XXX XXX"
          className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Présence</legend>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="attendance"
              value="present"
              required
              className="accent-primary"
            />
            Je serai présent(e)
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="attendance"
              value="absent"
              required
              className="accent-primary"
            />
            Je ne pourrai pas venir
          </label>
        </div>
      </fieldset>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="message">
          Message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Un petit mot pour les mariés..."
          className="w-full rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-primary/90 disabled:opacity-60"
      >
        {status === "loading" ? "Envoi..." : content.submitLabel}
      </button>
    </form>
  );
}
