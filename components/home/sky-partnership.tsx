import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import "./sky-partnership.css";
import { homeOffersCopy } from "@/lib/copy/home-offers";
import "./sky-services.css";

function CheckMark() {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 8 2.5 2.5L12 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function DocumentMark() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M14 3v5h5M9 12h6m-6 4h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
}

function RecoupSymbol() {
  return <svg viewBox="0 0 24 28" fill="currentColor" aria-hidden="true"><path d="M13 1h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5a4 4 0 0 0-4 4v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h5a4 4 0 0 0 4-4V3a2 2 0 0 1 2-2Z" /></svg>;
}

function SectionAuditLink() {
  return <Link className="sky-section-audit" href="/start-project">{homeOffersCopy.services.auditLabel}<span><SkyArrow /></span></Link>;
}

function OfferSymbol({ kind }: { kind: string }) {
  return <svg className="sky-offer-symbol" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "advisory" ? <><circle cx="50" cy="50" r="35" opacity=".35" /><path d="M50 8v12m0 60v12M8 50h12m60 0h12" opacity=".55" /><path d="m65 35-10 20-20 10 10-20 20-10Z" /><circle cx="50" cy="50" r="3" fill="currentColor" /></> : kind === "transformation" ? <><path d="M27 50h46M50 27v46" opacity=".5" /><rect x="7" y="7" width="27" height="27" rx="8" /><rect x="66" y="66" width="27" height="27" rx="8" /><rect x="34" y="34" width="32" height="32" rx="10" fill="currentColor" /><path d="m44 50 4 4 9-9" stroke="#d6ff62" /><path d="M21 34v16h13m32 0h13v16" /></> : <><rect x="8" y="17" width="84" height="66" rx="10" opacity=".5" /><path d="M8 32h84m-63-7h1m-9 0h1" opacity=".5" /><path d="m36 45-12 12 12 12m28-24 12 12-12 12m-10-28-8 31" /></>}
  </svg>;
}

export function SkyServices() {
  return <section className="sky-section sky-transformation-services" id="services" aria-labelledby="sky-services-title">
    <div className="sky-offer-layout">
      <header className="sky-services-heading">
        <div data-reveal="">
          <p className="sky-section-label">{homeOffersCopy.services.eyebrow}</p>
          <h2 id="sky-services-title">{homeOffersCopy.services.title}</h2>
          <SectionAuditLink />
        </div>
      </header>
      <div className="sky-offer-list" data-reveal-group="">
        {homeOffersCopy.services.offers.map(service => <article key={service.id} className={`sky-offer sky-offer-${service.id}`} aria-labelledby={`service-${service.id}`}>
          <div className="sky-offer-top"><h3 id={`service-${service.id}`}>{service.title}</h3><OfferSymbol kind={service.id} /></div>
          <p className="sky-offer-description">{service.summary}</p>
          <Link href={service.href}>{service.link}<SkyArrow direction="up-right" /></Link>
        </article>)}
      </div>
    </div>
  </section>;
}

export function SkyPartnership() {
  return <section className="sky-section sky-transformation-process" id="how-we-work" aria-labelledby="sky-process-title">
    <header data-reveal=""><p className="sky-section-label">{homeOffersCopy.process.eyebrow}</p><h2 id="sky-process-title">{homeOffersCopy.process.title}</h2></header>
    <ol className="sky-process-list" data-reveal-group="">{homeOffersCopy.process.steps.map((step, index) => <li key={step.title}><span className="sky-process-number">{homeOffersCopy.process.stepLabel} 0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol>
    <p className="sky-process-scope">{homeOffersCopy.process.scope}</p>
  </section>;
}

function SkillsVisual() {
  return (
    <div className="sky-skills-visual" aria-hidden="true">
      <div className="sky-playbook sky-playbook-back"><DocumentMark /><span>RELEASE PLANNING</span></div>
      <div className="sky-playbook sky-playbook-middle"><DocumentMark /><span>ARTIST RESEARCH</span></div>
      <div className="sky-playbook sky-playbook-front">
        <div className="sky-playbook-top"><DocumentMark /><span>RECOUP SKILLS</span><span className="sky-playbook-status" /></div>
        <strong>Catalog<br />review.</strong>
        <div className="sky-playbook-bottom"><span>Music expertise,<br />ready for your AI.</span><SkyArrow /></div>
      </div>
    </div>
  );
}

function PlatformVisual() {
  return (
    <div className="sky-platform-visual" aria-hidden="true">
      <div className="sky-workspace-sheet">
        <div className="sky-workspace-bar"><RecoupSymbol /><span>Artist workspace</span><span className="sky-workspace-dots">•••</span></div>
        <div className="sky-workspace-tabs"><span className="is-current">Research</span><span>Content</span><span>Files</span></div>
        <div className="sky-workspace-file"><span className="sky-workspace-cover"><span /><span /><span /><span /></span><span><strong>Release strategy</strong><small>Artist context · Research</small></span></div>
        <div className="sky-workspace-copy"><span /><span /><span /></div>
        <span className="sky-workspace-context"><CheckMark />Artist context connected</span>
      </div>
    </div>
  );
}

function DeveloperVisual() {
  return (
    <div className="sky-developer-visual" aria-hidden="true">
      <div className="sky-developer-window">
        <div className="sky-developer-windowbar"><i /><i /><i /><span>Recoup / connect</span></div>
        <div className="sky-developer-line"><span>your tools</span><SkyArrow direction="right" /><RecoupSymbol /></div>
        <div className="sky-developer-protocols"><span>API</span><span>MCP</span><span>CLI</span></div>
      </div>
    </div>
  );
}

export function SkyTools() {
  return (
    <section className="sky-section sky-tools" id="tools" aria-labelledby="sky-tools-title">
      <header className="sky-tools-heading" data-reveal="">
        <p className="sky-section-label">OUR TOOLS</p>
        <h2 id="sky-tools-title">Music expertise.<br /><span>Built into software.</span></h2>
      </header>

      <div className="sky-tools-tray" data-reveal-group="">
        <Link href="/skills" className="sky-tool sky-tool-skills">
          <span className="sky-tool-label">RECOUP SKILLS <SkyArrow /></span>
          <SkillsVisual />
          <div className="sky-tool-description">
            <h3>A record label.<br /><span>In a box.</span></h3>
            <p>Music-business playbooks for your AI: research, content, and catalog review.</p>
            <span className="sky-tool-link">Explore Skills <SkyArrow direction="right" /></span>
          </div>
        </Link>
        <Link href="/platform" className="sky-tool sky-tool-platform">
          <span className="sky-tool-label">PLATFORM <SkyArrow /></span>
          <div className="sky-tool-description">
            <h3>Your artists.<br /><span>In context.</span></h3>
            <p>Bring artist information, research, and content work together.</p>
            <span className="sky-tool-link">Explore the platform <SkyArrow direction="right" /></span>
          </div>
          <PlatformVisual />
        </Link>
        <Link href="/developers" className="sky-tool sky-tool-developers">
          <span className="sky-tool-label">DEVELOPERS <SkyArrow /></span>
          <div className="sky-tool-description">
            <h3>Build on Recoup.</h3>
            <p>Connect your tools through our API, MCP, and CLI.</p>
            <span className="sky-tool-link">Explore developer tools <SkyArrow direction="right" /></span>
          </div>
          <DeveloperVisual />
        </Link>
      </div>
    </section>
  );
}
