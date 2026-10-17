const URL_PATTERN = /https?:\/\/[^\s)\]]+/gi;

export function splitLogisticsDetails(details: string): {
  body: string;
  mapUrls: string[];
} {
  const mapUrls: string[] = [];
  const body = details
    .replace(URL_PATTERN, (url) => {
      const clean = url.replace(/[.,;]+$/, "");
      if (
        /google\.(com|[a-z]{2,3})\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/i.test(
          clean,
        )
      ) {
        mapUrls.push(clean);
        return "";
      }
      return url;
    })
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { body, mapUrls };
}

export function normalizeLogisticsTitle(title: string): string {
  return title.replace(/Détails\s+Logistique/gi, "Détail Logistique");
}
