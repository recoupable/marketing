"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { circularLayout, layoutBounds } from "@/lib/company-map/circularLayout";
import { HoverConnections } from "./HoverConnections";
import { AmbientActivity } from "./AmbientActivity";
import publicCopy from "@/lib/company-map/public-copy.json";
import { companyMapCopy as copy } from "@/lib/copy/company-map";
import model from "@/lib/company-map/model.json";

const nodeById = new Map(model.nodes.map((n) => [n.id, n]));
const domainById = new Map(model.domains.map((d) => [d.id, d]));
const workflowById = new Map(model.workflows.map((w) => [w.id, w]));
type Selection = { domain: string; workflow: string; node: string };
const empty: Selection = { domain: "", workflow: "", node: "" };

export function CompanyMap() {
  const [selection, setSelection] = useState(empty);
  const [edgeId, setEdgeId] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [entering, setEntering] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setEntering(false), 1300);
    return () => window.clearTimeout(timer);
  }, []);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const detailsDismissed = useRef(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const cameraFrame = useRef<number>(0);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"areas" | "workflows">("areas");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const camera = useRef({ zoom: 1, pan: { x: 0, y: 0 } });
  const previousFocus = useRef<{ scope: string; node: string } | null>(null);
  useEffect(() => {
    camera.current = { zoom, pan };
  }, [zoom, pan]);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(
    null,
  );
  useEffect(() => {
    const sync = () => {
      const p = new URLSearchParams(window.location.hash.slice(1));
      const node = nodeById.has(p.get("node") || "") ? p.get("node")! : "";
      const workflow = workflowById.has(p.get("workflow") || "")
        ? p.get("workflow")!
        : "";
      const domain = domainById.has(p.get("domain") || "")
        ? p.get("domain")!
        : "";
      setSelection({ node, domain, workflow });
      setDetailsOpen(Boolean(node) && !detailsDismissed.current);
      setMode(workflow ? "workflows" : "areas");
      setZoom(1);
      setPan({ x: 0, y: 0 });
    };
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);
  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", escape);
    };
  }, [expanded]);
  const choose = (next: Selection, reset = true) => {
    setEdgeId("");
    setSelection(next);
    setDetailsOpen(Boolean(next.node) && !detailsDismissed.current);
    setMode(next.workflow ? "workflows" : "areas");
    if (reset) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) if (v) p.set(k, v);
    window.history.pushState(null, "", `#${p.toString()}`);
  };
  const chooseNode = (id: string) => {
    const n = nodeById.get(id);
    if (n) {
      setQuery("");
      choose(
        {
          domain: selection.domain ? n.domain : "",
          node: id,
          workflow: workflowById.get(selection.workflow)?.nodes.includes(id)
            ? selection.workflow
            : "",
        },
        false,
      );
    }
  };
  const node = nodeById.get(selection.node);
  const domain = domainById.get(selection.domain);
  const workflow = workflowById.get(selection.workflow);
  const overview = !domain && !workflow;
  const nodes = useMemo(
    () =>
      model.nodes.filter((n) =>
        workflow
          ? workflow.nodes.includes(n.id)
          : selection.domain
            ? n.domain === selection.domain
            : !publicCopy.specialists.includes(n.id) || n.id === selection.node,
      ),
    [workflow, selection.domain, selection.node],
  );
  const entries = nodes;
  const positions = useMemo(() => circularLayout(entries), [entries]);
  const bounds = useMemo(() => layoutBounds(positions), [positions]);
  const relations = useMemo(
    () =>
      model.edges.filter(
        (e) => e.source === selection.node || e.target === selection.node,
      ),
    [selection.node],
  );
  const graphEdges = useMemo(() => {
    return model.edges.filter(
      (e) => positions.has(e.source) && positions.has(e.target),
    );
  }, [positions]);
  const selectedEdge = model.edges.find((e) => e.id === edgeId);
  useEffect(() => {
    const scope = `${selection.domain}:${selection.workflow}`;
    const switchingNodes =
      previousFocus.current?.scope === scope &&
      previousFocus.current.node !== selection.node;
    previousFocus.current = selection.node
      ? { scope, node: selection.node }
      : null;
    if (!selection.node) return;
    const start = camera.current;
    const targetZoom = switchingNodes ? start.zoom : overview ? 3 : 1.4;
    const point = positions.get(selection.node);
    if (!point) return;
    const target = {
      x: bounds.x + bounds.width / 2 - point.x,
      y: bounds.y + bounds.height / 2 - point.y,
    };
    const startTime = performance.now();
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : 280;
    const frame = (time: number) => {
      const progress = duration
        ? Math.min(1, (time - startTime) / duration)
        : 1;
      const t = 1 - Math.pow(1 - progress, 3);
      setPan({
        x: start.pan.x + (target.x - start.pan.x) * t,
        y: start.pan.y + (target.y - start.pan.y) * t,
      });
      setZoom(start.zoom + (targetZoom - start.zoom) * t);
      if (progress < 1) cameraFrame.current = requestAnimationFrame(frame);
    };
    cameraFrame.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(cameraFrame.current);
  }, [
    selection.node,
    selection.domain,
    selection.workflow,
    positions,
    bounds,
    overview,
  ]);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const wheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      cancelAnimationFrame(cameraFrame.current);
      setZoom((z) =>
        Math.max(0.65, Math.min(8, z * Math.exp(-event.deltaY * 0.006))),
      );
    };
    svg.addEventListener("wheel", wheel, { passive: false });
    return () => svg.removeEventListener("wheel", wheel);
  }, []);
  const searchResults = query.trim()
    ? model.nodes.filter((n) =>
        `${n.label} ${n.technicalLabel} ${n.summary}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
      )
    : [];
  const highlightedNode = selection.node;
  const connected = new Set(
    model.edges
      .filter(
        (e) => e.source === highlightedNode || e.target === highlightedNode,
      )
      .flatMap((e) => [e.source, e.target]),
  );
  const relatedWorkflows = node
    ? model.workflows.filter((w) => w.nodes.includes(node.id))
    : [];

  return (
    <section
      className={`cm-explorer ${expanded ? "cm-expanded" : ""} ${entering && !selection.node ? "cm-entering" : ""}`}
      onPointerDownCapture={() => setEntering(false)}
      onKeyDownCapture={() => setEntering(false)}
      onWheelCapture={() => setEntering(false)}
      aria-label="Interactive company operating model"
    >
      <div className="cm-toolbar">
        <div
          className="cm-control-dock"
          role="group"
          aria-label="Atlas controls"
        >
          <button
            className="cm-panel-toggle"
            aria-label={navigationOpen ? "Hide navigation" : "Show navigation"}
            title={navigationOpen ? "Hide navigation" : "Show navigation"}
            aria-expanded={navigationOpen}
            aria-controls="cm-navigation"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="16" rx="3" />
              <path d="M9 4v16" />
              {navigationOpen && (
                <path d="M5 7h2v10H5z" fill="currentColor" stroke="none" />
              )}
            </svg>
          </button>
          <button
            className="cm-panel-toggle"
            aria-label="Show full map"
            title="Show full map"
            onClick={() => {
              choose(empty);
              setQuery("");
              setMode("areas");
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="4" r="2" />
              <circle cx="19" cy="9" r="2" />
              <circle cx="17" cy="18" r="2" />
              <circle cx="7" cy="18" r="2" />
              <circle cx="5" cy="9" r="2" />
              <path d="m14 5 3 3m2 3-2 5M15 18H9M7 16l-2-5m2-3 3-3" />
            </svg>
          </button>
          <button
            className="cm-panel-toggle"
            aria-label={expanded ? "Exit fullscreen" : "Fullscreen"}
            title={expanded ? "Exit fullscreen" : "Fullscreen"}
            aria-pressed={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {expanded ? (
                <path d="M9 3v6H3m18 0h-6V3M3 15h6v6m6 0v-6h6" />
              ) : (
                <path d="M9 3H3v6m12-6h6v6M3 15v6h6m6 0h6v-6" />
              )}
            </svg>
          </button>
          <button
            className="cm-panel-toggle"
            aria-label={detailsOpen ? "Hide details" : "Show details"}
            title={detailsOpen ? "Hide details" : "Show details"}
            aria-expanded={detailsOpen}
            aria-controls="cm-details"
            onClick={() => {
              detailsDismissed.current = detailsOpen;
              setDetailsOpen(!detailsOpen);
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="16" rx="3" />
              <path d="M15 4v16" />
              {detailsOpen && (
                <path d="M17 7h2v10h-2z" fill="currentColor" stroke="none" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`cm-layout ${navigationOpen ? "" : "cm-navigation-closed"} ${detailsOpen ? "" : "cm-details-closed"}`}
      >
        <div
          id="cm-navigation"
          className="cm-panel cm-navigation-panel"
          inert={!navigationOpen}
          aria-hidden={!navigationOpen}
        >
          <aside className="cm-sidebar" aria-label="Map navigation">
            <label className="cm-search">
              Find a component
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try rights, royalty, agent…"
                type="search"
              />
            </label>
            {query.trim() ? (
              <div className="cm-nav">
                <p role="status">{searchResults.length} results</p>
                {searchResults.map((n) => (
                  <button key={n.id} onClick={() => chooseNode(n.id)}>
                    {n.label}
                    <small>{domainById.get(n.domain)?.label}</small>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="cm-tabs">
                  <button
                    aria-pressed={mode === "areas"}
                    onClick={() => setMode("areas")}
                  >
                    Company areas
                  </button>
                  <button
                    aria-pressed={mode === "workflows"}
                    onClick={() => setMode("workflows")}
                  >
                    Workflows
                  </button>
                </div>
                <nav
                  className="cm-nav"
                  aria-label={mode === "areas" ? "Company areas" : "Workflows"}
                >
                  {(mode === "areas" ? model.domains : model.workflows).map(
                    (item, i) => (
                      <button
                        key={item.id}
                        aria-pressed={
                          item.id ===
                          (mode === "areas"
                            ? selection.domain
                            : selection.workflow)
                        }
                        onClick={() =>
                          choose(
                            mode === "areas"
                              ? { domain: item.id, workflow: "", node: "" }
                              : { workflow: item.id, domain: "", node: "" },
                          )
                        }
                      >
                        <span className="cm-index">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </button>
                    ),
                  )}
                </nav>
              </>
            )}
          </aside>
        </div>
        <div className="cm-canvas-area">
          <div className="cm-map-heading">
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
            {!overview && <h2>{workflow?.label || domain?.label}</h2>}
          </div>
          <div className="cm-canvas">
            <div className="cm-graph-viewport">
              <svg
                ref={svgRef}
                className={highlightedNode ? "cm-has-selection" : ""}
                viewBox={`${bounds.x + (bounds.width * (1 - 1 / zoom)) / 2 - pan.x} ${bounds.y + (bounds.height * (1 - 1 / zoom)) / 2 - pan.y} ${bounds.width / zoom} ${bounds.height / zoom}`}
                aria-label="Company relationship map; use search or company areas to find components"
                onPointerDown={(e) => {
                  if ((e.target as Element).closest('[role="button"]')) return;
                  cancelAnimationFrame(cameraFrame.current);
                  e.currentTarget.setPointerCapture(e.pointerId);
                  drag.current = {
                    x: e.clientX,
                    y: e.clientY,
                    ox: pan.x,
                    oy: pan.y,
                  };
                }}
                onPointerMove={(e) => {
                  if (!drag.current) return;
                  const ratio =
                    Math.max(
                      bounds.width /
                        e.currentTarget.getBoundingClientRect().width,
                      bounds.height /
                        e.currentTarget.getBoundingClientRect().height,
                    ) / zoom;
                  setPan({
                    x: drag.current.ox + (e.clientX - drag.current.x) * ratio,
                    y: drag.current.oy + (e.clientY - drag.current.y) * ratio,
                  });
                }}
                onPointerUp={() => {
                  drag.current = null;
                }}
                onPointerCancel={() => {
                  drag.current = null;
                }}
              >
                {graphEdges.map((e) => {
                  const a = positions.get(e.source),
                    b = positions.get(e.target);
                  if (!a || !b) return null;
                  return (
                    <g key={e.id}>
                      <line
                        role="button"
                        tabIndex={-1}
                        aria-label={`${nodeById.get(e.source)?.label}: ${e.relation}: ${nodeById.get(e.target)?.label}`}
                        className={`cm-edge-hit ${selection.node && (e.source === selection.node || e.target === selection.node) ? "cm-edge-hit-active" : ""}`}
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        onClick={() => setEdgeId(e.id)}
                      />
                      <line
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        pathLength="1"
                        className={`cm-edge ${e.source === highlightedNode || e.target === highlightedNode ? "cm-edge-active" : ""}`}
                      />
                    </g>
                  );
                })}
                <HoverConnections
                  key={`${selection.domain}:${selection.workflow}:${selection.node}`}
                  svgRef={svgRef}
                  edges={graphEdges}
                  positions={positions}
                  disabled={Boolean(selection.node)}
                />
                {entries.map((item, index) => {
                  const p = positions.get(item.id)!;
                  const active = item.id === selection.node;
                  const words = item.label.split(" ");
                  const midpoint = Math.ceil(words.length / 2);
                  const lines =
                    item.label.length > 22
                      ? [
                          words.slice(0, midpoint).join(" "),
                          words.slice(midpoint).join(" "),
                        ]
                      : [item.label];
                  const open = () => chooseNode(item.id);
                  return (
                    <g
                      key={item.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Explore ${item.label}`}
                      aria-pressed={active}
                      data-node-id={item.id}
                      style={
                        {
                          "--cm-enter-delay": `${Math.min(index * 1.4, 300)}ms`,
                        } as CSSProperties
                      }
                      onClick={open}
                      onDoubleClick={() =>
                        choose({
                          domain: item.domain,
                          node: item.id,
                          workflow: "",
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          open();
                        }
                      }}
                      className={`cm-node ${active ? "cm-node-active" : ""} ${connected.has(item.id) ? "cm-node-connected" : ""}`}
                      transform={`translate(${p.x},${p.y})`}
                    >
                      {active && (
                        <rect
                          className="cm-selection-pulse"
                          x="-91"
                          y="-32"
                          width="182"
                          height="64"
                          rx="16"
                        />
                      )}
                      <rect
                        className="cm-node-halo"
                        x="-91"
                        y="-32"
                        width="182"
                        height="64"
                        rx="16"
                      />
                      <rect
                        className="cm-node-surface"
                        x="-87"
                        y="-28"
                        width="174"
                        height="56"
                        rx="12"
                      />
                      <rect
                        className="cm-node-hit"
                        x="-87"
                        y="-28"
                        width="174"
                        height="56"
                        rx="12"
                      />
                      {lines.map((line, i) => (
                        <text
                          key={i}
                          x="0"
                          y={lines.length === 1 ? 5 : i === 0 ? -3 : 15}
                          textAnchor="middle"
                        >
                          {line}
                        </text>
                      ))}
                    </g>
                  );
                })}
                <AmbientActivity
                  svgRef={svgRef}
                  edges={graphEdges}
                  positions={positions}
                  disabled={entering || Boolean(selection.node) || !overview}
                />
              </svg>
            </div>
            <div className="cm-map-controls">
              <span>Drag · Ctrl/⌘ scroll to zoom</span>
              <div
                className="cm-zoom-controls"
                role="group"
                aria-label="Map zoom"
              >
                <button
                  aria-label="Zoom out"
                  onClick={() => {
                    cancelAnimationFrame(cameraFrame.current);
                    setZoom((z) => Math.max(0.65, z - 0.25));
                  }}
                >
                  −
                </button>
                <button
                  aria-label="Reset map zoom"
                  onClick={() => {
                    cancelAnimationFrame(cameraFrame.current);
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  }}
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  aria-label="Zoom in"
                  onClick={() => {
                    cancelAnimationFrame(cameraFrame.current);
                    setZoom((z) => Math.min(8, z + 0.5));
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          id="cm-details"
          className="cm-panel cm-details-panel"
          inert={!detailsOpen}
          aria-hidden={!detailsOpen}
        >
          <aside className="cm-detail" aria-label="Selected component details">
            <div className="cm-detail-scroll">
              {selectedEdge ? (
                <>
                  <p className="sp-kicker">CONNECTION</p>
                  <h2>
                    {nodeById.get(selectedEdge.source)?.label} →{" "}
                    {nodeById.get(selectedEdge.target)?.label}
                  </h2>
                  <p>{selectedEdge.relation}</p>
                  <p>This relationship describes the operating model.</p>
                  {[selectedEdge.source, selectedEdge.target].map((id) => (
                    <button
                      className="cm-workflow-link"
                      key={id}
                      onClick={() => chooseNode(id)}
                    >
                      Explore {nodeById.get(id)?.label} ↗
                    </button>
                  ))}
                  <button
                    className="cm-workflow-link"
                    onClick={() => setEdgeId("")}
                  >
                    Back to details
                  </button>
                </>
              ) : node ? (
                <>
                  {workflow && (
                    <button
                      className="cm-workflow-link"
                      onClick={() =>
                        choose({ domain: "", node: "", workflow: workflow.id })
                      }
                    >
                      ← Workflow overview
                    </button>
                  )}
                  <p className="sp-kicker">
                    {domainById.get(node.domain)?.label}
                  </p>
                  <h2>{node.label}</h2>
                  {node.technicalLabel && (
                    <p>
                      <strong>Technical name:</strong> {node.technicalLabel}
                    </p>
                  )}
                  <p>{node.summary}</p>
                  {node.rules.length > 0 && (
                    <section>
                      <h3>Operating rules</h3>
                      <ul>
                        {node.rules.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </section>
                  )}
                  <section>
                    <h3>Information it holds</h3>
                    <div className="cm-fields">
                      {node.fields.map((f) => (
                        <span key={f}>{f.replaceAll("_", " ")}</span>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h3>
                      Connections <small>{relations.length}</small>
                    </h3>
                    <div className="cm-relations">
                      {relations.map((e) => {
                        const outgoing = e.source === node.id;
                        const other = nodeById.get(
                          outgoing ? e.target : e.source,
                        )!;
                        return (
                          <button
                            key={e.id}
                            onClick={() => chooseNode(other.id)}
                          >
                            <small>
                              {outgoing ? "→" : "←"} {e.relation}
                            </small>
                            <strong>{other.label}</strong>
                            <span>{domainById.get(other.domain)?.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                  {relatedWorkflows.length > 0 && (
                    <section>
                      <h3>Part of these workflows</h3>
                      {relatedWorkflows.map((w) => (
                        <button
                          className="cm-workflow-link"
                          key={w.id}
                          onClick={() => {
                            setMode("workflows");
                            choose({
                              domain: "",
                              node: node.id,
                              workflow: w.id,
                            });
                          }}
                        >
                          {w.label} ↗
                        </button>
                      ))}
                    </section>
                  )}
                </>
              ) : workflow || domain ? (
                <>
                  <p className="sp-kicker">
                    {workflow ? "WORKFLOW" : "COMPANY AREA"}
                  </p>
                  <h2>{workflow?.label || domain?.label}</h2>
                  <p>{workflow?.summary || domain?.summary}</p>
                  <section>
                    <h3>
                      Connected components <small>{nodes.length}</small>
                    </h3>
                    <p>
                      Select a component to inspect its information, operating
                      rules and connections.
                    </p>
                    <div className="cm-relations">
                      {(workflow
                        ? workflow.nodes
                            .map((id) => nodeById.get(id)!)
                            .filter(Boolean)
                        : nodes
                      ).map((n) => (
                        <button key={n.id} onClick={() => chooseNode(n.id)}>
                          <strong>{n.label}</strong>
                          <span>{n.summary}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h3>
                      Connections in this view{" "}
                      <small>{graphEdges.length}</small>
                    </h3>
                    <div className="cm-relations">
                      {graphEdges.map((e) => (
                        <button key={e.id} onClick={() => chooseNode(e.source)}>
                          <strong>
                            {nodeById.get(e.source)?.label} →{" "}
                            {nodeById.get(e.target)?.label}
                          </strong>
                          <span>{e.relation}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <p className="sp-kicker">HOW TO EXPLORE</p>
                  <h2>Follow the work.</h2>
                  <p>
                    Select a component to see what it means, the information it
                    holds and everything it connects to.
                  </p>
                  <ol>
                    <li>
                      Explore the full map, or filter by area or workflow.
                    </li>
                    <li>Select a component on the map.</li>
                    <li>
                      Follow a connection into another part of the company.
                    </li>
                  </ol>
                  <div className="cm-detail-note">
                    People, music, money and agents share one connected
                    operating model.
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
