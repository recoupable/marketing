export const musicVideosCopy = {
  title: "Music Videos for Independent Artists | Send Your Song",
  description:
    "Turn your released song into a music video with Recoup. See finished artist films, share your song and direction, and request a quote for your video.",
  headline: "Your song deserves a video.",
  intro:
    "Send us the song and the world you picture. We build a music video around it, with you choosing the direction and approving the cut.",
  cta: "Get a quote for my song",
  ctaNote: "Start with a song link. No payment to submit.",
  filmsTitle: "Two songs. Two different worlds.",
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
  offerTitle: "A finished video, built around your recording.",
  offerIntro:
    "One release is enough to start. We scope the length and visual style with you, then send a quote before production begins.",
  deliverables: [
    "A visual direction shaped with you",
    "A scene plan and images to review before animation",
    "An edited vertical video set to your recording",
    "A final cut for you to approve and publish",
  ],
  processTitle: "Bring the song. We’ll work out the picture.",
  process: [
    {
      title: "Send the song",
      text: "Share a link to your released track and a few words about the video you have in mind.",
    },
    {
      title: "Agree on the scope",
      text: "We review the idea with you and agree on the length, price, revisions and delivery date before any paid work starts.",
    },
    {
      title: "Make it together",
      text: "You review the visual direction and scenes, then the finished cut. Your photos are only used with your permission.",
    },
  ],
  faq: [
    {
      q: "What does a video cost?",
      a: "We quote for your song and scope. Length, visual style and revisions affect the work. Send a brief to get a quote; submitting it is free.",
    },
    {
      q: "Do I need photos or a full treatment?",
      a: "A song link and a rough idea are enough for the first conversation. If you want to appear in the video, we’ll ask for photos and your permission before using your likeness.",
    },
    {
      q: "Can you make a full song or just a clip?",
      a: "Both. The films above show a full song and a short verse. We agree on the length and delivery format with you before production.",
    },
    {
      q: "Can my manager or label submit?",
      a: "Yes. Whoever submits should be the artist or authorized to represent the release. We confirm permission to use the recording, imagery and any likenesses before production.",
    },
  ],
  form: {
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
    `# ${c.headline}`,
    c.intro,
    `## ${c.filmsTitle}`,
    ...c.films.map(
      (f) =>
        `### ${f.title} · ${f.artist}\n\n${f.description}\n\n[${c.watch}](${f.url})`,
    ),
    `## ${c.offerTitle}`,
    c.offerIntro,
    ...c.deliverables.map((d) => `- ${d}`),
    `## ${c.processTitle}`,
    ...c.process.map((p) => `### ${p.title}\n\n${p.text}`),
    ...c.faq.map((f) => `## ${f.q}\n\n${f.a}`),
    `[${c.cta}](/music-videos#request)`,
  ].join("\n\n");
}
