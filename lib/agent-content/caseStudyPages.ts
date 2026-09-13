import { caseStudies } from "../case-studies.ts";
import type { PageSummary } from "./types.ts";

export const caseStudyPages: PageSummary[] = [
  {
    path: "/case-studies",
    title: "Recoup project stories",
    description:
      "Anonymized accounts of royalty reporting, investment preparation, and catalog intelligence work.",
    keywords:
      "case studies project stories implementation royalties investment catalog",
    paragraphs: [
      "These stories describe documented work with music teams. Illustrations show the methods, not client financial data. They do not claim measured revenue gains or ROI.",
    ],
    links: caseStudies.map((study) => [
      study.title,
      `/case-studies/${study.slug}`,
    ]),
  },
  ...caseStudies.map(
    (study): PageSummary => ({
      path: `/case-studies/${study.slug}`,
      title: study.title,
      description: study.summary,
      keywords: `case study project story ${study.category} ${study.audience} ${study.deliverable}`,
      paragraphs: [
        study.change,
        ...study.problem.paragraphs,
        ...study.outcome.paragraphs,
        study.scope,
      ],
      links: [
        [study.nextLabel, study.nextHref],
        ["Discuss a similar project", "/contact"],
        ["All project stories", "/case-studies"],
      ],
    }),
  ),
];
