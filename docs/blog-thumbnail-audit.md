# Blog thumbnail audit — September 14, 2026

Scope: 26 published posts: one featured guide and 25 archive entries. Read against `content/blog/posts.json`, the published source, and the article excerpts/section content. Inspected all five original cover images in the browser.

## Findings

- 20 archive articles used only three generic illustrations: Research / Create / Review (9), One story / More ways to tell it (7), Before / Release / Beyond (4).
- The artwork was selected by list position (`i % 3`), not subject. Some broad marketing matches were reasonable, but the repeated slogans obscured the differences between A&R, distribution, staffing, cost, and marketing topics.
- Five archive articles had distinct original covers. Retain one; replace four with simpler, more specific compositions.
- Retain the featured guide’s existing decision-framework illustration.
- Result: 24 new article-specific vector illustrations, two retained covers, and no reused compositions. Shared palette and drawing primitives maintain brand consistency without rotating whole thumbnails.

## Article-by-article decisions

| Article | Decision | Previous issue / keep reason | New composition |
| --- | --- | --- | --- |
| [The Music Executive's Guide to AI Agents: What to Buy, What to Build, What to Ignore](/blog/music-executive-guide-ai-agents) | Keep | Buy / Build / Ignore is the article’s actual decision framework. | Original retained |
| [Why Artists Need AI Agents, Not AI Tools](/blog/why-artists-need-ai-agents) | Replace | Reused “Research / Create / Review” art; does not distinguish this article’s specific workflow. | FROM A TASK TO A WORKFLOW |
| [How to Create a Month of Content in One Day](/blog/ai-content-creation-musicians) | Replace | Reused “One story / More ways to tell it” art; does not distinguish this article’s specific workflow. | BUILD A MONTH OF CONTENT |
| [The Complete Music Release Strategy for 2026](/blog/music-release-strategy-2026) | Replace | Reused “Before / Release / Beyond” art; does not distinguish this article’s specific workflow. | PLAN THE WHOLE RELEASE |
| [AI A&R: How Labels Are Using AI to Find the Next Hit Artist](/blog/ai-ar-artist-discovery) | Replace | Reused “Research / Create / Review” art; does not distinguish this article’s specific workflow. | A&R · FIND THE SIGNAL |
| [Your Catalog Is Dying. AI Agents Can Revive It.](/blog/ai-catalog-marketing-passive-revenue) | Replace | Reused “Research / Create / Review” art; does not distinguish this article’s specific workflow. | GIVE THE BACK CATALOG A NEW BRIEF |
| [AI for Record Labels: How Smart Labels Are Cutting Costs and Scaling Output](/blog/ai-for-record-labels) | Replace | Reused “Research / Create / Review” art; does not distinguish this article’s specific workflow. | THE LABEL MARKETING DESK |
| [AI for Music Distributors: Automate the Ops That Are Killing Your Margins](/blog/ai-music-distribution-automation) | Replace | Reused “One story / More ways to tell it” art; does not distinguish this article’s specific workflow. | DISTRIBUTION · METADATA & QC |
| [The Best AI Tools for Music Managers in 2026](/blog/ai-music-manager-tools) | Replace | Reused “One story / More ways to tell it” art; does not distinguish this article’s specific workflow. | CHOOSE TOOLS BY THE WORK |
| [The ROI of AI Music Marketing: What the Numbers Say](/blog/ai-music-marketing-roi) | Replace | Reused “Research / Create / Review” art; does not distinguish this article’s specific workflow. | MEASURE THE NET BENEFIT |
| [How AI is Changing Music Marketing](/blog/ai-music-marketing) | Replace | Reused “Research / Create / Review” art; does not distinguish this article’s specific workflow. | CONTEXT MAKES THE CAMPAIGN |
| [Why Labels Are Replacing Marketing Teams with AI Agents](/blog/ai-replacing-music-marketing-teams) | Replace | Reused “One story / More ways to tell it” art; does not distinguish this article’s specific workflow. | AUDIT THE WORK BEFORE THE ORG CHART |
| [How Labels Use AI in 2026: From Catalog Reactivation to Autonomous Marketing](/blog/how-labels-use-ai) | Replace | Reused “Before / Release / Beyond” art; does not distinguish this article’s specific workflow. | FIVE WORKFLOWS FOR LABEL TEAMS |
| [How Much Does AI Music Marketing Actually Cost? A Real Breakdown](/blog/how-much-does-ai-music-marketing-cost) | Replace | Reused “Before / Release / Beyond” art; does not distinguish this article’s specific workflow. | BUDGET BEYOND THE SUBSCRIPTION |
| [The Independent Artist's Marketing Guide: No Label, No Budget, No Problem](/blog/independent-artist-marketing-guide) | Replace | Reused “One story / More ways to tell it” art; does not distinguish this article’s specific workflow. | A SMALL-BUDGET ARTIST PLAN |
| [AI for Music Managers: Automate the Busywork, Keep the Relationships](/blog/ai-for-music-managers) | Replace | Reused “One story / More ways to tell it” art; does not distinguish this article’s specific workflow. | ARTIST MANAGEMENT |
| [AI Music Marketing: The Complete Guide for 2026](/blog/ai-music-marketing-guide-2026) | Replace | Reused “Research / Create / Review” art; does not distinguish this article’s specific workflow. | THE MUSIC MARKETING WORKFLOW |
| [AI Playlist Pitching: How to Get More Placements Without More Hours](/blog/ai-playlist-pitching) | Replace | Reused “One story / More ways to tell it” art; does not distinguish this article’s specific workflow. | PLAYLIST FIT BEFORE THE PITCH |
| [ChatGPT vs. Music AI Agents: Why Generic AI Falls Short](/blog/chatgpt-vs-music-ai-agents) | Replace | Reused “Research / Create / Review” art; does not distinguish this article’s specific workflow. | GENERAL CHAT / MUSIC WORKFLOWS |
| [Meta Bought Manus Because Agents Still Break](/blog/meta-bought-manus-agents-break) | Replace | Reused “Research / Create / Review” art; does not distinguish this article’s specific workflow. | AGENT RELIABILITY · THE MISSING LAYER |
| [Why Music Labels Are Hiring AI Agents Instead of More Interns](/blog/music-label-ai-agents) | Replace | Reused “Before / Release / Beyond” art; does not distinguish this article’s specific workflow. | AGENTS IN LABEL OPERATIONS |
| [Recoup in 2026](/blog/recoup-in-2026) | Replace | Old homepage screenshot promotes the product generally; it does not show this article’s annual roadmap. | RECOUP · THE 2026 ROADMAP |
| [Sandbox for Record Labels](/blog/sandbox-for-record-labels) | Replace | The literal sandbox scene was off-brand. Replace with a label file tree and Bash workspace using the shared palette. | A WORKSPACE FOR YOUR LABEL’S AGENT |
| [Open Labels](/blog/open-labels) | Replace | Relevant but dense launch graphic; small text and numerous interface panels are illegible as a thumbnail. | THE PROGRAMMABLE RECORD LABEL |
| [Install the Recoup Skills & Plugins Marketplace on Claude Desktop](/blog/install-marketplace-claude-desktop) | Keep | Simple Recoup Skills cover identifies the product in the installation guide. | Original retained |
| [Bring your own agent](/blog/bring-your-own-agent) | Replace | Relevant plugin screenshot but crop loses context; a connection diagram communicates the central idea more clearly. | YOUR AGENT. RECOUP’S MUSIC TOOLS. |

## Implementation

`app/blog/article-art.tsx` owns the slug-specific native SVG scenes. `BlogArt` retains the approved original Skills cover and the featured guide. Article body copy and full-size historical cover images are unchanged. All 25 archive entries use one continuous thumbnail grid, without search/filter controls or a text-only archive break.

New scenes illustrate processes, not measured results: no fabricated performance metrics, revenue gains, or hit predictions. Labels and major subjects stay inside the 800 × 500 viewBox; the thumbnail preserves that ratio on phones.
