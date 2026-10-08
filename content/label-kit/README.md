# Your Recoup plugin

Preview release. Client connection and paid end-to-end workflows must be verified before sale.

## Claude Code

Unzip the download. Start Claude Code with `claude --plugin-dir ./recoup-plugin` from the extracted folder. Ask: “Connect my Recoup account.” Use the same email as your subscription. Keep any API key private; never paste one into shared chat or commit it to source control.

The bundled skills contain their own references, scripts and templates. Some workflows need Python packages or external services; your agent should explain those requirements before proceeding. Review work before publishing, spending money, or contacting anyone.

## Optional MCP connection (clients with bearer-header support)

`recoup-plugin/mcp.example.json` shows the Recoup HTTP server configuration. Set `RECOUP_API_KEY` securely in the client environment, then use your client's documented MCP configuration flow. The example contains no key and is not auto-enabled. Confirm an authenticated read before running actions. This is not a substitute for the unverified ChatGPT OAuth setup.

## Claude web

The `claude-skills` folder contains individual skill ZIPs. Where custom skills are available, upload the skills you need in Customize > Skills. A skill upload does not establish a Recoup tool connection. Network access, connected tools and client permissions must be configured separately. Do not assume shell-based API workflows work in every Claude environment.

Official guide: https://support.claude.com/en/articles/12512180-use-skills-in-claude

## ChatGPT

ChatGPT uses a custom MCP app for connected tools; it does not install this Claude plugin ZIP. Custom apps depend on your plan and workspace permissions. Recoup's server is https://api.recoupable.dev/mcp and currently requires bearer authentication. The customer-facing ChatGPT authentication path has not yet been verified. Do not purchase solely for ChatGPT until that path is marked supported.

Official guide: https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt

## First request

“Help me plan my next release. Ask for the artist, song, release date, and goals first. Use only verified information and flag what is missing.”

## Updates and billing

Return to /label-in-a-box/setup on the Recoup website and sign in to download the latest available release. Updates are downloaded manually; this package does not automatically replace installed skills. Recoup Starter includes a monthly usage allowance, not unlimited tool calls. Manage your subscription at https://app.recoupable.dev/plan.

The skills are AGPL-3.0-only; see LICENSE and manifest.json for the exact public source commit and file hashes. Source: https://github.com/recoupable/skills. The subscription pays for Recoup service access and maintenance; it does not remove your rights under the source license. No staff skills, credentials, or private customer records are included.
