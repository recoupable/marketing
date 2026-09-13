import { AppLink } from "@/components/analytics/AppLink";
import { SkyArrow } from "@/components/sky/arrow";
import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { FAQ } from "@/components/ui";
import { ProductPreview } from "@/components/interactive";
import { PageHero, PageSection, PageCTA, PageButton } from "@/components/sky/page-ui";
import { annualDiscountPercent, planPrice, pricingPlans } from "@/lib/pricing";
import "./platform.css";

export const metadata: Metadata = withPageMetadata({
  title: "The AI platform for artists & music teams",
  description:
    "Research artists, create campaign content, and keep recurring work moving with Recoup. An AI workspace built around your artists and your music business.",
  alternates: { canonical: "/platform" },
});

const capabilities = [
  { number: "01", label: "ARTIST CONTEXT", title: "Know the artist.", description: "Bring artist notes, music, and reference files into one workspace.", items: ["Artist profiles", "Reference files", "Your notes"] },
  { number: "02", label: "RESEARCH", title: "Find the next move.", description: "Research artists and opportunities. Turn the findings into a useful brief.", items: ["Artist briefs", "Opportunity research"] },
  { number: "03", label: "CONTENT", title: "Make more from the music.", description: "Draft campaign ideas, captions, graphics, and video for your team to refine.", items: ["Campaign direction", "Creative drafts"] },
  { number: "04", label: "RECURRING WORK", title: "Keep the work moving.", description: "Set recurring prompts and reports, with your artist’s context in place.", items: ["Recurring prompts", "Reports & check-ins"] },
];

function CapabilityIcon({ number }: { number: string }) {
  const paths: Record<string, React.ReactNode> = {
    "01": <><path d="M4 6h6l2 3h8v11H4V6Z" /><path d="M8 13h8m-8 3h5" /></>,
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
        eyebrow="RECOUP PLATFORM"
        title={<>Your artists.<br /><span>In context.</span></>}
        description="Research the artist. Shape the campaign. Create the content. An AI workspace for the work around your music."
        visual={<div className="platform-sky-preview"><div className="platform-sky-preview-backplate" aria-hidden="true" /><ProductPreview /></div>}
      >
        <AppLink placement="platform-hero" className="sp-button">Open Recoup<span><SkyArrow /></span></AppLink>
        <PageButton href="/pricing#platform" secondary>Explore the {plan.name} plan</PageButton>
        <p className="platform-sky-hero-note">{planPrice(plan.id, "monthly").monthly}/month for the platform and music skill pack.</p>
      </PageHero>

      <PageSection eyebrow="THE WORK AROUND THE MUSIC" title={<>One workspace.<br />A lot more possible.</>} description="Keep the artist’s context close, from the first question to the next release.">
        <div className="platform-sky-capabilities">
          {capabilities.map((capability) => (
            <article className={`platform-sky-capability platform-sky-capability-${capability.number}`} key={capability.number}>
              <div className="platform-sky-capability-top"><span className="platform-sky-capability-icon"><CapabilityIcon number={capability.number} /></span><span className="sp-kicker">{capability.label}</span><span className="platform-sky-capability-number">{capability.number}</span></div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <div className="platform-sky-tags">{capability.items.map(item => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection className="platform-sky-start-section" eyebrow="MADE FOR YOUR NEXT RELEASE" title="Put a real artist in it." description="Bring something you need to get done today. Start there.">
        <div className="platform-sky-start">
          <div className="platform-sky-start-copy">
            <span className="platform-sky-start-label">YOUR FIRST SESSION</span>
            <h3>A little context.<br /><span>A useful place to start.</span></h3>
            <AppLink placement="platform-start" className="sp-button">Get started with Recoup<span><SkyArrow /></span></AppLink>
          </div>
          <ol className="platform-sky-first-session">
            <li><span>01</span><div><h4>Add the artist.</h4><p>Create a profile and bring in the information that matters.</p></div></li>
            <li><span>02</span><div><h4>Bring the context.</h4><p>Add artist notes, music, or useful reference files.</p></div></li>
            <li><span>03</span><div><h4>Give it a job.</h4><p>Start with a research question, a campaign idea, or a creative task.</p></div></li>
          </ol>
        </div>
      </PageSection>

      <PageSection eyebrow="A FEW DETAILS" title="Make yourself at home.">
        <FAQ items={[
          { question: "Who is the platform for?", answer: "Artists, managers, and music teams who want help with research, content, and recurring work. For company-specific workflows, large catalog operations, or custom integrations, our consulting team can help define the right setup." },
          { question: "What should I bring to my first session?", answer: "An artist profile, a clear task, and any useful reference material. The more relevant context you provide, the better the starting point for research and creative work." },
          { question: "How do plans and usage work?", answer: `The ${plan.name} plan includes the hosted workspace and music skill pack for ${planPrice(plan.id, "monthly").monthly}/month. Annual billing saves at least ${annualDiscountPercent}%. API and MCP usage is billed separately. Review the pricing page for plans and the credits documentation for usage details.` },
          { question: "Can Recoup build around our team?", answer: "Yes. We can connect your tools and data, create workflows around your company’s methods, and help your team use and maintain the system." },
        ]} />
      </PageSection>
      <PageCTA title="A whole company to connect?" description="Let’s build around your roster, your tools, and the way your team works." />
    </div>
  );
}
