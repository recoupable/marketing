# Music video offer — design revision 2

2026-09-07. Requested by the owner after reviewing v1: add a free self-serve music-video skill download and prominent “less than $10” positioning. The owner approved this revision on 2026-09-07 and authorized updating marketing#89 to match it. The approved design review is recorded in [issue #2075](https://github.com/recoupable/app/issues/2075#issuecomment-5574038951).

Open `index.html` for four artboards: desktop 1440px and mobile 390px, each in light and dark. `page.html` is the editable HTML/CSS source. Query parameters `theme=light|dark` and `state=error|sending|success` expose the alternatives. The quote form is a local simulation. Skill download links are real public ZIP downloads; they contain the published SKILL.md and its bundled reference.

## What changed

- Hero: “A music video. Less than $10.” Primary “Download skill” action, secondary “Make it in Recoup,” and an existing-song path to the quote form.
- Free-skill section: readable file card, actual contents, no email requirement, direct download and GitHub source.
- Self-serve process: get the skill, shape a new song/story, review scenes and render.
- Artist proof remains visible. These are artist collaborations, not claims that the current self-serve skill supports released recordings.
- Custom production is clearly separated, with its existing released-song brief and quote flow.
- FAQ covers the free file versus paid generation, current generated-song limitation, account requirements and 15-second free-tier cap.
- A closing download action repeats the free offer.

## Reference

https://starpop.ai/ai-animation-ads/paper-animation-ads — inspected in a real browser on 2026-09-07. Applied its paired product/download actions, dedicated free-file section and concrete description of file contents. Retained Recoup’s achromatic themes, pixel headlines and existing artist films.

## Verified public skill

https://github.com/recoupable/skills/tree/f3ac97fb14f179e6000ca5ee5a0fd8bf6b2edd74/skills/recoup-music-video

The downloadable package contains unchanged `SKILL.md` and `references/hooks.md` from that commit. The skill currently generates a new song; bringing a released master is listed as v2. It uses Recoup authentication and metered generation. It specifies a complete 15-second piece on free tier and full-length output on Pro.

## Approved price framing

The approved design uses “less than $10” for the self-serve generation budget. Plan fees and extra takes are separate, and custom production stays quoted separately. Approval adopts this copy; it is not a new measurement of an all-in checkout price. The note remains beside the hero actions and in the FAQ.

## Design checks

Check all four artboards for no horizontal overflow, loaded local fonts/images, no overlap with the fixed header, visible primary/secondary actions, and access to download, source and custom-quote destinations. Keep mobile actions stacked and at least 52px high. Form states remain available through the gallery links.

Post these designs and their rendered views in issue #2075. Preview tests of implemented changes belong on the PR after implementation; these design renders are not hosted application preview evidence.
