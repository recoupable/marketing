import { z } from "zod";

export const REVIEW_KEY = "recoup-brand-review:v1";
export const choices = {
  approved: "Keep",
  "needs-changes": "Maybe",
  retired: "Pass",
} as const;
export type Choice = keyof typeof choices;
export type Asset = {
  id: string;
  title: string;
  code: string;
  group: string;
  collection: string;
  preview: string;
  files: { label: string; path: string }[];
  stage?: string;
  dark?: boolean;
  video?: string;
  tool?: string;
};
const reviewSchema = z.object({
  status: z.enum(["proposed", "approved", "needs-changes", "retired"]),
  note: z.string().max(2000),
  stage: z.enum(["final", "experiment"]).optional(),
  reviewer: z.string().max(80).optional(),
  date: z.string().optional(),
  assetVersion: z.string().optional(),
});
export const reviewsSchema = z.record(z.string(), reviewSchema);
export const reviewExportSchema = z.object({
  schema: z.literal("recoup-brand-review-v1"),
  reviews: reviewsSchema,
});
export type Reviews = z.infer<typeof reviewsSchema>;
export function assetStage(asset: Asset, reviews: Reviews) {
  return reviews[asset.id]?.stage || asset.stage || "experiment";
}
export function studioUrl(value: string) {
  return `/brand/${value.replace(/^\/+/, "")}`;
}
export function reviewSummary(assets: Asset[], reviews: Reviews) {
  const lines = [
    "Recoup Brand Studio — review",
    "",
    "FINALS",
    ...assets
      .filter((a) => assetStage(a, reviews) === "final")
      .map((a) => `${a.code} — ${a.title} [${a.id}]`),
    "",
    "PAGE MOVES",
    ...assets
      .filter((a) => reviews[a.id]?.stage)
      .map(
        (a) =>
          `${a.code} — ${a.title}: ${assetStage(a, reviews) === "final" ? "Finals" : "Experiments"}`,
      ),
    "",
  ];
  for (const [status, label] of Object.entries(choices)) {
    const selected = assets.filter((a) => reviews[a.id]?.status === status);
    if (!selected.length) continue;
    lines.push(label.toUpperCase());
    for (const a of selected) {
      lines.push(`${a.code} — ${a.title} [${a.id}]`);
      if (reviews[a.id]?.note) lines.push(`  Note: ${reviews[a.id].note}`);
      lines.push(`  Asset: ${studioUrl(a.preview)}`);
    }
    lines.push("");
  }
  const notes = assets.filter(
    (a) =>
      (reviews[a.id]?.status || "proposed") === "proposed" &&
      reviews[a.id]?.note,
  );
  if (notes.length)
    lines.push(
      "NOTES / NO DECISION",
      ...notes.map((a) => `${a.code} — ${a.title}: ${reviews[a.id].note}`),
    );
  return lines.join("\n");
}

export function studioDownloadUrl(value: string) {
  const url = studioUrl(value);
  return `${url}${url.includes("?") ? "&" : "?"}download=1`;
}
