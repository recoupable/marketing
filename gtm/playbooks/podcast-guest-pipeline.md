# Podcast guest pipeline

Prepared 2026-09-14. The Recoup Podcast is the top of the services funnel, not a media project: a qualified lead is invited onto a 30 to 60 minute episode about their history in music and how they use AI, and the conversation tells us what to build for them. Public page: `/podcast` (episodes, platforms, the guest invitation). This playbook is public; names, emails, deal terms and the exclusion list live in the CRM and private records, never here.

## The loop

| Step | What happens | Attio (Agency Leads) |
|---|---|---|
| 1. Invite | Ten invites a day to qualified leads: people who own or run a music business and have said something public about AI or automation in it within the last 12 months. The invite sells the episode, not Recoup. | `New`, `lead_source = Podcast`; `project_type` stays unset until discovery confirms a build |
| 2. Reply | Any reply. Flag after 3 days here with no time on the calendar, ahead of anything further down the board. | `In Conversation` |
| 3. Record | A time exists. The booking confirmation carries the written consent: recording, publication on the named platforms, use of clips and of the guest's name, photo and company name, and the right to withdraw before publication. No consent on file, no recording. Then 30 to 60 minutes remotely: their history in the industry, where AI does real work in the business today, the numbers behind it. Notes from the meeting recorder go to the private guest folder. | `Call Booked` |
| 4. Publish | Within 48 hours, once the consent is on file and the guest has approved their cover photo: YouTube (the show playlist), Spotify, Apple Podcasts, socials; the episode is added to `content/podcast/episodes.json` in the same PR; the guest gets the full episode and clips. | unchanged |
| 5. Day 7 | One short email with three concrete things we could build for them, drawn from the call notes. One sentence each, no price. | `Scoping`, `project_type = Build` |
| 6. Reply | A proposal for a 2 to 4 week build, priced from the current private rate card with a deposit plus delivery split, written in the order [discovery and proposals](discovery-and-proposals.md) sets. Terms are proposals until accepted. | `Proposal Sent` |
| 7. Deposit paid | The build runs. | `Won` |
| 8. Delivered | Testimonial request and a post-mortem in the private guest folder. After three paid, completed, reviewed builds, review the rate. | unchanged |
| No reply after 3 touches, or a decline | Close it honestly. | `Lost`, `lost_reason` set |

No new stages and no new list; a guest is an agency lead with a different first touch.

## The invite

Three sentences, one question, two links, no second offer, no em dashes. The hook is the only line that takes research; the name, topic and company slots are fills from the lead file, and everything else is identical every day, so ten a day is a copy job.

```
Subject: Recoup Podcast invite: {{first_name}} on {{topic_short}}

{{HOOK: one sentence citing the specific thing they said or did about AI in their business, with where and when it was said.}}

I host the Recoup Podcast and I'd like to record a 30 to 60 minute conversation with you on how you got into music and how {{company}} is using AI in the business today; the episode goes out on YouTube, Spotify, Apple Podcasts and Recoup's socials, and you get the full episode and clips to post yourself.

Would you be up for recording in the next two weeks? Pick any slot that suits you here: {{booking_link}}
```

- **Hook:** one fact, one source, dated inside the last 12 months. A quote is best; a public action is fine; a guess is not allowed. No AI statement found means they are not a fit for this funnel; use the standard outreach instead.
- **Links:** the words "Recoup Podcast" link to `https://recoupable.dev/podcast?utm_source=email&utm_medium=invite&utm_campaign={{yyyy-mm}}` (send month), so a guest request shows which batch it came from in the CRM note. The booking link is printed as is. No third link.
- **Before sending:** email verified; not already a customer or a live agency lead (CRM and login records, read-only); not on the exclusion list; the exact draft approved by the operator. Ten a day is a target, not an approval.
- **After sending:** the sent copy, provider id and approval evidence go in the private guest folder; the CRM note names the file.

## The day-7 follow-up

Subject: `Three things we could build for {{company}}`. Open with one line from the recording, then three numbered sentences, each naming a workflow they described, what we would build, and the result they would see. Close with one question: which of the three is worth a 20 minute call. No price, no deck, no link but the episode.

## Episode copy and covers

Guests and prospects read the episode page before anything else we send, so every episode is sales copy for a firm that charges six figures for a build:

- Title: `<the specific claim> w/ <Guest Name>`. Panels end in `(panel)`.
- Description: one specific claim in the first sentence, hard nouns over adjectives, no hype, no emoji, guest links kept, then the fixed closing line: "Recoup designs and builds the systems behind conversations like this one: catalog data, royalty operations, and AI agents for labels, publishers, funds and management companies. recoupable.dev"
- Cover: the show's blue sweep, white lockup top-left, title, guest line, and a background-removed cutout of a photo the guest supplied or approved. Same layout on the 16:9 card and the square Spotify art.
- Cold open: a 6 to 14 second clip of the guest's strongest line sits between the intro sting and the episode, on every platform.

## Measure

Vercel Web Analytics on `/podcast`: `podcast_platform_clicked`, `podcast_episode_clicked`, `subscribe_submitted` (source `/podcast`), `podcast_guest_requested`. In the CRM: guests by `lead_source = Podcast` at each stage, and the count that reached `Won`. The number that matters is paid builds per ten invites; report it monthly against the invite batches by `utm_campaign`.
