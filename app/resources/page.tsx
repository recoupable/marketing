import { withPageMetadata } from "@/lib/seo";
import { SubscribeCard } from "@/components/marketing-migration/subscribe-card";
import type { Metadata } from "next";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { MarketingPage, PageHero, PageCTA } from "@/components/marketing-migration/ui";
import "./resources.css";

export const metadata: Metadata = withPageMetadata({ title:"Recoup resources: Guides, demos, tools & documentation", description:"Explore Recoup’s music AI playbook, interactive demos, readiness check, ROI planner, blog, and API documentation.", alternates:{canonical:"/resources"} });
type Resource = { type: string; title: string; description: string; href: string };

const tools: Resource[] = [
  { type: "READINESS CHECK", title: "Find your starting point", description: "A few questions about the work, your information, and your team.", href: "/audit" },
  { type: "PLANNING TOOL", title: "Work out the value", description: "Model the potential time and cost impact, with assumptions you control.", href: "/roi" },
  { type: "CATALOG TOOL", title: "Explore catalog valuation", description: "Open the app to measure a catalog from Spotify streaming activity.", href: "/valuation" },
];

const reading: Resource[] = [
  { type: "GUIDE", title: "The music AI playbook", description: "Practical methods for research, content, releases, and putting agents to work.", href: "/playbook" },
  { type: "ARTICLES", title: "The Recoup blog", description: "Ideas and practical notes on AI in music companies.", href: "/blog" },
];

const building: Resource[] = [
  { type: "DOCUMENTATION", title: "Connect your systems", description: "Guides and API documentation for building with Recoup.", href: "/docs" },
  { type: "OPEN SOURCE", title: "Recoup Skills", description: "Music-industry methods you can use in your AI tools.", href: "/skills" },
  { type: "PRODUCT GUIDE", title: "Choose how to work", description: "Find the right fit: the platform, Skills, or a custom system.", href: "/compare" },
];

function ResourceRows({ items }: { items: Resource[] }) {
  return <div className="resources-rows" data-reveal-group="">{items.map((item) =>
    <Link href={item.href} className="resources-row" key={item.href}>
      <div><span className="resources-type">{item.type}</span><h3>{item.title}</h3><p>{item.description}</p></div>
      <SkyArrow />
    </Link>
  )}</div>;
}

export default function ResourcesPage() {
  return <MarketingPage><div className="resources-page">
    <PageHero tone="light" eyebrow="RESOURCES" title={<>Understand it.<br /><span>Try it. Build on it.</span></>} description="Guides, working examples, and tools for putting AI to work in music.">
      <nav className="resources-jump-nav" aria-label="Browse resources">
        <a href="#try">Try a workflow <SkyArrow direction="down" /></a>
        <a href="#learn">Learn <SkyArrow direction="down" /></a>
        <a href="#build">Build <SkyArrow direction="down" /></a>
      </nav>
    </PageHero>

    <section id="try" className="resources-try" aria-labelledby="resources-try-title">
      <header className="resources-group-heading" data-reveal=""><p className="resources-type">TRY</p><h2 id="resources-try-title">See what useful looks like.</h2><p>Explore the work, then consider where it fits in your business.</p></header>
      <div className="resources-try-grid">
        <Link href="/learn/demos" className="resources-demo">
          <span className="resources-type">INTERACTIVE DEMOS</span>
          <h3>Get behind<br />the result.</h3>
          <p>Explore a royalty review and a diligence draft, with the records behind each finding.</p>
          <div className="resources-demo-preview" aria-hidden="true" data-reveal-group="">
            <div className="resources-demo-paper"><span>ROYALTY REVIEW</span><strong>Follow the money.</strong><ul><li>Statements</li><li>Receipts</li><li>Differences to review</li></ul></div>
            <div className="resources-demo-paper resources-demo-note"><span>DILIGENCE DRAFT</span><strong>Follow the source.</strong><ul><li>The deal summary</li><li>The open questions</li><li>The documents behind them</li></ul></div>
          </div>
          <span className="resources-demo-action">Explore the demos <span><SkyArrow /></span></span>
        </Link>
        <div className="resources-tools"><p className="resources-tools-intro">Or start with a question of your own.</p><ResourceRows items={tools} /></div>
      </div>
    </section>

    <div className="resources-library">
      <section id="learn" className="resources-learn" aria-labelledby="resources-learn-title">
        <header className="resources-group-heading" data-reveal=""><p className="resources-type">LEARN</p><h2 id="resources-learn-title">A little more context.</h2><p>Methods and ideas you can bring to the next conversation.</p></header>
        <ResourceRows items={reading} />
      </section>
      <section id="build" className="resources-build" aria-labelledby="resources-build-title">
        <header className="resources-group-heading" data-reveal=""><p className="resources-type">BUILD</p><h2 id="resources-build-title">Put it to work.</h2><p>Use the playbooks, connect the tools, or find a partner for the build.</p></header>
        <ResourceRows items={building} />
      </section>
    </div>
    <SubscribeCard source="/resources" />
    <PageCTA title="Want help putting it into practice?" description="Bring a workflow. We’ll discuss the tools, information, and team involved." />
  </div></MarketingPage>;
}
