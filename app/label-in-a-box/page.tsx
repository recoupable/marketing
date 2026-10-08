import Image from "next/image";
import Link from "next/link";
import { withPageMetadata } from "@/lib/seo";
import { getOffer } from "@/lib/label-kit/getOffer";
import { SkyArrow } from "@/components/sky/arrow";
import { PurchaseButton } from "./purchase-button";
import { AudiencePreview } from "./audience-preview";
import "./label-kit.css";

export const metadata = withPageMetadata({
  title: "Your AI agent. Your label team.",
  description:
    "A record label in a box for artists, managers, and labels using AI. Equip your agent to research artists, plan releases, and build campaigns with the Recoup Label Kit.",
  alternates: { canonical: "/label-in-a-box" },
  robots: { index: false, follow: true },
});

const questions = [
  [
    "What exactly do I get?",
    "A downloadable ZIP with curated Recoup Skills, setup instructions for connected Recoup tools, artist and release starter files, and a quick-start guide. The final contents will be listed before checkout opens.",
  ],
  [
    "Do I need to know how to code?",
    "The day-to-day work starts with a request in plain language. Initial setup depends on your agent. You’ll need a client that supports skills or local instructions, and MCP for connected tools. The kit’s launch guide will include the tested setup paths.",
  ],
  [
    "Does it work with the agent I already use?",
    "The toolkit is built around skills and MCP, which compatible agents can load. The exact tested client list will be confirmed before sale. If your agent can’t install skills or connect to MCP tools, this kit may not fit your setup.",
  ],
  [
    "Are AI and Recoup usage included?",
    "Your AI subscription, Recoup API and MCP usage, and any third-party generation services are separate. This purchase is for the downloadable toolkit, not unlimited hosted usage.",
  ],
  [
    "Why buy this when the skills are public?",
    "The public Recoup Skills collection remains available to install yourself. The paid offer is the curated package: selected music workflows, starter files, setup guidance, and a defined release in one download.",
  ],
  [
    "Is this a subscription?",
    "This first offer is a one-time purchase of the packaged release. A separate subscription for ongoing updates is planned for later. It is not included in this purchase.",
  ],
];

