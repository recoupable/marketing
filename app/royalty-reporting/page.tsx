import Link from "next/link";
import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { royaltyReportingCopy as copy } from "@/lib/copy/royalty-reporting";
import { withPageMetadata } from "@/lib/seo";
import "./reporting.css";

export const metadata: Metadata = withPageMetadata({
  title: "Custom Royalty Reporting Workflows for Music Teams",
  description:
    "Bring royalty statements, receipts, and source records into a repeatable review. Discuss a custom reporting workflow for your label, publisher, or catalog team.",
  alternates: { canonical: "/royalty-reporting" },
});

export default function RoyaltyReportingPage() {
  return (
    <div className="rr-page">
      <header className="rr-header">
        <Link href="/" aria-label="Recoup home">
          Recoup<span>®</span>
        </Link>
        <a href="#inquiry">
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
      </header>
      <section className="rr-hero" aria-labelledby="reporting-title">
        <div className="rr-intro">
          <p className="rr-kicker">{copy.kicker}</p>
          <h1 id="reporting-title">{copy.title}</h1>
          <p className="rr-description">{copy.intro}</p>
          <p className="rr-audience">{copy.audience}</p>
          <a className="rr-button" href="#inquiry">
            {copy.cta}
            <span aria-hidden="true">↗</span>
          </a>
          <p className="rr-small">
            A conversation about your process. No files required.
          </p>
        </div>
        <figure className="rr-art">
          <div className="rr-report">
            <div className="rr-report-top">
              <span>ROYALTY REVIEW</span>
              <span>01 / SOURCES</span>
            </div>
            <h2>Follow the difference.</h2>
            <div className="rr-table">
              <div>
                Statement<strong>$1,200</strong>
              </div>
              <div>
                Receipt<strong>$1,000</strong>
              </div>
              <div className="rr-difference">
                Difference<strong>$200</strong>
              </div>
            </div>
            <div className="rr-source">
              <span aria-hidden="true">↳</span>
              <div>
                <strong>Ready for review</strong>
                <p>Statement row + receipt reference</p>
              </div>
              <span className="rr-source-dot" aria-hidden="true" />
            </div>
            <div className="rr-report-foot">
              Your team reviews. Your team signs off.
            </div>
          </div>
          <figcaption>
            Illustrative example · synthetic amounts, not client data
          </figcaption>
        </figure>
      </section>
      <section
        className="rr-method"
        aria-label="How we build your reporting workflow"
      >
        {copy.steps.map((step, index) => (
          <div key={step.title}>
            <span className="rr-number">0{index + 1}</span>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </div>
        ))}
      </section>
      <section className="rr-proof">
        <div>
          <p className="rr-kicker">THE WORK BEHIND THE PROMISE</p>
          <h2>{copy.proofTitle}</h2>
        </div>
        <div>
          <p>{copy.proof}</p>
          <Link href="/case-studies/royalty-reporting">
            Read the royalty-reporting case study{" "}
            <span aria-hidden="true">↗</span>
          </Link>
          <p className="rr-small">{copy.proofScope}</p>
        </div>
      </section>
      <section className="rr-inquiry" id="inquiry" aria-labelledby="rr-fit">
        <div>
          <p className="rr-kicker">LET’S LOOK AT YOUR PROCESS</p>
          <h2 id="rr-fit">{copy.fitTitle}</h2>
          <p>{copy.fit}</p>

          <p className="rr-small">{copy.note}</p>
        </div>
        <div className="rr-form">
          <InquiryForm
            source="/royalty-reporting"
            connected
            compact
            preselectedProject
            initialInterest="Custom systems"
          />
          <p className="rr-small">
            We use your details to respond to this inquiry. No mailing list.{" "}
            <a href="/privacy">Privacy policy</a>.
          </p>
        </div>
      </section>
      <footer className="rr-footer">
        <Link href="/">Recoup</Link>
        <span>Custom systems for the music business.</span>
        <a href="/privacy">Privacy</a>
      </footer>
    </div>
  );
}
