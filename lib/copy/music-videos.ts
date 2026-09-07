import { siteConfig } from "@/lib/config";

export const musicVideosCopy = {
  title: "Music Videos for Less Than $10 | Free Skill Download",
  description:
    "Make a music video with Recoup’s free skill. Download the workflow, explore self-serve generation for less than $10, or request a custom quote.",
  eyebrow: "THE MUSIC VIDEO SKILL",
  headline: ["A music video.", "Less than $10."],
  intro:
    "Download the free skill. Give your AI agent an idea, then shape the song, the scenes and the finished film.",
  cta: "Get a quote for my song",
  ctaNote: "Free download. No signup to get the skill.",
  priceNote:
    "Under $10 is the self-serve generation budget. Plan fees and extra takes are separate.",
  serviceLink: "Have a released song? Work with us",
  appCta: "Make it in Recoup",
  appUrl: siteConfig.appUrl,
  skill: {
    cta: "Download skill",
    downloadUrl:
      "https://dxfamqbi5zyezrs5.public.blob.vercel-storage.com/design-reviews/issue-2075/v2/recoup-music-video-Mzn2IuvHos3lVD71QyeYbJCifxlLrt.zip",
    sourceUrl:
      "https://github.com/recoupable/skills/tree/main/skills/recoup-music-video",
    eyebrow: "FREE TO DOWNLOAD",
    title: "The workflow is yours.",
    intro:
      "Get the instructions behind the process: plan the story, keep characters consistent, animate the scenes and check the final cut.",
    explanation: "A skill is a set of instructions for your AI agent.",
    name: "recoup-music-video",
    files: "SKILL.md + reference guide",
    badge: "FREE",
    contents: [
      "Song, story and scene planning",
      "Characters, locations and visual continuity",
      "Image and motion prompts",
      "Editing, quality checks and budget guidance",
    ],
    sourceCta: "Read the skill on GitHub",
    noEmail: "No email required",
  },
  filmsEyebrow: "ARTIST COLLABORATIONS",
  filmsTitle: "Two songs. Two different worlds.",
  filmsIntro:
    "Films we made with artists, built around their released recordings.",
  heroFilmNote: "artist collaboration",
  films: [
    {
      id: "movamos-el-mundo",
      title: "Movamos el mundo",
      artist: "Tomás Mika",
      format: "Full song · 2:39",
      image: "/images/music-videos/movamos-el-mundo.png",
      alt: "Tomás Mika beside a field at sunrise in the Movamos el mundo music video",
      url: "https://www.youtube.com/watch?v=ouLTF_CsDGY",
      description:
        "Tomás had filmed the original alone in a field. He asked for a story with a couple, different places and a life together. The film ends in his field.",
    },
    {
      id: "letal-xlug",
      title: "Letal Xlug",
      artist: "brauxelion ft. Shisosaloud",
      format: "Verse video · 0:27",
      image: "/images/music-videos/letal-xlug.png",
      alt: "The neon city from brauxelion’s Letal Xlug verse video",
      url: "https://www.youtube.com/watch?v=f_GElz8Xc_A",
      description:
        "The rain, neon and game world of his EP, carried into a video for his verse. Built around his recording and approved by the artist.",
    },
  ],
  watch: "Watch the film on YouTube",
  offerEyebrow: "WORK WITH US",
  offerTitle: "Your recording. Our help making the film.",
  offerIntro:
    "Send your released song and the world you picture. We agree on scope and a custom quote before production begins.",
  offerNote:
    "Custom production is quoted separately from the self-serve budget.",
  deliverables: [
    "A visual direction shaped with you",
    "A scene plan and images to review",
    "An edited video set to your recording",
    "A final cut for you to approve and publish",
  ],
  processEyebrow: "MAKE IT YOURSELF",
  processTitle: "From an idea to a finished film.",
  process: [
    {
      title: "Get the skill",
      text: "Download it for your AI agent, or start in Recoup with the workflow connected.",
    },
    {
      title: "Shape the song and story",
      text: "Start with a new song. Choose the look, characters and scenes before spending on animation.",
    },
    {
      title: "Make the film",
      text: "Set the budget, review each scene, then render your video. Rework only what needs another take.",
    },
  ],
  routeNote: {
    title: "Already have a released track?",
    text: "The downloadable skill currently starts with a generated song. For a video using your own recording,",
    cta: "work with our team",
  },
  faqTitle: "A few things to know.",
  faq: [
    {
      q: "Is the skill really free?",
      a: "Yes. Download the skill and its reference guide without an email address or Recoup account. Generating songs, images and video uses paid credits.",
    },
    {
      q: "What does “less than $10” cover?",
      a: "The self-serve generation budget for a music video. Length, resolution and extra takes affect the total. Recoup plan fees and custom production are separate.",
    },
    {
      q: "Can I use my own song?",
      a: "The downloadable skill currently generates a new song. If you want a video for a released recording, send it to our team for a custom quote.",
    },
    {
      q: "What do I need to use the skill?",
      a: "An AI agent that can follow the instructions and access Recoup’s generation tools. The file is free; running it requires a Recoup account and generation credits. You can also start directly in Recoup.",
    },
    {
      q: "Can I try it on a free account?",
      a: "The current skill creates a complete 15-second piece on the free tier. Full-length films require Pro.",
    },
  ],
  closing: {
    title: "Make the film you picture.",
    intro: "Start with the free skill. See where the song takes you.",
  },
  form: {
    eyebrow: "REQUEST A CUSTOM QUOTE",
    title: "What song are we making a video for?",
    intro:
      "Tell us a little about it. We’ll reply by email to discuss the idea and put together a quote.",
    name: "Your name",
    email: "Email",
    artist: "Artist name",
    song: "Link to the released song",
    brief: "What do you picture?",
    briefHint:
      "A story, a place, a feeling, or a reference video. A few sentences are enough.",
    rights:
      "I am the artist or authorized to discuss a video for this release.",
    submit: "Request my video quote",
    submitting: "Sending your brief…",
    privacy: "We’ll use these details to respond to your video request.",
    successTitle: "Brief received.",
    success:
      "We’ve received your brief. The next step is an email from our team to discuss the direction, scope and quote. Production starts after we agree on those details.",
    error:
      "We couldn’t save your brief. Your details are still here. Please try again.",
  },
} as const;

