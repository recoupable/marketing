# Account tools

Read `README.md` before running or changing this package. It describes the commands, effects, inherited gaps, and original source commit. Read the parent GTM instructions for strategy and company research.

- Help and tests must work without credentials or live services.
- Keep CRM preview as the default. Live writes require an explicit `--apply` plus the user's authorization for the specific work.
- These account tools are separate from marketing's browser lead-capture path. Keep secret keys and direct CRM requests out of browser code.
- Never commit `.env` files, contact exports, or generated account dashboards. Keep personal information out of normal shared logs.
- Use offline fixtures for tests. A passing local test is not evidence that the live integration works.
- Sequences are historical drafts. Do not send them or reuse claims without checking the current product, source evidence, audience, and delivery requirements.
- Run `pnpm test` and `pnpm build` after changing this package; the enclosing marketing application also needs its normal build check.
