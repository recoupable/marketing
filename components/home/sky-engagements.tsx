"use client";

import { useState } from "react";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { annualDiscountPercent, planPrice, pricingInquiryHref, pricingPlans, type BillingCycle } from "@/lib/pricing";
import "./sky-engagements.css";

function EngagementMark({ build = false }: { build?: boolean }) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d={build ? "M5 10 16 4l11 6-11 6-11-6Zm0 6 11 6 11-6M5 22l11 6 11-6" : "M16 3v5m0 16v5M3 16h5m16 0h5M22 10l-4 8-8 4 4-8 8-4Z"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function SkyEngagements() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const plans = pricingPlans.filter((plan) => plan.id !== "platform");

  return <section className="sky-section sky-engagements" id="work-with-us" aria-labelledby="sky-engagements-title">
    <header className="sky-engagement-heading" data-reveal="">
      <div><p className="sky-section-label">WORK WITH RECOUP</p><h2 id="sky-engagements-title">Expert guidance.<br /><span>Or a team to <span className="sky-engagement-keep">build it.</span></span></h2><p>Get the advice to lead your own implementation, or bring us in to turn the plan into working systems you own.</p></div>
      <fieldset className="sky-engagement-billing"><legend>Choose your billing</legend><div>
        {(["monthly", "annual"] as const).map((cycle) => <label key={cycle}><input type="radio" name="home-billing" value={cycle} checked={billing === cycle} onChange={() => setBilling(cycle)} /><span>{cycle === "monthly" ? "Monthly" : "Annually"}</span></label>)}
      </div><p>Save {annualDiscountPercent}% or more annually</p></fieldset>
    </header>
    <div className="sky-engagement-grid" data-reveal-group="">
      {plans.map((plan) => {
        const build = plan.id === "partner";
        const price = planPrice(plan.id, billing);
        return <article className={`sky-engagement-card${build ? " sky-engagement-card--partner" : ""}`} key={plan.id} aria-labelledby={`home-plan-${plan.id}`}>
          <div className="sky-engagement-card-top"><span className="sky-engagement-mark"><EngagementMark build={build} /></span><span className="sky-engagement-mode">{build ? "WE BUILD WITH YOU" : "YOUR TEAM IMPLEMENTS"}</span></div>
          <h3 id={`home-plan-${plan.id}`}>{plan.name}</h3>
          <p className="sky-engagement-description">{build ? "From the first build to daily use. A partner to put AI to work across your business." : "An expert in your corner. Know what to prioritize and how to move it forward."}</p>
          <div className="sky-engagement-price"><strong>{price.monthly}</strong><span>/ month</span></div>
          <p className="sky-engagement-terms">USD · {price.terms}</p>
          <Link className="sky-engagement-action" href={pricingInquiryHref(plan.id, billing)}>{build ? "Discuss your build" : "Explore advisory"}<span><SkyArrow /></span></Link>
          <div className="sky-engagement-inclusions"><p>{build ? "We help you deliver" : "We help you decide"}</p><ul>{plan.features.map((feature) => <li key={feature}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 10 3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>{feature}</li>)}</ul></div>
          <p className="sky-engagement-scope">{build ? "Build scope, delivery schedule, and ongoing improvements agreed together." : "Your team owns implementation. We provide the strategy, advice, and coaching."}</p>
        </article>;
      })}
    </div>
    <div className="sky-engagement-next" data-reveal=""><div><strong>Not sure where to start?</strong><p>A free audit helps identify where AI could help your business.</p><Link href="/start-project">Get a Free Audit <SkyArrow direction="right" /></Link></div><Link className="sky-engagement-compare" href="/pricing">Compare all plans<span>Platform, consulting, and enterprise <SkyArrow direction="right" /></span></Link></div>
    <p className="sr-only" aria-live="polite">{billing === "annual" ? "Annual billing selected. Prices show the monthly equivalent, with the full annual charge below each price." : "Monthly billing selected."}</p>
  </section>;
}