export function musicVideosToMarkdown() {
  const c = musicVideosCopy;
  return [
    `# ${c.headline.join(" ")}`,
    c.intro,
    c.ctaNote,
    c.priceNote,
    `[${c.skill.cta}](${c.skill.downloadUrl})`,
    `[${c.appCta}](${c.appUrl})`,
    `## ${c.skill.title}`,
    c.skill.intro,
    c.skill.explanation,
    ...c.skill.contents.map((item) => `- ${item}`),
    `[${c.skill.sourceCta}](${c.skill.sourceUrl})`,
    `## ${c.filmsTitle}`,
    c.filmsIntro,
    ...c.films.map(
      (f) =>
        `### ${f.title} · ${f.artist}\n\n${f.description}\n\n[${c.watch}](${f.url})`,
    ),
    `## ${c.processTitle}`,
    ...c.process.map((p) => `### ${p.title}\n\n${p.text}`),
    `### ${c.routeNote.title}`,
    `${c.routeNote.text} [${c.routeNote.cta}](/music-videos#request).`,
    `## ${c.offerTitle}`,
    c.offerIntro,
    c.offerNote,
    ...c.deliverables.map((d) => `- ${d}`),
    `[${c.cta}](/music-videos#request)`,
    `## ${c.faqTitle}`,
    ...c.faq.map((f) => `### ${f.q}\n\n${f.a}`),
    `## ${c.closing.title}`,
    c.closing.intro,
    `[${c.skill.cta}](${c.skill.downloadUrl})`,
  ].join("\n\n");
}
