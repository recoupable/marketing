export type AcquisitionTags = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  campaign_id?: string;
  ad_group_id?: string;
  ad_id?: string;
};

export const acquisitionTagKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "campaign_id", "ad_group_id", "ad_id"] as const;
