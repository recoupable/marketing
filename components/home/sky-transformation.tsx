import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { PageMark } from "@/components/sky/brand";
import "./sky-transformation.css";

const changes = [
  {
    before: "Scattered across tools.",
    problem: "Hunt through catalog files, statements, and notes.",
    after: "Information, connected.",
    outcome: "Your catalog, documents, and tools brought into the same workflow.",
  },
  {
    before: "Back to a blank page.",
    problem: "Rebuild the same reports and research by hand.",
    after: "Work you can repeat.",
    outcome: "Reports, research, and reviews built around the way you work.",
  },
  {
    before: "One person knows how.",
    problem: "A useful AI experiment stays with the person who made it.",
    after: "A team that can use it.",
    outcome: "Shared methods, hands-on training, and a clear owner.",
  },
];

function OutcomeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function SkyTransformation() {
  return (
    <section className="sky-section sky-transformation" id="transformation" aria-labelledby="sky-transformation-title">
      <header className="sky-transformation-heading" data-reveal="">
        <p className="sky-section-label">AI TRANSFORMATION, IN PRACTICE</p>
        <h2 id="sky-transformation-title">What changes<br /><span>with Recoup.</span></h2>
        <p>AI connected to your information, your tools, and the people doing the work.</p>
      </header>

      <div className="sky-change-comparison">
        <section className="sky-change-panel sky-change-with" aria-labelledby="sky-change-with-title">
          <header className="sky-change-panel-header">
            <div className="sky-change-panel-label"><span className="sky-change-mark"><PageMark /></span><span>WITH RECOUP</span></div>
            <h3 id="sky-change-with-title">Built into your business.</h3>
            <span className="sky-change-corner" aria-hidden="true"><PageMark /></span>
          </header>
          <ul className="sky-change-items" data-reveal-group="">
            {changes.map((change) => (
              <li key={change.after}>
                <span className="sky-change-outcome-icon"><OutcomeIcon /></span>
                <div><h4>{change.after}</h4><p>{change.outcome}</p></div>
              </li>
            ))}
          </ul>
          <div className="sky-change-panel-footer"><span className="sky-change-footer-dot" />Connected. Repeatable. Yours.</div>
        </section>

        <section className="sky-change-panel sky-change-without" aria-labelledby="sky-change-without-title">
          <header className="sky-change-panel-header">
            <div className="sky-change-panel-label"><span className="sky-change-before-dot" /><span>BEFORE</span></div>
            <h3 id="sky-change-without-title">Held together by hand.</h3>
          </header>
          <ul className="sky-change-items" data-reveal-group="">
            {changes.map((change) => (
              <li key={change.before}>
                <span className="sky-change-problem-icon" aria-hidden="true">−</span>
                <div><h4>{change.before}</h4><p>{change.problem}</p></div>
              </li>
            ))}
          </ul>
          <div className="sky-change-panel-footer">More tools. Still too much manual work.</div>
        </section>
      </div>

      <div className="sky-transformation-next">
        <p>Start with the work that keeps coming back.</p>
        <Link href="/contact" className="sky-transformation-link">Let’s find your first build <SkyArrow /></Link>
      </div>
    </section>
  );
}
