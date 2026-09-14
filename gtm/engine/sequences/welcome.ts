// Historical draft. Claims, triggers, and links are unverified; do not send as written.
/**
 * Welcome sequence — sent to new signups.
 *
 * Goal: introduce the platform, get user to connect an artist,
 * and demonstrate value within the first week.
 *
 * Trigger: account created (segment = "new")
 * Cadence: Day 0, Day 1, Day 3, Day 5, Day 7
 */

export interface EmailStep {
  day: number;
  subject: string;
  preheader: string;
  body: string;
  cta: { text: string; url: string };
}

export const welcomeSequence: EmailStep[] = [
  {
    day: 0,
    subject: "Welcome to Recoupable — your AI-powered label starts now",
    preheader: "You create. Agents run strategy, content, fans, revenue.",
    body: `Hey {{name}},

Welcome to Recoupable. You just got a team of AI agents that handle the business side of your music — strategy, content, fan outreach, and revenue — so you can focus on creating.

Here's how to get started in 2 minutes:

1. **Connect your first artist** — this tells your agents who they're working for
2. **Ask a question** — try "What's my streaming strategy for this month?"
3. **Watch your agents work** — they'll research, plan, and execute

The best artists on Recoupable connect an artist within the first 10 minutes. Ready?`,
    cta: { text: "Connect your first artist", url: "https://chat.recoupable.com" },
  },
  {
    day: 1,
    subject: "The one thing that separates artists who grow",
    preheader: "It's not talent — it's consistency in strategy.",
    body: `Hey {{name}},

The artists growing fastest on Recoupable all do one thing: they ask their agents questions every day.

Not big strategic questions (though those work too). Small ones:

- "Draft a caption for my new post"
- "Who should I pitch this track to?"
- "What's trending in my genre right now?"

Each question teaches your agents more about you. After a week, they start anticipating what you need.

Haven't connected an artist yet? That's the first step — it takes 30 seconds.`,
    cta: { text: "Start a conversation", url: "https://chat.recoupable.com" },
  },
  {
    day: 3,
    subject: "Your agents found something interesting",
    preheader: "We ran a quick analysis on your genre.",
    body: `Hey {{name}},

We ran a sample analysis on the top-performing independent artists in your space. Here's what's working right now:

- **Short-form video** is driving 3-5x more discovery than static posts
- **Playlist pitching** windows are opening up — curators are actively looking for fresh tracks
- **Fan email** (yes, email) has the highest conversion rate for merch and show tickets

Your Recoupable agents can help with all three. Just ask.

Try this prompt: "Build me a release plan for my next single"`,
    cta: { text: "Try it now", url: "https://chat.recoupable.com" },
  },
  {
    day: 5,
    subject: "Meet your Release Autopilot",
    preheader: "A full release campaign in 60 seconds.",
    body: `Hey {{name}},

We just launched something artists are calling "the best feature in music AI."

**Release Autopilot** generates your entire release campaign — press release, Spotify pitch, Instagram captions, TikTok hooks, fan newsletter, and curator emails — in under 60 seconds.

What a PR firm charges $3,000 for, your agents do instantly.

Try it: go to /launch in the app and enter your next release details.`,
    cta: { text: "Launch a campaign", url: "https://chat.recoupable.com/launch" },
  },
  {
    day: 7,
    subject: "Your first week recap",
    preheader: "Here's what your agents have been up to.",
    body: `Hey {{name}},

It's been a week since you joined Recoupable. Here's a quick check-in:

{{#if has_artist}}
**Your agents are active.** They've been learning about your music and audience. Keep asking questions — the more context they have, the better they get.
{{else}}
**You haven't connected an artist yet.** Your agents are ready but need to know who they're working for. It takes 30 seconds and unlocks everything.
{{/if}}

**What to try this week:**
- Ask for a content calendar for the next 2 weeks
- Get playlist curator recommendations for your genre
- Generate social captions for your latest track

Your agents get smarter the more you use them. Let's make week two even better.`,
    cta: { text: "Open Recoupable", url: "https://chat.recoupable.com" },
  },
];
