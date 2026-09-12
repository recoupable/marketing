import { withPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { PageButton, PageCTA, PageHero, PageSection } from "@/components/sky/page-ui";
import { site } from "@/lib/site";
import { SkyArrow } from "@/components/sky/arrow";
import "./lab-sky.css";

export const metadata: Metadata = withPageMetadata({
  title: "Recoup Lab: Exploring AI in the business of music",
  description: "Real music-business questions, open-source tools, and new directions for AI. Explore the questions behind Recoup’s research and the Skills you can use today.",
  alternates: { canonical: "/lab" },
});

const questions = [
  { id: "01", name: "The release", question: "Can an agent coordinate a song release?", description: "A release connects research, creative work, deadlines, and decisions. We’re interested in how well an agent can hold those pieces together.", measure: "An agreed release brief, a sequence of deliverables, and a clear record of where human input was needed." },
  { id: "02", name: "The royalty statement", question: "Can an agent get the numbers right?", description: "Royalty work needs more than a convincing answer. Every total, identifier, and exception has to stand up to inspection.", measure: "Reconcile a known statement, check the totals, and surface unmatched items without inventing a match." },
  { id: "03", name: "The music brief", question: "Can an agent hear what a brief needs?", description: "Finding the right song means understanding both the catalog and the creative intent. Relevance is more than a keyword match.", measure: "Search a permissioned catalog against a creative brief and compare selections with expert review." },
];

function LabIcon({ type }: { type: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{type === "01" ? <><path d="M9 18V5l11-2v13M9 9l11-2" /><ellipse cx="5.5" cy="18.5" rx="3.5" ry="2.5" /><ellipse cx="16.5" cy="16.5" rx="3.5" ry="2.5" /></> : type === "02" ? <><rect x="4" y="2" width="16" height="20" rx="3" /><path d="M8 7h8M8 12h2M14 12h2M8 17h2M14 17h2" /></> : <><circle cx="10" cy="10" r="7" /><path d="m15 15 7 7M7 10h1M10 7v6M13 9v2" /></>}</svg>;
}

function ResearchBench() {
  return <div className="lab-workbench" aria-hidden="true">
    <div className="lab-bench-orbit" /><div className="lab-bench-orbit lab-bench-orbit-second" />
    <div className="lab-bench-sheet"><div className="lab-bench-sheet-top"><span>RECOUP / LAB</span><span className="lab-bench-dot" /></div><span className="lab-bench-label">A question worth asking.</span><strong>What would<br />good look like?</strong><div className="lab-bench-checks"><span><i />Define the job</span><span><i />Set the standard</span><span><i />Inspect the result</span></div></div>
    <div className="lab-bench-note"><span>THE NEXT EXPERIMENT</span><strong>Ask.<br />Build.<br /><span>Find out.</span></strong><span className="lab-bench-note-plus">+</span></div>
  </div>;
}

export default function LabPage() {
  return <div className="sky-subpage lab-sky">
    <PageHero eyebrow="RECOUP LAB" title={<>What can AI<br />actually do for music?</>} description="We start with a real job, ask a specific question, and build a way to find out. This is where we explore what comes next." visual={<ResearchBench />}>
      <PageButton href="#questions">Explore the questions</PageButton>
      <PageButton href={site.github} secondary>Explore the source</PageButton>
    </PageHero>

    <PageSection id="questions" eyebrow="QUESTIONS ON THE TABLE" title={<>Big possibilities.<br />Specific tests.</>} description="These are research directions we’re exploring. Each starts with a recognizable music-business job and a way to judge the work.">
      <div className="sp-grid lab-questions">{questions.map((item) => <article className="sp-card lab-question" key={item.id}>
        <div className="lab-question-top"><span className="lab-question-icon"><LabIcon type={item.id} /></span><span className="lab-question-number">R / {item.id}</span></div>
        <p className="lab-question-category">{item.name}</p><h3>{item.question}</h3><p className="lab-question-description">{item.description}</p><div className="lab-proposed-test"><span>Proposed test</span><p>{item.measure}</p></div>
      </article>)}</div>
    </PageSection>

    <PageSection className="lab-open-source">
      <div className="lab-source-panel">
        <div className="lab-source-copy"><p className="sp-kicker">OPEN SOURCE / AVAILABLE NOW</p><h2>Start with<br />something tangible.</h2><p>Recoup Skills is a growing collection of music-industry methods for AI agents. Read the instructions. Try a workflow. Make the method better.</p><div className="lab-source-actions"><PageButton href={site.github}>Explore the repository</PageButton><Link className="sp-text-link" href="/skills">About Recoup Skills <SkyArrow /></Link></div></div>
        <div className="lab-skills-visual" aria-hidden="true"><div className="lab-skill-backplate" /><div className="lab-skill-front"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M24 3v42M3 24h42M9 9l30 30M9 39 39 9" /><circle cx="24" cy="24" r="5" fill="currentColor" /></svg><span>RECOUP SKILLS</span><strong>A record label.<br /><span>In a box.</span></strong><div><span>Research</span><span>Create</span><span>Release</span></div></div></div>
      </div>
    </PageSection>

    <PageSection eyebrow="HOW WE LOOK AT THE WORK" title="The result has to mean something.">
      <div className="lab-standards"><article><span>01</span><h3>A recognizable job.</h3><p>A release. A royalty statement. A creative brief. Something a person in music can look at and understand.</p></article><article><span>02</span><h3>A clear standard.</h3><p>Define what good work means before looking at the answer. Accuracy, relevance, completeness, or a useful human review.</p></article><article><span>03</span><h3>An honest account.</h3><p>Keep the inputs and the decisions visible. Learn from the places a system fails as well as the places it works.</p></article></div>
      <Link href="/developers" className="sp-text-link lab-developer-link">Explore the tools behind the work <SkyArrow /></Link>
    </PageSection>
    <PageCTA title="Have a question worth testing?" description="We’re interested in people with real music problems, deep expertise, and something to find out." />
  </div>;
}
