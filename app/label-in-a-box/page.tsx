import Image from "next/image";
import Link from "next/link";
import { withPageMetadata } from "@/lib/seo";
import { getOffer } from "@/lib/label-kit/getOffer";
import { SkyArrow } from "@/components/sky/arrow";
import { PurchaseButton } from "./purchase-button";
import { ChatDemo } from "./chat-demo";
import { AudiencePreview } from "./audience-preview";
import "./label-kit.css";

export const metadata = withPageMetadata({
  title: "Let Claude and ChatGPT manage your music business.",
  description:
    "The Recoup plugin for artists, managers, and labels. $19/month includes music-business skills, Recoup Starter access, and ongoing skill updates.",
  alternates: { canonical: "/label-in-a-box" },
  robots: { index: false, follow: true },
});

const questions = [
  [
    "What exactly do I get?",
    "The Recoup plugin download, setup guide, Recoup Starter access, and ongoing skill updates while subscribed. The final download contents and tested setup paths will be confirmed before checkout opens.",
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
    "Recoup Starter access includes $20 in monthly usage credits for connected Recoup tools. Usage is limited by those credits. Your Claude or ChatGPT subscription and third-party services are separate.",
  ],
  [
    "Why buy this when the skills are public?",
    "The public skills remain free to install yourself. This subscription includes Recoup access for connected tools, the packaged plugin, setup guidance, and ongoing skill updates.",
  ],
  [
    "Is this a subscription?",
    "Yes. Recoup Starter is $19 USD per month, billed monthly until canceled. The plugin and ongoing skill updates are included while subscribed. There is no separate plugin purchase.",
  ],
];

export default function LabelKitPage() {
  const offer = getOffer();
  const price = offer?.price ?? "$19/month"; // Starter pricing; checkout readiness is separate.
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
          <div className="kit-chat-offer">
            <PurchaseButton
              checkoutUrl={offer?.checkoutUrl}
              price={price}
              showPrice
            />
            <p>Includes Recoup access + ongoing skill updates.</p>
          </div>
        </div>
        <ChatDemo />
      </section>
      <AudiencePreview />
      <section id="inside" className="kit-section kit-inside">
        <div className="kit-section-intro">
          <p className="kit-eyebrow">WHAT YOU’RE BUYING</p>
          <h2>What’s included?</h2>
          <p>The plugin, Recoup access, and skills that keep getting better.</p>
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
              Starter access and $20 in monthly usage credits connect your agent
              to Recoup’s tools and the data you authorize.
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
          New and improved skills are included while you subscribe. The public
          skills remain available separately.
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
              "Get the plugin.",
              "Subscribe to Starter, download the plugin, and follow the setup guide.",
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
          Requires a compatible AI agent. Recoup Starter usage is included; your
          AI subscription is separate.
        </p>
      </section>
      <section id="get-the-kit" className="kit-section kit-purchase">
        <div>
          <p className="kit-eyebrow">RECOUP PLUGIN</p>
          <h2>
            Put AI to work
            <br />
            <em>for your music.</em>
          </h2>
          <p>Your plugin. Connected. Kept up to date.</p>
          <div className="kit-purchase-file">
            <span aria-hidden="true">↓</span>
            <div>
              <strong>recoup-label-kit.zip</strong>
              <small>Skills. Connected tools. Ongoing updates.</small>
            </div>
          </div>
        </div>
        <div className="kit-receipt">
          <div className="kit-receipt-header">
            <span>RECOUP STARTER</span>
            <span>MONTHLY SUBSCRIPTION</span>
          </div>
          <h3>{price}</h3>
          <p>Plugin included. No separate purchase.</p>
          <ul className="kit-checks">
            <li>Plugin download + setup guide</li>
            <li>Recoup Starter access</li>
            <li>$20 in monthly usage credits</li>
            <li>Ongoing skill updates</li>
          </ul>
          <PurchaseButton checkoutUrl={offer?.checkoutUrl} price={price} />
          <p className="kit-fine">
            {offer
              ? "Secure monthly billing via Stripe."
              : "Preview only. Checkout opens when the kit is ready."}
          </p>
          <p className="kit-fine">
            Billed monthly in USD until canceled. AI subscription separate.
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
