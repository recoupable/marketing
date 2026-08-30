import { Check } from "lucide-react";
import type { PricingPlan } from "@/lib/copy/pricing";
import type { PricingSurface } from "@/lib/analytics/pricingSurface";
import { getPlanCardClasses } from "@/lib/pricing/getPlanCardClasses";
import { PlanCheckoutButton } from "@/components/pricing/PlanCheckoutButton";
import { PricingCtaLink } from "@/components/pricing/PricingCtaLink";

/**
 * One plan card, shared by /pricing and the homepage strip so both surfaces
 * sell the same plan with the same CTA. `surface` tags the click event.
 */
export function PlanCard({ plan, surface }: { plan: PricingPlan; surface: PricingSurface }) {
  const c = getPlanCardClasses(Boolean(plan.highlighted));
  const ctaClasses = `block w-full text-center py-3 rounded-lg text-sm font-medium transition-colors ${c.cta}`;

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${c.card}`}
    >
      {plan.badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className={`text-[9px] uppercase tracking-wider px-4 py-1.5 rounded-full ${c.badge}`}
            style={{ fontFamily: "var(--font-bitmap), monospace" }}
          >
            {plan.badge}
          </span>
        </div>
      )}

      <p
        className={`text-[10px] uppercase tracking-widest mb-1 ${c.eyebrow}`}
        style={{ fontFamily: "var(--font-bitmap), monospace" }}
      >
        {plan.audience}
      </p>
      <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
      <p className={`text-sm mb-6 leading-relaxed ${c.description}`}>{plan.description}</p>

      <div className="mb-6">
        <span className="text-4xl font-bold">{plan.price}</span>
        {plan.period && <span className={`text-sm ${c.period}`}>{plan.period}</span>}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check size={16} className={`mt-0.5 shrink-0 ${c.check}`} />
            <span className={c.feature}>{f}</span>
          </li>
        ))}
      </ul>

      {plan.id !== "free" ? (
        <PlanCheckoutButton
          plan={plan.id}
          surface={surface}
          label={plan.cta}
          note={plan.ctaNote}
          className={ctaClasses}
        />
      ) : (
        <PricingCtaLink
          plan={plan.id}
          surface={surface}
          href={plan.ctaHref ?? "#"}
          className={ctaClasses}
        >
          {plan.cta}
        </PricingCtaLink>
      )}
    </div>
  );
}
