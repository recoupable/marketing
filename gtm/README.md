# Recoup go-to-market workspace

This is the shared home for the research, business context, working methods, and software the team needs to build Recoup's go-to-market engine. Start an agent in this directory and have it read [AGENTS.md](AGENTS.md).

The first audience is **executives at music rightsholders and music funds, worldwide**. The job is to turn useful research into relevant conversations, qualified opportunities, and customers—and learn which work produces those results.

## Start here

1. [Business and buyers](context/business-and-buyers.md): who we serve, what we can say, and what still needs validation.
2. [What we learned in the research conversation](context/conversation-decisions.md): strategic conclusions and product experiments.
3. [Inventory](context/inventory.md): what came from the old GTM repo, consulting, and this research.
4. [Music-rights research](research/music-rights/README.md): company lists, interviews, guest notes, and principles.
5. [Build plan](BUILD_PLAN.md): the first useful workflow to build, its inputs and outputs, and how to check it.
6. [Existing tools](engine/README.md): app-user export, reporting, CRM preview/sync, and legacy email templates.

The existing tools are a starting point. This directory does **not yet contain an end-to-end prospecting, publishing, or sales engine**. The company audience has not been matched in LinkedIn Campaign Manager. No campaign or outreach is running from this directory.

## Give your agent this task

> Start in the marketing repository's gtm directory. Read AGENTS.md, context/, and BUILD_PLAN.md there. Inspect the existing engine and research before adding anything. Explain what already works and what is missing. Build the first offline account-to-draft workflow inside engine/, using the shared research and fictional contact fixtures. Preserve evidence links, show why an account was selected, and stop at a reviewable draft. Do not connect live accounts, send messages, publish posts, or spend money as part of that first build.

## Where work belongs

| Folder | Purpose |
|---|---|
| `context/` | Business decisions, scope, and inventory |
| `playbooks/` | Methods for research, content, discovery, follow-up, and the [podcast guest pipeline](playbooks/podcast-guest-pipeline.md) |
| `research/` | Public evidence and dated research snapshots |
| `engine/` | Executable tools, tests, and future workflow implementation |

This is a **public repository**. Keep live contact exports, CRM snapshots, account credentials, private conversations, and customer financial details in approved private storage. The software can work with that storage without checking its contents into Git.

Consulting remains Sidney's personal practice workspace. Its originals remain there. The imported research is a dated snapshot; the adapted playbooks are complete enough to use without consulting access. New shared GTM work belongs here. There is no automatic synchronization between the repositories. See [sources and update ownership](SOURCES.md).
