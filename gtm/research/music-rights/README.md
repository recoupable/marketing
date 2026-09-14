# Music-rights company and buyer research

Company research snapshot: **2026-09-13**. Consolidated here: **2026-09-14**. Recheck identities and platform requirements before use after **2026-10-13**, and archive this snapshot when a reviewed replacement exists. This move did not repeat the web research.

Start with the [audience methodology and findings](companies/2026-09-13-music-executive-audience.md), then the [evidence CSV](companies/2026-09-13-music-executive-evidence.csv). The audience is prepared, **not uploaded or matched**. No ads were launched.

## What the files contain

Counts below are data rows, excluding headers, in the linked snapshot files. They are not independent buyer counts, verified email contacts, matched LinkedIn members, or qualified opportunities.

| File | Rows | Use |
|---|---:|---|
| [Company evidence](companies/2026-09-13-music-executive-evidence.csv) | 232 | Working source: business evidence, quotes, review status, and dates; 231 marked company_verified and one held |
| [Priority core](companies/2026-09-13-music-executive-priority.csv) | 68 | Initial priority subset of the core audience |
| [Combined core](companies/2026-09-13-music-executive-combined.csv) | 201 | Rightsholders and music funds; excludes held records |
| [Rightsholders](companies/2026-09-13-music-executive-rightsholders.csv) | 175 | Rights-owner/publisher operating-company segment |
| [Funds](companies/2026-09-13-music-executive-funds.csv) | 26 | Music investment and financing businesses |
| [Operators](companies/2026-09-13-music-executive-operators.csv) | 20 | Advisers and adjacent operators, separate from core |
| [Institutional](companies/2026-09-13-music-executive-institutional.csv) | 10 | Broad capital providers, separate from core |
| [Selected executives](companies/2026-09-13-music-executive-decision-makers.csv) | 26 | Public role evidence to investigate; not complete executive coverage |
| [Relationships](companies/2026-09-13-music-executive-relationships.csv) | 14 | Parent, brand, transaction, and other relationships that affect targeting/counting |
| [Podcast map](companies/2026-09-13-music-executive-podcast-map.csv) | 28 | Episodes → companies → audience disposition, with local transcript paths |

The six company audience projections overlap by design: priority is a subset of combined, and combined joins rightsholders and funds. Do not sum every file. Employers, brands, and financial backers can also overlap in their underlying buying organization; read the relationship notes.

## Understand the market

- [Music Moneyball corpus](podcast/README.md): transcripts, source feed, guest notes, and interview methods.
- [Music-rights principles](reference/principles.md): recurring operator arguments, disagreements, and cited episodes.
- [Fund reference](reference/funds.md): different ownership and financing models.

The podcast produced the initial company leads and useful buyer language. Each researched company's qualification evidence is recorded separately. A podcast guest is not automatically a core buyer, and a source quote about a business is not proof of a budget or current internal problem.

## Maintain the company files

From the marketing repository root, this command validates the evidence and regenerates the six derived audience CSVs next to it using Python's standard library:

```sh
python3 gtm/research/music-rights/scripts/build_company_audience.py gtm/research/music-rights/companies/2026-09-13-music-executive-evidence.csv
```

Default behavior is offline. `--discover` is a separate optional mode that visits public company sites and can update the evidence file; read the script before using it. Neither mode uploads an audience, finds personal email addresses, nor launches ads.

Update the evidence first, preserve supporting source quotes and dates, and regenerate projections. Explain identity or segment changes in the commit. Keep unsupported records on hold. Verify current official company/role information and current Campaign Manager requirements before campaign use.

[SOURCE_INDEX.csv](SOURCE_INDEX.csv) records the consulting origin and source/import checksums for the initial imported files. Paths were made portable where necessary. It is an import receipt, not a promise that future edits stay byte-identical; future changes belong in Git history. Consulting's originals remain there, with no automatic sync.
