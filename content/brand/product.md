# Product Overview

> Updated: 2026-03-16

## What It Does

Recoup is an AI agent platform that handles music marketing end-to-end: content creation, social distribution, audience analysis, and campaign management.

## How It Works

1. **Chat with your agent** at `chat.recoupable.com` — tell it what you need
2. **The agent acts** — creates content, analyzes your audience, generates posts
3. **Content gets distributed** — across Instagram, TikTok, X, LinkedIn via PostBridge
4. **Performance is tracked** — the agent learns what works and adapts

## Core Features

| Feature | Description |
|---|---|
| **AI Chat Agent** | Conversational interface — tell the agent what you need in plain language |
| **Content Creation** | Generates social posts, captions, video scripts, and marketing copy |
| **Audience Analysis** | Scrapes and analyzes social profiles to understand fan demographics |
| **Multi-Platform Distribution** | Posts to Instagram, TikTok, X, LinkedIn via PostBridge API |
| **Skills System** | Modular AI capabilities — extensible agent skills for specific tasks |
| **CLI Tool** | Command-line interface (`recoup`) for power users and automation |
| **Browser Automation** | Stagehand-powered web scraping and data extraction |
| **Background Tasks** | Trigger.dev workers for async jobs (scheduled posts, batch operations) |

## Platform Architecture

```
chat.recoupable.com (frontend) → recoup-api (backend) → Supabase (database)
                                                       → Trigger.dev (async tasks)
                                                       → PostBridge (social distribution)
```

## Key Stats

- Gatsby Grace experiment: 22 videos produced in one session, zero manual editing
- CLI published to npm as `recoup` (v0.1.11)
- Multi-model AI: supports Anthropic, OpenAI, and Google Gemini
- MCP server integration for extensible tool usage

## Pricing

- Currently in early access — pricing TBD
- Free tier planned for individual artists
- Pro tier for managers and labels managing multiple artists

## What Makes It Different

Other tools help you _make_ content. Recoup _is_ your marketing team. The AI agent doesn't just generate — it plans, creates, distributes, measures, and improves. Context-aware, learning, autonomous.
