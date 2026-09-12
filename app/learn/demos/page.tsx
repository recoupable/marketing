import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { MarketingPage, PageHero, PageSection, PageButton, PageCTA } from "@/components/marketing-migration/ui";
import { DiligenceWorkPreview, RoyaltyWorkPreview } from "@/components/marketing-migration/work-previews";
export const metadata: Metadata=withPageMetadata({title:"Recoup demos — See AI in the work",description:"Explore interactive royalty reporting and acquisition review, or try the Recoup platform with your own artist context.",alternates:{canonical:"/learn/demos"}});
export default function DemosPage() {
  return <MarketingPage><div className="work-examples-page work-examples-demos">
    <PageHero tone="light" eyebrow="SEE THE WORK" title={<>The details make<br /><span>the difference.</span></>} description="Explore what a useful result looks like: the numbers, the questions, and the information behind each finding.">
      <PageButton href="#demos">Explore the demos</PageButton><PageButton href="https://teams.recoupable.dev" secondary>Try the platform</PageButton>
    </PageHero>
    <PageSection id="demos" className="we-section" eyebrow="INTERACTIVE WALKTHROUGHS" title="A closer look at the work.">
      <div className="we-card-grid">
        <Link className="we-work-card" href="/operations#royalty-example" aria-labelledby="royalty-demo-title">
          <div className="we-card-heading"><span className="sp-kicker">ROYALTY REPORTING</span><h3 id="royalty-demo-title">The total matches.<br />Do the sources?</h3></div>
          <RoyaltyWorkPreview />
          <div className="we-card-body"><p>Explore a reporting review that compares statements with receipts and keeps unresolved differences visible. Select a payment source to inspect the records behind it.</p><span className="we-card-link">Explore royalty reporting<SkyArrow /></span></div>
        </Link>
        <Link className="we-work-card" href="/acquisitions#acquisition-example" aria-labelledby="acquisition-demo-title">
          <div className="we-card-heading"><span className="sp-kicker">ACQUISITION REVIEW</span><h3 id="acquisition-demo-title">The question.<br />And its source.</h3></div>
          <DiligenceWorkPreview />
          <div className="we-card-body"><p>See how deal documents become a review brief: missing information, conflicting identifiers, and seller questions linked back to supporting records.</p><span className="we-card-link">Explore acquisition review<SkyArrow /></span></div>
        </Link>
      </div>
    </PageSection>
    <PageCTA title="Try it with your own artist context." description="Open Recoup to work on research, content, strategy, and recurring reports." href="https://teams.recoupable.dev" label="Open the platform" />
  </div></MarketingPage>;
}
