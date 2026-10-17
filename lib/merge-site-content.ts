import { defaultSiteContent } from "@/lib/default-content";
import { normalizeLogisticsTitle } from "@/lib/event-logistics-text";
import type { ColorSwatch, GiftPaymentMethod, SiteContent } from "@/types/site";

function isWhiteSwatch(swatch: ColorSwatch): boolean {
  return swatch.hex.replace(/\s/g, "").toUpperCase() === "#FFFFFF";
}

function mergeColorPalette(
  stored: ColorSwatch[] | undefined,
  defaults: ColorSwatch[],
): ColorSwatch[] {
  const cleaned =
    stored?.filter((s) => !isWhiteSwatch(s)) ?? [];

  return defaults.map((def, index) => {
    const fromStored = cleaned[index];
    if (!fromStored) return def;
    return {
      hex: fromStored.hex?.trim() || def.hex,
      label: fromStored.label?.trim() || def.label,
    };
  });
}

function mergePaymentMethods(
  stored: GiftPaymentMethod[] | undefined,
  defaults: GiftPaymentMethod[],
): GiftPaymentMethod[] {
  return defaults.map((def) => {
    const match = stored?.find((m) => m.id === def.id);
    return match ? { ...def, ...match } : def;
  });
}

export function mergeSiteContent(stored: SiteContent): SiteContent {
  const d = defaultSiteContent;

  const events = {
    ...stored.events,
    items: stored.events.items
      .filter((item) => item.id !== "civil")
      .map((item) => {
        const def = d.events.items.find((e) => e.id === item.id);
        const storedMap = item.mapsUrl?.trim();
        const mapsUrl =
          item.id === "religieux" &&
          def?.mapsUrl &&
          (!storedMap || storedMap.includes("google.com/maps/search"))
            ? def.mapsUrl
            : storedMap || def?.mapsUrl;

        return {
          ...item,
          logisticsTitle: normalizeLogisticsTitle(item.logisticsTitle),
          mapsUrl,
        };
      }),
  };

  const logistics = {
    ...d.logistics,
    ...stored.logistics,
    dressCodeImage:
      stored.logistics.dressCodeImage?.trim() || d.logistics.dressCodeImage,
    dressCodeImageAlt:
      stored.logistics.dressCodeImageAlt ?? d.logistics.dressCodeImageAlt,
    colorPalette: mergeColorPalette(
      stored.logistics.colorPalette,
      d.logistics.colorPalette,
    ),
    colorPaletteTitle:
      stored.logistics.colorPaletteTitle ?? d.logistics.colorPaletteTitle,
  };

  const storedGifts = stored.gifts ?? d.gifts;
  const gifts = {
    ...d.gifts,
    ...storedGifts,
    noPhysicalGiftsNote:
      storedGifts.noPhysicalGiftsNote ?? d.gifts.noPhysicalGiftsNote,
    paymentMethods: mergePaymentMethods(
      storedGifts.paymentMethods,
      d.gifts.paymentMethods,
    ),
  };

  return {
    ...d,
    ...stored,
    events,
    logistics,
    gifts,
  };
}
