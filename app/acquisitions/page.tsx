import { ServiceStructuredData } from "@/components/service-structured-data";
import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { PageHero, PageButton, PageSection, PageCTA } from "@/components/sky/page-ui";
import { SkyInvestmentExample } from "@/components/home/sky-investment-example";
import "@/components/home/sky-content.css";
export const metadata: Metadata = withPageMetadata({ title: "AI for music catalog acquisitions", description: "Custom AI systems that organize deal materials, prepare a diligence draft, and keep each open question connected to its source.", alternates: { canonical: "/acquisitions" } });
export default function Page() {
 return <div className="sky-subpage sky-usecase">
  <ServiceStructuredData path="/acquisitions" name="AI for music catalog acquisitions" description="Custom AI systems that organize deal materials, prepare a diligence draft, and keep each open question connected to its source." serviceType={["Music catalog acquisition review", "Deal preparation"]} />
      <PageHero eyebrow="CATALOG ACQUISITIONS" title="Put the deal in order." description="Custom AI systems that organize deal materials, prepare a diligence draft, and keep each open question connected to its source."><PageButton href="/acquisitions/contact">Discuss your workflow</PageButton></PageHero>
  <PageSection eyebrow="WHAT WE CAN BUILD" title="Less preparation. More room to review."><div className="sp-grid"><article className="sp-card"><span className="sp-kicker">01</span><h3>Gather the materials.</h3><p>Bring deal documents, financial models, and analyst notes into one review.</p></article><article className="sp-card"><span className="sp-kicker">02</span><h3>Trace the assumptions.</h3><p>Connect findings to the records behind them. Keep missing information visible.</p></article><article className="sp-card"><span className="sp-kicker">03</span><h3>Prepare the next conversation.</h3><p>Give your team a draft review and the questions to take back to the seller.</p></article></div></PageSection>
  <div id="workflow" className="sky-content"><SkyInvestmentExample /></div>
  <PageCTA title="Start with your workflow." description="Walk us through the files, the tools, and where the work slows down. We’ll discuss a useful first build." href="/acquisitions/contact" />
 </div>;
}
