"use client";

import { useState } from "react";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { annualDiscountPercent, planPrice, pricingInquiryHref, pricingPlans, type BillingCycle } from "@/lib/pricing";
import "./sky-engagements.css";
import { homeCopy } from "@/lib/copy/home";

function EngagementMark({ build = false }: { build?: boolean }) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d={build ? "M5 10 16 4l11 6-11 6-11-6Zm0 6 11 6 11-6M5 22l11 6 11-6" : "M16 3v5m0 16v5M3 16h5m16 0h5M22 10l-4 8-8 4 4-8 8-4Z"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function SkyEngagements() {
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const plans = pricingPlans.filter((plan) => plan.id !== "platform");

  return <section className="sky-section sky-engagements" id="work-with-us" aria-labelledby="sky-engagements-title">
    <header className="sky-engagement-heading" data-reveal="">
      <div><p className="sky-section-label">WORK WITH RECOUP</p><h2 id="sky-engagements-title">{homeCopy.engagements.title}</h2></div>
      <fieldset className="sky-engagement-billing"><legend>Choose your billing</legend><div>
        {(["monthly", "annual"] as const).map((cycle) => <label key={cycle}><input type="radio" name="home-billing" value={cycle} checked={billing === cycle} onChange={() => { setBilling(cycle); trackEvent("pricing_billing_toggled", { billing: cycle }); }} /><span>{cycle === "monthly" ? "Monthly" : "Annually"}</span></label>)}
      </div><p>Save {annualDiscountPercent}% or more annually</p></fieldset>
    </header>
    <div className="sky-engagement-grid" data-reveal-group="">
      {plans.map((plan) => {
        const build = plan.id === "partner";
        const price = planPrice(plan.id, billing);
        return <article className={`sky-engagement-card${build ? " sky-engagement-card--partner" : ""}`} key={plan.id} aria-labelledby={`home-plan-${plan.id}`}>
          <div className="sky-engagement-card-top"><span className="sky-engagement-mark"><EngagementMark build={build} /></span></div>
          <h3 id={`home-plan-${plan.id}`}>{plan.name}</h3>
          <p className="sky-engagement-description">{build ? homeCopy.engagements.partner : homeCopy.engagements.advisory}</p>
          <div className="sky-engagement-price"><span className="sky-engagement-price-label">{homeCopy.engagements.startingAt}</span><strong>{price.monthly}</strong><span>/ month</span></div>
          <p className="sky-engagement-terms">USD · {price.terms}</p>
          <TrackedLink className="sky-engagement-action" href={pricingInquiryHref(plan.id, billing)} cta={plan.id} placement="home_engagements" plan={plan.id}>{build ? "Discuss your build" : "Explore advisory"}<span><SkyArrow /></span></TrackedLink>
          {build && <p className="sky-engagement-scope">{homeCopy.engagements.scope}</p>}
        </article>;
      })}
    </div>
    <div className="sky-engagement-next" data-reveal=""><Link className="sky-engagement-compare" href="/pricing">{homeCopy.engagements.compare}<SkyArrow direction="right" /></Link></div>
    <p className="sr-only" aria-live="polite">{billing === "annual" ? "Annual billing selected. Prices show the monthly equivalent, with the full annual charge below each price." : "Monthly billing selected."}</p>
  </section>;
}
