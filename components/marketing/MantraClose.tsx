/**
 * Mantra line (W-10) — the repeated era/destiny line that sits above page
 * closers, Tenex-style ("Stay on the right side of history."). One line, one
 * place to edit, used sitewide so it becomes the reader's vocabulary.
 */
export const MANTRA =
  "The next decade of music belongs to the teams that own their data.";

export function MantraClose({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const cls =
    tone === "dark"
      ? "text-white/55"
      : "text-(--foreground)/50";
  return (
    <p
      data-testid="mantra"
      className={`font-display italic text-[clamp(1.125rem,2vw,1.5rem)] leading-snug mb-8 ${cls}`}
    >
      {MANTRA}
    </p>
  );
}
