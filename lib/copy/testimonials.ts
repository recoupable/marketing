/**
 * Testimonials — single source for the proof quotes used on the homepage and
 * /consulting (W-18).
 *
 * RULE: every entry must be a real quote we have permission to publish.
 * `attribution` is what renders; keep it anonymous until the person has
 * approved a name + company. Target shape per the reference teardowns
 * (pm-world landing/5, every consulting/4): outcome or mechanic in the quote,
 * name + role + company in the attribution.
 *
 * TODO(W-18): collect + clear 2 more named quotes (catalog buyer, label GM).
 */

export interface Testimonial {
  quote: string;
  /** Display name — real person once cleared, otherwise role-anonymous. */
  attribution: string;
  /** Role / company line under the name. */
  detail?: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "Catalog diligence is one of the biggest pain points I have. Cut it down to minutes and it changes how we buy.",
    attribution: "Catalog fund operator",
    detail: "Buy-side diligence",
  },
] as const;
