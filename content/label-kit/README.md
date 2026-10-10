# Recoup plugin delivery

Use the official customer plugin release pinned in release.json. Do not rebuild it from selected skills or inject an example MCP configuration. The shipped ZIP contains 34 customer skills, the Codex plugin manifest and the real Recoup MCP configuration. It is delivered byte-for-byte, verified by SHA-256.

Install → connect Recoup → start working. The connection uses host-managed OAuth; no API key is bundled. Follow https://github.com/recoupable/skills#install for Claude Code, Codex and Cursor. Claude Code uses `/plugin marketplace add recoupable/skills`, then `/plugin install recoup-skills@recoup`; authenticate through `/mcp`. The customer ZIP is a Codex artifact, not a universal Claude/ChatGPT ZIP.

The release manifest marks OpenAI distribution `upload_and_review_required`; do not claim a published ChatGPT listing. REST-only scripts still need separate credentials. Subscription access pays for the connected Recoup service and ongoing updates; public source remains available under its license.
