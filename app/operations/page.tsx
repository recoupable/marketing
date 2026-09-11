import { ServiceStructuredData } from "@/components/service-structured-data";
import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { PageHero, PageButton, PageSection, PageCTA } from "@/components/sky/page-ui";
import { SkyRoyaltyExample } from "@/components/home/sky-royalty-example";
import "@/components/home/sky-content.css";
export const metadata: Metadata = withPageMetadata({ title: "AI royalty reporting & catalog operations", description: "Custom AI systems for royalty intake, reconciliation, and recurring catalog reporting. See what matches and what still needs review.", alternates: { canonical: "/operations" } });
export default function Page() {
 return <div className="sky-subpage sky-usecase">
  <ServiceStructuredData path="/operations" name="AI royalty reporting & catalog operations" description="Custom AI systems for royalty intake, reconciliation, and recurring catalog reporting. See what matches and what still needs review." serviceType={["Royalty reporting", "Catalog operations", "Royalty reconciliation"]} />
      <PageHero eyebrow="CATALOG OPERATIONS" title="Get behind the numbers." description="Custom AI systems for royalty intake, reconciliation, and recurring catalog reporting. See what matches and what still needs review."><PageButton href="/operations/contact">Discuss your workflow</PageButton><PageButton secondary href="#workflow">See how it works</PageButton></PageHero>
  <PageSection eyebrow="WHAT WE CAN BUILD" title="Less preparation. More room to review."><div className="sp-grid"><article className="sp-card"><span className="sp-kicker">01</span><h3>Bring the records together.</h3><p>Match royalty statements, receipts, and catalog records in one place.</p></article><article className="sp-card"><span className="sp-kicker">02</span><h3>Keep exceptions visible.</h3><p>Surface differences by source, even when the overall total matches.</p></article><article className="sp-card"><span className="sp-kicker">03</span><h3>Prepare the report.</h3><p>Give the team a clear report, source records, and a focused review list.</p></article></div></PageSection>
  <div id="workflow" className="sky-content"><SkyRoyaltyExample /></div>
  <PageCTA title="Start with your workflow." description="Walk us through the files, the tools, and where the work slows down. We’ll discuss a useful first build." href="/operations/contact" />
 </div>;
}
