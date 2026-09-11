import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, PageSection, PageCTA, PageButton } from "@/components/sky/page-ui";
import { SkyArrow } from "@/components/sky/arrow";
import "./about-sky.css";

export const metadata: Metadata = withPageMetadata({
  title: "About — Your music AI transformation partner",
  description: "Recoup helps music funds and rightsholders adopt AI through strategy, custom systems, and team training. We also build music AI products and open-source playbooks.",
  alternates: { canonical: "/about" },
});

function AboutVisual() {
  return (
    <div className="about-sky-scene">
      <div className="about-sky-photo about-sky-photo-music">
        <Image src="/images/sky/services-studio.webp" alt="Music studio illustration with a laptop, speakers, and production equipment" width={1400} height={1045} preload sizes="(max-width: 540px) 240px, 340px" />
        <span>Music knowledge.</span>
      </div>
      <div className="about-sky-photo about-sky-photo-engineering">
        <Image src="/images/sky/engineering-desk.webp" alt="Engineering workstation illustration with music equipment alongside a code editor" width={1400} height={1045} sizes="(max-width: 540px) 190px, 265px" />
        <span>Building experience.</span>
      </div>
      <div className="about-sky-connection" aria-hidden="true"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 4v16M4 12h16" /></svg></div>
    </div>
  );
}

const principles = [
  { number: "01", title: "Start with the work.", description: "The right system begins with a real task. Understand the business, the information, and the people before choosing what to build." },
  { number: "02", title: "Build with the team.", description: "Your people know what good work looks like. We bring that knowledge into the system and practice on the tasks they actually do." },
  { number: "03", title: "Make it useful tomorrow.", description: "A working system needs someone who can own it. Share the method, document the work, and help the team take it further." },
];

export default function AboutPage() {
  return (
    <div className="sky-subpage about-sky">
      <PageHero eyebrow="ABOUT RECOUP" title={<>Music knowledge.<br />Building experience.</>} description="Recoup is an AI transformation partner for music funds and rightsholders. We bring music expertise, software engineering, and team training together." visual={<AboutVisual />}>
        <PageButton href="/start-project">Get a Free Audit</PageButton>
        <PageButton href="/services" secondary>Explore our services</PageButton>
      </PageHero>

      <PageSection className="about-sky-introduction" eyebrow="WHO WE ARE" title="We build for the work behind the music.">
        <div className="about-sky-story">
          <div className="about-sky-story-copy">
            <p>Recoup brings music-business understanding and software engineering into the same room. We make tools for artists and teams, and build custom AI systems around the work inside music companies.</p>
            <p id="sidney-swift">Founded by Sidney Swift, Recoup is built on a practical idea: technology gets better when the people who understand the work help shape it. <Link href="/blog/recoup-in-2026">Read Sidney’s perspective on music and AI.</Link></p>
            <Link className="sp-text-link" href="/services">How we work with your team <SkyArrow /></Link>
          </div>
          <aside className="about-sky-belief" data-reveal="">
            <span className="sp-kicker">OUR STARTING POINT</span>
            <svg className="about-sky-star" width="42" height="42" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M16 1v30M1 16h30M5.4 5.4l21.2 21.2M5.4 26.6 26.6 5.4" /></svg>
            <p>The people who know the work<br /><span>should shape the tools.</span></p>
          </aside>
        </div>
      </PageSection>

      <PageSection eyebrow="WHAT WE BELIEVE" title="Useful AI starts with people.">
        <div className="sp-grid about-sky-principles" data-reveal-group="">{principles.map((principle) => <article className="sp-card about-sky-principle" key={principle.number}><span className="about-sky-principle-number">{principle.number}</span><h3>{principle.title}</h3><p>{principle.description}</p></article>)}</div>
      </PageSection>

      <PageSection className="about-sky-paths-section" eyebrow="A FEW WAYS IN" title="Find your starting point.">
        <div className="about-sky-paths" data-reveal-group="">
          <Link href="/services" className="about-sky-path"><span className="sp-kicker">SERVICES</span><h3>Build with us.</h3><p>AI strategy, custom systems, and training for your team.</p><span className="about-sky-path-link">Explore services <SkyArrow /></span></Link>
          <Link href="/platform" className="about-sky-path"><span className="sp-kicker">OUR SOFTWARE</span><h3>Put the tools to work.</h3><p>An AI workspace and portable skills for the work around music.</p><span className="about-sky-path-link">Meet the platform <SkyArrow /></span></Link>
          <Link href="/lab" className="about-sky-path"><span className="sp-kicker">RECOUP LAB</span><h3>Explore what’s next.</h3><p>Open-source methods and new questions at the edge of music and AI.</p><span className="about-sky-path-link">Inside the lab <SkyArrow /></span></Link>
        </div>
      </PageSection>
      <PageCTA title="Let’s put AI to work for your team." description="Tell us what you’re working on. We’ll help you find a useful place to start." />
    </div>
  );
}
