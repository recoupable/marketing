import { ServiceStructuredData } from "@/components/service-structured-data";
import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { planPrice, pricingPlans } from "@/lib/pricing";
import { SkyArrow } from "@/components/sky/arrow";
import { MarketingPage, PageHero, PageSection, PageButton, PageCTA, MarketingFAQ } from "@/components/marketing-migration/ui";
import { BuildReview } from "@/components/marketing-migration/engagement-visuals";

export const metadata: Metadata = withPageMetadata({ title:"Custom AI systems for music businesses", description:"Custom agents, integrations, dashboards, and applications for music funds and rightsholders. Built around your tools, data, and team.", alternates:{canonical:"/build"} });

const capabilities = [
  { title: "Agents & automations", description: "Research, reports, and recurring tasks that follow a method your team can review and repeat.", outputs: ["Scheduled briefings", "Research and document preparation", "Review and approval steps"] },
  { title: "Integrations", description: "Connect catalog data, royalty statements, your CRM, and internal tools so the information follows the task.", outputs: ["APIs and data connections", "Import and validation workflows", "Permissions that match the work"] },
  { title: "Dashboards & reporting", description: "Give your team a clear report, the records behind it, and the differences that need attention.", outputs: ["Royalty and catalog reporting", "Exceptions ready for review", "Recurring management summaries"], href: "/operations#royalty-example", label: "Inspect a royalty report" },
  { title: "Full applications", description: "Build the software your company needs, from an internal review tool to a product with its own interface and backend.", outputs: ["Applications and databases", "APIs and MCP servers", "Testing and documentation"], href: "/acquisitions#acquisition-example", label: "Inspect a deal review" },
] as const;

const delivery = [
  { title: "Define the first version.", description: "Agree on the job, the information it needs, the people involved, and the standard it needs to meet." },
  { title: "Review the work as it develops.", description: "Test useful pieces with your team and refine the system against real tasks." },
  { title: "Make it yours to run.", description: "Custom code in a repository you control, documentation, and training for the people responsible." },
];

export default function BuildPage() {
 const plan = pricingPlans.find((item) => item.id === "partner")!;
 return <MarketingPage><div className="engagement-page build-engagement">
  <ServiceStructuredData path="/build" name="Custom AI systems for music businesses" description="Custom agents, integrations, dashboards, and applications for music funds and rightsholders. Built around your tools, data, and team." serviceType={["Custom agents", "Software integrations", "AI applications"]} />
      <PageHero eyebrow="CUSTOM BUILDS" title={<>Your business.<br /><span>Your system.</span></>} description="We build agents, integrations, dashboards, and full applications around the way your music company works. Working software, documented and ready for your team." tone="light" visual={<BuildReview />}>
   <PageButton href="/build/start">Discuss your build</PageButton><PageButton href="#builds" secondary>What we build</PageButton>
  </PageHero>
  <PageSection id="builds" eyebrow="BUILT AROUND THE WORK" title="One agent. Or the whole application.">
    <div className="eg-capabilities" data-reveal-group="">{capabilities.map((capability, index) => <article className="eg-capability" key={capability.title}>
      <div><div className="eg-capability-title"><span>0{index + 1}</span><h3>{capability.title}</h3></div><p>{capability.description}</p></div>
      <div className="eg-capability-output"><ul>{capability.outputs.map((output) => <li key={output}>{output}</li>)}</ul>{"href" in capability && <Link className="sp-text-link" href={capability.href}>{capability.label}<SkyArrow /></Link>}</div>
    </article>)}</div>
  </PageSection>
  <PageSection className="eg-delivery-section" eyebrow="HOW WE DELIVER" title="Working software. Clear responsibility.">
    <div><ol className="eg-delivery" data-reveal-group="">{delivery.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
      <p className="eg-delivery-price"><Link className="sp-text-link" href="/pricing#partner">{plan.name} · {planPrice(plan.id, "monthly").monthly}/month <SkyArrow /></Link></p>
    </div>
  </PageSection>
  <PageSection eyebrow="PRACTICAL QUESTIONS" title="Built for the way you work."><MarketingFAQ items={[{question:"Who owns the code?",answer:"Custom code is delivered in a repository you control. Your agreement defines ownership of the deliverables and the terms for any Recoup or third-party components."},{question:"Do we need to move to a new platform?",answer:"Not necessarily. We start with your current tools and scope any integrations or infrastructure changes together. Custom builds can use Recoup or operate as standalone software."},{question:"What does a project cost?",answer:"It depends on the workflow, integrations, and scope. We agree on deliverables and price before the build starts."},{question:"Can you maintain the system?",answer:"Yes. Maintenance, monitoring, and improvements can be included in an ongoing engagement. We agree on responsibilities and support arrangements together."}]} /></PageSection>
  <PageCTA title="What would you build if you had the team?" description="Tell us what needs to happen, what you use today, and where the work gets stuck." href="/build/start" label="Scope your build" />
 </div></MarketingPage>;
}
