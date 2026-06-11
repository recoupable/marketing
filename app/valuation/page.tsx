import type { Metadata } from "next";
import { CatalogValuation } from "@/components/valuation/CatalogValuation";

export const metadata: Metadata = {
  title: "What's Your Catalog Worth? | Recoup",
  description:
    "Pick your artist profile and get a directional valuation of your recorded catalog from live Spotify play counts — measured, not guessed.",
};

export default function ValuationPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">
        What&apos;s your catalog worth?
      </h1>
      <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
        Pick your artist. We measure live play counts across your entire
        catalog and turn them into a valuation band — one click, no uploads,
        no statements.
      </p>
      <CatalogValuation />
    </main>
  );
}
