/**
 * Detailed case study data for individual case study pages.
 * Anonymized until customer approval is received.
 * To de-anonymize: update name, tag, and set approved: true.
 */

export interface CaseStudyDetail {
  slug: string;
  approved: boolean;
  tag: string;
  name: string;
  title: string;
  ogTitle: string;
  ogDescription: string;
  hero: {
    headline: string;
    subheadline: string;
    stats: { value: string; label: string }[];
  };
  challenge: {
    headline: string;
    paragraphs: string[];
  };
  solution: {
    headline: string;
    steps: { title: string; description: string }[];
  };
  results: {
    headline: string;
    rows: { metric: string; before: string; after: string }[];
  };
  quote?: {
    text: string;
    attribution: string;
  };
  unlock: {
    headline: string;
    items: string[];
  };
}

export const caseStudies: CaseStudyDetail[] = [
  {
    slug: "content-agency-replacement",
    approved: false,
    tag: "Independent Label",
    name: "Major Independent Label",
    title: "Replaced a $5,000/Month Content Agency",
    ogTitle: "Case Study: Replaced a $5K/Month Content Agency | Recoup",
    ogDescription:
      "How an independent label eliminated their content agency retainer and generated 30 days of content in a single session with Recoup's AI agents.",
    hero: {
      headline: "Replaced a $5,000/month content agency",
      subheadline:
        "An independent label with an active roster and distribution arm replaced their external content agency with Recoup — same budget, 10x the output, plus a new revenue stream.",
      stats: [
        { value: "$5K/mo", label: "Agency spend eliminated" },
        { value: "30 days", label: "Of content in one session" },
        { value: "$0", label: "Net cost change" },
      ],
    },
    challenge: {
      headline: "The Challenge",
      paragraphs: [
        "The label was paying $5,000 per month for an external content creation agency on retainer. The agency produced social media assets, album visualizers, and promotional content for their artists. Briefs went out, revisions went back and forth, and turnaround was measured in days — not minutes.",
        "For a label releasing multiple projects per month, this bottleneck meant some artists got content and others didn't. Meanwhile, staff hours were consumed by manual research tasks — pulling streaming data, monitoring social metrics, and compiling release reports that no one had time to act on.",
      ],
    },
    solution: {
      headline: "The Solution",
      steps: [
        {
          title: "Content pipeline",
          description:
            "Face guides, brand voice documents, and song libraries were set up for priority artists. The team could generate 30 days of social content in a single session — branded, artist-specific, ready to post.",
        },
        {
          title: "Automated reporting",
          description:
            "Weekly release reports that previously required manual data pulls were automated through Recoup's task system. Staff received reports every Monday morning without lifting a finger.",
        },
        {
          title: "AI artist creation",
          description:
            "A new AI artist was created entirely on the platform. 22 finished videos were produced in one session with zero editing. The label's A&R team reviewed the music — and couldn't tell it was AI. The project became a co-owned venture.",
        },
      ],
    },
    results: {
      headline: "The Results",
      rows: [
        {
          metric: "Content agency spend",
          before: "$5,000/month",
          after: "$0 (eliminated)",
        },
        {
          metric: "Content turnaround",
          before: "3–5 days per batch",
          after: "Minutes per batch",
        },
        {
          metric: "Content volume",
          before: "Limited by agency bandwidth",
          after: "30 days generated in one session",
        },
        {
          metric: "Release reporting",
          before: "Manual (5+ staff hours/week)",
          after: "Automated (Monday delivery)",
        },
        {
          metric: "New revenue stream",
          before: "N/A",
          after: "Co-owned AI artist",
        },
      ],
    },
    quote: {
      text: "We were paying an agency the same amount to do a fraction of what Recoup handles for us. The content turnaround alone would have justified it.",
      attribution: "Label Executive",
    },
    unlock: {
      headline: "What This Unlocked",
      items: [
        "Eliminated a $60K/year agency retainer",
        "Every artist on the roster gets content — not just priority acts",
        "Staff time redirected from content production to strategy",
        "New co-owned IP generating revenue from day one",
      ],
    },
  },
  {
    slug: "creative-director-replacement",
    approved: false,
    tag: "Hip-Hop & Culture Label",
    name: "Iconic Independent Label",
    title: "Replaced a $10,000/Month Creative Director",
    ogTitle: "Case Study: Replaced a $10K/Month Creative Director | Recoup",
    ogDescription:
      "How a legendary hip-hop label got complete album campaign assets in 72 hours instead of 3 weeks — and eliminated a $10K/month creative director retainer.",
    hero: {
      headline: "Replaced a $10,000/month creative director",
      subheadline:
        "A legendary independent label replaced their album rollout creative director with Recoup's AI agents. 3 weeks became 72 hours. $10K/month became $0.",
      stats: [
        { value: "$10K/mo", label: "Retainer eliminated" },
        { value: "72 hrs", label: "Brief to campaign assets" },
        { value: "3 weeks → 3 days", label: "Time compression" },
      ],
    },
    challenge: {
      headline: "The Challenge",
      paragraphs: [
        "The label was spending approximately $10,000 per month on a creative director for a major album rollout. Responsibilities included developing campaign assets — social media visuals, promotional materials, content calendars, and marketing collateral.",
        "The typical timeline from brief to final deliverables was 2–3 weeks, with multiple rounds of revisions. For a label managing tight release schedules and competing for attention in a crowded market, three weeks of lead time meant either starting campaigns late or stockpiling assets far in advance.",
      ],
    },
    solution: {
      headline: "The Solution",
      steps: [
        {
          title: "Artist context loading",
          description:
            "The founding team worked directly with the label to load artist context — brand voice, visual references, song files, audience data — into Recoup's platform.",
        },
        {
          title: "Full campaign generation",
          description:
            "The complete set of campaign assets for the album rollout was generated: social visuals, promotional materials, content calendar — all in a single coordinated session.",
        },
        {
          title: "Pipeline foundation",
          description:
            "The assets didn't just serve one album. They became the foundation for the label's ongoing release pipeline, proving the approach was sustainable — not a one-time trick.",
        },
      ],
    },
    results: {
      headline: "The Results",
      rows: [
        {
          metric: "Creative director retainer",
          before: "$10,000/month",
          after: "$0 (eliminated for this campaign)",
        },
        {
          metric: "Time to campaign assets",
          before: "2–3 weeks",
          after: "72 hours",
        },
        {
          metric: "Revision cycles",
          before: "3–5 rounds",
          after: "Generated on-brand from artist context",
        },
        {
          metric: "Asset reusability",
          before: "One-off campaign",
          after: "Powers entire release pipeline",
        },
      ],
    },
    quote: {
      text: "We got in 72 hours what used to take us three weeks and $10K. And the assets weren't throwaway — they set the tone for everything we've released since.",
      attribution: "Label Head of Marketing",
    },
    unlock: {
      headline: "What This Unlocked",
      items: [
        "Album rollouts launch on time — every time",
        "Creative budget redirected to artist development",
        "Consistent brand quality across all releases",
        "A repeatable pipeline, not a one-off project",
      ],
    },
  },
  {
    slug: "reporting-automation",
    approved: false,
    tag: "Major Label (Warner Music Group)",
    name: "Warner Music Group Label",
    title: "Automated 40+ Hours of Monthly Reporting",
    ogTitle: "Case Study: Automated 40+ Hours of Monthly Reporting | Recoup",
    ogDescription:
      "How a Warner Music Group label freed 5 employees from manual reporting and saved $36–60K/year in staff time with Recoup's automated release reports.",
    hero: {
      headline: "Automated 40+ hours of monthly reporting",
      subheadline:
        "A Warner Music Group label with decades of catalog and an active roster automated their entire weekly release reporting workflow — freeing five employees for strategic work.",
      stats: [
        { value: "5 → 0", label: "Employees on reports" },
        { value: "40+ hrs/mo", label: "Manual work eliminated" },
        { value: "$36–60K/yr", label: "Staff time saved" },
      ],
    },
    challenge: {
      headline: "The Challenge",
      paragraphs: [
        "Every week, the label's team compiled release reports covering streaming performance, playlist additions, social media growth, and competitive positioning for each new release. This process required five employees contributing a combined 40+ hours per month — roughly $3,000–$5,000 in staff time.",
        "The reports were essential for A&R decisions, marketing prioritization, and artist updates. But the work was entirely manual: log into Spotify for Artists, check Apple Music analytics, cross-reference playlist databases, pull social media numbers, compile into a template, distribute to stakeholders. Every week, the same steps.",
      ],
    },
    solution: {
      headline: "The Solution",
      steps: [
        {
          title: "Automated data collection",
          description:
            "Streaming numbers, playlist adds, social growth, and audience demographics pulled automatically from Chartmetric, Spotify, and social APIs.",
        },
        {
          title: "Structured report generation",
          description:
            "Reports formatted to the label's existing internal standards — structured, templated, and consistent. No reformatting required.",
        },
        {
          title: "Automatic distribution",
          description:
            "Reports delivered to relevant stakeholders every Monday morning — no human intervention. The team shows up to insights already waiting.",
        },
      ],
    },
    results: {
      headline: "The Results",
      rows: [
        {
          metric: "Staff on weekly reports",
          before: "5 employees",
          after: "0 (automated)",
        },
        {
          metric: "Hours per month",
          before: "40+",
          after: "0 (automated)",
        },
        {
          metric: "Estimated staff cost saved",
          before: "$3,000–$5,000/month",
          after: "Reallocated to strategic work",
        },
        {
          metric: "Report delivery",
          before: "End of week (manual)",
          after: "Monday 8 AM (automatic)",
        },
        {
          metric: "Data freshness",
          before: "Delayed (manual pull)",
          after: "Real-time (API-connected)",
        },
      ],
    },
    quote: {
      text: "We had five people spending their Mondays pulling numbers. Now the reports are waiting for us when we get in. The team can actually think about what the numbers mean instead of spending all their time gathering them.",
      attribution: "Head of Operations",
    },
    unlock: {
      headline: "What This Unlocked",
      items: [
        "Five employees freed for A&R scouting, campaign strategy, and artist relationships",
        "Reports arrive before the team does — every Monday at 8 AM",
        "Data-driven decisions based on real-time numbers, not last week's manual pull",
        "Consistent reporting quality regardless of team turnover",
      ],
    },
  },
];

export function getCaseStudy(slug: string): CaseStudyDetail | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

/** Summary cards for the /results index page */
export const caseStudySummaries = caseStudies.map((cs) => ({
  slug: cs.slug,
  tag: cs.tag,
  title: cs.title,
  stats: cs.hero.stats,
  description: cs.hero.subheadline,
}));
