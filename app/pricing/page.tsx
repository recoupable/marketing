import type { Metadata } from "next";
import { MarketingPage, MarketingFAQ } from "@/components/marketing-migration/ui";
import { withPageMetadata } from "@/lib/seo";
import { formatUsd, pricingPlans } from "@/lib/pricing";
import { PricingPlans } from "./pricing-plans";
import "./pricing.css";

export const metadata: Metadata = withPageMetadata({
  title: "Pricing: Recoup Platform, advisory, and custom builds",
  description: `Recoup Platform from ${formatUsd(pricingPlans[0].monthlyCents)}/month, Advisory from ${formatUsd(pricingPlans[1].monthlyCents)}/month, and Build + Partner from ${formatUsd(pricingPlans[2].monthlyCents)}/month. Save at least 20% with annual billing.`,
  alternates: { canonical: "/pricing" },
});

export default function PricingPage() {
  return <MarketingPage>
    <div className="pricing-page">
      <header className="rp-heading">
        <p className="sp-kicker">Software + services</p>
        <h1>Three ways to start.<br /><span>Make AI worth it.</span></h1>
        <p>Tools you can run. Advice you can act on. A team that builds with you. Choose the support your music business needs.</p>
      </header>
      <PricingPlans />
      <section className="rp-questions" aria-labelledby="pricing-questions">
        <div data-reveal=""><p className="sp-kicker">Before you commit</p><h2 id="pricing-questions">Know what<br />you’re buying.</h2><p>Who does the work, what’s included, and how billing works.</p></div>
        <MarketingFAQ items={[
          { question: "How does annual billing work?", answer: "Annual plans are paid once per year. We apply a 20% discount and round the monthly equivalent down to a whole dollar. The cards show the monthly equivalent and the full annual charge. The discount applies to Recoup Platform, Advisory, and Build + Partner. Enterprise is quoted separately; API and MCP usage is not included in the discount." },
          { question: "What’s the difference between Advisory and Build + Partner?", answer: "With Advisory, your team leads implementation. We help you choose projects, make a practical plan, and work through decisions along the way. With Build + Partner, Recoup also designs and develops the software. We agree on scope, priorities, and a delivery schedule before work begins; a subscription does not mean unlimited builds." },
          { question: "How do we know a project is worth building?", answer: "We start with the task, the time it takes today, and the result your team needs. Together, we define what to measure and check what your data and tools will support. Advisory helps you make that decision; Build + Partner adds delivery of the agreed system. If you already have a clear project, you can start with a build." },
          { question: "Can we start with advice and move into a build?", answer: "Yes. Start with Advisory if you’re still deciding what to change. When there’s a clear project, we can discuss moving into Build + Partner. You can also begin with a build if you already know what you need." },
          { question: "What’s included in the music skill pack?", answer: "Music-business playbooks for research, content, release planning, and recurring work. The Recoup Platform plan brings the hosted workspace and skills together. Recoup’s public Skills collection remains open source; tools and services used by a skill may have their own usage charges." },
          { question: "How are API and MCP usage charged?", answer: "API and MCP access use a separate usage-based credit model. Cost depends on the operations and services used, not a flat charge for every request. Usage and third-party costs are separate from the advisory or build subscription unless your agreement explicitly includes them." },
        ]} />
      </section>
    </div>
  </MarketingPage>;
}
