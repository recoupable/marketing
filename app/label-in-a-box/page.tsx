import Image from "next/image";
import Link from "next/link";
import { withPageMetadata } from "@/lib/seo";
import { getOffer } from "@/lib/label-kit/getOffer";
import { SkyArrow } from "@/components/sky/arrow";
import { PurchaseButton } from "./purchase-button";
import { AudiencePreview } from "./audience-preview";
import "./label-kit.css";

export const metadata = withPageMetadata({
  title: "Let Claude and ChatGPT manage your music business.",
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
            <span /> FOR ARTISTS, MANAGERS & LABELS
          </p>
          <h1>
            Let{" "}
            <span className="kit-agent-name">
              <Image
                src="/images/label-kit/brands/claude.svg"
                alt=""
                width={48}
                height={48}
              />
              Claude
            </span>{" "}
            and{" "}
            <span className="kit-agent-name">
              <Image
                src="/images/label-kit/brands/chatgpt.svg"
                alt=""
                width={48}
                height={48}
              />
              ChatGPT
            </span>{" "}
            <em>manage your music business.</em>
          </h1>
          <p className="kit-lead">
            Recoup’s plugin gives your AI music-business expertise. Research
            artists, plan releases, create campaigns, and grow your catalog
            revenue.
          </p>
          <div className="kit-hero-actions">
            <PurchaseButton checkoutUrl={offer?.checkoutUrl} />
          </div>
        </div>
        <div
          className="kit-output-preview"
          aria-label="Example outputs: artist research, release plans, and marketing content"
        >
          <article className="kit-output-research">
            <span className="kit-output-index">01</span>
            <h2>Artist research</h2>
            <ul>
              <li>Sound & story</li>
              <li>Audience</li>
              <li>Opportunities</li>
            </ul>
          </article>
          <article className="kit-output-plan">
            <span className="kit-output-index">02</span>
            <h2>Release plans</h2>
            <ol>
              <li>
                <span>01</span> Before release
              </li>
              <li>
                <span>02</span> Launch day
              </li>
              <li>
                <span>03</span> Keep promoting
              </li>
            </ol>
          </article>
          <article className="kit-output-content">
            <div>
              <span className="kit-output-index">03</span>
              <h2>Marketing content</h2>
            </div>
            <div className="kit-output-art">
              <Image
                src="/images/label-kit/blue-hour-cover.png"
                alt="Example cover-art concept: silver and blue sculpture"
                width={720}
                height={720}
                priority
                sizes="(max-width: 760px) 40vw, 260px"
              />
              <Image
                src="/images/label-kit/blue-hour-artist.png"
                alt="Example promotional image: a performer under a blue light installation"
                width={750}
                height={1000}
                priority
                sizes="(max-width: 760px) 40vw, 260px"
              />
            </div>
          </article>
          <p className="kit-output-caption">EXAMPLE OUTPUTS · ILLUSTRATIVE</p>
        </div>
      </section>
      <AudiencePreview />
      <section id="inside" className="kit-section kit-inside">
        <div className="kit-section-intro">
          <p className="kit-eyebrow">WHAT YOU’RE BUYING</p>
          <h2>What’s in the download?</h2>
          <p>Skills, connected tools, and starter files for your AI agent.</p>
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
          <h2>Download. Install. Ask.</h2>
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
            Put AI to work
            <br />
            <em>for your music.</em>
          </h2>
          <p>One toolkit. Yours to keep.</p>
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
          <h2>Questions?</h2>
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
