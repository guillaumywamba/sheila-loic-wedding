import { defaultSiteContent } from "@/lib/default-content";
import { normalizeLogisticsTitle } from "@/lib/event-logistics-text";
import type { GiftPaymentMethod, SiteContent } from "@/types/site";

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
        return {
          ...item,
          logisticsTitle: normalizeLogisticsTitle(item.logisticsTitle),
          mapsUrl: item.mapsUrl?.trim() || def?.mapsUrl,
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
    colorPalette:
      stored.logistics.colorPalette?.length > 0
        ? stored.logistics.colorPalette
        : d.logistics.colorPalette,
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
