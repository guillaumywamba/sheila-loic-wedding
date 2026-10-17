import type { ColorSwatch } from "@/types/site";

type Props = {
  title: string;
  swatches: ColorSwatch[];
  centered?: boolean;
};

export function ColorPaletteStrip({ title, swatches, centered }: Props) {
  if (!swatches.length) return null;

  return (
    <div className="mt-6 border-t border-black/5 pt-6">
      <p
        className={`font-display text-sm text-primary md:text-base ${centered ? "text-center" : ""}`}
      >
        {title}
      </p>
      <div
        className={`mt-4 flex flex-wrap items-center gap-3 md:gap-4 ${centered ? "justify-center" : "justify-center sm:justify-start"}`}
      >
        {swatches.map((swatch) => (
          <div
            key={swatch.hex + (swatch.label ?? "")}
            className="flex flex-col items-center gap-2"
            title={swatch.label ?? swatch.hex}
          >
            <span
              className="h-11 w-11 rounded-full border-2 border-white shadow-md ring-1 ring-black/10 md:h-14 md:w-14"
              style={{ backgroundColor: swatch.hex }}
            />
            {swatch.label ? (
              <span className="max-w-[4.5rem] text-center text-[10px] leading-tight text-muted md:text-xs">
                {swatch.label}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
