import Link from "next/link";
import { withPageMetadata } from "@/lib/seo";
import { getOffer } from "@/lib/label-kit/getOffer";
import { PurchaseButton } from "./purchase-button";
import "./label-kit.css";

export const metadata = withPageMetadata({
  title: "A record label in a box, for your AI agent",
  description:
    "Recoup Skills, MCP setup, and music-business workflows in one downloadable kit. Research artists, plan releases, and create campaign material with your agent.",
  alternates: { canonical: "/label-in-a-box" },
  robots: { index: false, follow: true },
});

const workflows = [
  {
    number: "01",
    name: "Know the artist.",
    tag: "A&R + RESEARCH",
    prompt: "Research this artist and find their next opportunity.",
    output:
      "Artist brief, audience context, and a shortlist of opportunities to review.",
  },
  {
    number: "02",
    name: "Build the rollout.",
    tag: "RELEASE PLANNING",
    prompt: "Help me plan the next six weeks around this single.",
    output:
      "Release timeline, campaign angles, and a checklist of deliverables.",
  },
  {
    number: "03",
    name: "Make the campaign.",
    tag: "CONTENT + CREATIVE",
    prompt: "Turn this song into a week of content in the artist’s voice.",
    output:
      "Caption drafts, creative directions, and briefs for campaign assets.",
  },
  {
    number: "04",
    name: "Work the catalog.",
    tag: "CATALOG + OPPORTUNITIES",
    prompt: "Review this catalog and show me where to focus.",
    output:
      "Organized findings, missing information, and priorities for your review.",
  },
];
const questions = [
  [
    "What am I buying?",
    "A downloadable package of curated Recoup Skills, MCP setup instructions, starter templates, and a quick-start guide. The final file list will be confirmed before checkout opens.",
  ],
  [
    "What is the difference between skills and MCP?",
    "Skills give your agent a method: the steps, context, and checks for a job. MCP connects it to Recoup tools so it can work with authorized data and services. The kit brings the instructions and setup together.",
  ],
  [
    "Which agent can I use?",
    "You’ll need an agent that supports local skills or instructions. Connected tools also require an MCP-compatible client and a Recoup account. Agent-specific installation instructions and the tested compatibility list will be included at launch.",
  ],
  [
    "Does this include AI or API usage?",
    "No. Your AI agent subscription, Recoup API and MCP usage, and any third-party services are billed separately. Buying the kit does not provide unlimited hosted tool usage.",
  ],
  [
    "Aren’t Recoup Skills already open source?",
    "Yes. The public collection remains available for you to install yourself. This offer packages selected skills with setup guidance and starter files for music work in one convenient download.",
  ],
  [
    "Is this a subscription?",
    "This first offer is a one-time purchase of the packaged release. An optional subscription for ongoing updates is planned for later and is not included in this purchase.",
  ],
];

