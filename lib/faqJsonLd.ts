import type { FaqItem } from "@/lib/copy/consultingFaq";

/**
 * Build schema.org FAQPage JSON-LD from a list of Q&A items (W-35).
 * Embed via <script type="application/ld+json"> on pages with FAQ accordions.
 */
export function buildFaqJsonLd(items: readonly FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
