# Developer Path Email

**Type:** Semi-automated (only send to technical users or those who seem dev-oriented)
**Trigger:** Day 5 of trial
**Goal:** Show technical users they can integrate Recoupable into their existing workflow.
**Sequence:** 3 of N (see `sequence-overview.md`)

---

## Template

**Subject:** Use Recoupable from Claude Code or Cursor

Hey [Name or 👋],

One thing a lot of people don't realize — you can use Recoupable directly from your dev tools.

If you use Claude Code or Cursor, you can create an API key in your account settings and connect Recoupable as an MCP server. That means you can run artist research, pull data, and use all of Recoupable's tools without leaving your editor.

Here's how:
1. Go to chat.recoupable.com and grab your API key from settings
2. Add Recoupable as an MCP server in Claude Code or Cursor
3. Start asking questions about artists the same way you would in the chat

If you're not a dev person, totally ignore this one — the web app and email agent (agent@recoupable.com) work great on their own.

Let me know if you want help getting set up.

-- Sidney

---

## Design Decisions

- **Subject line is specific** — "Claude Code or Cursor" signals this is for technical users; non-technical users will self-select out
- **"One thing a lot of people don't realize"** — frames it as insider knowledge, not a sales pitch
- **Permission to ignore** — "if you're not a dev person, totally ignore this" prevents confusion and shows self-awareness
- **Only send to technical users** — if you know they're not technical, skip this email entirely
