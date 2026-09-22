"use client";

import { useEffect, useRef, useState } from "react";
import "./audience-mode.css";

export function AudienceMode({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  const [agent, setAgent] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [copyStatus, setCopyStatus] = useState("Copy Markdown");
  const humanButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!agent) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAgent(false);
        humanButton.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", escape);
    };
  }, [agent]);

  useEffect(() => {
    if (!agent || markdown) return;
    const controller = new AbortController();
    async function read() {
      setError("");
      const id =
        pathname === "/docs"
          ? "docs:index"
          : pathname.startsWith("/docs/")
            ? `docs:${pathname.slice(6)}`
            : pathname.startsWith("/blog/")
              ? `blog:${pathname.slice(6)}`
              : `page:${pathname}`;
      let offset: number | null = 0;
      let document = "";
      try {
        while (offset !== null) {
          const query = new URLSearchParams({
            id,
            offset: String(offset),
            maxLength: "12000",
          });
          const response = await fetch(`/agent-api/v1/read?${query}`, {
            signal: controller.signal,
          });
          if (!response.ok)
            throw new Error(
              response.status === 404
                ? "This page does not have an agent document yet."
                : "The document could not load. Please try again.",
            );
          const page: { markdown: string; nextOffset: number | null } =
            await response.json();
          document += page.markdown;
          offset = page.nextOffset;
        }
        setMarkdown(document);
      } catch (failure) {
        if (!controller.signal.aborted)
          setError(
            failure instanceof Error
              ? failure.message
              : "The document could not load.",
          );
      }
    }
    void read();
    return () => controller.abort();
  }, [agent, pathname, markdown, attempt]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Select the text to copy");
    }
  }

  return (
    <div className="audience-mode" data-agent={agent}>
      <div
        className="audience-human"
        inert={agent}
        aria-hidden={agent || undefined}
      >
        {children}
      </div>
      {agent && (
        <section
          className="agent-document"
          role="region"
          aria-label="Agent Markdown view"
          tabIndex={0}
        >
          <div className="agent-document-inner">
            <header className="agent-document-toolbar">
              <span>{pathname === "/" ? "recoup" : pathname.slice(1)}.md</span>
              <button
                type="button"
                onClick={copy}
                disabled={!markdown}
                aria-live="polite"
              >
                {copyStatus}
              </button>
            </header>
            {error ? (
              <div role="alert" className="agent-document-error">
                <p>{error}</p>
                <button
                  type="button"
                  onClick={() => setAttempt((value) => value + 1)}
                >
                  Try again
                </button>{" "}
                · <a href="/llms.txt">View site index</a>
              </div>
            ) : markdown ? (
              <pre className="agent-document-text">
                {markdown.split("\n").map((line, index) => (
                  <span
                    key={index}
                    className={
                      line.startsWith("#")
                        ? "agent-document-heading"
                        : undefined
                    }
                    style={{ animationDelay: `${Math.min(index * 9, 120)}ms` }}
                  >
                    {line || "\u00a0"}
                    {"\n"}
                  </span>
                ))}
              </pre>
            ) : (
              <p className="agent-document-loading" role="status">
                Reading document<span aria-hidden="true">_</span>
              </p>
            )}
          </div>
        </section>
      )}
      <div
        className="audience-toggle"
        role="group"
        aria-label="Website viewing mode"
      >
        <button
          ref={humanButton}
          type="button"
          aria-pressed={!agent}
          onClick={() => setAgent(false)}
        >
          <span aria-hidden="true">◉</span> Human
        </button>
        <button
          type="button"
          aria-pressed={agent}
          onClick={() => setAgent(true)}
        >
          <span aria-hidden="true">⌘</span> Agent
        </button>
      </div>
    </div>
  );
}
