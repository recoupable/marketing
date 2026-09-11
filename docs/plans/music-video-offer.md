# Music-video offer

Destination: `/music-videos`. The owner approved [design v2](https://github.com/recoupable/app/issues/2075#issuecomment-5574038951) on 2026-09-07: a free music-video skill download, a “Make it in Recoup” action and a separate custom quote for released recordings. “Less than $10” is the approved self-serve generation-budget framing; plan fees and extra takes are separate. Custom production still requires a scope and quote; no fixed service price or turnaround is promised.

## Skill distribution

The public ZIP linked in `lib/copy/music-videos.ts` contains unchanged `SKILL.md` and `references/hooks.md` from `recoupable/skills` commit `f3ac97fb14f179e6000ca5ee5a0fd8bf6b2edd74`. It requires no email gate to download. Running the skill requires Recoup authentication and generation credits. The published version generates a new song, limits free-tier pieces to 15 seconds, and reserves full-length films for Pro. Released-master support is not promised by the self-serve offer; those requests go to the custom form. Update the bundled ZIP and version record together when changing the downloadable skill.

The product link uses `siteConfig.appUrl`; its existing teams hostname redirects to `app.recoupable.dev`. Downloads remain functional without JavaScript; analytics are best effort.

## Proof and provenance

- MOVAMOS EL MUNDO, Tomás Mika: full artist-approved 159-second cut, published September 4, 2026. Master and approval record: marketing workspace `content/tomas-mika/`. Poster copied from `thumbs/cover-movamos.png`.
- LETAL XLUG, brauxelion ft. Shisosaloud: artist-approved 27-second verse cut, published August 28, 2026. Master and approval record: marketing workspace `content/letal-xlug/`. Poster copied from `video/thumbs/cover-letal-xlug.png`.
- Posters are existing frames, not new likeness generations. Both proof links open the published YouTube video in a new tab. Do not use YouTube iframes while these videos have `embeddable:false`.
- The approved headline gives the self-serve generation budget; this is not the production quote or a cost claim for either example film. Provider names stay out of product copy.

## Capture contract and measurement

The form uses existing `postCapture` → `POST /api/leads`, `kind=booking`, `package=music-video`, `source=/music-videos`. The song URL, artist, brief, authority confirmation, random request ID and sanitized attribution are serialized into `message`, a field the booking contract actually retains. Extra top-level UTM fields would be stripped by its current schema. No API change is required.

The API upserts an Attio person and attempts an `Advisory Inquiry: music-video` note and internal sales notification. This existing title is a CRM compatibility detail. It does **not** automatically create an Agency Leads list entry, assign its owner or a follow-up task. Those are the operator's next steps. The API treats note creation as best effort; an HTTP success proves capture acceptance/person storage, not guaranteed note persistence. Verify the note as part of launch QA and monitor it on the first real inquiry.

Vercel pageviews supply visits. Events:

| Event | Trigger | Properties |
|---|---|---|
| `music_video_proof` | Click a film | film slug, attribution |
| `music_video_cta` | Click quote anchor | attribution |
| `music_video_skill_download_clicked` | Click a free skill download | placement (`hero`, `skill`, `closing`), attribution |
| `music_video_app_clicked` | Click Make it in Recoup | placement (`hero`, `closing`), attribution |
| `music_video_form_started` | First form focus | attribution |
| `music_video_request_received` | Capture API returns success | random request_id, attribution |
| `music_video_request_failed` | Capture API rejects/fails | attribution |

No name, email, song URL or brief enters event properties. UTM values are bounded to 100 characters and URL-tag characters; do not put PII in campaign links. Only the first tagged visit **to this offer in the current tab session** is retained. Storage denial falls back to the current URL. This does not implement site-wide first-touch attribution or solve visit→Privy→Stripe joins.

Download/product click events measure intent, not confirmed downloads, completed videos, subscribers or leads. Report these separately from the quote funnel. Count stored quote requests as the inquiry conversion, not form focuses. Reconcile request IDs with CRM notes. A submission retry keeps the same request ID; the client blocks simultaneous submissions, but the existing API has no idempotency contract. Deduplicate repeated notes by request ID if a response is lost. Ad blockers can suppress client events; CRM is the lead-count authority.

## Campaign links to use after launch

`https://recoupable.dev/music-videos?utm_source=yt&utm_medium=social&utm_campaign=movamos-el-mundo`

Use `x`, `li` or `ig` for the corresponding source. Keep the existing film campaign slug. For a standing Instagram bio use `utm_campaign=music-video-offer&utm_content=bio`; that measures the bio, not an individual reel. Do not silently reassign historical campaign visits.

## Operator follow-up

1. Find `source=/music-videos` and the `music-video` package in the incoming lead notification or Attio note. Confirm song and contact details were saved.
2. Create/find the Agency Leads entry, assign an owner, and add a dated follow-up. Check prior interactions first. No inferred lead value or paid status.
3. Reply with questions needed to scope the length, visual direction, rights, revisions and delivery. Send a quote only after review.
4. Record qualified, quote sent and won/lost against that entry, preserving the request ID. Record a win only after a real agreement/payment; a form submit is not revenue.
5. At 48 hours and seven days, compare visits, stored requests, qualified requests, quotes and wins by campaign. Report sample size. No numerical conversion target is warranted from the current baseline of only a few visitors per film.

## Launch checks

- Match approved v2 in desktop/mobile and light/dark, including header clearance, stacked actions, skill section and separate quote path.
- Download ZIP opens without an email gate and contains the skill and its reference; all three placements emit download-click events. Product actions resolve to the app. Verify copy in the human and machine views.
- Keyboard operation, poster loading and correct public film links.
- Invalid form blocked; failure retains fields; one successful capture event only after an accepted response.
- Tagged submission's request ID, song and campaign visible in the CRM note. Use the API's explicitly suppressed owner test identity to avoid sending a sales notification.
- Production publishing and changes to social captions/bio links follow owner approval. No outreach or posting is part of this implementation.

## Initial implementation verification, 2026-09-07

These are the original quote-page checks. Current v2 verification is posted on marketing#89 against its tested commit; do not treat the initial screenshots as v2 evidence.

- Automated suite: 87 tests passed, including validation and first-tagged-visit retention, corrupt/blocked storage, and capture payload persistence fields. Targeted ESLint and TypeScript checks passed.
- Live production API capture with the explicitly suppressed owner test identity returned `status:success`, `notified:false`. Paginated Attio notes confirmed the matching request ID, song URL and campaign in `Advisory Inquiry: music-video`. The test did not send a sales notification. Private evidence is retained outside the repository at `/tmp/music-video-browser/`.
- Production build passed. Browser checks at 1440px and 390px in both themes: images loaded, no horizontal overflow or runtime errors; empty form blocked, failure preserved fields, retry submitted once, and exactly one accepted-request event carried the campaign and request ID. Input boundaries use the muted-foreground token for contrast.

## Sky integration in marketing PR #91

Ported from PR #89 commit `db46e3818c27496baa112a37602f33e1ebffce4e`. The offer, two published films and original poster assets, ZIP destination, custom-production deliverables, process, FAQ subjects, campaign events, request ID, rights confirmation, and central API booking payload are retained. Rendering now uses the shared Sky shell, buttons, typography, colors, responsive layout, and scoped `music-videos.css`. The legacy Free/Pro FAQ is clarified because the new marketing pricing uses Platform/Advisory/Build + Partner; the duration and account-access caveat remains. The ZIP is unchanged, and its account checks are still governed by the bundled skill and API.

The `/music-videos` page is in the sitemap, footer, and agent content registry. `/api/machine?path=/music-videos` derives full offer copy from the same source as the page. The quote form confirms success only after the API returns `status: success`; no paid generation or live lead submission is required for the offline browser regression check.
