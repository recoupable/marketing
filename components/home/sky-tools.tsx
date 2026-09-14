import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { planPrice } from "@/lib/pricing";
import "./sky-tools.css";
import { homeCopy } from "@/lib/copy/home";

export function SkySoftwareStrip() {
  return <section className="sky-section sky-products" id="tools" aria-labelledby="sky-tools-title">
    <header className="sky-products-heading" data-reveal=""><p className="sky-section-label">RECOUP TOOLS</p><h2 id="sky-tools-title">Use the platform.<br /><span>Or bring your own&nbsp;AI.</span></h2><p>{homeCopy.tools.introduction}</p></header>
    <div className="sky-products-grid" data-reveal-group="">
      <article className="sky-product-platform">
        <div className="sky-product-copy"><p className="sky-product-kicker">{homeCopy.tools.platformLabel}</p><h3>Your music team’s<br />AI workspace.</h3><p>{homeCopy.tools.platform}</p><div className="sky-product-platform-price"><strong>{planPrice("platform", "monthly").monthly}<span> / month</span></strong><span>Platform + music skill pack · USD</span></div><Link href="/platform" className="sky-product-action">Explore the platform<span><SkyArrow /></span></Link></div>
        <div className="sky-product-workspace" aria-hidden="true">
          <div className="sky-product-orbit sky-product-orbit-one" /><div className="sky-product-orbit sky-product-orbit-two" />
          <div className="sky-product-window"><div className="sky-product-window-bar"><span className="sky-product-window-dots"><i /><i /><i /></span><span>RECOUP / ARTIST WORKSPACE</span></div><div className="sky-product-window-body"><div className="sky-product-artist"><span className="sky-product-record"><i /></span><div><small>YOUR ARTIST</small><strong>What’s the next move?</strong></div></div><div className="sky-product-context"><span>Artist notes</span><span>Music</span><span>Reference files</span></div><div className="sky-product-prompt">Help me plan the next release.<span>↑</span></div><div className="sky-product-jobs"><span><i>01</i>Research the audience</span><span><i>02</i>Shape the campaign</span><span><i>03</i>Draft the content</span></div></div></div>
        </div>
      </article>
      <article className="sky-product-skills">
        <div className="sky-product-books" aria-hidden="true"><div className="sky-product-book"><span>RECOUP SKILLS</span><strong>Research<br />the artist.</strong><small>01 / DISCOVER</small></div><div className="sky-product-book"><span>RECOUP SKILLS</span><strong>Plan the<br />release.</strong><small>02 / LAUNCH</small></div><div className="sky-product-book"><span>RECOUP SKILLS</span><strong>Work the<br />catalog.</strong><small>03 / GROW</small></div></div>
        <div className="sky-product-copy"><p className="sky-product-kicker">{homeCopy.tools.skillsLabel}</p><h3>Give your agent<br />a music playbook.</h3><p>{homeCopy.tools.skills}</p><Link href="/skills" className="sky-product-text-link">{homeCopy.tools.skillsAction} <SkyArrow direction="right" /></Link></div>
      </article>
      <article className="sky-product-developers">
        <div className="sky-product-connection" aria-hidden="true"><div className="sky-product-endpoint"><span>GET</span><code>/api/artists</code><svg viewBox="0 0 24 24" fill="none"><path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className="sky-product-connection-line" /><div className="sky-product-interfaces"><span>YOUR APP</span><span>YOUR AGENT</span><span>YOUR WORKFLOW</span></div></div>
        <div className="sky-product-copy"><p className="sky-product-kicker">{homeCopy.tools.developersLabel}</p><h3>Build Recoup<br />into your product.</h3><p>{homeCopy.tools.developers}</p><Link href="/developers" className="sky-product-text-link">Explore developer tools <SkyArrow direction="right" /></Link></div>
      </article>
    </div>
  </section>;
}
