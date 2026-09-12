import { ServiceStructuredData } from "@/components/service-structured-data";
import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { planPrice, pricingPlans } from "@/lib/pricing";
import { SkyArrow } from "@/components/sky/arrow";
import { MarketingPage, PageHero, PageSection, PageButton, PageCTA, WorkCard, MarketingFAQ } from "@/components/marketing-migration/ui";
import { AdvisoryRoadmap } from "@/components/marketing-migration/engagement-visuals";

export const metadata: Metadata = withPageMetadata({ title:"AI advisory for music companies", description:"Find where AI fits in your music business. Practical strategy, workflow assessment, and implementation guidance from Recoup.", alternates:{canonical:"/advisory"} });

export default function AdvisoryPage() {
 const plan = pricingPlans.find((item) => item.id === "advisory")!;
 return <MarketingPage><div className="engagement-page advisory-engagement">
  <ServiceStructuredData path="/advisory" name="AI advisory for music companies" description="Find where AI fits in your music business. Practical strategy, workflow assessment, and implementation guidance from Recoup." serviceType={["AI strategy", "Workflow assessment", "AI implementation planning"]} />
      <PageHero eyebrow="AI ADVISORY" title={<>Know what to change.<br /><span>And where to start.</span></>} description="Your catalog is growing. Your team’s time isn’t. We help music funds and rightsholders choose useful AI projects and make a plan to put them to work." visual={<AdvisoryRoadmap />}>
   <PageButton href="/contact?workflow=AI%20strategy">Discuss your priorities</PageButton><PageButton href="#approach" secondary>How we help</PageButton>
  </PageHero>
  <PageSection id="approach" eyebrow="FROM QUESTIONS TO A PLAN" title="Make the next decision a clear one." description="We work through your actual workflows, so the roadmap reflects the company you run.">
   <div className="sp-grid"><WorkCard number="01 / ASSESS" title="Find the friction." description="Review recurring work across your team: reporting, research, release planning, and catalog operations." items={["The task and its current cost", "Your data, tools, and access", "Where review and judgment matter"]} /><WorkCard number="02 / PRIORITIZE" title="Choose what to build." description="Agree on which opportunity is worth pursuing first, and what needs to be true for it to work." items={["A focused first project", "Dependencies and trade-offs", "A way to measure improvement"]} /><WorkCard number="03 / IMPLEMENT" title="Put the plan to use." description="Work with your team to adopt the right tools, develop repeatable methods, and learn from real use." items={["Guidance on tools and workflows", "Hands-on team practice", "A plan for ongoing improvement"]} /></div>
  </PageSection>
  <PageSection><div className="mm-split-panel"><div><p className="sp-kicker">WORKING TOGETHER</p><h2>A focused engagement.<br />Or an ongoing partner.</h2><p>Start with a specific question, a department, or a company-wide plan. We agree on scope, deliverables, and price before we begin.</p><PageButton href="/contact?workflow=AI%20strategy">Talk through your situation</PageButton><p><Link className="sp-text-link" href="/pricing#advisory">{plan.name} · {planPrice(plan.id, "monthly").monthly}/month <SkyArrow /></Link></p></div><ul className="mm-checklist"><li>Bring your team into the conversation.</li><li>Use the tools that fit your business.</li><li>Review progress against the work you wanted to improve.</li><li>Move into a custom build when it makes sense.</li></ul></div></PageSection>
  <PageSection eyebrow="PRACTICAL QUESTIONS" title="Before we get started."><MarketingFAQ items={[{question:"Do we have to use the Recoup platform?",answer:"No. Advisory starts with your business and the tools your team uses. The plan may include Recoup, other products, or custom software."},{question:"Can our team join?",answer:"Yes. The people doing the work bring the context a useful AI plan needs. We involve the team responsible for using and maintaining the workflow."},{question:"Can you build the system too?",answer:"Yes. We design and build agents, integrations, reporting tools, and applications. A build has its own agreed scope, deliverables, and price."}]} /></PageSection>
  <PageCTA title="Bring us the work that keeps coming back." description="We’ll help you decide whether AI can improve it, what to try first, and how to judge the result." href="/contact?workflow=AI%20strategy" label="Talk about AI strategy" />
 </div></MarketingPage>;
}
