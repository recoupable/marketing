import { TESTIMONIALS } from "@/lib/copy/testimonials";

/**
 * Testimonial wall (W-18) — outcome-specific quotes with attribution, in the
 * pm-world/Every format. Reads from lib/copy/testimonials (real quotes only).
 * Renders a single centered quote when only one is cleared for publication.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 1) {
    const t = TESTIMONIALS[0];
    return (
      <figure className="text-center" data-testid="testimonials">
        <blockquote className="font-display italic text-(--foreground)/80 text-[clamp(1.5rem,3vw,2rem)] leading-[1.4] mb-6">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <figcaption className="font-ui text-[12px] text-(--foreground)/40 uppercase tracking-[0.16em]">
          {t.attribution}
          {t.detail ? <span className="normal-case tracking-normal"> — {t.detail}</span> : null}
        </figcaption>
      </figure>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="testimonials">
      {TESTIMONIALS.map((t) => (
        <figure
          key={t.quote}
          className="flex flex-col rounded-2xl bg-(--background) p-7"
          style={{ boxShadow: "0 0 0 1px var(--border)" }}
        >
          <blockquote className="text-[15px] text-(--foreground)/75 leading-relaxed flex-1">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-5 pt-4" style={{ boxShadow: "inset 0 1px 0 0 var(--border)" }}>
            <p className="font-ui font-semibold text-[13px] text-(--foreground)">{t.attribution}</p>
            {t.detail ? (
              <p className="font-ui text-[12px] text-(--foreground)/45">{t.detail}</p>
            ) : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
