import { AppLink } from "@/components/analytics/AppLink";
import { SkyArrow } from "@/components/sky/arrow";
import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { FAQ } from "@/components/ui";
import { PlatformChatPreview } from "@/components/platform/PlatformChatPreview";
import Link from "next/link";
import { PageHero, PageSection, PageCTA } from "@/components/sky/page-ui";
import { annualDiscountPercent, planPrice, pricingPlans } from "@/lib/pricing";
import { platformCopy } from "@/lib/copy/platform";
import { siteConfig } from "@/lib/config";
import "./platform.css";

export const metadata: Metadata = withPageMetadata({
  title: platformCopy.title,
  description: platformCopy.description,
  alternates: { canonical: "/platform" },
});

function CapabilityIcon({ number }: { number: string }) {
  const paths: Record<string, React.ReactNode> = {
    "02": <><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5M8 10h4m-2-2v4" /></>,
    "03": <><path d="m15 4 5 5L8 21H3v-5L15 4Z" /><path d="m12 7 5 5M3 3v5m-2-3h5" /></>,
    "04": <><path d="M4 10a8 8 0 0 1 14-4l2 2M20 3v5h-5M20 14A8 8 0 0 1 6 18l-2-2M4 21v-5h5" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[number]}</svg>;
}

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
        <p className="platform-sky-hero-note">{planPrice(plan.id, "monthly").monthly}/month for the platform and music skill pack.</p>
      </PageHero>

      <PageSection className="platform-sky-start-section" id="workspace">
        <div className="platform-sky-start">
          <div className="platform-sky-start-copy">
            <span className="platform-sky-start-label">{platformCopy.start.eyebrow}</span>
            <h2>{platformCopy.start.title}</h2>
            <AppLink placement="platform-start" className="sp-button">{platformCopy.hero.action}<span><SkyArrow /></span></AppLink>
          </div>
          <ol className="platform-sky-first-session">
            {platformCopy.start.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}
          </ol>
        </div>
      </PageSection>

      <PageSection title={platformCopy.capabilitiesTitle} className="platform-sky-tools-section" id="tools">
        <div className="platform-sky-capabilities">
          {platformCopy.capabilities.map((capability) => (
            <article className={`platform-sky-capability platform-sky-capability-${capability.number}`} key={capability.number}>
              <div className="platform-sky-capability-top"><span className="platform-sky-capability-icon"><CapabilityIcon number={capability.number} /></span><h3>{capability.title}</h3></div>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection className="platform-sky-hosted-section" id="hosted">
        <div className="platform-sky-hosted">
          <h2 data-reveal="">{platformCopy.hosted.title[0]}<br /><span>{platformCopy.hosted.title[1]}</span></h2>
          <div data-reveal="">
            <p>{platformCopy.hosted.description}</p>
            <div className="platform-sky-links">
              <a className="sp-text-link" href={siteConfig.platformSourceUrl}>{platformCopy.hosted.sourceAction}<SkyArrow /></a>
              <Link className="sp-text-link" href="/developers">{platformCopy.hosted.toolsAction}<SkyArrow /></Link>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection className="platform-sky-alternatives-section" id="your-agent">
        <div className="platform-sky-alternatives">
          <h2 data-reveal="">{platformCopy.alternatives.title[0]}<br /><span>{platformCopy.alternatives.title[1]}</span></h2>
          <div data-reveal="">
            <p>{platformCopy.alternatives.description}</p>
            <div className="platform-sky-links">{platformCopy.alternatives.links.map(link => <Link className="sp-text-link" href={link.href} key={link.href}>{link.label}<SkyArrow /></Link>)}</div>
          </div>
        </div>
      </PageSection>

      <PageSection title={platformCopy.faq.title}>
        <FAQ items={[
          platformCopy.faq.audience,
          platformCopy.faq.context,
          { question: "How do plans and usage work?", answer: `The ${plan.name} plan includes the hosted workspace and music skill pack for ${planPrice(plan.id, "monthly").monthly}/month. Annual billing saves at least ${annualDiscountPercent}%. API and MCP usage is billed separately. Review the pricing page for plans and the credits documentation for usage details.` },
          platformCopy.faq.custom,
        ]} />
      </PageSection>
      <PageCTA title={platformCopy.closing.title} description={platformCopy.closing.description} label={platformCopy.closing.action} />
    </div>
  );
}
