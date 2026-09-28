import Link from "next/link";
import { withPageMetadata } from "@/lib/seo";
import { ResearchSignup } from "@/components/research/ResearchSignup";
import "./research.css";

export const metadata = withPageMetadata({
  title: "Recoup Research — AI for music and media leaders",
  description: "A useful read on AI and the business of music. Industry perspective, practical examples, and lessons from building agents.",
  alternates: { canonical: "/research" },
});

export default function ResearchPage() {
  return <main id="main" className="research-page">
    <section className="research-hero" aria-labelledby="research-title">
      <div className="research-pitch">
        <p className="research-kicker"><span className="research-dot" /> RECOUP RESEARCH</p>
        <h1 id="research-title">Make sense of AI.<br /><span>Put it to work.</span></h1>
        <p className="research-intro">A useful read on AI and the business of music. What matters, what works, and what we’re learning as we build.</p>
        <ResearchSignup />
        <a href="#example" className="research-preview">Take a look inside <span aria-hidden="true">↗</span></a>
      </div>
      <a href="#example" className="research-cover" aria-label="Read the sample edition: Give your first agent a job you can check">
        <div className="research-cover-top"><span>RECOUP<br />RESEARCH</span><span>THE PRACTICAL<br />SIDE OF AI</span></div>
        <div className="research-cover-title">Your first agent<br />needs a job.</div>
        <div className="research-report" aria-hidden="true">
          <div className="research-report-heading"><span>FRIDAY RELEASE BRIEF</span><span>↗</span></div>
          <div className="research-report-row"><span>01</span><strong>What changed?</strong><i /></div>
          <div className="research-report-row"><span>02</span><strong>What’s blocked?</strong><i /></div>
          <div className="research-report-row"><span>03</span><strong>What needs you?</strong><i /></div>
          <div className="research-report-foot"><span className="research-dot" /> Every answer, with a source.</div>
        </div>
        <div className="research-cover-bottom"><span>A SAMPLE EDITION</span><span className="research-cover-arrow" aria-hidden="true">↗</span></div>
      </a>
    </section>
    <section className="research-topics" aria-label="Inside Recoup Research">
      <p>INSIDE THE NEWSLETTER</p>
      <span>Industry perspective</span><span>Agents in practice</span><span>Notes from the build</span>
    </section>
    <article id="example" className="research-example">
      <aside className="research-margin"><p className="research-kicker">THE SAMPLE EDITION</p><p>Practical ideas.<br />Enough detail to use them.</p><span>By Sidney Swift</span></aside>
      <div className="research-reading">
        <h2>Give your first agent<br />a job you can check.</h2>
        <p className="research-lede">“Help me run the business” is a difficult first assignment.</p>
        <p>Start with a piece of work whose output you already recognize. For a label executive, that could be a Friday release brief: what moved, what is blocked, who owns it, and which decision needs attention.</p>
        <p>An agent can prepare the list from an approved release sheet and team updates. Ask it to attach a source to each claim and flag anything missing.</p>
        <div className="research-assignment"><span className="research-kicker">THE FIRST ASSIGNMENT</span><p>Read the release sheet and team updates. Return the changes, blockers, owners and decisions needed. Show your sources. Mark what you don’t know.</p></div>
        <p>Compare its first report with the sources. Did it catch the changes? Can you check each claim? Does it help you decide what needs attention?</p>
        <p>Give it more responsibility once that first job is dependable.</p>
        <p className="research-caption">Illustrative workflow. No private client data or customer results are shown.</p>
        <Link className="research-text-link" href="/start-project?utm_source=research&utm_medium=website&utm_campaign=first-agent&utm_id=rr-2026-09-28-01">What would you give your agent? <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  </main>;
}
