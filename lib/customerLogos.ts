export interface CustomerLogo {
  slug: string;
  fileName: string;
  alt: string;
  viewBoxOverride?: string;
  className?: string;
}

export const CUSTOMER_LOGOS: readonly CustomerLogo[] = [
  {
    slug: "atlantic-records",
    fileName: "atlantic-records.svg",
    alt: "Atlantic Records logo",
    className: "max-h-7 sm:max-h-8",
  },
  {
    slug: "rostrum-records",
    fileName: "rostrum-records.svg",
    alt: "Rostrum Records logo",
    viewBoxOverride: "157 266 496 279",
  },
  {
    slug: "300-ent",
    fileName: "300-ent.svg",
    alt: "300 Entertainment logo",
    viewBoxOverride: "249 304 312 202",
  },
  {
    slug: "warner-records",
    fileName: "warner-records.svg",
    alt: "Warner Records logo",
    viewBoxOverride: "137 346 536 133",
  },
  {
    slug: "fatbeats-records",
    fileName: "fatbeats-records.svg",
    alt: "Fat Beats logo",
    viewBoxOverride: "185 281 440 248",
  },
  {
    slug: "one-rpm",
    fileName: "one-rpm.svg",
    alt: "ONErpm logo",
    viewBoxOverride: "240 280 330 250",
    className: "max-h-4.5 sm:max-h-5.5",
  },
  {
    slug: "duetti",
    fileName: "duetti.svg",
    alt: "Duetti logo",
    viewBoxOverride: "106 360 597 90",
    className: "max-h-4.5 sm:max-h-5.5",
  },
  {
    slug: "big-ass-kids",
    fileName: "big-ass-kids.svg",
    alt: "Big Ass Kids logo",
    viewBoxOverride: "118 352 573 105",
    className: "max-h-4.5 sm:max-h-5.5",
  },
] as const;

export type CustomerLogoSlug = (typeof CUSTOMER_LOGOS)[number]["slug"];
