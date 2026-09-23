"use client";

import { defineCatalog, type Spec } from "@json-render/core";
import { defineRegistry, JSONUIProvider, Renderer } from "@json-render/react";
import { schema } from "@json-render/react/schema";
import { z } from "zod";
import { ArrowUpRight, Check, ChevronDown, Minus } from "lucide-react";
import { MessageResponse } from "@/components/ai-elements/message";
import { getAssessmentProfile } from "@/lib/website-agent/getAssessmentProfile";
import { scorecardLevels } from "@/lib/website-agent/scorecardRubric";
import type { ScorecardDraft } from "@/lib/website-agent/scorecard";
import { aiScorecardCopy } from "@/lib/copy/ai-scorecard";

const catalog = defineCatalog(schema, {
  components: {
    Scorecard: { props: z.object({}), slots: ["default"] },
    Introduction: {
      props: z.object({
        assessed: z.number(),
        complete: z.boolean(),
        repeatable: z.number(),
        scope: z.string(),
        summary: z.string(),
        streaming: z.boolean(),
      }),
    },
    Profile: {
      props: z.object({ summary: z.string(), streaming: z.boolean() }),
      slots: ["default"],
    },
    Area: {
      props: z.object({
        title: z.string(),
        question: z.string(),
        label: z.string(),
        level: z.number().nullable(),
        criteria: z.array(
          z.object({
            label: z.string(),
            status: z.string(),
            quote: z.string().nullable(),
            question: z.string().nullable(),
          }),
        ),
      }),
    },
    NextMoves: { props: z.object({}), slots: ["default"] },
    Move: {
      props: z.object({
        action: z.string(),
        why: z.string(),
        firstStep: z.string(),
        check: z.string(),
        index: z.number(),
        streaming: z.boolean(),
      }),
    },
    Peers: { props: z.object({}), slots: ["default"] },
    Peer: {
      props: z.object({
        company: z.string(),
        practice: z.string(),
        relevance: z.string(),
        published: z.string().nullable(),
        url: z.string(),
        title: z.string(),
        quote: z.string(),
      }),
    },
  },
  actions: {},
});

