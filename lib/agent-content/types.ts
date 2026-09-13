export type AgentContentType = "page" | "docs" | "blog" | "playbook";
export type AgentContentMetadata = {
  id: string;
  type: AgentContentType;
  title: string;
  description: string;
  url: string;
  representation: "summary" | "full";
  publishedAt?: string;
  updatedAt?: string;
  api?: { method: string; path: string; specificationUrl: string };
};
export type AgentContentErrorCode =
  | "INVALID_QUERY"
  | "INVALID_TYPE"
  | "INVALID_LIMIT"
  | "INVALID_CURSOR"
  | "INVALID_ID"
  | "NOT_FOUND"
  | "INVALID_OFFSET"
  | "INVALID_MAX_LENGTH";
export type AgentSearchInput = {
  query: string;
  type?: AgentContentType | "all";
  limit?: number;
  cursor?: string;
};
export type AgentReadInput = {
  id: string;
  offset?: number;
  maxLength?: number;
};
export type AgentContentEntry = {
  metadata: AgentContentMetadata;
  searchable: string;
  keywords: string;
  markdown: () => Promise<string>;
};
export type PageSummary = {
  path: string;
  title: string;
  description: string;
  keywords: string;
  paragraphs: string[];
  links: [string, string][];
};
