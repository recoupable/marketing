import { homeHeroCopy as hero } from "./home-hero.ts";
import { catalogDemo } from "../catalog-demo/catalogDemo.ts";
import {
  formatRoyaltyExampleMoney,
  royaltyExample,
} from "../sky-royalty-example.ts";
import { absoluteUrl } from "../seo.ts";

export function homeHeroMarkdown(): string {
  const { data, royalty, build, investment, skills, catalog } = hero.cards;
  return [
    `# ${hero.title.join(" ")}`,
    `Source: ${absoluteUrl("/")}`,
    `[${hero.announcement.badge}: ${hero.announcement.label}](${absoluteUrl(hero.announcement.href)})`,
    hero.description,
    `## ${hero.cards.title}`,
    "The workflow cards use illustrative figures and sample catalog entries, not client data.",
    `### [${data.title.join(" ")}](${absoluteUrl(data.href)})`,
    data.files.join(" · "),
    data.caption,
    `### [${royalty.title}](${absoluteUrl(royalty.href)})`,
    royalty.period,
    `${royalty.total}: ${formatRoyaltyExampleMoney(royaltyExample.statementCents)}`,
    `- ${royalty.statements}: ${formatRoyaltyExampleMoney(royaltyExample.statementCents)}\n- ${royalty.receipts}: ${formatRoyaltyExampleMoney(royaltyExample.receiptCents)}\n- ${royaltyExample.exceptionCount} ${royalty.differences}`,
    `### [${build.title.join(" ")}](${absoluteUrl(build.href)})`,
    build.caption,
    build.tags.join(" · "),
    `### [${investment.title}](${absoluteUrl(investment.href)})`,
    `${investment.assumption}: ${investment.share}% ${investment.shareLabel}`,
    investment.files.join(" · "),
    investment.question,
    `### [${skills.label}](${absoluteUrl(skills.href)})`,
    skills.title.join(" "),
    skills.caption,
    skills.tags.join(" · "),
    `### [${catalog.title}](${absoluteUrl(catalog.href)})`,
    catalog.search,
    catalogDemo.catalog
      .slice(0, 3)
      .map((track) => `- ${track.title} — ${track.artist}`)
      .join("\n"),
    catalog.caption,
    `## ${hero.proof}`,
    hero.customers.map((customer) => customer.name).join(" · "),
  ].join("\n\n");
}
