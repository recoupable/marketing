# workflows

Shared home for non-UI marketing automation.

Use this directory for code that powers recurring marketing operations but does
not belong inside a specific frontend app, for example:

- email funnel automation
- audience sync jobs
- campaign scheduling
- CRM enrichment or cleanup
- reporting exports

Keep app-specific UI inside `apps/web` or `apps/ops`. Put shared automation
here so internal tools and future workers can reuse the same workflow logic.
