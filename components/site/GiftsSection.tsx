import Image from "next/image";
import type { GiftsContent } from "@/types/site";

type Props = {
  content: GiftsContent;
};

export function GiftsSection({ content }: Props) {
  return (
    <section id="cadeaux" className="scroll-mt-20 bg-secondary/30 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl text-primary md:text-4xl">
            {content.title}
          </h2>
          {content.message ? (
            <p className="site-justify mx-auto mt-4 max-w-2xl text-lg text-muted">
              {content.message}
            </p>
          ) : null}
        </div>

        <p className="site-justify mx-auto mt-8 max-w-3xl rounded-2xl border border-primary/15 bg-white/80 p-6 text-center text-foreground/90 shadow-sm">
          {content.noPhysicalGiftsNote}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.paymentMethods.map((method) => (
            <article
              key={method.id}
              className="flex flex-col rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
            >
              <h3 className="font-display text-lg text-primary">{method.title}</h3>
              {method.qrCodeUrl ? (
                <div className="relative mx-auto mt-4 aspect-square w-full max-w-[180px] overflow-hidden rounded-xl border border-black/5 bg-[#fafafa]">
                  <Image
                    src={method.qrCodeUrl}
                    alt={`QR code ${method.title}`}
                    fill
                    className="object-contain p-2"
                    sizes="180px"
                  />
                </div>
              ) : null}
              {method.details ? (
                <p className="site-justify mt-4 flex-1 whitespace-pre-line text-sm text-muted">
                  {method.details}
                </p>
              ) : (
                <p className="mt-4 flex-1 text-sm italic text-muted/80">
                  Coordonnées à venir — modifiables dans l’administration.
                </p>
              )}
              {method.linkUrl ? (
                <a
                  href={method.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-center text-sm font-semibold text-primary underline-offset-2 hover:underline"
                >
                  Ouvrir le lien
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
