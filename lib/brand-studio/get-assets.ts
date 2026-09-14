import data from "@/brand-studio/review-board-assets.json";
import type { Asset } from "./reviews";
/** Only the small catalogue enters React; media is served independently from Blob. */
export function getAssets(): Asset[] {
  const featured = [
    "carousel-blue-notes",
    "carousel-paper-trail",
    "carousel-signal-study",
    "carousel-cobalt-press",
    "carousel-margin-notes",
    "carousel-cut-paper",
    "carousel-night-shift",
    "carousel-catalog-index",
    "carousel-blueprint",
    "carousel-spotlight",
    "carousel-field-guide",

    "linkedin-art-blue-sweep",
    "blue-sweep-podcast-title",
    "blue-sweep-podcast-white-logo",
  ];
  const rank = (id: string) =>
    featured.includes(id) ? featured.indexOf(id) : featured.length;
  return data
    .map(
      ({
        id,
        title,
        code,
        group,
        collection,
        preview,
        files,
        stage,
        dark,
        video,
        tool,
      }) => ({
        id,
        title,
        code,
        group,
        collection,
        preview,
        files,
        stage,
        dark,
        video,
        tool,
      }),
    )
    .sort((a, b) => rank(a.id) - rank(b.id));
}
