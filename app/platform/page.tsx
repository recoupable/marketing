import { AppLink } from "@/components/analytics/AppLink";
import { PageMark } from "@/components/sky/brand";
import { SkyArrow } from "@/components/sky/arrow";
import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { FAQ } from "@/components/ui";
import { PlatformContextArt } from "@/components/platform/PlatformContextArt";
import { PlatformToolsDemo } from "@/components/platform/PlatformToolsDemo";
import { PlatformChatPreview } from "@/components/platform/PlatformChatPreview";
import Link from "next/link";
import { PageHero } from "@/components/sky/page-ui";
import { annualDiscountPercent, planPrice, pricingPlans } from "@/lib/pricing";
import { platformCopy } from "@/lib/copy/platform";
import { siteConfig } from "@/lib/config";
import "./platform.css";

export const metadata: Metadata = withPageMetadata({
  title: platformCopy.title,
  description: platformCopy.description,
  alternates: { canonical: "/platform" },
});

export default function PlatformPage() {
  const plan = pricingPlans.find((item) => item.id === "platform")!;
  return (
    <div className="sky-subpage platform-sky">
      <PageHero
        eyebrow={platformCopy.hero.eyebrow}
        title={<>{platformCopy.hero.title[0]}<br /><span>{platformCopy.hero.title[1]}</span></>}
        description={platformCopy.hero.description}
        visual={<PlatformChatPreview />}
      >
        <AppLink placement="platform-hero" className="sp-button">{platformCopy.hero.action}<span><SkyArrow /></span></AppLink>
        <p className="platform-sky-hero-note">{planPrice(plan.id, "monthly").monthly}/month for Recoup Platform and the music skill pack.</p>
      </PageHero>

      <section className="platform-context" id="workspace" aria-labelledby="platform-context-title">
        <h2 id="platform-context-title">{platformCopy.start.title}</h2>
        <PlatformContextArt />
      </section>

      <section className="platform-audience" id="who-its-for" aria-labelledby="platform-audience-title">
        <header>
          <p className="platform-audience-eyebrow">{platformCopy.audience.eyebrow}</p>
          <h2 id="platform-audience-title">{platformCopy.audience.title[0]} <span>{platformCopy.audience.title[1]}</span></h2>
        </header>
        <div className="platform-audience-reasons">
          {platformCopy.audience.reasons.map(reason => (
            <article key={reason.title}>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </article>
          ))}
        </div>
      </section>

      <PlatformToolsDemo title={platformCopy.capabilitiesTitle} workflows={platformCopy.capabilities} />

      <section className="platform-hosted" id="hosted" aria-labelledby="platform-hosted-title">
        <div className="platform-hosted-copy">
          <h2 id="platform-hosted-title">{platformCopy.hosted.title[0]}<br /><span>{platformCopy.hosted.title[1]}</span></h2>
          <p>{platformCopy.hosted.description}</p>
          <Link className="sp-text-link" href="/developers">{platformCopy.hosted.toolsAction}<SkyArrow /></Link>
        </div>
        <div className="platform-source-scene">
          <div className="platform-source-cloud" aria-hidden="true"><PageMark /><span>Recoup Platform</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 18a5 5 0 0 1-1-9.9A7 7 0 0 1 18.5 8a5 5 0 0 1-.5 10H6Z" /></svg></div>
          <a className="platform-source-repo" href={siteConfig.platformSourceUrl}>
            <span className="platform-source-code" aria-hidden="true">&lt;/&gt;</span>
            <span className="platform-source-name">recoupable / <strong>app</strong></span>
            <span className="platform-source-action">{platformCopy.hosted.sourceAction}<SkyArrow /></span>
          </a>
        </div>
      </section>

      <section className="platform-paths" id="your-agent" aria-label="More ways to use Recoup">
        <article className="platform-path-tools">
          <span className="platform-path-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14" /></svg></span>
          <h2>{platformCopy.alternatives.title[0]}<br /><span>{platformCopy.alternatives.title[1]}</span></h2>
          <p>{platformCopy.alternatives.description}</p>
          <div className="platform-sky-links">{platformCopy.alternatives.links.map(link => <Link className="sp-text-link" href={link.href} key={link.href}>{link.label}<SkyArrow /></Link>)}</div>
        </article>
        <article className="platform-path-custom">
          <span className="platform-path-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5" /></svg></span>
          <h2>{platformCopy.closing.title}</h2>
          <p>{platformCopy.closing.description}</p>
          <Link className="sp-text-link" href="/start-project">{platformCopy.closing.action}<SkyArrow /></Link>
        </article>
      </section>

      <section className="platform-faq" aria-labelledby="platform-faq-title">
        <h2 id="platform-faq-title">{platformCopy.faq.title}</h2>
        <FAQ items={[
          platformCopy.faq.audience,
          platformCopy.faq.context,
          { question: "How do plans and usage work?", answer: `The ${plan.name} plan includes the hosted workspace and music skill pack for ${planPrice(plan.id, "monthly").monthly}/month. Annual billing saves at least ${annualDiscountPercent}%. API and MCP usage is billed separately. Review the pricing page for plans and the credits documentation for usage details.` },
          platformCopy.faq.custom,
        ]} />
      </section>
    </div>
  );
}
