import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import "./sky-investment-example.css";

function DocumentIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></svg>;
}

function SkillIllustration() {
  return (
    <div className="sky-investment-skill-scene" aria-hidden="true" data-reveal="">
      <div className="sky-investment-method-paper">
        <DocumentIcon /><span>Your team’s method</span>
        <div className="sky-investment-paper-lines"><i /><i /><i /></div>
      </div>
      <div className="sky-investment-skill-card">
        <div className="sky-investment-skill-header">
          <svg width="27" height="27" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 2v28M2 16h28M6 6l20 20M6 26 26 6" /></svg>
          <span>Recoup Skills</span>
        </div>
        <strong>Diligence review</strong>
        <div className="sky-investment-skill-step"><span>01</span> Gather sources</div>
        <div className="sky-investment-skill-step"><span>02</span> Draft the review</div>
        <div className="sky-investment-skill-step"><span>03</span> Flag open questions</div>
        <div className="sky-investment-skill-footer"><span /> Ready for your team</div>
      </div>
      <div className="sky-investment-reuse-note"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9a6 6 0 0 0 0 12h2M16 3l4 4-4 4M4 17h9a6 6 0 0 0 0-12h-2M8 13l-4 4 4 4" /></svg> Practice. Refine. Reuse.</div>
    </div>
  );
}

export function SkyInvestmentExample() {
  return (
    <section className="sky-investment sky-section" id="acquisition-example" aria-labelledby="sky-investment-title">
      <header className="sky-investment-heading" data-reveal="">
        <p className="sky-section-label">INVESTMENT REVIEW</p>
        <h2 id="sky-investment-title">Get the deal into a form<br className="sky-investment-break" /> your team can review.</h2>
        <p>Documents, model assumptions, and rough notes. A diligence draft with the open questions still visible.</p>
      </header>

      <div className="sky-investment-grid">
        <div className="sky-investment-document-scene">
          <div className="sky-investment-inputs" aria-label="Source material">
            <span><DocumentIcon /> Deal documents</span>
            <span><DocumentIcon /> Financial model</span>
            <span><DocumentIcon /> Analyst notes</span>
          </div>
          <div className="sky-investment-folio">
            <span className="sky-investment-folder-tab">INVESTMENT REVIEW</span>
            <article className="sky-investment-document" aria-labelledby="sky-investment-draft-title">
              <div className="sky-investment-document-top"><span><DocumentIcon /> Ownership &amp; rights</span><span><i /> Draft</span></div>
              <div className="sky-investment-draft">
                <div className="sky-investment-draft-heading"><span>01 / FOR YOUR TEAM’S REVIEW</span><h3 id="sky-investment-draft-title">Diligence draft</h3></div>
                <p>The model assumes a <strong>60% publisher share.</strong> The supplied agreement has a blank signature page. The executed copy is still needed to check this assumption.</p>
                <details className="sky-investment-source">
                  <summary><span><DocumentIcon /> Read the source excerpts</span><SkyArrow direction="down" /></summary>
                  <dl>
                    <div><dt>Model · assumptions tab</dt><dd>Publisher share: 60%</dd></div>
                    <div><dt>Agreement · signature page</dt><dd>Signature: [blank] · Date: [blank]</dd></div>
                    <div><dt>Analyst notes</dt><dd>Executed copy requested; awaiting response.</dd></div>
                  </dl>
                </details>
                <div className="sky-investment-question">
                  <span className="sky-investment-question-mark" aria-hidden="true">?</span>
                  <div><span>QUESTION FOR THE SELLER</span><p>Can you provide the signed agreement supporting the modeled share?</p></div>
                </div>
              </div>
              <Link href="/contact?workflow=Custom%20systems&project=catalog-diligence" className="sky-investment-document-cta">Build this for your team <SkyArrow /></Link>
            </article>
          </div>
        </div>

        <aside className="sky-investment-team" aria-labelledby="sky-investment-team-title">
          <SkillIllustration />
          <div className="sky-investment-team-copy">
            <p className="sky-investment-team-label">TEAM CAPABILITY</p>
            <h3 id="sky-investment-team-title">Built with the people<br /> doing the work.</h3>
            <p>We turn your team’s methods into reusable skills, practice on real tasks, and improve the tools together.</p>
            <Link href="/skills">Explore Recoup Skills <SkyArrow /></Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
