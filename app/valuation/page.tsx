import { CatalogValuation } from "@/components/valuation/CatalogValuation";
import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { MarketingPage, PageCTA } from "@/components/marketing-migration/ui";
export const metadata: Metadata=withPageMetadata({title:"Catalog valuation with Recoup",description:"Explore a directional recorded-catalog valuation based on measured Spotify streaming activity. Search an artist and run the tool with your Recoup account.",alternates:{canonical:"/valuation"}});
export default function ValuationPage() {
  return <MarketingPage><section className="sp-section"><header className="mm-tool-intro"><p className="sp-kicker">CATALOG VALUATION</p><h1>What could your catalog be worth?</h1></header>
    <p className="mm-note">Search for an artist to estimate a recorded catalog’s value using measured Spotify streaming activity. Sign in to run the valuation.</p>
    <div className="valuation-tool"><CatalogValuation /></div>
    <p className="mm-note">This directional estimate uses agent credits and does not account for every right, contract term, income source, or expense involved in a purchase.</p>
  </section><PageCTA title="Working through an acquisition?" description="We can help organize deal information, prepare review questions, and connect findings to their sources." href="/acquisitions/contact" label="Discuss acquisition review" /></MarketingPage>;
}
