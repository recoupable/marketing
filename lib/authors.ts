import { siteConfig } from "@/lib/config";

/**
 * Author registry for post bylines (W-29). Keyed by the exact `author`
 * frontmatter string. Unknown authors fall back to a plain text byline.
 */
export interface AuthorProfile {
  name: string;
  role: string;
  /** Public path to an avatar image, if one exists. */
  avatar?: string;
  /** External profile link (X). */
  xUrl?: string;
}

export const AUTHORS: Record<string, AuthorProfile> = {
  "Sidney Swift": {
    name: "Sidney Swift",
    role: "Founder, Recoup",
    avatar: "/brand/pfp-sky-bg.png",
    xUrl: "https://x.com/sidneyswift",
  },
  "Recoupable Team": {
    name: "Recoupable Team",
    role: siteConfig.name,
    avatar: "/brand/pfp-sky-bg.png",
    xUrl: siteConfig.social.twitter,
  },
};

export function getAuthorProfile(name?: string): AuthorProfile | undefined {
  if (!name) return undefined;
  return AUTHORS[name];
}
