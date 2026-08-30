/** Class names for one pricing plan card, keyed by the element they style. */
export interface PlanCardClasses {
  card: string;
  badge: string;
  eyebrow: string;
  description: string;
  period: string;
  check: string;
  feature: string;
  cta: string;
}

/**
 * Tailwind classes for a plan card. The highlighted card inverts the page
 * palette (page foreground as its surface) so it is the highest-contrast
 * element in both themes: white on the dark theme, black on the light theme.
 * Secondary text on it stays at 70% or above so it clears WCAG AA on either
 * surface. Plain cards sit on the page palette with a border.
 */
export function getPlanCardClasses(highlighted: boolean): PlanCardClasses {
  if (!highlighted) {
    return {
      card: "border border-[var(--border)] bg-[var(--background)]",
      badge: "",
      eyebrow: "text-[var(--muted-foreground)]",
      description: "text-[var(--muted-foreground)]",
      period: "text-[var(--muted-foreground)]",
      check: "text-[var(--foreground)]",
      feature: "text-[var(--muted-foreground)]",
      cta: "border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)]",
    };
  }
  return {
    card: "bg-[var(--foreground)] text-[var(--background)] shadow-[0_0_0_1px_var(--foreground),0_25px_60px_-15px_rgba(0,0,0,0.5)] md:-mt-4 md:mb-[-16px]",
    badge: "bg-[var(--background)] text-[var(--foreground)] shadow-[0_0_0_1px_var(--foreground)]",
    eyebrow: "text-[var(--background)]/70",
    description: "text-[var(--background)]/80",
    period: "text-[var(--background)]/70",
    check: "text-[var(--background)]",
    feature: "text-[var(--background)]/90",
    cta: "bg-[var(--background)] text-[var(--foreground)] hover:opacity-90",
  };
}
