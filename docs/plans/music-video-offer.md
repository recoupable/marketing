# Music-video offer

Destination: `/music-videos`. One action: request a quote for a released song. This is a service inquiry, not a subscriber signup or a checkout. No fixed price, delivery SLA, free production or revision allowance is promised. The operator agrees those with the artist before production.

## Proof and provenance

- MOVAMOS EL MUNDO, Tomás Mika: full artist-approved 159-second cut, published September 4, 2026. Master and approval record: marketing workspace `content/tomas-mika/`. Poster copied from `thumbs/cover-movamos.png`.
- LETAL XLUG, brauxelion ft. Shisosaloud: artist-approved 27-second verse cut, published August 28, 2026. Master and approval record: marketing workspace `content/letal-xlug/`. Poster copied from `video/thumbs/cover-letal-xlug.png`.
- Posters are existing frames, not new likeness generations. Both proof links open the published YouTube video in a new tab. Do not use YouTube iframes while these videos have `embeddable:false`.
- No generation-cost figures or third-party model/provider names appear in offer copy. Generation spend does not price the service.

## Capture contract and measurement

The form uses existing `postCapture` → `POST /api/leads`, `kind=booking`, `package=music-video`, `source=/music-videos`. The song URL, artist, brief, authority confirmation, random request ID and sanitized attribution are serialized into `message`, a field the booking contract actually retains. Extra top-level UTM fields would be stripped by its current schema. No API change is required.

The API upserts an Attio person and attempts an `Advisory Inquiry: music-video` note and internal sales notification. This existing title is a CRM compatibility detail. It does **not** automatically create an Agency Leads list entry, assign its owner or a follow-up task. Those are the operator's next steps. The API treats note creation as best effort; an HTTP success proves capture acceptance/person storage, not guaranteed note persistence. Verify the note as part of launch QA and monitor it on the first real inquiry.

Vercel pageviews supply visits. Events:

| Event | Trigger | Properties |
|---|---|---|
| `music_video_proof` | Click a film | film slug, attribution |
| `music_video_cta` | Click quote anchor | attribution |
| `music_video_form_started` | First form focus | attribution |
| `music_video_request_received` | Capture API returns success | random request_id, attribution |
| `music_video_request_failed` | Capture API rejects/fails | attribution |

No name, email, song URL or brief enters event properties. UTM values are bounded to 100 characters and URL-tag characters; do not put PII in campaign links. Only the first tagged visit **to this offer in the current tab session** is retained. Storage denial falls back to the current URL. This does not implement site-wide first-touch attribution or solve visit→Privy→Stripe joins.

Count stored requests as the conversion, not form focuses. Reconcile request IDs with CRM notes. A submission retry keeps the same request ID; the client blocks simultaneous submissions, but the existing API has no idempotency contract. Deduplicate repeated notes by request ID if a response is lost. Ad blockers can suppress client events; CRM is the lead-count authority.

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

- Desktop/mobile and light/dark display; keyboard operation; poster loading; correct public film links.
- Invalid form blocked; failure retains fields; one successful capture event only after an accepted response.
- Tagged submission's request ID, song and campaign visible in the CRM note. Use the API's explicitly suppressed owner test identity to avoid sending a sales notification.
- Production publishing and changes to social captions/bio links follow owner approval. No outreach or posting is part of this implementation.

## Verification, 2026-09-07

- Automated suite: 87 tests passed, including validation and first-tagged-visit retention, corrupt/blocked storage, and capture payload persistence fields. Targeted ESLint and TypeScript checks passed.
- Live production API capture with the explicitly suppressed owner test identity returned `status:success`, `notified:false`. Paginated Attio notes confirmed the matching request ID, song URL and campaign in `Advisory Inquiry: music-video`. The test did not send a sales notification. Private evidence is retained outside the repository at `/tmp/music-video-browser/`.
- Production build passed. Browser checks at 1440px and 390px in both themes: images loaded, no horizontal overflow or runtime errors; empty form blocked, failure preserved fields, retry submitted once, and exactly one accepted-request event carried the campaign and request ID. Input boundaries use the muted-foreground token for contrast.
