import Image from "next/image";
import type { SiteContent } from "@/types/site";
import { AccommodationSection } from "./AccommodationSection";
import { Countdown } from "./Countdown";
import { EventsSection } from "./EventsSection";
import { ImageCarousel } from "./ImageCarousel";
import { GiftsSection } from "./GiftsSection";
import { RsvpForm } from "./RsvpForm";
import { SiteNavigation } from "./SiteNavigation";

type Props = {
  content: SiteContent;
};

export function WeddingSite({ content }: Props) {
  const c = content;

  return (
    <div className="site-public">
      <SiteNavigation logo={c.meta.logo} items={c.navigation} />

      <section id="accueil" className="scroll-mt-20">
        <div className="relative min-h-[85vh] md:min-h-[90vh]">
          <Image
            src={c.hero.image}
            alt={c.hero.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
          <div className="relative z-10 flex min-h-[85vh] flex-col justify-end px-4 pb-10 pt-28 md:min-h-[90vh] md:px-8 md:pb-16">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
                  {c.hero.eyebrow}
                </p>
                <h1 className="font-display mt-3 text-4xl font-bold text-accent-pink md:text-6xl lg:text-7xl">
                  {c.hero.title}
                </h1>
                <p className="font-elegant mt-3 text-lg italic text-white md:text-xl">
                  {c.hero.subtitle}
                </p>
                <p className="mt-4 text-sm font-bold tracking-wider text-white md:text-base">
                  {c.hero.dateLabel}
                </p>
                <a
                  href={c.hero.ctaHref}
                  className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-primary/90"
                >
                  {c.hero.ctaLabel}
                </a>
              </div>
              <Countdown
                targetDate={c.hero.countdown.date}
                targetTime={c.hero.countdown.time}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-start md:px-6 md:gap-14 lg:gap-16">
          <div className="md:pt-2">
            <h2 className="font-display text-3xl text-primary md:text-4xl">
              {c.welcome.title}
            </h2>
            <div className="site-justify-block mt-6 space-y-4 text-foreground/90">
              {c.welcome.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="site-justify">
                  {p}
                </p>
              ))}
            </div>
            <p className="font-elegant site-justify mt-8 whitespace-pre-line text-lg italic text-primary">
              {c.welcome.signature}
            </p>
          </div>
          <ImageCarousel
            images={c.welcome.carouselImages}
            className="mx-auto w-full max-w-xl md:max-w-none"
            aspectClass="aspect-[3/4] min-h-[420px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[620px]"
          />
        </div>
      </section>

      <EventsSection
        title={c.events.title}
        subtitle={c.events.subtitle}
        items={c.events.items.filter((item) => item.id !== "civil")}
      />

      <section id="logistique" className="scroll-mt-20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-center text-3xl text-primary md:text-4xl">
            {c.logistics.title}
          </h2>
          <p className="site-justify mx-auto mt-4 max-w-2xl text-center font-medium">
            {c.logistics.weddingDates}
          </p>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
            <h3 className="font-display text-center text-xl text-primary md:text-2xl">
              {c.logistics.dressCodeTitle}
            </h3>
            <p className="site-justify mt-4 text-center">{c.logistics.dressCode}</p>
            {c.logistics.dressCodeImage ? (
              <div className="relative mx-auto mt-8 flex max-w-md items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 shadow-inner">
                <Image
                  src={c.logistics.dressCodeImage}
                  alt={c.logistics.dressCodeImageAlt}
                  width={800}
                  height={1200}
                  className="h-auto w-full object-contain object-center"
                  sizes="(max-width: 768px) 90vw, 448px"
                />
              </div>
            ) : null}
          </div>

          <div className="mt-12">
            <h3 className="font-display text-center text-2xl text-primary">
              {c.logistics.accommodationTitle}
            </h3>
            <p className="site-justify mx-auto mt-2 max-w-2xl text-center text-muted">
              {c.logistics.accommodationSubtitle}
            </p>
            <AccommodationSection
              title=""
              subtitle=""
              tiers={c.logistics.tiers}
            />
          </div>
        </div>
      </section>

      <section id="histoire" className="scroll-mt-20 bg-[#F9F9F9] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-2xl tracking-wide text-primary md:text-3xl">
                {c.biography.title}
              </h2>
              <p className="font-display mt-2 text-xl">{c.biography.coupleName}</p>
              <div className="site-justify-block mt-6 space-y-4">
                {c.biography.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="site-justify">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative aspect-square max-h-[480px] overflow-hidden rounded-2xl shadow-md">
              <Image
                src={c.biography.image}
                alt={c.biography.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="mt-20">
            <h2 className="font-display text-center text-3xl text-primary md:text-4xl">
              {c.story.title}
            </h2>
            <div className="site-justify-block mx-auto mt-10 max-w-3xl space-y-6 text-foreground/90">
              {c.story.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="site-justify whitespace-pre-line"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="galerie" className="scroll-mt-20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl text-primary md:text-4xl">
              {c.gallery.title}
            </h2>
            <p className="site-justify mx-auto mt-2 max-w-xl text-muted">
              {c.gallery.subtitle}
            </p>
          </div>
          <div className="mt-10 columns-2 gap-3 md:columns-3 lg:columns-4">
            {c.gallery.photos.map((photo) => (
              <div
                key={photo.url}
                className="relative mb-3 break-inside-avoid overflow-hidden rounded-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="mx-auto w-full bg-neutral-100 object-contain object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <GiftsSection content={c.gifts} />

      <section id="rsvp" className="scroll-mt-20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl text-primary md:text-4xl">
              {c.rsvp.title}
            </h2>
            <p className="site-justify mx-auto mt-4 max-w-2xl text-muted">
              {c.rsvp.description}
            </p>
          </div>
          <div className="mt-10">
            <RsvpForm content={c.rsvp} />
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-primary py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <div className="relative mx-auto mb-8 aspect-video max-w-md overflow-hidden rounded-2xl">
            <Image
              src="https://images.fillout.com/472067/mde81vgch5/generated-images/ivPRMKmiLdLWpRy8C9gWXN/img_aI9w8GOlOY7OchNr.jpg"
              alt="Merci"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="font-display text-4xl md:text-5xl">Merci!</h2>
          <p className="mt-8 text-sm font-bold uppercase tracking-widest">
            {c.contact.title}
          </p>
          <p className="mt-2 text-lg">{c.contact.organization}</p>
          <p className="mt-1 text-2xl font-semibold tracking-wide">
            {c.contact.phone}
          </p>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-accent-pink py-6 text-center text-sm">
        <p>
          {c.footer.copyright} · {c.footer.credit}
        </p>
      </footer>
    </div>
  );
}
