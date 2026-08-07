/**
 * ROI Calculator page copy — single source of truth.
 */
import { siteConfig } from "@/lib/config";

export const roiCopy = {
  headline: "How much could you save?",
  subheadline:
    "See what happens when AI agents run your music marketing. Input your numbers, get your answer in seconds.",
  badge: "Free — No signup required",

  inputs: {
    roster: {
      label: "Artists in your roster",
      min: 1,
      max: 500,
      default: 10,
    },
    hoursPerArtist: {
      label: "Hours / week on marketing per artist",
      min: 1,
      max: 20,
      default: 5,
    },
    hourlyCost: {
      label: "Team cost per hour",
      min: 20,
      max: 200,
      default: 75,
      prefix: "$",
    },
    postsPerWeek: {
      label: "Posts per artist per week",
      min: 1,
      max: 20,
      default: 3,
    },
  },

  results: {
    timeSaved: { label: "Hours saved / year", suffix: "hrs" },
    costSaved: { label: "Annual cost saved", prefix: "$" },
    contentBoost: { label: "Content output increase", suffix: "%" },
    roiMultiple: { label: "ROI multiple", suffix: "×" },
  },

  comparison: {
    without: "Without Recoup",
    with: "With Recoup",
    unit: "hrs / week",
  },

  cta: {
    primary: "Start free",
    primaryHref: siteConfig.appUrl,
    secondary: "Book a demo",
    secondaryHref: "/advisory/book",
  },

  disclaimer:
    "Based on 80% automation rate across research, content creation, and scheduling. Actual results vary by workflow.",

  methodology: [
    "80% automation rate (conservative — most customers see higher)",
    "2.5× content amplification with AI-assisted generation",
    "Pricing based on current Recoup plans",
  ],
} as const;
