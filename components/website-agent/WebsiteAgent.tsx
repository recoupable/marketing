"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUp, ChevronRight, Search } from "lucide-react";
import { useEveAgent } from "eve/react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from "@/components/ui/message-scroller";
import { Button } from "@/components/ui/button";
import { PageMark } from "@/components/sky/brand";
import { getConversationTurns } from "@/lib/website-agent/getConversationTurns";
import { getCompanyIdentity } from "@/lib/website-agent/getCompanyIdentity";
import { getActiveQuestion } from "@/lib/website-agent/getActiveQuestion";
import { getResearchPages } from "@/lib/website-agent/getResearchPages";
import { canPreviewReport } from "@/lib/website-agent/canPreviewReport";
import { useStreamingMessages } from "@/hooks/useStreamingMessages";
import { CompanyHeader } from "./CompanyHeader";
import { ChatTurn } from "./ChatTurn";
import { ChatComposer } from "./ChatComposer";
import { Shimmer } from "@/components/ai-elements/shimmer";
import {
  normalizeCompanyWebsite,
  type CompanySuggestion,
} from "@/lib/website-agent/companyWebsite";
import "./website-agent.css";
import "./chat-experience.css";

const plannerQuestions = [
  "How can we simplify reporting?",
  "Are we missing royalty income?",
  "How can we find tracks for briefs faster?",
];

const storageKey = "recoup:website-agent:session:v1";
type Cursor = { sessionId: string; streamIndex: number };