const { registry } = defineRegistry(catalog, {
  components: {
    Scorecard: ({ children }) => (
      <div className="wa-scorecard-report">{children}</div>
    ),
    Introduction: ({ props }) => (
      <div className="wa-scorecard-intro">
        <span className="wa-scorecard-eyebrow">
          {props.complete ? "YOUR AI SCORECARD" : "YOUR PARTIAL AI SCORECARD"}
        </span>
        <h2>
          {props.assessed < 5
            ? `${props.assessed} of 5 areas assessed.`
            : props.repeatable === 0
              ? "Your next step is repeatable AI use."
              : `Repeatable AI use in ${props.repeatable} of 5 areas.`}
        </h2>
        {props.scope && <p className="wa-scorecard-scope">{props.scope}</p>}
      </div>
    ),
    Profile: ({ props, children }) => (
      <section
        className="wa-scorecard-profile"
        aria-label="Your AI capability profile"
      >
        <div className="wa-scorecard-ruler" aria-hidden="true">
          <span />
          {scorecardLevels.map((level) => (
            <span key={level}>{level}</span>
          ))}
        </div>
        {children}
        {props.summary && (
          <div className="wa-scorecard-interpretation">
            <MessageResponse isAnimating={props.streaming}>
              {props.summary}
            </MessageResponse>
          </div>
        )}
        <p className="wa-scorecard-note">{aiScorecardCopy.methodology}</p>
        <details className="wa-scorecard-method">
          <summary>
            How the scale works <ChevronDown size={13} aria-hidden="true" />
          </summary>
          <p>
            Each area has three requirements, shown above. Started meets the
            first; Repeatable meets the first two; Established meets all three.
            Not yet means the first requirement is absent. We leave an area
            unscored until all three answers are clear. No average combines
            unrelated strengths and gaps.
          </p>
        </details>
      </section>
    ),
    Area: ({ props }) => (
      <details className="wa-scorecard-area">
        <summary>
          <span className="wa-scorecard-area-title">
            {props.title}
            <small>{props.label}</small>
          </span>
          <span
            className="wa-scorecard-track"
            aria-hidden="true"
            data-unknown={props.level === null}
          >
            {scorecardLevels.map((level, index) => (
              <span
                className={props.level === index ? "wa-scorecard-position" : ""}
                key={level}
              >
                {props.level === index && <span />}
              </span>
            ))}
          </span>
          <ChevronDown
            className="wa-scorecard-expand"
            size={14}
            aria-hidden="true"
          />
        </summary>
        <div className="wa-scorecard-evidence">
          <p>{props.question}</p>
          <ul>
            {props.criteria.map((criterion) => (
              <li key={criterion.label}>
                {criterion.status === "yes" ? (
                  <Check size={15} aria-hidden="true" />
                ) : (
                  <Minus size={15} aria-hidden="true" />
                )}
                <div>
                  <strong>{criterion.label}</strong>
                  <small>
                    {criterion.status === "unknown"
                      ? "Not yet answered"
                      : criterion.status === "yes"
                        ? "In place · your answer"
                        : "Not in place · your answer"}
                  </small>
                  {criterion.question && (
                    <small>In answer to: {criterion.question}</small>
                  )}
                  {criterion.quote && (
                    <blockquote>“{criterion.quote}”</blockquote>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </details>
    ),
    NextMoves: ({ children }) => (
      <section className="wa-scorecard-moves">
        <span className="wa-scorecard-eyebrow">WHAT TO DO NEXT</span>
        <h3>Make the next step count.</h3>
        {children}
      </section>
    ),
    Move: ({ props }) => (
      <div className="wa-scorecard-move">
        <span className="wa-scorecard-move-number">0{props.index + 1}</span>
        <div>
          <h4>{props.action}</h4>
          <MessageResponse isAnimating={props.streaming}>
            {props.why}
          </MessageResponse>
          <details>
            <summary>
              First step & what to measure{" "}
              <ChevronDown size={13} aria-hidden="true" />
            </summary>
            <p>
              <strong>Start here</strong>
              {props.firstStep}
            </p>
            <p>
              <strong>Check the result</strong>
              {props.check}
            </p>
          </details>
        </div>
      </div>
    ),
    Peers: ({ children }) => (
      <section className="wa-scorecard-peers">
        <span className="wa-scorecard-eyebrow">PEER CONTEXT</span>
        <h3>What’s happening elsewhere.</h3>
        {children}
        <p className="wa-scorecard-note">{aiScorecardCopy.peerNote}</p>
      </section>
    ),
    Peer: ({ props }) => (
      <article>
        <div className="wa-peer-heading">
          <h4>{props.company}</h4>
          {props.published && <span>{props.published}</span>}
        </div>
        <p>{props.practice}</p>
        <p className="wa-scorecard-note">{props.relevance}</p>
        <details>
          <summary>
            See the evidence <ChevronDown size={13} aria-hidden="true" />
          </summary>
          <blockquote>“{props.quote}”</blockquote>
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            {props.title}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </details>
      </article>
    ),
  },
});

export function ScorecardReport({
  scorecard,
  streaming = false,
}: {
  scorecard: ScorecardDraft;
  streaming?: boolean;
}) {
  const profile = getAssessmentProfile(scorecard.assessment);
  const moves = scorecard.nextMoves ?? [];
  const peers = streaming ? [] : (scorecard.peers ?? []);
  const spec: Spec = {
    root: "scorecard",
    elements: {
      scorecard: {
        type: "Scorecard",
        props: {},
        children: [
          "intro",
          "profile",
          ...(moves.length ? ["moves"] : []),
          ...(peers.length ? ["peers"] : []),
        ],
      },
      intro: {
        type: "Introduction",
        props: {
          assessed: profile.assessed,
          complete: profile.complete,
          repeatable: profile.repeatable,
          scope: scorecard.assessment.scope?.summary ?? "",
          summary: scorecard.summary ?? "",
          streaming,
        },
      },
      profile: {
        type: "Profile",
        props: { summary: scorecard.summary ?? "", streaming },
        children: profile.areas.map((area) => area.id),
      },
      ...Object.fromEntries(
        profile.areas.map((area) => [
          area.id,
          {
            type: "Area",
            props: {
              title: area.title,
              question: area.question,
              label: area.label,
              level: area.level,
              criteria: area.criteria.map(
                ({ label, status, quote, question }) => ({
                  label,
                  status,
                  quote,
                  question,
                }),
              ),
            },
          },
        ]),
      ),
      moves: {
        type: "NextMoves",
        props: {},
        children: moves.map((_, index) => `move-${index}`),
      },
      ...Object.fromEntries(
        moves.map((move, index) => [
          `move-${index}`,
          { type: "Move", props: { ...move, index, streaming } },
        ]),
      ),
      peers: {
        type: "Peers",
        props: {},
        children: peers.map((_, index) => `peer-${index}`),
      },
      ...Object.fromEntries(
        peers.map((peer, index) => [
          `peer-${index}`,
          {
            type: "Peer",
            props: {
              company: peer.company,
              practice: peer.practice,
              relevance: peer.relevance,
              published: peer.published,
              ...peer.source,
            },
          },
        ]),
      ),
    },
  };
  return (
    <JSONUIProvider registry={registry}>
      <Renderer spec={spec} registry={registry} />
    </JSONUIProvider>
  );
}
