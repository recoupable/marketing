"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, Search } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "@/components/ai-elements/reasoning";

interface SpotifyArtist {
  id: string;
  name: string;
  image: string | null;
  genre: string | null;
  followers: number;
}

const PROMPT_SUGGESTIONS = ["Audit releases", "Research report", "Similar artists", "Campaign plan"];
const FEATURED_ARTIST_NAMES = ["Drake", "Tyla", "SZA", "Doja Cat"];
const CYCLE_INTERVAL_MS = 3500;
const transport = new DefaultChatTransport({ api: "/api/demo" });

// Follow-up action pills that appear under the latest assistant response.
// Kept generic so they fit any response shape (research, similar artists, campaign, etc.).
const RESPONSE_FOLLOWUPS = [
  { label: "Tell me more", prompt: "Tell me more about this." },
  { label: "Build a playlist", prompt: "Build a playlist from this." },
  { label: "Plan a campaign", prompt: "Build a campaign brief from this." },
];

const THINKING_PHRASES = [
  "Summoning the data gods…",
  "Crate digging…",
  "Reading the algorithm tea leaves…",
  "Counting streams by hand…",
  "Asking Spotify nicely…",
  "Cross-referencing vibes…",
  "Translating numbers into English…",
  "Almost done, promise…",
];

function ThinkingIndicator() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx(i => (i + 1) % THINKING_PHRASES.length), 2000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="flex items-center gap-2.5 text-[13px] text-(--foreground)/40">
      <span className="w-5 h-5 rounded-full border-2 border-(--foreground)/15 border-t-(--foreground)/40 animate-spin" />
      <span key={idx} className="fade-in-up">{THINKING_PHRASES[idx]}</span>
    </div>
  );
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

const searchCache = new Map<string, SpotifyArtist[]>();
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

function prefetchLetters() {
  if (searchCache.size > 0) return;
  LETTERS.forEach((letter) => {
    fetch(`/api/spotify/search?q=${letter}&limit=10`)
      .then((r) => r.json())
      .then((data) => { searchCache.set(letter, data.artists ?? []); })
      .catch(() => {});
  });
}

function getCachedApprox(query: string): SpotifyArtist[] {
  const q = query.toLowerCase();
  const exact = searchCache.get(q);
  if (exact) return exact;

  for (let len = q.length - 1; len >= 1; len--) {
    const prefix = q.slice(0, len);
    const cached = searchCache.get(prefix);
    if (cached) {
      return cached.filter((a) => a.name.toLowerCase().includes(q));
    }
  }
  return [];
}

