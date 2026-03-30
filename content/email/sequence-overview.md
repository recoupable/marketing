# Free Trial Email Sequence (30 Days)

**Trial length:** 30 days
**Tone:** All emails come from Sidney. Personal, helpful, founder-to-user.
**Goal:** Activate the user, build a relationship, convert to paid.

---

## Sequence

| # | Day | Email | Purpose | File |
|---|-----|-------|---------|------|
| 1 | 0 | Yooooo | Casual founder hello. Establish you're a real person. | `free-trial-welcome.md` |
| 2 | 2 | Getting started | First value: 3 ways to get going (onboard, research, email agent) | `getting-started.md` |
| 3 | 5 | Personalized follow-up | Show you researched them. Earn a reply. | `personalized-followup.md` |
| 4 | 8 | Developer path | For technical users: API key, CLI, Claude/Cursor | `developer-path.md` |
| 5 | 12 | Feature spotlight | Highlight a specific capability they may not have found | TODO |
| 6 | 17 | Midpoint check-in | "How's it going?" — re-engage if quiet | TODO |
| 7 | 22 | Social proof | Share a win or use case from another user | TODO |
| 8 | 26 | Trial reminder | Friendly heads-up that trial ends soon | TODO |
| 9 | 29 | Last day | Final nudge — what they'd lose, easy path to upgrade | TODO |

## The Logic

1. **Day 0 — Pure warmth.** No agenda, no asks. Just "hey, I'm real."
2. **Day 2 — Helpful.** Give them 3 clear paths to get value. They know who you are now.
3. **Day 5 — Personal.** Show you looked them up. Ask what they need. This is where replies happen.
4. **Day 8 — Technical path.** For dev-oriented users only. Skip for everyone else.
5. **Day 12+ — Ongoing value and nudges.** Feature spotlights, check-ins, social proof, trial reminders.

## Principles

- **Don't send if they're already in a conversation.** If they replied to any earlier email, the drip is secondary — just keep the thread going.
- **Each email has ONE job.** Don't combine getting-started with feature spotlights.
- **Short > comprehensive.** Every email should be readable in under 30 seconds.
- **From Sidney, not from Recoupable.** Reply-to should be Sidney's actual email. No "noreply."
- **Skip emails that don't apply.** If they're not technical, don't send the developer path email.

## Implementation Status

Not yet automated. Currently sent manually. When ready to automate, the `workflows/` directory is the place for send logic. These templates stay here as the source of truth for copy.
