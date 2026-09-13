export type PreviewMode = {
  prompt: string;
  label: string;
  title: string;
  summary: string;
  details: { label: string; text: string }[];
};

export const productPreviewContent: Record<string, PreviewMode> = {
  Research: {
    prompt: "Build an artist brief for Mara Vale.",
    label: "ARTIST BRIEF",
    title: "Mara Vale, in focus.",
    summary:
      "Late-night synth-pop. Intimate vocals. A new single called Blue Hour.",
    details: [
      {
        label: "Creative angle",
        text: "Build the release around the ride home: city lights, voice notes, and the feeling of a night winding down.",
      },
      {
        label: "Question for the artist",
        text: "What made you want to write Blue Hour? A short voice note could become the first teaser.",
      },
    ],
  },
  Content: {
    prompt: "Give Blue Hour a campaign direction.",
    label: "CAMPAIGN DRAFT",
    title: "Take the long way home.",
    summary:
      "A campaign built around the moments between the last song and the front door.",
    details: [
      {
        label: "Caption draft",
        text: "“For the ride home when you’re not quite ready for the night to end. Blue Hour.”",
      },
      {
        label: "Visual direction",
        text: "A passing streetlight. A close-up through a car window. Bring in the song title as the chorus begins.",
      },
    ],
  },
  Tasks: {
    prompt: "Plan a weekly release check-in.",
    label: "RECURRING TASK DRAFT",
    title: "Monday, with a clear next step.",
    summary: "A proposed weekly brief for the Blue Hour release.",
    details: [
      {
        label: "Every Monday",
        text: "Review the latest artist notes and release plan. Flag missing assets and decisions waiting on the team.",
      },
      {
        label: "Release check-in",
        text: "Teaser concept drafted. Cover artwork still needed. Next: ask Mara to choose the visual direction.",
      },
    ],
  },
};