function useSpotifySearch(query: string) {
  const [results, setResults] = useState<SpotifyArtist[]>([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    prefetchLetters();
  }, []);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setLoading(false);
      return;
    }

    const q = query.toLowerCase();
    const exact = searchCache.get(q);
    if (exact) {
      setResults(exact);
      setLoading(false);
      return;
    }

    const approx = getCachedApprox(q);
    if (approx.length > 0) setResults(approx);
    setLoading(true);

    const timeout = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}&limit=10`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (!controller.signal.aborted) {
          const artists = data.artists ?? [];
          searchCache.set(q, artists);
          setResults(artists);
        }
      } catch {
        if (!controller.signal.aborted) setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 80);

    return () => {
      clearTimeout(timeout);
      abortRef.current?.abort();
    };
  }, [query]);

  return { results, loading };
}

export function HeroDemo() {
  const { messages, sendMessage, status } = useChat({ transport });
  const [revealed, setRevealed] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [islandPulse, setIslandPulse] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [pinnedArtist, setPinnedArtist] = useState<SpotifyArtist | null>(null);
  const [featuredArtists, setFeaturedArtists] = useState<SpotifyArtist[]>([]);
  const [autoCycle, setAutoCycle] = useState(true);
  const [cycleIdx, setCycleIdx] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const hasMessages = messages.length > 0;
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const prevExpandedRef = useRef(false);
  const prevStatusRef = useRef(status);

  const searchQuery = pinnedArtist ? "" : inputValue;
  const { results, loading } = useSpotifySearch(searchQuery);

  const stopCycle = useCallback(() => {
    setAutoCycle(false);
  }, []);

  // Fetch featured artists once so the cycling pills have real avatars + names.
  // Falls back to no-op if Spotify search is unavailable — hero stays usable.
  useEffect(() => {
    let cancelled = false;
    async function loadFeatured() {
      const results = await Promise.all(
        FEATURED_ARTIST_NAMES.map((name) =>
          fetch(`/api/spotify/search?q=${encodeURIComponent(name)}&limit=1`)
            .then((r) => r.json())
            .then((d) => (d.artists?.[0] as SpotifyArtist | undefined))
            .catch(() => undefined),
        ),
      );
      if (cancelled) return;
      const valid = results.filter((a): a is SpotifyArtist => Boolean(a));
      if (valid.length > 0) setFeaturedArtists(valid);
    }
    loadFeatured();
    return () => {
      cancelled = true;
    };
  }, []);

  // Advance cycleIdx on an interval while auto-cycling.
  useEffect(() => {
    if (!autoCycle || featuredArtists.length === 0 || hasMessages) return;
    const iv = setInterval(() => {
      setCycleIdx((i) => i + 1);
    }, CYCLE_INTERVAL_MS);
    return () => clearInterval(iv);
  }, [autoCycle, featuredArtists.length, hasMessages]);

  // Sync the visible pinned artist to the current cycle position.
  useEffect(() => {
    if (!autoCycle || featuredArtists.length === 0 || hasMessages) return;
    setPinnedArtist(featuredArtists[cycleIdx % featuredArtists.length]);
  }, [autoCycle, featuredArtists, cycleIdx, hasMessages]);

  useEffect(() => {
    if (hasMessages && !revealed) {
      setPulse(true);
      setTimeout(() => {
        setRevealed(true);
        setPulse(false);
      }, 150);
    }
  }, [hasMessages, revealed]);

  useEffect(() => {
    if (!pinnedArtist) {
      setShowDropdown((results.length > 0 || loading) && searchQuery.length >= 1);
    }
    setSelectedIdx(-1);
  }, [results, inputValue, loading, searchQuery, pinnedArtist]);

  const [closing, setClosing] = useState(false);

  const selectArtist = useCallback((artist: SpotifyArtist) => {
    setAutoCycle(false);
    setClosing(true);
    setTimeout(() => {
      setPinnedArtist(artist);
      setInputValue("");
      setTimeout(() => {
        setShowDropdown(false);
        setClosing(false);
        inputRef.current?.focus();
      }, 80);
    }, 120);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function send(text: string) {
    let full: string;
    if (pinnedArtist && text.trim()) {
      full = `${text.trim()} for ${pinnedArtist.name}`;
    } else if (pinnedArtist) {
      full = `Research ${pinnedArtist.name}`;
    } else {
      full = text.trim();
    }
    if (!full || status === "streaming" || status === "submitted") return;
    setAutoCycle(false);
    setInputValue("");
    setPinnedArtist(null);
    setShowDropdown(false);
    sendMessage({ text: full, files: [] });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (showDropdown && selectedIdx >= 0 && results[selectedIdx]) {
      selectArtist(results[selectedIdx]);
      return;
    }
    send(inputValue);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Backspace" && inputValue === "" && pinnedArtist) {
      e.preventDefault();
      setPinnedArtist(null);
      return;
    }

    if (!showDropdown || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx(i => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  }

  const isLoading = status === "submitted" || status === "streaming";

  const isExpanded = revealed || showDropdown;

  useEffect(() => {
    if (isExpanded !== prevExpandedRef.current) {
      setIslandPulse(true);
      const t = setTimeout(() => setIslandPulse(false), 400);
      prevExpandedRef.current = isExpanded;
      return () => clearTimeout(t);
    }
  }, [isExpanded]);

  // Auto-focus the input the moment a streaming response finishes — reinforces
  // "ready for your next prompt" without the user having to click.
  useEffect(() => {
    const wasStreaming = prevStatusRef.current === "submitted" || prevStatusRef.current === "streaming";
    const isDone = status !== "submitted" && status !== "streaming";
    if (wasStreaming && isDone && hasMessages) {
      inputRef.current?.focus();
    }
    prevStatusRef.current = status;
  }, [status, hasMessages]);

  return (
    <div
      className="flex flex-col mx-auto"
      data-chat-open={revealed}
      style={{
        width: "100%",
        maxWidth: revealed ? "1200px" : "460px",
        transition: "max-width 500ms cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      {/* === THE ISLAND === */}
      <div
        ref={dropdownRef}
        className="w-full bg-(--background)"
        style={{
          borderRadius: isExpanded ? "16px" : "9999px",
          boxShadow: revealed
            ? "0px 0px 0px 1px var(--border), 0px 8px 32px rgba(0,0,0,0.12)"
            : showDropdown
              ? "0px 0px 0px 1px var(--border), 0px 4px 20px rgba(0,0,0,0.10)"
              : "0px 0px 0px 1px var(--border), 0px 2px 12px rgba(0,0,0,0.06)",
          transition: "box-shadow 400ms ease",
          overflow: "hidden",
        }}
      >
        {/* Chat content — grows into the island */}
        <div
          className="grid"
          style={{
            gridTemplateRows: revealed ? "1fr" : "0fr",
            transition: "grid-template-rows 500ms cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          <div className="overflow-hidden min-h-0">
          <div className="h-[450px] lg:h-[540px]">
            <Conversation className="flex-1 h-full">
              <ConversationContent className="gap-4 p-4 text-left">
                {messages.map((msg) => {
                  if (msg.role === "user") {
                    const text = msg.parts
                      .filter((p) => p.type === "text")
                      .map((p) => ("text" in p ? p.text : ""))
                      .join("");
                    if (!text) return null;
                    return (
                      <Message key={msg.id} from="user" className="max-w-[85%]">
                        <MessageContent className="bg-(--foreground)/8 text-(--foreground) rounded-2xl rounded-br-sm px-4 py-2.5 text-[13px]">
                          <p>{text}</p>
                        </MessageContent>
                      </Message>
                    );
                  }

                  const textParts = msg.parts.filter((p) => p.type === "text");
                  const reasoningParts = msg.parts.filter((p) => p.type === "reasoning");
                  const text = textParts.map((p) => ("text" in p ? p.text : "")).join("");
                  const reasoningText = reasoningParts.map((p) => ("reasoning" in p ? p.reasoning : "")).join("");
                  const isLastMsg = msg.id === messages[messages.length - 1]?.id;
                  const isThisStreaming = isLoading && isLastMsg;

                  const showFooter = isLastMsg && !isThisStreaming && Boolean(text);
                  return (
                    <Message key={msg.id} from="assistant" className="max-w-[95%]">
                      <div className="w-full rounded-2xl bg-(--muted)/50 text-left overflow-hidden" style={{ boxShadow: "0 0 0 1px var(--border)" }}>
                        {/* Card header — small chip identifying the response surface */}
                        <div className="flex items-center gap-1.5 px-4 pt-3 pb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-(--foreground)/40" />
                          <span className="text-[10px] font-pixel uppercase tracking-[0.14em] text-(--foreground)/40">
                            Recoup Agent
                          </span>
                          {isThisStreaming && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-(--foreground)/50 animate-pulse" aria-label="streaming" />
                          )}
                        </div>
                        {/* Card body — existing markdown + reasoning rendering */}
                        <div className="text-[13px] leading-[1.8] text-(--foreground)/80 space-y-2 px-4 py-2">
                          {reasoningText && (
                            <Reasoning isStreaming={isThisStreaming && !text}>
                              <ReasoningTrigger />
                              <ReasoningContent>{reasoningText}</ReasoningContent>
                            </Reasoning>
                          )}
                          {text ? (
                            <MessageResponse isAnimating={isThisStreaming}>
                              {text}
                            </MessageResponse>
                          ) : isThisStreaming && !reasoningText ? (
                            <ThinkingIndicator />
                          ) : null}
                        </div>
                        {/* Card footer — follow-up action pills (only on latest completed reply) */}
                        {showFooter && (
                          <div className="flex flex-wrap gap-1.5 px-4 pb-3 pt-1">
                            {RESPONSE_FOLLOWUPS.map((action) => (
                              <button
                                key={action.label}
                                type="button"
                                onClick={() => send(action.prompt)}
                                className="text-[11px] font-ui px-2.5 py-1 rounded-full bg-(--foreground)/5 hover:bg-(--foreground)/10 text-(--foreground)/60 hover:text-(--foreground)/90 transition-colors"
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </Message>
                  );
                })}

                {status === "submitted" && messages[messages.length - 1]?.role === "user" && (
                  <ThinkingIndicator />
                )}
              </ConversationContent>
            </Conversation>
          </div>

            <div className="h-px" style={{ background: "var(--border)", opacity: revealed ? 1 : 0, transition: "opacity 200ms ease 150ms" }} />
          </div>
        </div>

        {/* Input — always visible, part of the island */}
        <form
          onSubmit={handleSubmit}
          className={`w-full flex items-center gap-2 px-5 py-3 transition-all duration-200 ${
            pulse ? "scale-[1.01]" : ""
          }`}
        >
          {pinnedArtist && (
            <div
              key={pinnedArtist.id}
              onClick={() => { stopCycle(); inputRef.current?.focus(); }}
              className="shrink-0 flex items-center gap-1.5 pl-1 pr-1 py-1 rounded-full bg-(--foreground)/8 pill-pop-in cursor-pointer hover:bg-(--foreground)/12 transition-colors"
            >
              {pinnedArtist.image ? (
                <Image
                  src={pinnedArtist.image}
                  alt={pinnedArtist.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-(--muted) flex items-center justify-center">
                  <span className="text-[8px] text-(--foreground)/30">♪</span>
                </div>
              )}
              <span className="text-[13px] font-medium text-(--foreground) pr-1">{pinnedArtist.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAutoCycle(false);
                  setPinnedArtist(null);
                  inputRef.current?.focus();
                }}
                aria-label={`Remove ${pinnedArtist.name}`}
                className="w-4 h-4 rounded-full flex items-center justify-center text-(--foreground)/30 hover:text-(--foreground)/70 hover:bg-(--foreground)/8 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          )}
          <div className="relative flex-1 min-w-0 flex items-center">
            <input
              ref={inputRef}
              name="prompt"
              type="text"
              autoComplete="off"
              disabled={isLoading}
              value={inputValue}
              onChange={(e) => { stopCycle(); setInputValue(e.target.value); }}
              onKeyDown={(e) => { stopCycle(); handleKeyDown(e); }}
              onMouseDown={stopCycle}
              onFocus={() => {
                stopCycle();
                setIsInputFocused(true);
                if (results.length > 0 && !pinnedArtist) setShowDropdown(true);
              }}
              onBlur={() => setIsInputFocused(false)}
              placeholder={
                isLoading
                  ? "Thinking…"
                  : pinnedArtist
                    ? "Type a prompt…"
                    : hasMessages
                      ? ""
                      : "Search any artist…"
              }
              className="w-full bg-transparent text-[14px] text-(--foreground) placeholder:text-(--foreground)/30 outline-none disabled:opacity-40 font-ui"
            />
            {/* Blinking caret — replaces placeholder in post-message mode so the
                input always feels "live and ready" even when not focused. */}
            {hasMessages && !pinnedArtist && !inputValue && !isLoading && !isInputFocused && (
              <span
                aria-hidden
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-(--foreground)/60 animate-blink pointer-events-none"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="shrink-0 w-8 h-8 rounded-full bg-(--foreground)/80 text-(--background) flex items-center justify-center hover:bg-(--foreground) active:scale-95 transition-all disabled:opacity-20"
            aria-label="Send"
          >
            <ArrowUp size={15} />
          </button>
        </form>

        {/* Autocomplete results — grows inside the island */}
        <div
          className="grid"
          style={{
            gridTemplateRows: showDropdown ? "1fr" : "0fr",
            transition: showDropdown
              ? "grid-template-rows 300ms cubic-bezier(0.25, 1, 0.5, 1)"
              : "grid-template-rows 150ms ease",
          }}
        >
          <div className="overflow-hidden min-h-0">
            <div className="h-px mx-4" style={{ background: "var(--border)", opacity: showDropdown ? 1 : 0, transition: "opacity 150ms ease" }} />
            <div className="overflow-y-auto max-h-[232px]" style={{ opacity: showDropdown && !closing ? 1 : 0, transform: closing ? "scale(0.97)" : "scale(1)", transition: closing ? "opacity 100ms ease, transform 100ms ease" : showDropdown ? "opacity 150ms ease 80ms, transform 150ms ease 80ms" : "opacity 80ms ease, transform 80ms ease" }}>
            {loading && results.length === 0 && (
              <div className="flex items-center gap-2.5 px-5 py-3 text-[13px] text-(--foreground)/30">
                <span className="w-4 h-4 rounded-full border-2 border-(--foreground)/10 border-t-(--foreground)/30 animate-spin" />
                Searching...
              </div>
            )}
            {results.map((artist, i) => (
              <button
                key={artist.id}
                type="button"
                onClick={() => selectArtist(artist)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                  i === selectedIdx ? "bg-(--muted)" : "hover:bg-(--muted)/60"
                }`}
              >
                {artist.image ? (
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-(--muted) shrink-0 flex items-center justify-center">
                    <Search size={14} className="text-(--foreground)/30" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-(--foreground) truncate">{artist.name}</p>
                  <p className="text-[11px] text-(--foreground)/40 truncate">
                    {artist.genre && <span className="capitalize">{artist.genre}</span>}
                    {artist.genre && artist.followers > 0 && " · "}
                    {artist.followers > 0 && `${formatFollowers(artist.followers)} followers`}
                  </p>
                </div>
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* Prompt suggestions — single line inside the island */}
        <div
          className="grid"
          style={{
            gridTemplateRows: pinnedArtist && !hasMessages && !inputValue && !showDropdown ? "1fr" : "0fr",
            transition: "grid-template-rows 250ms cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          <div className="overflow-hidden min-h-0">
            <div className="flex items-center justify-center gap-1 px-4 pb-3 pt-1 text-[11px] font-ui text-(--foreground)/30">
              {PROMPT_SUGGESTIONS.map((s, i) => (
                <span key={s} style={{ animation: pinnedArtist && !hasMessages ? `pill-pop 180ms ease ${60 + i * 30}ms both` : "none" }}>
                  {i > 0 && <span className="text-(--foreground)/15 mx-0.5">·</span>}
                  <button
                    type="button"
                    onClick={() => send(s)}
                    className="hover:text-(--foreground)/60 transition-colors"
                  >
                    {s}
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!hasMessages && !showDropdown && !pinnedArtist && (
        <p className="text-center mt-3 text-[11px] font-pixel text-(--foreground)/20 uppercase tracking-[0.12em]">
          No signup required
        </p>
      )}
    </div>
  );
}
