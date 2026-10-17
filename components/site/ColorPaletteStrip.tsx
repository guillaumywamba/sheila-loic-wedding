import type { ColorSwatch } from "@/types/site";

type Props = {
  title: string;
  swatches: ColorSwatch[];
  centered?: boolean;
};

function withoutWhite(swatches: ColorSwatch[]): ColorSwatch[] {
  return swatches.filter(
    (s) => s.hex.replace(/\s/g, "").toUpperCase() !== "#FFFFFF",
  );
}

export function ColorPaletteStrip({ title, swatches, centered }: Props) {
  const palette = withoutWhite(swatches);
  if (!palette.length) return null;

  return (
    <div className="mt-8 border-t border-black/5 pt-8">
      <p
        className={`font-display text-base text-primary md:text-lg ${centered ? "text-center" : ""}`}
      >
        {title}
      </p>
      <ul
        className="mx-auto mt-5 grid max-w-sm grid-cols-4 gap-4 px-2 sm:max-w-md sm:gap-5 md:max-w-lg md:gap-6"
        aria-label={title}
      >
        {palette.map((swatch, index) => {
          const label = swatch.label?.trim() ?? "";

          return (
            <li
              key={swatch.hex + String(index)}
              className="flex min-w-0 flex-col items-center gap-2 sm:gap-2.5"
            >
              <span
                className="h-12 w-12 shrink-0 rounded-full border-2 border-white shadow-md ring-1 ring-black/10 sm:h-14 sm:w-14 md:h-16 md:w-16"
                style={{ backgroundColor: swatch.hex }}
                title={label || swatch.hex}
              />
              {label ? (
                <span className="w-full text-center text-[10px] leading-tight text-muted sm:text-xs md:text-sm">
                  {label}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
