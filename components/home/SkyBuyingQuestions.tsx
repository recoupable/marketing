import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";

export function SkyBuyingQuestions() {
  return (
    <section
      className="sky-buying-questions"
      aria-labelledby="sky-buying-title"
    >
      <header data-reveal="">
        <p className="sky-section-label">A FEW PRACTICAL QUESTIONS</p>
        <h2 id="sky-buying-title">
          Before we
          <br /> get started.
        </h2>
      </header>
      <div className="sky-buying-answers" data-reveal-group="">
        <details>
          <summary>
            What does the free audit include?
            <SkyArrow direction="down" />
          </summary>
          <p>
            We review one workflow, discuss where AI could help, and identify a
            practical first step. Bring the task, the tools involved, and where
            your team gets stuck. Any implementation is a separate, scoped
            engagement.
          </p>
        </details>
        <details>
          <summary>
            What will our company own?
            <SkyArrow direction="down" />
          </summary>
          <p>
            Your custom code is delivered in a repository your company controls,
            with documentation and training. Ownership and licenses are defined
            in the agreement. Any Recoup platform, hosting, or third-party
            dependencies and ongoing costs are identified in the scope.
          </p>
        </details>
        <details>
          <summary>
            Can you work with our tools and developers?
            <SkyArrow direction="down" />
          </summary>
          <p>
            Yes. We start with your existing tools and can build alongside your
            internal developers. We agree on integrations, responsibilities, and
            handoff before development starts.
          </p>
        </details>
        <details>
          <summary>
            How will you access our data?
            <SkyArrow direction="down" />
          </summary>
          <p>
            We identify what the workflow needs and agree on permissions and
            access with your team. Hosting, AI providers, and data handling are
            part of the project scope. You don\u2019t need to send confidential
            files to request an audit.
          </p>
        </details>
        <details>
          <summary>
            What does a build cost, and what happens after launch?
            <SkyArrow direction="down" />
          </summary>
          <p>
            We agree on deliverables, price, and the delivery schedule before
            starting. Documentation and training are part of the handoff.
            Ongoing support and development can be scoped separately.{" "}
            <Link href="/pricing">
              Compare our plans and engagement options.
            </Link>
          </p>
        </details>
      </div>
    </section>
  );
}