export default function LabelKitPage() {
  const offer = getOffer();
  return (
    <div className="label-kit sky-subpage">
      <section className="kit-hero">
        <div className="kit-hero-copy">
          <p className="kit-eyebrow">
            <span className="kit-dot" /> RECOUP SKILLS + MCP
          </p>
          <h1>
            A record label
            <br />
            in a box.
            <br />
            <em>For your agent.</em>
          </h1>
          <p className="kit-lead">
            Give your agent the music-business playbooks and tools to research
            artists, plan releases, and build campaigns.
          </p>
          <div className="kit-hero-actions">
            <PurchaseButton checkoutUrl={offer?.checkoutUrl} />
            <a className="kit-text-link" href="#inside">
              See what’s inside <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="kit-fine">
            One-time purchase · Downloadable ZIP{!offer && " · Coming soon"}
          </p>
        </div>
        <div
          className="kit-art"
          aria-label="Illustration of the Recoup record label kit"
        >
          <div className="kit-vinyl">
            <div className="kit-vinyl-label">
              RECOUP
              <br />
              <span>SIDE A / YOUR NEXT RELEASE</span>
              <i />
            </div>
          </div>
          <div className="kit-sleeve">
            <div className="kit-sleeve-top">
              <span>recoup</span>
              <span>
                LABEL KIT
                <br />
                VOL. 001
              </span>
            </div>
            <div className="kit-sleeve-title">
              Good music.
              <br />
              Meet good
              <br />
              systems.
            </div>
            <div className="kit-sleeve-mark" aria-hidden="true">
              ✳
            </div>
            <div className="kit-sleeve-bottom">
              <span>SKILLS + MCP + WORKFLOWS</span>
              <span>↓ ZIP</span>
            </div>
          </div>
          <div className="kit-file">
            <span aria-hidden="true">↳</span>
            <div>
              <strong>recoup-label-kit.zip</strong>
              <span>Your agent’s music department.</span>
            </div>
            <span className="kit-file-lock">PAID DOWNLOAD</span>
          </div>
        </div>
      </section>
      <div className="kit-strip">
        <span>BRING YOUR AGENT.</span>
        <p>
          Music-specific skills. Connected tools. Files you can make your own.
        </p>
        <a href="#how-it-works">How it works ↗</a>
      </div>
      <section id="inside" className="kit-section">
        <div className="kit-section-heading">
          <p className="kit-eyebrow">WHAT’S IN THE BOX</p>
          <h2>
            The know-how.
            <br />
            And the tools to use it.
          </h2>
          <p>
            A starting point for the work around the music. Bring your artist,
            your goals, and your judgment.
          </p>
        </div>
        <div className="kit-contents">
          <article>
            <span className="kit-content-number">01 / THE METHODS</span>
            <h3>Recoup Skills</h3>
            <p>
              Music-specific instructions that help your agent approach
              research, releases, content, and catalog work.
            </p>
            <Link href="/skills">Explore the public skills ↗</Link>
          </article>
          <article>
            <span className="kit-content-number">02 / THE CONNECTION</span>
            <h3>Recoup MCP</h3>
            <p>
              Setup guidance to connect your agent to Recoup’s tools and work
              with the accounts and data you authorize.
            </p>
            <Link href="/developers">Explore the tools ↗</Link>
          </article>
          <article>
            <span className="kit-content-number">03 / THE STARTING POINT</span>
            <h3>Your label workspace</h3>
            <p>
              Starter files for artist context, release goals, and campaign
              briefs, plus a guide to your first workflow.
            </p>
            <span className="kit-content-note">
              Packaged together in one ZIP
            </span>
          </article>
        </div>
      </section>
      <section id="workflows" className="kit-section">
        <div className="kit-section-heading">
          <p className="kit-eyebrow">PUT IT TO WORK</p>
          <h2>
            Start with the music.
            <br />
            Give your agent a job.
          </h2>
          <p>
            Example requests and the kind of working documents you can build
            together.
          </p>
        </div>
        <div className="kit-workflows">
          {workflows.map((workflow) => (
            <article key={workflow.number}>
              <div className="kit-workflow-top">
                <span>{workflow.number}</span>
                <span>{workflow.tag}</span>
              </div>
              <h3>{workflow.name}</h3>
              <blockquote>“{workflow.prompt}”</blockquote>
              <p>
                <span>WORK TOWARD</span>
                {workflow.output}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section id="how-it-works" className="kit-section kit-start">
        <div>
          <p className="kit-eyebrow">FROM DOWNLOAD TO FIRST DRAFT</p>
          <h2>
            Your setup.
            <br />
            With a head start.
          </h2>
          <p>
            You bring the creative direction. Your agent helps turn it into work
            you can review.
          </p>
        </div>
        <ol>
          {[
            [
              "Download your kit",
              "After purchase, get the packaged release as a ZIP.",
            ],
            [
              "Set up your agent",
              "Follow the installation guide, load the skills, and connect Recoup MCP for jobs that need tools.",
            ],
            [
              "Add your artist’s context",
              "Give your agent the music, audience, goals, and constraints it needs.",
            ],
            [
              "Make something useful",
              "Start a workflow. Review the research, refine the draft, and decide what goes out.",
            ],
          ].map(([title, body], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section id="get-the-kit" className="kit-section kit-purchase">
        <div>
          <p className="kit-eyebrow">ONE DOWNLOAD. YOUR NEXT STARTING POINT.</p>
          <h2>
            Put your agent
            <br />
            to work in music.
          </h2>
          <p>
            For artists building their own operation, managers running a roster,
            and labels ready to work with agents.
          </p>
          <p className="kit-purchase-aside">
            You stay in charge of the artist, the decisions, and what gets
            published.
          </p>
        </div>
        <div className="kit-receipt">
          <div className="kit-receipt-header">
            <span>RECOUP LABEL KIT</span>
            <span>ZIP DOWNLOAD</span>
          </div>
          <h3>{offer?.price ?? "Price coming soon"}</h3>
          <p>One-time purchase. No recurring charge.</p>
          <ul className="kit-checks">
            <li>Curated music-business skills</li>
            <li>Recoup MCP setup guide</li>
            <li>Artist and release starter files</li>
            <li>Quick-start workflow guide</li>
            <li>The packaged release to keep</li>
          </ul>
          <PurchaseButton checkoutUrl={offer?.checkoutUrl} />
          <p className="kit-fine">
            {offer
              ? "Secure one-time checkout via Stripe."
              : "Preview only. Checkout opens when the kit is ready."}
          </p>
          <p className="kit-fine">
            AI subscriptions and API usage are separate.
          </p>
        </div>
      </section>
      <section className="kit-section kit-faq">
        <div>
          <p className="kit-eyebrow">BEFORE YOU DOWNLOAD</p>
          <h2>
            A few good
            <br />
            questions.
          </h2>
        </div>
        <div>
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
