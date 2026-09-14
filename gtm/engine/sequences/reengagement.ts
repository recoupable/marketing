// Historical draft. Claims, triggers, and links are unverified; do not send as written.
/**
 * Re-engagement sequence — for users who were active but have gone dormant.
 *
 * Goal: bring back users who experienced value but dropped off.
 *
 * Trigger: segment = "dormant" (30-90 days inactive)
 * Cadence: Day 0, Day 7, Day 21
 */

import type { EmailStep } from "./welcome.js";

export const reengagementSequence: EmailStep[] = [
  {
    day: 0,
    subject: "Your agents learned new tricks while you were away",
    preheader: "3 new features since your last visit.",
    body: `Hey {{name}},

It's been a while! Your Recoupable agents have been upgraded with new capabilities:

🚀 **Release Autopilot** — full release campaigns (press, pitch, social, email) in 60 seconds
🔬 **Deep Research** — AI-powered analysis of your genre, competitors, and fan demographics
🔗 **More Integrations** — connect Spotify, Instagram, YouTube, Twitter, and more

Your account and artist data are still here. Pick up right where you left off.`,
    cta: { text: "See what's new", url: "https://chat.recoupable.com" },
  },
  {
    day: 7,
    subject: "What other artists are doing with Recoupable right now",
    preheader: "Real results from the last 30 days.",
    body: `Hey {{name}},

Here's what artists on Recoupable accomplished this month:

- Generated 500+ social captions across genres
- Pitched to 200+ playlist curators with AI-written personalized emails
- Built release campaigns for upcoming singles and EPs
- Analyzed fan demographics to target the right audiences

The artists who grew the most had one thing in common: they asked their agents at least one question per day.

Your agents remember your music and preferences. A quick question is all it takes to restart.`,
    cta: { text: "Ask a question", url: "https://chat.recoupable.com" },
  },
  {
    day: 21,
    subject: "We miss you (and your agents do too)",
    preheader: "Your account is still active. Here if you need us.",
    body: `Hey {{name}},

Just a final note — your Recoupable account is still active and your agents still know your music.

If you're not using it because:
- **You got busy** — totally get it. We're here when you're ready.
- **It wasn't useful** — reply and tell us what you needed. We ship fast.
- **You found something else** — we'd love to know what. Honest feedback helps us improve.

Either way, thanks for trying Recoupable. Your account doesn't expire.`,
    cta: { text: "Come back anytime", url: "https://chat.recoupable.com" },
  },
];
