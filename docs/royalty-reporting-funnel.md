# Royalty-reporting inquiry funnel

`/royalty-reporting` is a focused custom-systems landing page. It uses the shared inquiry form and backend, preselects Custom systems, and reports the confirmed `lead_created` event through the existing receipt-validation path. No conversion fires on CTA clicks. The example uses synthetic amounts; the linked public case study defines the evidence and claim limits.

The focused shell retains referral capture, analytics, the main landmark and browser agent tools. Shared copy also feeds the public agent summary. The form supports existing recovery and successful-submission states.

Acquisition capture accepts `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `campaign_id`, `ad_group_id`, and `ad_id`. Values use the existing restricted label syntax and 100-character bound. `oppref` is left to the measurement pixel and is not copied into CRM notes. CRM note values are shortened to 40 characters when necessary to preserve the entire 5,000-character brief within the 6,000-character API limit. Full allowed attribution labels remain in browser session attribution. Stable IDs used by this campaign fit the bound.

`public/images/royalty-reporting/report.png` and `sources.png` are generated illustrative ad concepts, each 1024 square. Neither contains customer material. Campaign settings, budgets, performance, and platform IDs belong in the private Business workspace.

Validation: production build, full test suite, scoped lint, desktop and phone browser review. No test inquiry was submitted to the production lead endpoint.
