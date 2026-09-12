import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/components/ui";
import { CopyCode, SkillBrowser } from "@/components/interactive";
import { PageHero, PageSection, PageCTA, PageButton } from "@/components/sky/page-ui";
import { site } from "@/lib/site";
import "./skills-sky.css";

export const metadata: Metadata = withPageMetadata({
  title: "Recoup Skills: A record label in a box",
  description:
    "Give your AI agent the playbooks to research artists, plan releases, create content, and work catalogs. Explore and install the open-source Recoup Skills collection.",
  alternates: { canonical: "/skills" },
});

function LinkArrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 17 10-10M7 7h10v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function SkillsPlaybooks() {
  return (
    <div className="skills-sky-playbooks" aria-hidden="true">
      <div className="skills-sky-orbit" />
      <div className="skills-sky-book skills-sky-book-research"><span>RECOUP SKILLS</span><strong>Know<br />the artist.</strong><small>Research & discovery</small></div>
      <div className="skills-sky-book skills-sky-book-release"><span>RECOUP SKILLS</span><strong>Plan<br />the release.</strong><small>From idea to rollout</small></div>
      <div className="skills-sky-book skills-sky-book-catalog">
        <div className="skills-sky-book-header"><span>RECOUP SKILLS</span><svg viewBox="0 0 24 24" fill="none"><path d="M6 3h9l4 4v14H6V3Zm8 0v5h5M9 12h7m-7 4h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
        <strong>Work<br />the catalog.</strong>
        <div className="skills-sky-book-rule" />
        <p>Music expertise.<br />Ready for your AI.</p>
        <div className="skills-sky-book-footer"><span>OPEN SOURCE</span><svg viewBox="0 0 24 24" fill="none"><path d="m7 17 10-10M7 7h10v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      </div>
      <span className="skills-sky-book-caption">Your agent. A music-business playbook.</span>
    </div>
  );
}

const releaseOutputs = [
  ["01", "Artist & audience brief", "Start with who the artist is and who the music is for."],
  ["02", "Release calendar", "Put the rollout, key dates, and deliverables in order."],
  ["03", "Creative directions", "Develop content ideas that belong to the artist."],
  ["04", "Opportunity research", "Find relevant places and people to reach."],
];

export default function SkillsPage() {
  return (
    <div className="sky-subpage skills-sky">
      <PageHero
        eyebrow="RECOUP SKILLS"
        title={<>A record label.<br /><span>In a box.</span></>}
        description="Give your AI agent the playbooks to research artists, plan releases, create content, and work catalogs."
        visual={<SkillsPlaybooks />}
      >
        <PageButton href="#install">Get the skills</PageButton>
        <PageButton href="#collection" secondary>Explore the collection</PageButton>
        <p className="skills-sky-hero-note">Open source. Built for compatible AI agents.</p>
      </PageHero>

      <PageSection eyebrow="GIVE YOUR AGENT A METHOD" title={<>From a request<br />to a plan.</>} description="A skill is a reusable method your agent follows to complete a job. Recoup Skills gives it music-specific instructions, tools, and templates.">
        <div className="skills-sky-method">
          <div className="skills-sky-request">
            <span className="sp-kicker">THE ASK</span>
            <p>“Help me plan<br />this release.”</p>
            <div className="skills-sky-request-footer"><span className="skills-sky-request-symbol">+</span><span>Your artist.<br />Your goals. Your context.</span></div>
          </div>
          <div className="skills-sky-output">
            <span className="sp-kicker">THE WORK BEHIND THE ANSWER</span>
            <ol>
              {releaseOutputs.map(([number, title, copy]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}
            </ol>
          </div>
        </div>
      </PageSection>

      <PageSection id="collection" eyebrow="EXPLORE THE COLLECTION" title="What’s the job?" description="Find a starting point for the work in front of you. Then make it your own.">
        <SkillBrowser />
      </PageSection>

      <PageSection id="install" className="skills-sky-install-section" eyebrow="OPEN THE BOX" title={<>Your agent.<br />New skills.</>} description="Install the collection, choose the skills you need, and follow the setup for your AI client.">
        <div className="skills-sky-install">
          <div className="skills-sky-install-copy">
            <span className="skills-sky-install-badge"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            <h3>Bring the methods<br />into your workspace.</h3>
            <p>Inspect them, adapt them, and build on them under the repository’s license.</p>
            <Link href={site.github} className="sp-text-link">View the repository <LinkArrow /></Link>
          </div>
          <div className="skills-sky-install-command">
            <CopyCode code="npx skills add recoupable/skills" label="Install Recoup Skills" />
            <p>Run in your terminal. See the repository for compatible clients and setup instructions. Some skills require a Recoup account, API access, or third-party services; usage charges may apply.</p>
            <Link href="/developers" className="sp-text-link">Connect to the Recoup API <LinkArrow /></Link>
          </div>
        </div>
      </PageSection>

      <PageSection eyebrow="GOOD TO KNOW" title="Built to be picked up.">
        <FAQ items={[
          { question: "How is this different from the Recoup app?", answer: "The app gives you a hosted workspace. Skills bring music-specific methods into a compatible AI agent you already use. Some skills call the Recoup API or other services to perform the work." },
          { question: "Is it free?", answer: "The Skills collection is open source. Your AI client, Recoup API calls, or third-party services may have their own costs. Check the requirements for the skills you choose." },
          { question: "Can we adapt the skills to our team?", answer: "Yes. The repository makes the methods inspectable and adaptable under its license. Recoup can also help your company develop a shared collection around your own tools, context, and ways of working." },
          { question: "Do I need to be a developer?", answer: "You need a compatible AI client that supports skills. Installation and any required account connections are covered in the repository. If you prefer to start in a browser, try the Recoup platform." },
        ]} />
      </PageSection>
      <PageCTA title="Your team has its own playbook." description="Let’s turn it into a shared set of skills, connected to the tools you work in every day." />
    </div>
  );
}
