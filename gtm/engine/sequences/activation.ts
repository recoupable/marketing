// Historical draft. Claims, triggers, and links are unverified; do not send as written.
/**
 * Activation nudge sequence — for users who signed up but haven't
 * connected an artist or sent a message.
 *
 * Goal: get the user to their "aha moment" — a useful agent response.
 *
 * Trigger: signed up 3+ days ago, no artist connected, no chat messages
 * Cadence: Day 3, Day 7, Day 14
 */

import type { EmailStep } from "./welcome.js";

export const activationSequence: EmailStep[] = [
  {
    day: 3,
    subject: "Your AI agents are waiting",
    preheader: "They need one thing from you to get started.",
    body: `Hey {{name}},

You signed up for Recoupable a few days ago, but your agents haven't started working yet.

They need just one thing: **connect an artist.**

This tells your agents who they're representing. Once connected, they can:
- Research your genre and competitors
- Draft content and social posts
- Find playlist curators and pitch opportunities
- Build release campaigns

It takes 30 seconds. Your agents handle the rest.`,
    cta: { text: "Connect an artist", url: "https://chat.recoupable.com" },
  },
  {
    day: 7,
    subject: "Quick question — what's holding you back?",
    preheader: "Seriously, we want to know.",
    body: `Hey {{name}},

We noticed you haven't used Recoupable yet, and we're genuinely curious why.

Was it:
- **Not sure what to ask?** Try: "What should my strategy be for growing on Spotify?"
- **Technical issue?** Reply to this email — a human reads every response
- **Not the right time?** No worries, your account is here when you're ready

Most artists who try one conversation stick around. The first question is the hardest part.`,
    cta: { text: "Ask your first question", url: "https://chat.recoupable.com" },
  },
  {
    day: 14,
    subject: "Last chance — your agents are going idle",
    preheader: "We'll stop emailing, but your account stays active.",
    body: `Hey {{name}},

This is the last email in this series. Your Recoupable account is still active and your agents are still ready whenever you are.

When you're ready to try it, here are three prompts that take 10 seconds:

1. "Analyze the top independent artists in [your genre]"
2. "Write me 5 Instagram captions for my latest release"
3. "Build a 30-day content calendar"

No pressure. We'll be here.`,
    cta: { text: "Try a prompt", url: "https://chat.recoupable.com" },
  },
];
