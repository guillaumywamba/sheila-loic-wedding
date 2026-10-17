import type { ColorSwatch } from "@/types/site";

type Props = {
  title: string;
  swatches: ColorSwatch[];
  centered?: boolean;
};

export function ColorPaletteStrip({ title, swatches, centered }: Props) {
  if (!swatches.length) return null;

  return (
    <div className="mt-8 border-t border-black/5 pt-8">
      <p
        className={`font-display text-base text-primary md:text-lg ${centered ? "text-center" : ""}`}
      >
        {title}
      </p>
      <ul
        className={`mx-auto mt-5 grid max-w-md grid-cols-5 gap-3 px-1 sm:max-w-lg sm:gap-4 md:max-w-xl ${centered ? "" : ""}`}
        aria-label={title}
      >
        {swatches.map((swatch) => (
          <li
            key={swatch.hex + (swatch.label ?? "")}
            className="flex min-w-0 flex-col items-center gap-1.5 sm:gap-2"
          >
            <span
              className="h-10 w-10 shrink-0 rounded-full border-2 border-white shadow-md ring-1 ring-black/10 sm:h-12 sm:w-12 md:h-14 md:w-14"
              style={{ backgroundColor: swatch.hex }}
              title={swatch.label ?? swatch.hex}
            />
            {swatch.label ? (
              <span className="w-full text-center text-[9px] leading-tight text-muted sm:text-[10px] md:text-xs">
                {swatch.label}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