export default function LabelKitPage() {
  const offer = getOffer();
  return (
    <div className="label-kit sky-subpage">
      <section className="kit-hero">
        <div className="kit-hero-copy">
          <p className="kit-eyebrow">
            <span /> A RECORD LABEL IN A BOX
          </p>
          <h1>
            Your AI agent.
            <br />
            <em>Your label team.</em>
          </h1>
          <p className="kit-lead">
            Plan the release. Find the opportunities.
            <br className="kit-desktop-break" /> Create the campaign.
          </p>
          <p className="kit-hero-description">
            Give the AI you already use music-business skills and connected
            tools. A downloadable kit for artists, managers, and record labels.
          </p>
          <div className="kit-hero-actions">
            <PurchaseButton checkoutUrl={offer?.checkoutUrl} />
            <a href="#for-you" className="kit-text-link">
              See what you could do <SkyArrow direction="down" />
            </a>
          </div>
          <p className="kit-fine">
            One-time purchase · ZIP download{!offer && " · Coming soon"}
          </p>
        </div>
        <div
          className="kit-campaign"
          aria-label="Illustrative release campaign: cover artwork, artist image, and release plan"
        >
          <div className="kit-campaign-photo">
            <Image
              src="/images/label-kit/blue-hour-artist.png"
              alt="Fictional artist campaign concept: a performer beneath a blue light installation"
              width={750}
              height={1000}
              priority
              sizes="(max-width: 760px) 55vw, 350px"
            />
            <div>
              <span>
                A NEW WORLD
                <br />
                AFTER DARK.
              </span>
              <small>BLUE HOUR / CAMPAIGN CONCEPT</small>
            </div>
          </div>
          <div className="kit-campaign-cover">
            <Image
              src="/images/label-kit/blue-hour-cover.png"
              alt="Silver sculptural flower album cover concept"
              width={720}
              height={720}
              priority
              sizes="(max-width: 760px) 55vw, 350px"
            />
            <div>
              <strong>
                BLUE
                <br />
                HOUR
              </strong>
              <span>THE NEW SINGLE</span>
            </div>
          </div>
          <div className="kit-campaign-plan">
            <div>
              <span className="kit-status-dot" /> RELEASE PLAN{" "}
              <span>01—04</span>
            </div>
            <strong>
              A song worth
              <br />
              showing up for.
            </strong>
            <ul>
              <li>
                Artist story & direction <span>01</span>
              </li>
              <li>
                Campaign assets <span>02</span>
              </li>
              <li>
                Release calendar <span>03</span>
              </li>
            </ul>
          </div>
          <div className="kit-campaign-prompt">
            <svg
              className="kit-audio-symbol"
              viewBox="0 0 42 32"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M3 13v6M9 8v16M15 12v8M21 3v26M27 8v16M33 11v10M39 14v4" />
            </svg>
            <div>
              <small>YOUR SONG. YOUR DIRECTION.</small>
              <p>“Help me build the release.”</p>
            </div>
            <span className="kit-prompt-arrow">
              <SkyArrow />
            </span>
          </div>
          <p className="kit-art-caption">
            ILLUSTRATIVE CAMPAIGN · ORIGINAL CONCEPT ART
          </p>
        </div>
      </section>
      <div className="kit-value-strip">
        <p>
          For the people
          <br />
          <strong>behind the music.</strong>
        </p>
        <span>Independent artists</span>
        <span>Artist managers</span>
        <span>Record label teams</span>
        <a href="#inside">
          Meet your toolkit <SkyArrow direction="down" />
        </a>
      </div>
      <AudiencePreview />
      <section className="kit-belief kit-section">
        <p className="kit-eyebrow">YOU’VE GOT THE VISION.</p>
        <h2>
          Give it a team’s
          <br />
          worth of follow-through.
        </h2>
        <p>
          There’s the music. Then there’s everything it takes to get it out into
          the world. Give your agent a method for the research, planning, and
          creative work that keeps landing back on your plate.
        </p>
      </section>
      <section id="inside" className="kit-section kit-inside">
        <div className="kit-section-intro">
          <p className="kit-eyebrow">WHAT YOU’RE BUYING</p>
          <h2>
            Music expertise.
            <br />
            Ready for your agent.
          </h2>
          <p>
            One download brings the playbooks, tool setup, and starting files
            together.
          </p>
        </div>
        <div className="kit-contents">
          <article>
            <div
              className="kit-mini-visual kit-method-visual"
              aria-hidden="true"
            >
              <span>RESEARCH THE ARTIST</span>
              <div>
                <i>01</i> Read the context
              </div>
              <div>
                <i>02</i> Gather the sources
              </div>
              <div>
                <i>03</i> Build the brief
              </div>
            </div>
            <span className="kit-content-number">01 / THE KNOW-HOW</span>
            <h3>Skills that know music.</h3>
            <p>
              Give your agent a repeatable approach to artist research, release
              planning, content, and catalog work.
            </p>
            <Link href="/skills">
              Explore the public skills <SkyArrow />
            </Link>
          </article>
          <article>
            <div
              className="kit-mini-visual kit-connect-visual"
              aria-hidden="true"
            >
              <span>YOUR AGENT</span>
              <div>
                <i />
                <i />
                <i />
              </div>
              <strong>Recoup</strong>
              <small>ARTISTS · RESEARCH · CONTENT</small>
            </div>
            <span className="kit-content-number">02 / THE TOOLS</span>
            <h3>Connect it to Recoup.</h3>
            <p>
              MCP setup guidance connects compatible agents to Recoup’s tools
              and the data you authorize.
            </p>
            <Link href="/developers">
              See the connected tools <SkyArrow />
            </Link>
          </article>
          <article>
            <div
              className="kit-mini-visual kit-files-visual"
              aria-hidden="true"
            >
              <div>
                <span>ARTIST</span>
                <strong>
                  The story.
                  <br />
                  The sound.
                  <br />
                  The ambition.
                </strong>
              </div>
              <div>
                <span>RELEASE</span>
                <strong>
                  Give the next
                  <br />
                  chapter
                  <br />a plan.
                </strong>
              </div>
            </div>
            <span className="kit-content-number">03 / YOUR STARTING POINT</span>
            <h3>Skip the blank page.</h3>
            <p>
              Artist context files, release templates, and a quick-start guide
              give your first request somewhere to begin.
            </p>
            <span className="kit-content-note">
              Packaged in one downloadable ZIP
            </span>
          </article>
        </div>
        <p className="kit-contents-note">
          The public skills are available separately. This offer brings a
          curated selection, setup guidance, and starter files into one package.
        </p>
      </section>
      <section id="how-it-works" className="kit-section kit-start">
        <div className="kit-section-intro">
          <p className="kit-eyebrow">BRING YOUR AGENT. BRING YOUR MUSIC.</p>
          <h2>
            From “where do I start?”
            <br />
            to your first request.
          </h2>
        </div>
        <ol>
          {[
            [
              "Get the kit.",
              "Download the ZIP and follow the setup guide for your compatible AI agent.",
            ],
            [
              "Make it yours.",
              "Add the artist’s music, story, goals, and the context your agent needs.",
            ],
            [
              "Give it a real job.",
              "Ask for a release plan, research brief, or content direction. Review it together.",
            ],
          ].map(([title, body], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <p className="kit-setup-note">
          Requires a compatible AI agent. AI subscriptions and Recoup tool usage
          are billed separately.
        </p>
      </section>
      <section id="get-the-kit" className="kit-section kit-purchase">
        <div>
          <p className="kit-eyebrow">RECOUP LABEL KIT</p>
          <h2>
            Your next release
            <br />
            deserves more
            <br />
            <em>than good intentions.</em>
          </h2>
          <p>Give your agent the tools to help you follow through.</p>
          <div className="kit-purchase-file">
            <span aria-hidden="true">↓</span>
            <div>
              <strong>recoup-label-kit.zip</strong>
              <small>Skills. Tool setup. Starter files.</small>
            </div>
          </div>
        </div>
        <div className="kit-receipt">
          <div className="kit-receipt-header">
            <span>THE COMPLETE KIT</span>
            <span>ONE-TIME PURCHASE</span>
          </div>
          <h3>{offer?.price ?? "Price coming soon"}</h3>
          <p>The packaged release is yours to keep.</p>
          <ul className="kit-checks">
            <li>Curated music-business skills</li>
            <li>Recoup MCP setup guide</li>
            <li>Artist and release starter files</li>
            <li>Quick-start workflow guide</li>
          </ul>
          <PurchaseButton checkoutUrl={offer?.checkoutUrl} />
          <p className="kit-fine">
            {offer
              ? "Secure one-time checkout via Stripe."
              : "Preview only. Checkout opens when the kit is ready."}
          </p>
          <p className="kit-fine">
            No recurring charge. AI and API usage are separate.
          </p>
        </div>
      </section>
      <section className="kit-section kit-faq">
        <div>
          <p className="kit-eyebrow">THE PRACTICAL DETAILS</p>
          <h2>
            Before you
            <br />
            make it yours.
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
