import Image from "next/image";
import Link from "next/link";
import { FooterBrand } from "@/components/sky/brand";
import { SkyArrow } from "@/components/sky/arrow";
import "./sky-closing.css";

const contact = "mailto:hi@recoupable.dev?subject=Let%E2%80%99s%20talk%20about%20Recoup";

export function SkyClosing() {
  return (
    <div className="sky-closing">
      <section className="sky-buying-questions" aria-labelledby="sky-buying-title">
        <header data-reveal=""><p className="sky-section-label">A FEW PRACTICAL QUESTIONS</p><h2 id="sky-buying-title">Before we<br /> get started.</h2></header>
        <div className="sky-buying-answers" data-reveal-group="">
          <details><summary>What does the free audit include?<SkyArrow direction="down" /></summary><p>We review one workflow, discuss where AI could help, and identify a practical first step. Bring the task, the tools involved, and where your team gets stuck. Any implementation is a separate, scoped engagement.</p></details>
          <details><summary>What will our company own?<SkyArrow direction="down" /></summary><p>Your custom code is delivered in a repository your company controls, with documentation and training. Ownership and licenses are defined in the agreement. Any Recoup platform, hosting, or third-party dependencies and ongoing costs are identified in the scope.</p></details>
          <details><summary>Can you work with our tools and developers?<SkyArrow direction="down" /></summary><p>Yes. We start with your existing tools and can build alongside your internal developers. We agree on integrations, responsibilities, and handoff before development starts.</p></details>
          <details><summary>How will you access our data?<SkyArrow direction="down" /></summary><p>We identify what the workflow needs and agree on permissions and access with your team. Hosting, AI providers, and data handling are part of the project scope. You don’t need to send confidential files to request an audit.</p></details>
          <details><summary>What does a build cost, and what happens after launch?<SkyArrow direction="down" /></summary><p>We agree on deliverables, price, and the delivery schedule before starting. Documentation and training are part of the handoff. Ongoing support and development can be scoped separately. <Link href="/pricing">Compare our plans and engagement options.</Link></p></details>
        </div>
      </section>
      <section className="sky-landscape-contact" id="contact" aria-labelledby="sky-contact-title">
        <Image src="/images/sky/contact-meadow.webp" alt="" fill sizes="(max-width: 760px) 100vw, 85vw" />
        <div className="sky-landscape-copy" data-reveal="">
          <p className="sky-section-label">LET’S PUT AI TO WORK</p>
          <h2 id="sky-contact-title">Find your first<br />useful AI build.</h2>
          <p>Start with a free audit of one workflow. We’ll review where AI could help and identify a practical first step for your team.</p>
          <Link className="sky-landscape-cta" href="/start-project">GET A FREE AUDIT <span aria-hidden="true"><SkyArrow /></span></Link>
          <p className="sky-contact-note">The audit is free. Any build is scoped and priced separately.</p>
        </div>
      </section>

      <footer className="sky-dark-footer">
        <div className="sky-footer-main" data-reveal-group="">
          <div className="sky-footer-brand">
            <FooterBrand href="#sky-home" />
            <p>Your AI partner for the business of music.<br />Custom systems. A team that can use them.</p>
            <div className="sky-footer-email">
              <p>Have a project in mind?</p>
              <a href={contact}>hi@recoupable.dev <span aria-hidden="true"><SkyArrow /></span></a>
            </div>
          </div>
          <nav className="sky-footer-links" aria-label="Explore Recoup">
            <p className="sky-section-label">RECOUP</p>
            <Link href="/about">About us</Link>
            <Link href="/services">Services</Link><Link href="/advisory">Advisory</Link><Link href="/build">Custom builds</Link><Link href="/pricing">Pricing</Link>
            <Link href="/case-studies">Case studies</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link><Link href="/start-project">Start a project</Link>
          </nav>
          <nav className="sky-footer-links" aria-label="Recoup software">
            <p className="sky-section-label">OUR TOOLS</p>
            <Link href="/platform">Platform</Link>
            <Link href="/skills">Skills</Link>
            <Link href="/music-videos">Music videos</Link>
            <Link href="/developers">Developers</Link>
            <Link href="/lab">Lab</Link>
          </nav>
          <nav className="sky-footer-links" aria-label="Recoup resources"><p className="sky-section-label">RESOURCES</p><Link href="/docs">Documentation</Link><Link href="/agents">For agents</Link><Link href="/resources">All resources</Link><Link href="/playbook">AI playbook</Link><Link href="/audit">AI readiness</Link><Link href="/roi">Workflow calculator</Link><Link href="/feed.xml">RSS feed</Link></nav>
        </div>
        <div className="sky-footer-bottom" data-reveal="">
          <p>© {new Date().getFullYear()} Recoup</p>
          <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="#sky-home">Back to top <SkyArrow direction="up-right" /></a></div>
        </div>
      </footer>
    </div>
  );
}