function Conversation({
  initialSession,
  mode,
}: {
  initialSession?: Cursor;
  mode: "planner" | "faq";
}) {
  const [input, setInput] = useState("");
  const [sendError, setSendError] = useState(false);
  const lastSent = useRef("");
  const agent = useEveAgent({
    host: "/api/website-agent",
    initialSession,
    resume: !!initialSession,
    onError: () => {
      setSendError(true);
      setInput((draft) => draft || lastSent.current);
    },
  });
  const reduceMotion = useReducedMotion();
  const messages = useStreamingMessages(agent.data.messages);
  const freeMaskId = useId();
  const companyListId = useId();
  const [describeCompany, setDescribeCompany] = useState(false);
  const [choicesVisible, setChoicesVisible] = useState(false);
  const [companySuggestions, setCompanySuggestions] = useState<
    CompanySuggestion[]
  >([]);
  const [searchingCompanies, setSearchingCompanies] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const inputElement = useRef<HTMLTextAreaElement>(null);
  const paused = agent.events.some((event) => event.type === "input.requested");
  const busy =
    !paused && ["submitted", "streaming", "resuming"].includes(agent.status);
  const started = agent.data.messages.length > 0 || !!agent.session;
  useEffect(() => {
    if (started) return;
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 1100;
    const timer = window.setTimeout(() => setChoicesVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [started]);
  useLayoutEffect(() => {
    const element = inputElement.current;
    if (!element) return;
    const resize = () => {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [input, started]);
  useEffect(() => {
    if (started || mode !== "planner" || describeCompany) return;
    const query = input.trim();
    if (query.length < 3 || normalizeCompanyWebsite(query)) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setSearchingCompanies(true);
      try {
        const response = await fetch(
          `/api/company-search?q=${encodeURIComponent(query)}`,
          {
            signal: controller.signal,
          },
        );
        const data = (await response.json()) as {
          companies?: CompanySuggestion[];
        };
        const companies =
          response.ok && Array.isArray(data.companies) ? data.companies : [];
        setCompanySuggestions(companies);
        setSuggestionsOpen(companies.length > 0);
      } catch {
        if (!controller.signal.aborted) setCompanySuggestions([]);
      } finally {
        if (!controller.signal.aborted) setSearchingCompanies(false);
      }
    }, 400);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [describeCompany, input, mode, started]);
  useEffect(() => {
    if (agent.session) {
      try {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            sessionId: agent.session.sessionId,
            streamIndex: 0,
          }),
        );
      } catch {}
    }
  }, [agent.session]);
  async function send(text = input) {
    if (!text.trim() || paused || agent.status === "resuming") return;
    lastSent.current = text;
    setSendError(false);
    setInput("");
    try {
      const rawMessage = text.trim();
      const message =
        !started && mode === "planner" && !describeCompany
          ? normalizeCompanyWebsite(rawMessage) || rawMessage
          : rawMessage;
      setSuggestionsOpen(false);
      await agent.send(message, {
        clientContext: { entryMode: mode },
        ...(busy ? { turnPolicy: "steer" as const } : {}),
      });
    } catch {
      setSendError(true);
      setInput(text);
    }
  }
  async function reset() {
    if (busy) await agent.cancel().catch(() => undefined);
    agent.reset();
    lastSent.current = "";
    setInput("");
    setSendError(false);
    setCompanySuggestions([]);
    setSuggestionsOpen(false);
    try {
      sessionStorage.removeItem(storageKey);
    } catch {}
  }
  const selectedWebsite =
    !started && mode === "planner" && !describeCompany
      ? normalizeCompanyWebsite(input)
      : undefined;
  const turns = getConversationTurns(messages);
  const researchPages = getResearchPages(messages);
  const reportPreviewAllowed = canPreviewReport(messages);
  const activeQuestion = getActiveQuestion(turns.at(-1));
  const company = getCompanyIdentity(agent.data.messages);
  const composerForm = (
    <form
      className="wa-composer"
      onSubmit={(e) => {
        e.preventDefault();
        void send();
      }}
    >
      <label className="sr-only" htmlFor="wa-message">
        Your message
      </label>
      {selectedWebsite && (
        <span className="wa-selected-company-icon" aria-hidden="true">
          <span
            className="wa-favicon-image"
            style={{
              backgroundImage: `url("/api/company-favicon?domain=${encodeURIComponent(new URL(selectedWebsite).hostname)}")`,
            }}
          />
        </span>
      )}
      <textarea
        ref={inputElement}
        id="wa-message"
        rows={started ? 2 : 1}
        maxLength={6000}
        value={input}
        aria-autocomplete={
          !started && mode === "planner" && !describeCompany
            ? "list"
            : undefined
        }
        aria-controls={suggestionsOpen ? companyListId : undefined}
        aria-expanded={
          !started && mode === "planner" && !describeCompany
            ? suggestionsOpen
            : undefined
        }
        onChange={(e) => {
          const nextInput = e.target.value;
          setInput(nextInput);
          if (
            nextInput.trim().length < 3 ||
            normalizeCompanyWebsite(nextInput)
          ) {
            setCompanySuggestions([]);
            setSuggestionsOpen(false);
            setSearchingCompanies(false);
          }
        }}
        placeholder={
          started
            ? activeQuestion
              ? "Type another answer…"
              : "Or reply in your own words…"
            : mode === "planner"
              ? describeCompany
                ? "Tell us a little about your company…"
                : "yourwebsite.com or company name"
              : "Ask us about Recoup…"
        }
        onKeyDown={(e) => {
          if (e.key === "Escape" && suggestionsOpen) {
            e.preventDefault();
            setSuggestionsOpen(false);
            return;
          }
          if (
            e.key === "Enter" &&
            !e.shiftKey &&
            suggestionsOpen &&
            companySuggestions[0]
          ) {
            e.preventDefault();
            setInput(companySuggestions[0].domain);
            setSuggestionsOpen(false);
            return;
          }
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            void send();
          }
        }}
      />
      {busy ? (
        <button
          type="button"
          aria-label="Stop response"
          onClick={() => void agent.cancel().catch(() => setSendError(true))}
        >
          ■
        </button>
      ) : (
        <button
          type="submit"
          disabled={!input.trim() || paused}
          aria-label="Send message"
        >
          <ArrowUp size={20} strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </form>
  );
  const composer = started ? (
    <ChatComposer
      input={input}
      onInput={setInput}
      onSend={(text) => void send(text)}
      onStop={() => void agent.cancel().catch(() => setSendError(true))}
      busy={busy}
      disabled={paused || agent.status === "resuming"}
      question={activeQuestion}
    />
  ) : (
    composerForm
  );
  return (
    <section className={`wa-shell ${started ? "wa-active" : "wa-landing"}`}>
      {!started && (
        <Image
          src="/images/sky/hero-sky.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="wa-sky"
        />
      )}
      <header className="wa-header">
        <Link href="/" aria-label="Recoup home">
          <PageMark />
        </Link>
        {started && (
          <Button variant="ghost" onClick={() => void reset()}>
            New conversation
          </Button>
        )}
      </header>
      {!started ? (
        <div className="wa-invitation">
          <h1>
            {mode === "faq" ? (
              <>
                Ask us about
                <br />
                <span>Recoup.</span>
              </>
            ) : (
              <>
                Get a{" "}
                <span className="wa-free-pill">
                  <span className="sr-only">free</span>
                  <svg
                    viewBox="0 0 180 88"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <defs>
                      <mask
                        id={freeMaskId}
                        x="0"
                        y="0"
                        width="180"
                        height="88"
                        maskUnits="userSpaceOnUse"
                        style={{ maskType: "luminance" }}
                      >
                        <rect width="180" height="88" fill="white" />
                        <text
                          x="90"
                          y="46"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="black"
                          fontSize="70"
                          fontWeight="450"
                          letterSpacing="-4"
                        >
                          free
                        </text>
                      </mask>
                    </defs>
                    <rect
                      width="180"
                      height="88"
                      rx="44"
                      fill="#d6ff62"
                      mask={`url(#${freeMaskId})`}
                    />
                  </svg>
                </span>{" "}
                AI opportunity audit, customized for your music business.
              </>
            )}
          </h1>
          <p>
            {mode === "faq"
              ? "Get answers about our tools, services, and how we work."
              : "Recoup’s agent researches your business and builds your personalized report."}
          </p>
          <div
            className={`wa-entry-card ${mode === "planner" ? "wa-website-entry" : ""} ${choicesVisible ? "wa-revealed" : "wa-collapsed"}`}
          >
            {mode === "faq" && (
              <motion.div
                className="wa-choices-reveal"
                inert={!choicesVisible}
                initial={{ height: 0 }}
                animate={{ height: choicesVisible ? "auto" : 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 125, damping: 23, mass: 1 }
                }
              >
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.22 }}
                  className="wa-choices"
                  aria-label="Suggested starting points"
                >
                  {(mode === "faq"
                    ? ["What does Recoup do?", "Can you build for my team?"]
                    : plannerQuestions
                  ).map((text, index) => (
                    <button
                      type="button"
                      key={text}
                      onClick={() => void send(text)}
                    >
                      <span className="wa-choice-number" aria-hidden="true">
                        {index + 1}
                      </span>
                      <span>{text}</span>
                      <ChevronRight
                        className="wa-choice-arrow"
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </motion.div>
              </motion.div>
            )}
            {composer}
            {!started && mode === "planner" && !describeCompany && (
              <div className="wa-company-search" aria-live="polite">
                {searchingCompanies && (
                  <div className="wa-company-searching">
                    <Search size={14} aria-hidden="true" />
                    Finding the official website…
                  </div>
                )}
                {suggestionsOpen && companySuggestions.length > 0 && (
                  <ul
                    id={companyListId}
                    aria-label="Company website suggestions"
                  >
                    {companySuggestions.map((company) => (
                      <li key={company.domain}>
                        <button
                          type="button"
                          onClick={() => {
                            setInput(company.domain);
                            setSuggestionsOpen(false);
                            inputElement.current?.focus();
                          }}
                        >
                          <span className="wa-company-icon" aria-hidden="true">
                            <span
                              className="wa-favicon-image"
                              style={{
                                backgroundImage: `url("/api/company-favicon?domain=${encodeURIComponent(company.domain)}")`,
                              }}
                            />
                          </span>
                          <span>
                            <strong>{company.name}</strong>
                            <small>{company.domain}</small>
                          </span>
                          <span className="wa-company-fill">Use website</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          {mode === "planner" && (
            <button
              className="wa-describe-toggle"
              onClick={() => {
                setDescribeCompany(!describeCompany);
                setCompanySuggestions([]);
                setSuggestionsOpen(false);
                setSearchingCompanies(false);
                inputElement.current?.focus();
              }}
            >
              {describeCompany
                ? "Use your website instead"
                : "Or tell us about your company"}
            </button>
          )}
        </div>
      ) : (
        <div className="wa-workspace">
          <div className="wa-conversation">
            {company && (
              <CompanyHeader
                company={company}
                onChange={async () => {
                  await reset();
                  setDescribeCompany(false);
                  setInput(company.domain);
                  requestAnimationFrame(() => inputElement.current?.focus());
                }}
              />
            )}
            <MessageScrollerProvider
              defaultScrollPosition={initialSession ? "last-anchor" : "start"}
              scrollPreviousItemPeek={0}
              scrollMargin={16}
            >
              <MessageScroller className="wa-scroller">
                <MessageScrollerViewport
                  className="wa-messages"
                  aria-label="Conversation"
                >
                  <MessageScrollerContent className="wa-message-list">
                    {turns.length === 0 && agent.status === "resuming" && (
                      <div className="wa-thinking" role="status">
                        <Shimmer>Opening your conversation…</Shimmer>
                      </div>
                    )}
                    {turns.map((turn, index) => {
                      const latest = index === turns.length - 1;
                      const turnId =
                        turn.assistants.at(-1)?.metadata?.turnId ??
                        turn.user?.metadata?.turnId;
                      const stopped = agent.events.some(
                        (event) =>
                          event.type === "turn.cancelled" &&
                          event.data.turnId === turnId,
                      );
                      return (
                        <MessageScrollerItem
                          key={turn.id}
                          messageId={turn.id}
                          scrollAnchor
                        >
                          <ChatTurn
                            researchPages={researchPages}
                            reportPreviewAllowed={reportPreviewAllowed}
                            turn={turn}
                            hideUserMessage={
                              turn.user?.id === company?.messageId
                            }
                            active={latest && busy}
                            latest={latest}
                            stopped={stopped}
                            error={latest && !!(agent.error || sendError)}
                            onSend={(text) => void send(text)}
                          />
                        </MessageScrollerItem>
                      );
                    })}
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton
                  behavior={reduceMotion ? "instant" : "smooth"}
                  aria-label="Jump to latest message"
                />
              </MessageScroller>
            </MessageScrollerProvider>
            <div className="wa-chat-dock">{composer}</div>
          </div>
        </div>
      )}
      {paused && (
        <div className="wa-error" role="status">
          This conversation has reached its limit. Your research remains above.{" "}
          You can <button onClick={reset}>start a new conversation</button> or{" "}
          <Link href="/contact">talk to Recoup</Link>.
        </div>
      )}
      {(!started || turns.length === 0) && (agent.error || sendError) && (
        <div className="wa-error" role="alert">
          The conversation couldn’t continue. Try sending again, or{" "}
          <button onClick={reset}>start a new conversation</button>.
        </div>
      )}
      <footer className="wa-notice">
        Recoup doesn’t use your messages to train AI models.{" "}
        <Link href="/privacy">Privacy</Link>
      </footer>
    </section>
  );
}
export function WebsiteAgent({
  mode = "planner",
}: {
  mode?: "planner" | "faq";
}) {
  const [loaded, setLoaded] = useState(false);
  const [cursor, setCursor] = useState<Cursor>();
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem(storageKey) || "null");
      if (
        stored &&
        typeof stored.sessionId === "string" &&
        /^[a-zA-Z0-9_-]+$/.test(stored.sessionId)
      )
        // Restore browser-only state after hydration; the loading view prevents a mismatch.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCursor({ sessionId: stored.sessionId, streamIndex: 0 });
    } catch {}
    setLoaded(true);
  }, []);
  return loaded ? (
    <Conversation initialSession={cursor} mode={mode} />
  ) : (
    <div className="wa-loading" role="status">
      Opening Recoup…
    </div>
  );
}
