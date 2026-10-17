"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { agentMarkdownPath } from "@/lib/agent-markdown-path";
import "./audience-mode.css";

export function AudienceMode({
  pathname,
  header,
  children,
}: {
  pathname: string;
  header: (toggle: React.ReactNode) => React.ReactNode;
  children: React.ReactNode;
}) {
  const [agent, setAgent] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [copyStatus, setCopyStatus] = useState("Copy Markdown");
  const headerRoot = useRef<HTMLDivElement>(null);
  const agentRoot = useRef<HTMLElement>(null);

  const hasOpened = useRef(false);

  function returnToHuman() {
    setAgent(false);
  }

  useEffect(() => {
    if (!agent) {
      if (hasOpened.current) {
        const visibleToggle = Array.from(
          headerRoot.current?.querySelectorAll<HTMLButtonElement>(
            ".audience-toggle button",
          ) ?? [],
        ).find((button) => button.checkVisibility());
        (
          visibleToggle ??
          headerRoot.current?.querySelector<HTMLElement>(
            ".ss-mobile-menu > summary",
          )
        )?.focus({ preventScroll: true });
      }
      return;
    }
    hasOpened.current = true;
    Array.from(
      headerRoot.current?.querySelectorAll<HTMLButtonElement>(
        '.audience-toggle button[aria-pressed="true"]',
      ) ?? [],
    )
      .find((button) => button.checkVisibility())
      ?.focus({ preventScroll: true });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        returnToHuman();
      }
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", escape);
    };
  }, [agent]);

  // Follow the existing header, including a partially scrolled or resized viewport.
  useLayoutEffect(() => {
    if (!agent || !headerRoot.current || !agentRoot.current) return;
    const header = headerRoot.current;
    const document = agentRoot.current;
    const position = () => {
      document.style.top = `${Math.max(0, header.getBoundingClientRect().bottom)}px`;
    };
    position();
    const observer = new ResizeObserver(position);
    observer.observe(header);
    window.addEventListener("resize", position);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", position);
    };
  }, [agent]);

  useEffect(() => {
    if (!agent || markdown) return;
    const controller = new AbortController();
    async function read() {
      setError("");
      try {
        const response = await fetch(agentMarkdownPath(pathname), {
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error("The document could not load. Please try again.");
        const document = await response.text();
        if (!controller.signal.aborted) setMarkdown(document);
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

  const toggle = (
    <div
      className="audience-toggle"
      role="group"
      aria-label="Website viewing mode"
    >
      <button type="button" aria-pressed={!agent} onClick={returnToHuman}>
        Human
      </button>
      <button type="button" aria-pressed={agent} onClick={() => setAgent(true)}>
        Agent
      </button>
    </div>
  );

  return (
    <div className="audience-mode" data-agent={agent}>
      <div className="audience-header" ref={headerRoot}>
        {header(toggle)}
      </div>
      <div
        className="audience-human"
        inert={agent}
        aria-hidden={agent || undefined}
      >
        {children}
      </div>
      {agent && (
        <section
          ref={agentRoot}
          className="agent-document"
          role="region"
          aria-label="Agent Markdown view"
          tabIndex={0}
        >
          <div className="agent-document-inner">
            <header className="agent-document-toolbar">
              <span className="agent-document-filename">
                {pathname === "/" ? "recoup" : pathname.slice(1)}.md
              </span>
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
    </div>
  );
}
