import { describe, expect, it, vi } from "vitest";
import type { EveMessage, EveMessagePart } from "eve/client";
import { getCompanyIdentity } from "./getCompanyIdentity";
import { getActiveQuestion } from "./getActiveQuestion";
import { getActivitySteps } from "./getActivitySteps";
import { getVisibleReplyParts } from "./getVisibleReplyParts";
import { extractCompanyPage } from "./extractCompanyPage";

const { pages } = vi.hoisted(() => ({ pages: vi.fn() }));
vi.mock("eve/tools", () => ({ defineTool: (tool: unknown) => tool }));
vi.mock("../../agent/lib/research", () => ({ research: { get: pages } }));
import publishFinding from "../../agent/tools/publish_finding";

const result = (
  toolName: string,
  output: unknown,
  input: unknown = {},
): EveMessagePart => ({
  type: "dynamic-tool",
  toolName,
  toolCallId: toolName,
  state: "output-available",
  input,
  output,
});
const user: EveMessage = {
  id: "u1",
  role: "user",
  parts: [{ type: "text", text: "https://example.com" }],
};
const assistant = (id: string, parts: EveMessagePart[]): EveMessage => ({
  id,
  role: "assistant",
  parts,
});
const question = {
  context: "To understand your starting point.",
  question: "How do you use AI?",
  options: [
    { label: "Not yet", description: "" },
    { label: "Some tools", description: "" },
  ],
};
const finding = {
  title: "A specific decision",
  finding: "The company launched a new service.",
  implication: "This could change the release process.",
  test: "Compare the inputs needed for one release.",
  sources: [
    {
      title: "Announcement",
      url: "https://example.com/news",
      quote: "launched a new service",
    },
  ],
};

describe("company identity", () => {
  it("shows the domain immediately and gets the name only from its own homepage", () => {
    expect(getCompanyIdentity([user])).toEqual({
      domain: "example.com",
      messageId: "u1",
      name: undefined,
    });
    const homepage = result(
      "read_company_website",
      {
        siteName: "Example Music",
        title: "Example Music | Music for everyone",
      },
      { url: "https://example.com/" },
    );
    const news = result(
      "read_company_website",
      { siteName: "Trade Publication", title: "Example buys catalog" },
      { url: "https://news.example.org/deal" },
    );
    expect(
      getCompanyIdentity([user, assistant("a1", [homepage, news])])?.name,
    ).toBe("Example Music");
  });
  it("preserves ordinary first messages and does not treat them as company submissions", () => {
    expect(
      getCompanyIdentity([
        {
          ...user,
          parts: [
            { type: "text", text: "Help with my releases at example.com" },
          ],
        },
      ]),
    ).toBeUndefined();
  });
  it("falls back to a bounded title for saved conversations without metadata", () => {
    expect(
      getCompanyIdentity([
        user,
        assistant("a1", [
          result(
            "read_company_website",
            { title: "Independent Label | Releases" },
            { url: "https://example.com" },
          ),
        ]),
      ])?.name,
    ).toBe("Independent Label");
  });
  it("preserves a declared publication date without confusing it with retrieval time", () => {
    const page = extractCompanyPage(
      '<meta content="Example &amp; Co" property="og:site_name"><meta property="article:published_time" content="2024-04-10T12:00:00Z"><p>Announcement</p>',
      "https://example.com/news",
    );
    expect(page.siteName).toBe("Example & Co");
    expect(page.publishedAt).toBe("2024-04-10T12:00:00Z");
    expect(
      extractCompanyPage("<p>Undated</p>", "https://example.com").publishedAt,
    ).toBeUndefined();
  });
});

describe("findings during unanswered questions", () => {
  it("keeps a pending question across later research and finding messages", () => {
    const turn = {
      id: "u1",
      user,
      assistants: [
        assistant("a1", [result("ask_user_question", question)]),
        assistant("a2", [result("publish_finding", finding)]),
      ],
    };
    expect(getActiveQuestion(turn)?.question).toBe(question.question);
    expect(getActiveQuestion({ id: "u2", assistants: [] })).toBeUndefined();
  });
  it("does not count search results as verified page reads", () => {
    const [step] = getActivitySteps(
      [
        result(
          "web_search",
          { results: [{ url: "https://example.com/news" }] },
          { search_queries: ["Example Music new releases"] },
        ),
      ],
      false,
    );
    expect(step.label).toContain("Example Music new releases");
    expect(step.state).toBe("complete");
    expect(step.url).toBeUndefined();
  });
  it("rejects unread sources and fabricated quotations before publishing", () => {
    const execute = (
      publishFinding as unknown as {
        execute: (input: typeof finding) => unknown;
      }
    ).execute;
    pages.mockReturnValue({});
    expect(execute(finding)).toMatchObject({
      error: expect.stringContaining("Read"),
    });
    pages.mockReturnValue({
      "https://example.com/news": "Something entirely different.",
    });
    expect(execute(finding)).toMatchObject({
      error: expect.stringContaining("does not match"),
    });
    pages.mockReturnValue({
      "https://example.com/news": "Example launched a new service last month.",
    });
    expect(execute(finding)).toEqual(finding);
  });
  it("renders the finding once and retains recovery text after a rejected finding", () => {
    const prose: EveMessagePart = { type: "text", text: "A repeated finding" };
    expect(
      getVisibleReplyParts([result("publish_finding", finding), prose]),
    ).toHaveLength(1);
    expect(
      getVisibleReplyParts([
        result("publish_finding", { error: "Read the source first" }),
        prose,
      ]),
    ).toHaveLength(2);
  });
});
