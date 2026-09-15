"use client";

import { useState } from "react";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { AppLink } from "@/components/analytics/AppLink";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { annualDiscountPercent, planPrice, pricingInquiryHref, pricingPlans, type BillingCycle, type PricingPlanId } from "@/lib/pricing";

function PlanMark({ plan }: { plan: PricingPlanId | "enterprise" | "api" }) {
  return <span className={`rp-mark rp-mark-${plan}`} aria-hidden="true"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {plan === "platform" ? <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M3 9h18M9 9v12" /><path d="M6 6h.01M9 6h.01" /></>
      : plan === "advisory" ? <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /><path d="M12 1v2M12 21v2M1 12h2M21 12h2" /></>
      : plan === "partner" ? <><path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5" /></>
      : plan === "enterprise" ? <><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M3 21h18M10 7h4M10 11h4M10 15h4M12 18v3" /></>
      : <><path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18" /></>}
  </svg></span>;
}

function Check() {
  return <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="currentColor" fillOpacity=".08" /><path d="m6 10 2.5 2.5L14 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function PricingPlans() {
  const [billing, setBilling] = useState<BillingCycle>("annual");
  return <>
    <section id="plans" className="rp-comparison" aria-label="Compare Recoup plans">
      <div className="rp-billing-bar">
        <fieldset className="rp-billing">
          <legend className="rp-sr-only">Billing period</legend>
          {(["monthly", "annual"] as const).map((cycle) => <label key={cycle} className={billing === cycle ? "is-selected" : ""}>
            <input type="radio" name="billing" value={cycle} checked={billing === cycle} onChange={() => { setBilling(cycle); trackEvent("pricing_billing_toggled", { billing: cycle }); }} />
            <span>{cycle === "monthly" ? "Monthly" : "Annually"}</span>
            {cycle === "annual" && <span className="rp-discount">Save {annualDiscountPercent}%+</span>}
          </label>)}
        </fieldset>
        <p className="rp-currency">All prices in USD</p>
      </div>
      <p className="rp-sr-only" aria-live="polite" aria-atomic="true">{billing === "annual" ? "Annual billing selected. Prices show monthly equivalents with the full yearly charge. Save at least 20 percent on all three plans." : "Monthly billing selected. Prices are billed each month."}</p>
      <div className="rp-plan-tray">
        {pricingPlans.map((plan) => {
          const price = planPrice(plan.id, billing);
          return <article id={plan.id} key={plan.id} className={`rp-plan rp-plan-${plan.id}`} aria-labelledby={`${plan.id}-title`}>
            <div className="rp-plan-heading">
              <div className="rp-plan-kind"><PlanMark plan={plan.id} /><span>{plan.kind}</span></div>
              <h2 id={`${plan.id}-title`}>{plan.name}</h2>
              <p>{plan.description}</p>
            </div>
            <div className="rp-price-block">
              <p className="rp-price-starts">Starting at</p>
              <div className="rp-price"><strong>{price.monthly}</strong><span>/ month</span></div>
              <p className="rp-price-terms">{price.terms}</p>
              <p className="rp-saving">{billing === "annual" ? `Save ${price.annualSavings} per year` : ""}</p>
            </div>
            <div className="rp-plan-action">{plan.id === "platform"
              ? <AppLink placement="pricing" plan={plan.id} className="sp-button">{plan.action}<span><SkyArrow /></span></AppLink>
              : <TrackedLink href={pricingInquiryHref(plan.id, billing)} cta={plan.id} placement="pricing" plan={plan.id} className="sp-button">{plan.action}<span><SkyArrow /></span></TrackedLink>}</div>
            <div className="rp-inclusions">
              <h3>{plan.includes}</h3>
              <ul>{plan.features.map((feature) => <li key={feature}><Check /><span>{feature}</span></li>)}</ul>
            </div>
            <p className="rp-plan-detail">{plan.detail}</p>
          </article>;
        })}
      </div>
    </section>
    <section className="rp-other-paths" aria-label="Enterprise and developer pricing" data-reveal-group="">
      <article className="rp-enterprise">
        <div className="rp-route-top"><PlanMark plan="enterprise" /><span className="sp-kicker">When the work spans teams</span></div>
        <div className="rp-route-body"><div><h2>Enterprise</h2><p>Connect the work across your organization. We scope the integrations, rollout, and support around the teams involved.</p></div><TrackedLink href={pricingInquiryHref("enterprise")} cta="enterprise" placement="pricing" plan="enterprise" className="sp-button">Contact us<span><SkyArrow /></span></TrackedLink></div>
      </article>
      <article className="rp-api" id="usage">
        <div className="rp-route-top"><PlanMark plan="api" /><span className="sp-kicker">For developers</span></div>
        <h2>API & MCP</h2>
        <p className="rp-usage-price">Pay for what you use.</p>
        <p>Bring Recoup’s tools into your own apps and agents. Usage is billed separately through credits.</p>
        <Link href="/docs/credits" className="rp-route-link">How usage pricing works <SkyArrow /></Link>
      </article>
    </section>
  </>;
}
