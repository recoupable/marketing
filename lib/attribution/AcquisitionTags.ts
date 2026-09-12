export type AcquisitionTags = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export const acquisitionTagKeys = ["utm_source", "utm_medium", "utm_campaign"] as const;
