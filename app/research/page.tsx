import Link from "next/link";
import { withPageMetadata } from "@/lib/seo";
import { ResearchSignup } from "@/components/research/ResearchSignup";
import "./research.css";

export const metadata = withPageMetadata({
  title: "Recoup Research — AI for music and media leaders",
  description: "Useful AI ideas, music and media industry insights, and lessons from building agents. Read an example and subscribe to Recoup Research.",
  alternates: { canonical: "/research" },
});

export default function ResearchPage() {
  return <main id="main" className="research-page">
    <header>
      <p className="research-kicker">RECOUP RESEARCH</p>
      <h1>A clearer view of AI.<br />For the business of music.</h1>
      <p className="research-intro">What’s changing, what’s useful, and what to do next. Industry perspective, practical examples, and lessons from building agents for music and media businesses.</p>
      <ResearchSignup />
      <a href="#example" className="research-preview">Read an example first ↓</a>
    </header>
    <article id="example">
      <p className="research-kicker">A PRACTICAL EXAMPLE</p>
      <h2>Give your first agent a job you can check.</h2>
      <p>“Help me run the business” is a difficult first assignment. Start with a recurring piece of work whose output you already recognize.</p>
      <p>Imagine a label executive who reads a release-status spreadsheet and a set of team updates every Friday. The useful output is a short list: what moved, what is blocked, who owns it, and which decision needs attention.</p>
      <p>An agent could prepare that list, attach a source to each claim, and flag missing information. This is an illustrative workflow, not a customer result or a promise that a system is already connected to your data.</p>
      <h3>A small first assignment</h3>
      <ol>
        <li>Give it one approved release sheet and the relevant team updates.</li>
        <li>Ask for release, change, blocker, owner, decision needed, and source.</li>
        <li>Have it mark unknowns rather than invent dates or owners.</li>
        <li>Compare its first report against the sources before making it a routine.</li>
      </ol>
      <p>You can judge this assignment: did it find the changes, show the evidence, and leave you with a useful decision list?</p>
      <p>Once the report is dependable, you can decide whether to give the agent more responsibility.</p>
      <Link className="sp-button" href="/start-project?utm_source=research&utm_medium=website&utm_campaign=first-agent&utm_id=rr-2026-09-28-01">Discuss a task you want handled</Link>
    </article>
  </main>;
}
