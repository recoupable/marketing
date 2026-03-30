import { siteConfig } from "@/lib/config";

export const homeCopy = {
  hero: {
    subheader:
      "I sat down at 10pm to make content for the album. By midnight I had 22 finished videos. Captioned. Formatted. Queued. I didn't edit one. That's what agents do.",
    ctaPrimary: "Try Recoupable",
    ctaHref: siteConfig.appUrl,
    ctaSecondary: "Read the docs",
    ctaSecondaryHref: siteConfig.docsUrl,
  },
  modules: [
    {
      num: 1,
      tag: "01",
      title: "Know your artist",
      description:
        "Spotify data, audio analysis, peer benchmarks, fan segments. The system ingests everything — songs, images, brand docs, audience data — and builds a context layer that makes every output artist-specific. Not generic. Yours.",
    },
    {
      num: 2,
      tag: "02",
      title: "Create at scale",
      description:
        "Album visualizers, social posts, lyric videos. From one song, agents produce a content pack — using your artist's face, voice, and brand. 22 videos in one session. Output that's ready to post.",
    },
    {
      num: 3,
      tag: "03",
      title: "Run the operation",
      description:
        "Marketing campaigns, release execution, fan engagement, catalog management. Agents handle the operation. You handle the music. Web, Slack, email, CLI — one system, every entry point.",
    },
  ],
  proof: {
    stat: "22",
    label: "finished videos. One session. Zero editing.",
    attribution: "Sidney Swift, Founder",
    aside: "We run our own label on this system.",
  },
  ingestFeed: {
    title: "LIVE INGEST FEED",
    status: "REC",
    lines: [
      { time: "14:02:11", label: "SCAN:", value: "Spotify_Viral_50" },
      {
        time: "14:02:14",
        label: "DETECTED:",
        value: "ISRC_USRC12345678",
        highlight: true,
      },
      { time: "14:02:15", label: "ANALYZE:", value: "Acoustic_Features..." },
      {
        time: "14:02:18",
        label: "SCORE:",
        value: "87.4 (HIGH_VELOCITY)",
        highlight: true,
      },
      {
        time: "14:02:19",
        label: "ACTION:",
        value: "Generate_Contract_Draft",
      },
      { time: "14:02:22", label: "SCAN:", value: "TikTok_Audio_Trending" },
      { time: "14:02:25", label: "DETECTED:", value: "User_Upload_Anon" },
      {
        time: "14:02:26",
        label: "MATCH:",
        value: "Fingerprint_Found",
        highlight: true,
      },
    ],
  },
  cta: {
    headline: "Your label. Run by agents.",
    ctaLabel: "Try Recoupable",
    ctaHref: siteConfig.appUrl,
    installCmd: "npm install -g recoup",
  },
  subscribe: {
    title: "Stay in the loop",
    description: "One email per week. What we shipped. What we learned.",
  },
  blog: {
    title: "Latest",
    viewAllLabel: "View all",
    viewAllHref: "/blog",
  },
} as const;

export type HomeCopy = typeof homeCopy;

export function homeToMarkdown(c: HomeCopy): string {
  return [
    "# Recoupable",
    "",
    "Your label. Run by agents.",
    "",
    c.hero.subheader,
    "",
    `[${c.hero.ctaPrimary}](${c.hero.ctaHref})`,
    "",
    "---",
    "",
    ...c.modules.flatMap((m) => [`## ${m.tag} ${m.title}`, "", m.description, ""]),
    "---",
    "",
    `**${c.proof.stat}** ${c.proof.label}`,
    "",
    `— ${c.proof.attribution}`,
    "",
    `[${c.cta.ctaLabel}](${c.cta.ctaHref})`,
    "",
    `\`${c.cta.installCmd}\``,
  ].join("\n");
}
