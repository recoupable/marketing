import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Your AI Music Marketing Playbook | Recoupable",
  description: "Download the AI Music Marketing Playbook.",
  path: "/playbook/download",
});

/* ── Chapter data ──────────────────────────────────────────────────── */

const chapters = [
  {
    number: "01",
    title: "The New Economics of Music Marketing",
    sections: [
      {
        heading: "The Old Math Is Broken",
        content: `A social media manager costs $3,000–$6,000/month. A freelance content creator runs $1,500–$4,000. A PR agency? $2,000–$10,000. For an independent artist or small label, that's $6,500–$20,000/month before you've spent a dollar on ads.

AI agents cost $50–$500/month and work 24/7. They don't take vacations. They don't ghost you. They don't need briefs or mood boards. The math isn't close.`,
      },
      {
        heading: "What AI Agents Actually Do (vs. AI Tools)",
        content: `An AI **tool** helps you write a caption faster. An AI **agent** writes the caption, schedules it, monitors engagement, adjusts the copy for the next post based on what worked, and does it across every platform — without you touching it.

Tools are hammers. Agents are employees. The distinction matters because it changes your operating model from "do things faster" to "stop doing those things entirely."`,
      },
      {
        heading: "The Cost Comparison",
        content: `| Task | Human Cost/mo | AI Agent Cost/mo |
|---|---|---|
| Social media management (3 platforms) | $3,000–$6,000 | $50–$200 |
| Content creation (30 posts/mo) | $1,500–$4,000 | $20–$100 |
| Fan engagement & DM responses | $1,000–$2,000 | $10–$50 |
| Analytics & reporting | $500–$1,500 | $0 (built in) |
| Release campaign management | $2,000–$5,000 per release | $100–$300 |
| **Total** | **$8,000–$18,500** | **$180–$650** |

These aren't theoretical. These are real costs from real artists and labels we work with.`,
      },
    ],
  },
  {
    number: "02",
    title: "Building Your Content Engine",
    sections: [
      {
        heading: "The Batch Method: 30 Days in One Sitting",
        content: `Stop creating content daily. It's inefficient and it burns you out. Instead:

1. **Block 2 hours once a month** for content creation
2. **Feed your AI agent** your latest music, press, and fan data
3. **Generate 60–90 content pieces** across formats (carousels, short-form video scripts, captions, stories)
4. **Curate the top 30** — your agent ranks them by predicted engagement
5. **Schedule everything** — the agent handles posting, timing optimization, and cross-platform adaptation

The key insight: AI agents don't just create content. They create *content systems*. The output improves every month because the agent learns what your audience responds to.`,
      },
      {
        heading: "Prompt Templates That Actually Work",
        content: `**For Instagram Carousels:**
"Create a 7-slide Instagram carousel for [ARTIST NAME] about [TOPIC]. Audience: [DEMOGRAPHIC]. Tone: [authentic/hype/vulnerable/educational]. Include a hook on slide 1, value on slides 2-6, and a CTA on slide 7. Reference recent track [SONG NAME]."

**For Twitter/X Threads:**
"Write a 5-tweet thread from [ARTIST NAME]'s perspective about [TOPIC]. Make tweet 1 a bold hook. Tweets 2-4 should tell a story. Tweet 5 should drive to [LINK/ACTION]. Voice: first-person, conversational, no hashtags."

**For Short-Form Video Scripts (TikTok/Reels):**
"Write a 30-second video script for [ARTIST NAME]. Hook in first 3 seconds: [PATTERN INTERRUPT]. Middle: [STORY/REVEAL]. End: [CTA]. Include on-screen text suggestions and a trending sound recommendation."

**For Release Announcements:**
"Create 5 variations of a release announcement for [SONG/ALBUM NAME] by [ARTIST NAME]. Dropping [DATE]. Each should hit a different angle: emotional, hype, behind-the-scenes, fan-focused, and mysterious/teaser."`,
      },
      {
        heading: "The Content Flywheel",
        content: `Once your agent is creating and posting, it starts collecting data. Use that data to fuel the next cycle:

- **Top-performing posts** → agent creates more in that style
- **Comment themes** → agent identifies what fans care about → new content angles
- **Low performers** → agent stops creating that type
- **Engagement patterns** → agent optimizes posting times

After 90 days, your content engine is essentially self-tuning. Your only job is approving the queue.`,
      },
    ],
  },
  {
    number: "03",
    title: "Audience Research on Autopilot",
    sections: [
      {
        heading: "Finding Your Listeners' Digital Footprint",
        content: `Your AI agent can analyze:

- **Spotify listener data** → demographics, location, listening habits
- **Social followers** → who they also follow, what they engage with, when they're online
- **Similar artist audiences** → fans of Artist X who don't know you yet
- **Playlist placement patterns** → which curators feature artists like you

This used to take a marketing team weeks. An agent does it in minutes and updates it continuously.`,
      },
      {
        heading: "Building Targeting Profiles",
        content: `From the raw data, your agent builds actionable profiles:

**Profile Example:**
- Age: 22–28
- Location: Atlanta, Houston, London, Lagos
- Platforms: TikTok (primary), Instagram (secondary), Spotify
- Peak activity: 9–11 PM local time
- Content preferences: behind-the-scenes, raw/unfiltered, short clips of unreleased music
- Similar artists they follow: [Artist A], [Artist B], [Artist C]
- Trigger topics: production process, studio life, independent hustle

Every ad, every post, every collaboration decision should reference these profiles.`,
      },
      {
        heading: "Competitive Intelligence",
        content: `Your agent monitors competitors (similar artists at your level) and reports:

- What content formats are working for them
- When they're releasing music
- Which playlists they're landing
- What their fans are saying
- Gaps in their content you can fill

This isn't about copying. It's about understanding the landscape and moving strategically.`,
      },
    ],
  },
  {
    number: "04",
    title: "The Release Strategy Framework",
    sections: [
      {
        heading: "Phase 1: Pre-Release (4–6 Weeks Out)",
        content: `**Week 1–2: Seed Phase**
- Agent creates and posts teaser content (studio snippets, lyric hints)
- Agent identifies and engages with 50 playlist curators via personalized messages
- Agent begins daily engagement with target fan communities

**Week 3–4: Build Phase**
- Release announcement content (5 variations across platforms)
- Pre-save campaign launched (agent manages the landing page and tracks conversions)
- Agent pitches 20 blogs and music publications with personalized angles
- Behind-the-scenes content ramps up (2x/day across platforms)

**Week 5–6: Hype Phase**
- Countdown content series
- Agent engages every commenter and DM asking about the release
- Influencer/creator outreach (agent sends personalized briefs with the track)
- Email list activation (agent drafts and sends 3-email sequence)`,
      },
      {
        heading: "Phase 2: Launch Week",
        content: `**Day -1 (Eve):**
- Final teaser post at peak engagement time
- Agent sends "tomorrow" email to full list
- Agent preps 24 hours of content for release day

**Day 0 (Release Day):**
- Staggered posts every 2–3 hours across all platforms
- Agent responds to every comment, share, and mention within 15 minutes
- Real-time monitoring: streams, saves, playlist adds
- Agent sends "it's out" email with direct links

**Days 1–7:**
- Agent shares fan reactions, milestones, and user-generated content
- Daily engagement report to you (what's working, what needs attention)
- Agent adjusts content mix based on real-time performance
- Follow-up with playlist curators who haven't responded`,
      },
      {
        heading: "Phase 3: Long Tail (Weeks 2–12)",
        content: `Most artists stop promoting after week 1. That's where the money is left on the table.

- Agent continues posting 3–5x/week about the track (new angles, fan stories, live clips)
- Agent monitors TikTok for organic usage and amplifies any fan-created content
- Agent pitches the track to "discovery" playlists (the ones that add older tracks)
- Agent creates "one month later" reflection content
- Agent begins seeding the next release by connecting it to this one

**The compounding effect:** Each release builds on the last. Your agent learns what worked, what didn't, and applies those lessons to the next cycle.`,
      },
    ],
  },
  {
    number: "05",
    title: "The Manager's AI Stack",
    sections: [
      {
        heading: "Managing 3–10 Artists Without Losing Your Mind",
        content: `If you manage multiple artists, you know the math doesn't work. Each artist needs:
- Daily social media management
- Content creation
- Fan engagement
- Release planning
- Playlist pitching
- Analytics tracking

That's 6 workflows × N artists. Without AI, you either hire a team (expensive) or things slip through cracks (dangerous).

**With AI agents, each artist gets their own dedicated agent.** The agent knows the artist's voice, audience, release schedule, and goals. You oversee the agents, not the tasks.`,
      },
      {
        heading: "The Manager's Dashboard",
        content: `Your daily workflow becomes:

1. **Morning (10 min):** Review overnight activity across all artists — agent summarizes key metrics, flags anything needing attention
2. **Content approval (15 min):** Scroll through the content queue, approve/adjust/reject. Agent handles the rest.
3. **Strategic decisions (as needed):** Agent surfaces opportunities (trending sounds, collab possibilities, playlist openings) and you decide yes/no
4. **Weekly (30 min):** Review performance reports across all artists. Agent highlights wins, concerns, and recommendations.

Total daily time per artist: ~10–15 minutes. Down from 2–4 hours.`,
      },
      {
        heading: "Tools That Stack With AI Agents",
        content: `- **Recoupable** — AI agents purpose-built for music marketing (content, engagement, analytics)
- **DistroKid / TuneCore** — Distribution (agent tracks release status and reports)
- **Chartmetric / Soundcharts** — Data feeds that make your agent smarter
- **Canva** — Design integration for visual content (agent generates briefs, you approve)
- **Notion / Airtable** — Project management layer (agent updates status, creates tasks)
- **Mailchimp / ConvertKit** — Email (agent drafts sequences, you approve sends)`,
      },
    ],
  },
  {
    number: "06",
    title: "Label Operations: Scaling Without Scaling Headcount",
    sections: [
      {
        heading: "The Label's AI Playbook",
        content: `For labels with 5–50 artists, AI agents transform your operation:

**Catalog Marketing:** Every track in your catalog is an asset. AI agents can resurface old releases with new content, pitch them to playlists, and find sync licensing opportunities — without adding headcount.

**A&R Intelligence:** Agents monitor trending sounds, emerging artists, and fan sentiment across platforms. They surface opportunities your A&R team would miss because no human can track everything.

**Royalty & Analytics:** Agents compile cross-platform performance data into unified reports. No more pulling numbers from 8 different dashboards.

**Artist Services:** Each signed artist gets a dedicated AI agent for marketing support. Your team focuses on strategy and relationships while agents handle execution.`,
      },
      {
        heading: "Implementation Roadmap for Labels",
        content: `**Month 1: Foundation**
- Deploy AI agents for your top 3 artists (highest ROI, fastest learning)
- Set up content approval workflows
- Integrate with your existing tools (distributor, analytics, CRM)

**Month 2: Scale**
- Expand to all active artists
- Activate catalog marketing agents
- Begin A&R intelligence monitoring

**Month 3: Optimize**
- Review 60-day performance data
- Tune agent strategies based on results
- Identify cost savings and reallocate budget to growth

**Expected outcomes by Month 3:**
- 40–60% reduction in marketing ops time
- 2–3x increase in content output per artist
- 15–25% improvement in engagement rates
- Full catalog receiving active marketing attention (vs. top 10% only)`,
      },
    ],
  },
  {
    number: "07",
    title: "Getting Started Today",
    sections: [
      {
        heading: "Your First 24 Hours",
        content: `1. **Audit your current marketing stack** — list every tool, every person, every hour spent on marketing per week
2. **Identify the highest-volume task** — what eats the most time? Content creation? Engagement? Reporting? Start there.
3. **Set up your first AI agent** — connect your social accounts, feed it your brand voice, and let it generate a week of content
4. **Review and approve** — don't auto-post on day one. Review everything. Adjust the voice. Train the agent.
5. **Go live** — approve the queue, let the agent post, and watch the data come in

**The cost of waiting:** Every month without AI agents is $3,000–$18,000 in human costs (or the equivalent in hours you'll never get back). The artists who adopt now build compound advantages that late adopters can't catch.`,
      },
      {
        heading: "Ready for Hands-On Help?",
        content: `If you want a custom AI strategy for your specific situation — your roster, your catalog, your goals — book a strategy session with Sidney Swift.

**What you get:**
- 90-minute deep dive into your operations
- Custom AI readiness report
- Implementation roadmap tailored to your business
- 30-day email follow-up

**Book at:** recoupable.com/advisory

Or start with the product: **chat.recoupable.com** — try Recoupable's AI agents free.`,
      },
    ],
  },
];

