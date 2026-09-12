import { ServiceStructuredData } from "@/components/service-structured-data";
import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { planPrice, pricingPlans } from "@/lib/pricing";
import { PageHero, PageSection, PageCTA, PageButton } from "@/components/sky/page-ui";
import { serviceOffers } from "@/lib/service-offers";
import { SkyArrow } from "@/components/sky/arrow";
import "./services.css";

export const metadata: Metadata = withPageMetadata({
  title: "AI advisory, transformation & custom builds for music companies",
  description: "AI advisory, transformation partnerships, and custom builds for music companies. Working systems you own, with training and success measures agreed before development.",
  alternates: { canonical: "/services" },
});


const questions = [
  { id: "ownership", question: "Who owns the systems we build?", answer: "Custom code is delivered in a repository you control, with documentation for your team. Our agreement defines ownership of the deliverables and the terms for any Recoup or third-party components." },
  { id: "existing-tools", question: "Can you work with our existing tools?", answer: "Yes. We start with the systems your team already uses. Available integrations, data access and permissions shape the scope; we agree on any changes with you before building." },
  { id: "ongoing-support", question: "What happens after the first project?", answer: "We document the work and train the people responsible for it. Ongoing support, maintenance and further development can be included in your engagement, with the scope and price agreed together." },
];

function PracticeIcon({ kind }: { kind: string }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{kind === "strategy" ? <><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2" /></> : kind === "build" ? <><path d="m8 5-6 7 6 7M16 5l6 7-6 7M14 3l-4 18" /></> : <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="m8 11 3 3 5-6M9 21l3-4 3 4" /></>}</svg>;
}

function ServicesVisual() {
  return (
    <div className="services-hero-scene" aria-hidden="true">
      <div className="services-visual-orbit" />
      <div className="services-visual-plan">
        <span className="services-mini-label">THE STARTING POINT</span>
        <strong>One useful build.</strong>
        <span className="services-plan-line"><i /> The work to improve</span>
        <span className="services-plan-line"><i /> The data we need</span>
        <span className="services-plan-line"><i /> What success looks like</span>
      </div>
      <div className="services-visual-system">
        <span className="services-system-icon"><PracticeIcon kind="build" /></span>
        <strong>Built for<br />your business.</strong>
        <div className="services-system-tags"><span>Your data</span><span>Your tools</span></div>
      </div>
      <div className="services-visual-team"><span><PracticeIcon kind="enable" /></span><div><strong>Ready for your team.</strong><p>Training. Practice. Handoff.</p></div></div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="sky-subpage services-sky">
      <ServiceStructuredData path="/services" name="AI advisory, transformation & custom builds for music companies" description="Working systems you own, with training and success measures agreed before development." serviceType={["AI advisory", "AI transformation", "Custom builds"]} />
      <PageHero eyebrow="AI SERVICES FOR MUSIC COMPANIES" title={<>Make AI part of how<br />your music company works.</>} description="We find the work worth improving, build systems you own, and train your team to run them. We agree on what success looks like before development starts." visual={<ServicesVisual />}>
        <PageButton href="/start-project">Get a Free Audit</PageButton>
        <PageButton href="#services" secondary>Explore our services</PageButton>
      </PageHero>

      <PageSection id="services" eyebrow="HOW WE HELP" title="Choose the help your team needs." description="Get advice on where to start, bring us in to lead implementation, or come with a project ready to build.">
        <div className="sp-grid services-practices" data-reveal-group="">
          {serviceOffers.map((practice, index) => (
            <article className={`sp-card services-practice${practice.id === "transformation" ? " services-practice-featured" : ""}`} id={practice.id} key={practice.id}>
              <div className="services-practice-top"><span className="services-practice-icon"><PracticeIcon kind={practice.id === "advisory" ? "strategy" : practice.id} /></span><span>0{index + 1}</span></div>
              <h3>{practice.title}</h3>
              <p className="services-practice-intro">{practice.benefit}</p>
              <p className="services-practice-description">{practice.copy}</p>
              <div className="services-deliverables" id={practice.id === "transformation" ? "enable" : practice.id === "advisory" ? "strategy" : undefined}><span className="sp-kicker">WHAT YOU LEAVE WITH</span><ul>{practice.includes.map((item) => <li key={item}><svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg>{item}</li>)}</ul></div>
              <Link className="sp-text-link" href={practice.id === "transformation" ? "/start-project" : practice.href}>{practice.id === "transformation" ? "Get a Free Audit" : practice.link} <SkyArrow /></Link>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow="WORKING TOGETHER" title="You don’t need to transform everything at once." description="Choose one task worth fixing. We agree on the outcome, scope, and price before we begin.">
        <div className="sp-split services-start-grid" data-reveal-group="">
          <article className="services-start services-start-project">
            <span className="services-start-number">01 / YOU HAVE A PROJECT</span>
            <h3>Skip straight to the build.</h3>
            <p>Already know what needs fixing? Show us how it works today. We’ll scope a first version your team can put to use.</p>
            <div className="services-scope-note"><span>YOUR FIRST BUILD</span><ul><li>The outcome</li><li>The information it needs</li><li>The way your team will use it</li></ul></div>
            <PageButton href="/contact?workflow=Custom%20systems">Discuss your project</PageButton>
            <p className="services-plan-price"><Link href="/pricing#partner" className="sp-text-link">{pricingPlans.find((plan) => plan.id === "partner")!.name} · {planPrice("partner", "monthly").monthly}/month <SkyArrow /></Link></p>
          </article>
          <article className="services-start services-start-strategy">
            <span className="services-start-number">02 / YOU’RE EXPLORING AI</span>
            <h3>Know where to spend your time.</h3>
            <p>We’ll review your team’s work and help you choose a useful first project. Your team leads implementation, with our advice along the way.</p>
            <dl className="services-roadmap"><div><dt>Priorities</dt><dd>Where AI can be useful.</dd></div><div><dt>Data &amp; access</dt><dd>What needs to be connected.</dd></div><div><dt>First build</dt><dd>A scope and a way to measure it.</dd></div></dl>
            <Link href="/contact?workflow=AI%20strategy" className="sp-text-link">Map out your next step <SkyArrow /></Link>
            <p className="services-plan-price"><Link href="/pricing#advisory" className="sp-text-link">{pricingPlans.find((plan) => plan.id === "advisory")!.name} · {planPrice("advisory", "monthly").monthly}/month <SkyArrow /></Link></p>
          </article>
        </div>
      </PageSection>

      <PageSection className="services-questions" eyebrow="A FEW PRACTICAL QUESTIONS" title="Before we get started.">
        <div className="services-faq">{questions.map(({ id, question, answer }) => <details id={id} key={id}><summary>{question}<SkyArrow direction="down" /></summary><p>{answer}</p></details>)}</div>
      </PageSection>
      <PageCTA title="What’s taking up your team’s week?" description="Show us the task you keep doing by hand. We’ll talk through what could change and what it would take to build." />
    </div>
  );
}
