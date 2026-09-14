import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { homeCopy } from "@/lib/copy/home";

export function SkyBuyingQuestions() {
  return (
    <section className="sky-buying-questions" aria-labelledby="sky-buying-title">
      <header data-reveal="">
        <h2 id="sky-buying-title">Before we<br /> get started.</h2>
      </header>
      <div className="sky-buying-answers" data-reveal-group="">
        {homeCopy.questions.map(({ question, answer, link }) => (
          <details key={question}>
            <summary>{question}<SkyArrow direction="down" /></summary>
            <p>{answer}{link && <> <Link href={link.href}>{link.label}</Link></>}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
