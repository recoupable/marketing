import { homeCopy as home } from "./home.ts";
import { homeOffersCopy as offers } from "./home-offers.ts";
import { homeCaseStudiesCopy as cases } from "./home-case-studies.ts";
import { homeHeroMarkdown } from "./homeHeroMarkdown.ts";
import { homePricingMarkdown } from "./homePricingMarkdown.ts";
import { planPrice } from "../pricing.ts";
import { absoluteUrl } from "../seo.ts";

/** The homepage's full editorial content, in the same order as SkyHero and SkyContent. */
export function homeToMarkdown(): string {
  return (
    [
      homeHeroMarkdown(),
      home.statement.join(" "),
      `## ${offers.services.eyebrow}: ${offers.services.title}`,
      `[${offers.services.auditLabel}](${absoluteUrl("/start-project")})`,
      ...offers.services.offers.flatMap((offer) => [
        `### ${offer.title}`,
        offer.summary,
        `[${offer.link}](${absoluteUrl(offer.href)})`,
      ]),
      `## ${cases.eyebrow}: ${cases.title}`,
      `[${cases.allLabel}](${absoluteUrl("/case-studies")})`,
      ...cases.projects.flatMap((project) => [
        `### ${project.title}`,
        project.audience,
        project.story,
        `[${cases.readLabel}](${absoluteUrl(project.href)})`,
      ]),
      cases.disclosure,
      `## ${offers.process.eyebrow}: ${offers.process.title}`,
      ...offers.process.steps.flatMap((step, index) => [
        `### ${offers.process.stepLabel} 0${index + 1}: ${step.title}`,
        step.copy,
      ]),
      offers.process.scope,
      `## ${home.ownership.eyebrow}: ${home.ownership.title.join(" ")}`,
      ...home.ownership.deliverables.map(
        (item) => `- **${item.title}** ${item.description}`,
      ),
      home.ownership.terms,
      homePricingMarkdown(),
      `## ${home.tools.eyebrow}: ${home.tools.title.join(" ")}`,
      home.tools.introduction,
      `### ${home.tools.platformLabel}: ${home.tools.platformTitle.join(" ")}`,
      home.tools.platform,
      `${planPrice("platform", "monthly").monthly} / month. ${home.tools.platformIncludes}`,
      `[${home.tools.platformAction}](${absoluteUrl("/platform")})`,
      `### ${home.tools.skillsLabel}: ${home.tools.skillsTitle.join(" ")}`,
      home.tools.skills,
      `[${home.tools.skillsAction}](${absoluteUrl("/skills")})`,
      `### ${home.tools.developersLabel}: ${home.tools.developersTitle.join(" ")}`,
      home.tools.developers,
      `[${home.tools.developersAction}](${absoluteUrl("/developers")})`,
      `## ${home.questionsTitle.join(" ")}`,
      ...home.questions.flatMap(({ question, answer, link }) => [
        `### ${question}`,
        answer,
        ...(link ? [`[${link.label}](${absoluteUrl(link.href)})`] : []),
      ]),
      `## ${home.contact.title}`,
      home.contact.description,
      `[${home.contact.action}](${absoluteUrl("/start-project")})`,
      home.contact.note,
    ].join("\n\n") + "\n"
  );
}
