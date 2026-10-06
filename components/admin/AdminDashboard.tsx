"use client";

import { defaultSiteContent } from "@/lib/default-content";
import type { RsvpSubmission, SiteContent } from "@/types/site";
import { useCallback, useEffect, useState } from "react";

const TABS = [
  { id: "meta", label: "Général" },
  { id: "hero", label: "Accueil" },
  { id: "welcome", label: "Bienvenue" },
  { id: "events", label: "Événements" },
  { id: "logistics", label: "Logistique" },
  { id: "story", label: "Histoire" },
  { id: "gallery", label: "Galerie" },
  { id: "gifts", label: "Cadeaux" },
  { id: "rsvp", label: "RSVP" },
  { id: "contact", label: "Contact" },
  { id: "submissions", label: "Réponses RSVP" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const className =
    "w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary";
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
      )}
    </label>
  );
}

export function AdminDashboard() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<TabId>("meta");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [rsvps, setRsvps] = useState<RsvpSubmission[]>([]);
  const [storageOk, setStorageOk] = useState<boolean | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/content");
    setContent((await res.json()) as SiteContent);
  }, []);

  useEffect(() => {
    void load();
    void fetch("/api/storage-status")
      .then((r) => r.json())
      .then((s: { ready?: boolean }) => setStorageOk(Boolean(s.ready)))
      .catch(() => setStorageOk(false));
  }, [load]);

  useEffect(() => {
    if (tab !== "submissions") return;
    void fetch("/api/rsvp")
      .then((r) => r.json())
      .then((data) => setRsvps(Array.isArray(data) ? data : []));
  }, [tab]);

  async function save() {
    if (!content) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (res.ok) {
      setMessage("Enregistré avec succès.");
      return;
    }
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setMessage(data.error ?? "Erreur lors de l'enregistrement.");
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  function resetDefaults() {
    if (
      !confirm(
        "Réinitialiser tout le contenu aux valeurs d'origine ? Cette action remplace le site actuel.",
      )
    ) {
      return;
    }
    setContent(JSON.parse(JSON.stringify(defaultSiteContent)) as SiteContent);
    setMessage("Contenu réinitialisé (pensez à enregistrer).");
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        Chargement...
      </div>
    );
  }

  const c = content;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <h1 className="font-display text-xl text-primary">Console d&apos;administration</h1>
            <p className="text-xs text-muted">Modifiez le contenu du site en direct</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5"
            >
              Voir le site
            </a>
            <button
              type="button"
              onClick={resetDefaults}
              className="rounded-full border border-black/20 px-4 py-2 text-sm hover:bg-black/5"
            >
              Réinitialiser
            </button>
            <button
              type="button"
              onClick={() => void save()}
              disabled={saving}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
            <button
              type="button"
              onClick={() => void logout()}
              className="rounded-full bg-black/80 px-4 py-2 text-sm text-white hover:bg-black"
            >
              Déconnexion
            </button>
          </div>
        </div>
        {storageOk === false && (
          <p className="border-t border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950">
            Stockage non configuré sur Vercel : ajoutez la variable{" "}
            <strong>GITHUB_TOKEN</strong> (token GitHub avec accès au dépôt) ou
            créez un <strong>Blob store</strong> dans Storage, puis redéployez.
          </p>
        )}
        {message && (
          <p className="border-t border-black/5 bg-accent-pink/30 px-4 py-2 text-center text-sm">
            {message}
          </p>
        )}
        <div className="flex gap-1 overflow-x-auto border-t border-black/5 px-2 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition ${
                tab === t.id ? "bg-primary text-white" : "hover:bg-black/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-4 p-4 pb-16 md:p-6">
        {tab === "meta" && (
          <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
            <Field
              label="Titre du site"
              value={c.meta.title}
              onChange={(v) => setContent({ ...c, meta: { ...c.meta, title: v } })}
            />
            <Field
              label="Description"
              value={c.meta.description}
              onChange={(v) =>
                setContent({ ...c, meta: { ...c.meta, description: v } })
              }
            />
            <Field
              label="Logo (texte barre nav)"
              value={c.meta.logo}
              onChange={(v) => setContent({ ...c, meta: { ...c.meta, logo: v } })}
            />
            <p className="text-xs font-semibold uppercase text-muted">Navigation</p>
            {c.navigation.map((item, i) => (
              <div key={item.id} className="grid gap-2 sm:grid-cols-3">
                <Field
                  label={`Lien ${i + 1} — libellé`}
                  value={item.label}
                  onChange={(v) => {
                    const navigation = [...c.navigation];
                    navigation[i] = { ...navigation[i], label: v };
                    setContent({ ...c, navigation });
                  }}
                />
                <Field
                  label="Ancre (#section)"
                  value={item.href}
                  onChange={(v) => {
                    const navigation = [...c.navigation];
                    navigation[i] = { ...navigation[i], href: v };
                    setContent({ ...c, navigation });
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {tab === "hero" && (
          <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
            <Field
              label="Image (URL)"
              value={c.hero.image}
              onChange={(v) => setContent({ ...c, hero: { ...c.hero, image: v } })}
            />
            <Field label="Surtitre" value={c.hero.eyebrow} onChange={(v) => setContent({ ...c, hero: { ...c.hero, eyebrow: v } })} />
            <Field label="Titre" value={c.hero.title} onChange={(v) => setContent({ ...c, hero: { ...c.hero, title: v } })} />
            <Field label="Sous-titre" value={c.hero.subtitle} onChange={(v) => setContent({ ...c, hero: { ...c.hero, subtitle: v } })} multiline />
            <Field label="Dates affichées" value={c.hero.dateLabel} onChange={(v) => setContent({ ...c, hero: { ...c.hero, dateLabel: v } })} />
            <Field label="Texte bouton CTA" value={c.hero.ctaLabel} onChange={(v) => setContent({ ...c, hero: { ...c.hero, ctaLabel: v } })} />
            <Field label="Lien CTA" value={c.hero.ctaHref} onChange={(v) => setContent({ ...c, hero: { ...c.hero, ctaHref: v } })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Compte à rebours — date (YYYY-MM-DD)"
                value={c.hero.countdown.date}
                onChange={(v) =>
                  setContent({
                    ...c,
                    hero: { ...c.hero, countdown: { ...c.hero.countdown, date: v } },
                  })
                }
              />
              <Field
                label="Heure (HH:MM)"
                value={c.hero.countdown.time ?? ""}
                onChange={(v) =>
                  setContent({
                    ...c,
                    hero: { ...c.hero, countdown: { ...c.hero.countdown, time: v } },
                  })
                }
              />
            </div>
          </div>
        )}

        {tab === "welcome" && (
          <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
            <Field label="Titre" value={c.welcome.title} onChange={(v) => setContent({ ...c, welcome: { ...c.welcome, title: v } })} />
            {c.welcome.paragraphs.map((p, i) => (
              <Field
                key={i}
                label={`Paragraphe ${i + 1}`}
                value={p}
                multiline
                onChange={(v) => {
                  const paragraphs = [...c.welcome.paragraphs];
                  paragraphs[i] = v;
                  setContent({ ...c, welcome: { ...c.welcome, paragraphs } });
                }}
              />
            ))}
            <button
              type="button"
              className="text-sm text-primary underline"
              onClick={() =>
                setContent({
                  ...c,
                  welcome: {
                    ...c.welcome,
                    paragraphs: [...c.welcome.paragraphs, ""],
                  },
                })
              }
            >
              + Ajouter un paragraphe
            </button>
            <Field
              label="Signature"
              value={c.welcome.signature}
              multiline
              onChange={(v) =>
                setContent({ ...c, welcome: { ...c.welcome, signature: v } })
              }
            />
            <p className="text-xs font-semibold uppercase text-muted">Carousel images</p>
            {c.welcome.carouselImages.map((img, i) => (
              <div key={i} className="grid gap-2 border-t pt-4 sm:grid-cols-2">
                <Field
                  label={`Image ${i + 1} URL`}
                  value={img.url}
                  onChange={(v) => {
                    const carouselImages = [...c.welcome.carouselImages];
                    carouselImages[i] = { ...carouselImages[i], url: v };
                    setContent({ ...c, welcome: { ...c.welcome, carouselImages } });
                  }}
                />
                <Field
                  label="Alt"
                  value={img.alt}
                  onChange={(v) => {
                    const carouselImages = [...c.welcome.carouselImages];
                    carouselImages[i] = { ...carouselImages[i], alt: v };
                    setContent({ ...c, welcome: { ...c.welcome, carouselImages } });
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {tab === "events" && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <Field label="Titre section" value={c.events.title} onChange={(v) => setContent({ ...c, events: { ...c.events, title: v } })} />
              <Field label="Sous-titre" value={c.events.subtitle} onChange={(v) => setContent({ ...c, events: { ...c.events, subtitle: v } })} />
            </div>
            {c.events.items.map((ev, i) => (
              <div key={ev.id} className="space-y-3 rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg text-primary">{ev.title}</h3>
                <Field label="Titre" value={ev.title} onChange={(v) => {
                  const items = [...c.events.items];
                  items[i] = { ...items[i], title: v };
                  setContent({ ...c, events: { ...c.events, items } });
                }} />
                <Field label="Date" value={ev.date} onChange={(v) => {
                  const items = [...c.events.items];
                  items[i] = { ...items[i], date: v };
                  setContent({ ...c, events: { ...c.events, items } });
                }} />
                <Field label="Heure" value={ev.startTime} onChange={(v) => {
                  const items = [...c.events.items];
                  items[i] = { ...items[i], startTime: v };
                  setContent({ ...c, events: { ...c.events, items } });
                }} />
                <Field label="Lieu" value={ev.location} onChange={(v) => {
                  const items = [...c.events.items];
                  items[i] = { ...items[i], location: v };
                  setContent({ ...c, events: { ...c.events, items } });
                }} />
                <Field label="Image URL" value={ev.image} onChange={(v) => {
                  const items = [...c.events.items];
                  items[i] = { ...items[i], image: v };
                  setContent({ ...c, events: { ...c.events, items } });
                }} />
                <Field label="Détails logistique" value={ev.logisticsDetails} multiline onChange={(v) => {
                  const items = [...c.events.items];
                  items[i] = { ...items[i], logisticsDetails: v };
                  setContent({ ...c, events: { ...c.events, items } });
                }} />
              </div>
            ))}
          </div>
        )}

        {tab === "logistics" && (
          <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
            <Field label="Titre" value={c.logistics.title} onChange={(v) => setContent({ ...c, logistics: { ...c.logistics, title: v } })} />
            <Field label="Dates mariage" value={c.logistics.weddingDates} onChange={(v) => setContent({ ...c, logistics: { ...c.logistics, weddingDates: v } })} />
            <Field label="Dress code" value={c.logistics.dressCode} multiline onChange={(v) => setContent({ ...c, logistics: { ...c.logistics, dressCode: v } })} />
            <Field label="Image couple URL" value={c.logistics.coupleImage} onChange={(v) => setContent({ ...c, logistics: { ...c.logistics, coupleImage: v } })} />
            {c.logistics.venuesLines.map((line, i) => (
              <Field
                key={i}
                label={`Lieu ligne ${i + 1}`}
                value={line}
                onChange={(v) => {
                  const venuesLines = [...c.logistics.venuesLines];
                  venuesLines[i] = v;
                  setContent({ ...c, logistics: { ...c.logistics, venuesLines } });
                }}
              />
            ))}
            <p className="pt-4 text-xs font-semibold uppercase text-muted">Hébergements par tranche</p>
            {c.logistics.tiers.map((tier, ti) => (
              <div key={tier.id} className="rounded-lg border border-black/10 p-4">
                <Field
                  label="Fourchette prix"
                  value={tier.priceRange}
                  onChange={(v) => {
                    const tiers = [...c.logistics.tiers];
                    tiers[ti] = { ...tiers[ti], priceRange: v };
                    setContent({ ...c, logistics: { ...c.logistics, tiers } });
                  }}
                />
                {tier.hotels.map((h, hi) => (
                  <div key={hi} className="mt-3 space-y-2 border-t pt-3">
                    <Field label="Nom hôtel" value={h.name} onChange={(v) => {
                      const tiers = [...c.logistics.tiers];
                      const hotels = [...tiers[ti].hotels];
                      hotels[hi] = { ...hotels[hi], name: v };
                      tiers[ti] = { ...tiers[ti], hotels };
                      setContent({ ...c, logistics: { ...c.logistics, tiers } });
                    }} />
                    <Field label="Adresse" value={h.address} onChange={(v) => {
                      const tiers = [...c.logistics.tiers];
                      const hotels = [...tiers[ti].hotels];
                      hotels[hi] = { ...hotels[hi], address: v };
                      tiers[ti] = { ...tiers[ti], hotels };
                      setContent({ ...c, logistics: { ...c.logistics, tiers } });
                    }} />
                    <Field label="Lien Google Maps" value={h.mapsUrl} onChange={(v) => {
                      const tiers = [...c.logistics.tiers];
                      const hotels = [...tiers[ti].hotels];
                      hotels[hi] = { ...hotels[hi], mapsUrl: v };
                      tiers[ti] = { ...tiers[ti], hotels };
                      setContent({ ...c, logistics: { ...c.logistics, tiers } });
                    }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {tab === "story" && (
          <div className="space-y-6">
            <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
              <Field label="Titre biographie" value={c.biography.title} onChange={(v) => setContent({ ...c, biography: { ...c.biography, title: v } })} />
              <Field label="Image biographie URL" value={c.biography.image} onChange={(v) => setContent({ ...c, biography: { ...c.biography, image: v } })} />
              {c.biography.paragraphs.map((p, i) => (
                <Field key={i} label={`Bio paragraphe ${i + 1}`} value={p} multiline onChange={(v) => {
                  const paragraphs = [...c.biography.paragraphs];
                  paragraphs[i] = v;
                  setContent({ ...c, biography: { ...c.biography, paragraphs } });
                }} />
              ))}
            </div>
            <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
              <Field label="Titre histoire" value={c.story.title} onChange={(v) => setContent({ ...c, story: { ...c.story, title: v } })} />
              {c.story.paragraphs.map((p, i) => (
                <Field key={i} label={`Histoire paragraphe ${i + 1}`} value={p} multiline onChange={(v) => {
                  const paragraphs = [...c.story.paragraphs];
                  paragraphs[i] = v;
                  setContent({ ...c, story: { ...c.story, paragraphs } });
                }} />
              ))}
            </div>
          </div>
        )}

        {tab === "gallery" && (
          <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
            <Field label="Titre" value={c.gallery.title} onChange={(v) => setContent({ ...c, gallery: { ...c.gallery, title: v } })} />
            <Field label="Sous-titre" value={c.gallery.subtitle} onChange={(v) => setContent({ ...c, gallery: { ...c.gallery, subtitle: v } })} />
            <button
              type="button"
              className="text-sm text-primary underline"
              onClick={() =>
                setContent({
                  ...c,
                  gallery: {
                    ...c.gallery,
                    photos: [...c.gallery.photos, { url: "", alt: "Photo" }],
                  },
                })
              }
            >
              + Ajouter une photo
            </button>
            {c.gallery.photos.map((photo, i) => (
              <div key={i} className="grid gap-2 border-t pt-4 sm:grid-cols-[1fr_1fr_auto]">
                <Field label={`URL photo ${i + 1}`} value={photo.url} onChange={(v) => {
                  const photos = [...c.gallery.photos];
                  photos[i] = { ...photos[i], url: v };
                  setContent({ ...c, gallery: { ...c.gallery, photos } });
                }} />
                <Field label="Alt" value={photo.alt} onChange={(v) => {
                  const photos = [...c.gallery.photos];
                  photos[i] = { ...photos[i], alt: v };
                  setContent({ ...c, gallery: { ...c.gallery, photos } });
                }} />
                <button
                  type="button"
                  className="self-end text-sm text-red-600"
                  onClick={() => {
                    const photos = c.gallery.photos.filter((_, j) => j !== i);
                    setContent({ ...c, gallery: { ...c.gallery, photos } });
                  }}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "gifts" && (
          <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
            <Field label="Titre" value={c.gifts.title} onChange={(v) => setContent({ ...c, gifts: { ...c.gifts, title: v } })} />
            <Field label="Message" value={c.gifts.message} onChange={(v) => setContent({ ...c, gifts: { ...c.gifts, message: v } })} />
            <Field label="Libellé bouton" value={c.gifts.detailsLabel} onChange={(v) => setContent({ ...c, gifts: { ...c.gifts, detailsLabel: v } })} />
            {c.gifts.images.map((img, i) => (
              <Field key={i} label={`Image cadeau ${i + 1} URL`} value={img.url} onChange={(v) => {
                const images = [...c.gifts.images];
                images[i] = { ...images[i], url: v };
                setContent({ ...c, gifts: { ...c.gifts, images } });
              }} />
            ))}
          </div>
        )}

        {tab === "rsvp" && (
          <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
            <Field label="Titre" value={c.rsvp.title} onChange={(v) => setContent({ ...c, rsvp: { ...c.rsvp, title: v } })} />
            <Field label="Description" value={c.rsvp.description} multiline onChange={(v) => setContent({ ...c, rsvp: { ...c.rsvp, description: v } })} />
            <Field label="Texte bouton" value={c.rsvp.submitLabel} onChange={(v) => setContent({ ...c, rsvp: { ...c.rsvp, submitLabel: v } })} />
            <Field label="Message succès" value={c.rsvp.successMessage} onChange={(v) => setContent({ ...c, rsvp: { ...c.rsvp, successMessage: v } })} />
          </div>
        )}

        {tab === "contact" && (
          <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
            <Field label="Organisation" value={c.contact.organization} onChange={(v) => setContent({ ...c, contact: { ...c.contact, organization: v } })} />
            <Field label="Téléphone" value={c.contact.phone} onChange={(v) => setContent({ ...c, contact: { ...c.contact, phone: v } })} />
            <Field label="Copyright footer" value={c.footer.copyright} onChange={(v) => setContent({ ...c, footer: { ...c.footer, copyright: v } })} />
            <Field label="Crédit design" value={c.footer.credit} onChange={(v) => setContent({ ...c, footer: { ...c.footer, credit: v } })} />
          </div>
        )}

        {tab === "submissions" && (
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-primary/10 text-xs uppercase text-primary">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Nom</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Présence</th>
                    <th className="px-4 py-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted">
                        Aucune réponse pour le moment.
                      </td>
                    </tr>
                  ) : (
                    rsvps.map((r) => (
                      <tr key={r.id} className="border-t border-black/5">
                        <td className="px-4 py-3 whitespace-nowrap">
                          {new Date(r.createdAt).toLocaleString("fr-FR")}
                        </td>
                        <td className="px-4 py-3">{r.fullName}</td>
                        <td className="px-4 py-3">{r.email}</td>
                        <td className="px-4 py-3">
                          {r.attendance === "present" ? "Présent(e)" : "Absent(e)"}
                        </td>
                        <td className="max-w-xs truncate px-4 py-3">{r.message ?? "—"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
