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

const SUGGESTIONS = ["Research Drake", "Analyze Billie Eilish", "Who is SZA?"];
const transport = new DefaultChatTransport({ api: "/api/demo" });

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

function useSpotifySearch(query: string) {
  const [results, setResults] = useState<SpotifyArtist[]>([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);

      try {
        const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}&limit=10`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (!controller.signal.aborted) {
          setResults(data.artists ?? []);
        }
      } catch {
        if (!controller.signal.aborted) setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

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
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [pinnedArtist, setPinnedArtist] = useState<SpotifyArtist | null>(null);
  const hasMessages = messages.length > 0;
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchQuery = pinnedArtist ? "" : inputValue;
  const { results, loading } = useSpotifySearch(searchQuery);

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
    setShowDropdown(results.length > 0 && searchQuery.length >= 1 && !pinnedArtist);
    setSelectedIdx(-1);
  }, [results, inputValue]);

  const selectArtist = useCallback((artist: SpotifyArtist) => {
    setPinnedArtist(artist);
    setInputValue("");
    setShowDropdown(false);
    setTimeout(() => inputRef.current?.focus(), 0);
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

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Chat window */}
      <div
        className={`w-full rounded-xl border bg-(--background) overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] origin-bottom ${
          revealed
            ? "max-h-[500px] opacity-100 border-(--border) shadow-lg"
            : "max-h-0 opacity-0 border-transparent shadow-none"
        }`}
      >
        <div className="h-[380px] lg:h-[420px]">
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

                return (
                  <Message key={msg.id} from="assistant" className="max-w-[95%]">
                    <MessageContent className="text-[13px] leading-[1.8] text-(--foreground)/70 text-left space-y-2">
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
                    </MessageContent>
                  </Message>
                );
              })}

              {status === "submitted" && messages[messages.length - 1]?.role === "user" && (
                <ThinkingIndicator />
              )}
            </ConversationContent>
          </Conversation>
        </div>
      </div>

      {/* Input with autocomplete */}
      <div className="relative" ref={dropdownRef}>
        <form
          onSubmit={handleSubmit}
          className={`w-full rounded-full border border-(--border) bg-(--background) flex items-center gap-2 px-5 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ${
            pulse ? "scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.12)]" : ""
          } ${showDropdown ? "rounded-b-none rounded-t-2xl border-b-transparent" : ""}`}
        >
          {pinnedArtist && (
            <button
              type="button"
              onClick={() => { setPinnedArtist(null); inputRef.current?.focus(); }}
              className="shrink-0 flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full bg-(--foreground)/8 hover:bg-(--foreground)/12 transition-colors"
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
              <span className="text-[13px] font-medium text-(--foreground)">{pinnedArtist.name}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-(--foreground)/30">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          )}
          <input
            ref={inputRef}
            name="prompt"
            type="text"
            autoComplete="off"
            disabled={isLoading}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (results.length > 0 && !pinnedArtist) setShowDropdown(true); }}
            placeholder={isLoading ? "Thinking…" : pinnedArtist ? "Type a prompt…" : "Search any artist…"}
            className="flex-1 bg-transparent text-[14px] text-(--foreground) placeholder:text-(--foreground)/40 outline-none disabled:opacity-40 font-ui min-w-0"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="shrink-0 w-8 h-8 rounded-full bg-(--foreground) text-(--background) flex items-center justify-center hover:opacity-80 active:scale-95 transition-all disabled:opacity-20"
            aria-label="Send"
          >
            <ArrowUp size={15} />
          </button>
        </form>

        {/* Spotify autocomplete dropdown */}
        {showDropdown && (
          <div className="absolute left-0 right-0 top-full z-50 border border-t-0 border-(--border) bg-(--background) rounded-b-2xl shadow-lg overflow-y-auto max-h-[200px]">
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
        )}
      </div>

      {/* Suggestions — use invisible instead of unmounting to prevent layout shift */}
      {!hasMessages && (
        <div className={`flex items-center justify-center gap-2 flex-wrap transition-opacity duration-150 ${showDropdown ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="px-3 py-1.5 rounded-full border border-(--border) text-[12px] font-ui font-medium text-(--foreground)/50 hover:text-(--foreground) hover:border-(--foreground)/30 hover:shadow-sm transition-all whitespace-nowrap"
            >
              {s} →
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