/* ── Components ────────────────────────────────────────────────────── */

function ChapterSection({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">{heading}</h3>
      {content.split("\n\n").map((para, i) => (
        <p
          key={i}
          className="text-[14px] leading-relaxed text-[var(--muted-foreground)] mb-4 whitespace-pre-line"
        >
          {para}
        </p>
      ))}
    </div>
  );
}

function Chapter({
  chapter,
}: {
  chapter: (typeof chapters)[number];
}) {
  return (
    <section className="mb-16">
      <div className="flex items-baseline gap-4 mb-6 border-b border-[var(--border)] pb-4">
        <span
          className="text-3xl font-bold text-[var(--muted-foreground)]/30"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {chapter.number}
        </span>
        <h2 className="text-2xl font-bold tracking-tight">
          {chapter.title}
        </h2>
      </div>
      {chapter.sections.map((section, i) => (
        <ChapterSection key={i} heading={section.heading} content={section.content} />
      ))}
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default function PlaybookDownloadPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="text-center mb-16">
        <div className="inline-block rounded-full border border-green-500/30 bg-green-500/5 px-4 py-1.5 text-xs font-medium tracking-wide text-green-400 mb-6">
          ✓ Your Playbook
        </div>
        <h1
          className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight leading-[1.1] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          The AI Music Marketing Playbook
        </h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          By Sidney Swift — Grammy-winning producer, US patent holder, founder
          of Recoupable
        </p>
      </header>

      {/* Chapters */}
      {chapters.map((chapter) => (
        <Chapter key={chapter.number} chapter={chapter} />
      ))}

      {/* Bottom CTA */}
      <div className="rounded-2xl border border-[var(--border)] bg-[#080808] p-10 text-center mt-12">
        <h2
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          Ready to implement?
        </h2>
        <p className="text-sm text-[var(--muted-foreground)] mb-6 max-w-md mx-auto">
          Book a strategy session with Sidney to get a custom AI roadmap for
          your label, management company, or artist career.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/advisory"
            className="rounded-lg bg-white text-black px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Book Advisory Session →
          </Link>
          <Link
            href="https://chat.recoupable.com"
            className="rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-semibold hover:bg-white/5 transition-colors"
          >
            Try Recoupable Free
          </Link>
        </div>
      </div>
    </div>
  );
}
