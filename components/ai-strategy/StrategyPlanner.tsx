"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { aiStrategyCopy as copy } from "@/lib/copy/ai-strategy";
import {
  strategySchema,
  type StrategyInput,
} from "@/lib/ai-strategy/strategySchema";
import { assessProject } from "@/lib/ai-strategy/assessProject";
import { formatStrategyBrief } from "@/lib/ai-strategy/formatStrategyBrief";
import { downloadText } from "@/lib/ai-strategy/downloadText";
import { saveReviewedDraft } from "@/lib/agent-draft";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { StrategyFields } from "./StrategyFields";

const initial: StrategyInput = {
  workflow: "",
  outcome: "",
  purpose: "capacity",
  owner: "",
  access: "unknown",
  example: "unknown",
  review: "unknown",
  baseline: "unknown",
  reviewDate: "",
  success: "",
  stop: "",
};
const stepSchemas = [
  strategySchema.pick({
    workflow: true,
    outcome: true,
    purpose: true,
    owner: true,
  }),
  strategySchema.pick({
    access: true,
    example: true,
    review: true,
    baseline: true,
  }),
  strategySchema,
];
const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function StrategyPlanner() {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    clientReady,
    serverReady,
  );
  const [values, setValues] = useState(initial);
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);
  const router = useRouter();
  useEffect(() => {
    if (shouldFocus.current) heading.current?.focus();
  }, [step, complete]);
  const assessment = assessProject(values);
  function move(next: number) {
    shouldFocus.current = true;
    setError("");
    setStep(next);
  }
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!stepSchemas[step].safeParse(values).success) {
      setError(copy.validation);
      return;
    }
    if (step < 2) {
      move(step + 1);
      return;
    }
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    if (values.reviewDate < today) {
      setError(copy.dateError);
      return;
    }
    setValues(strategySchema.parse(values));
    shouldFocus.current = true;
    setComplete(true);
    trackEvent("strategy_brief_created", {
      purpose: values.purpose,
      ready: assessment.ready,
    });
  }
  function handoff() {
    if (
      !saveReviewedDraft({
        interest: "AI strategy",
        message: formatStrategyBrief(values),
      })
    ) {
      setError(copy.handoffFailure);
      return;
    }
    trackEvent("cta_clicked", {
      cta: "strategy_inquiry",
      placement: "ai_strategy_result",
    });
    router.push("/contact?workflow=AI%20strategy");
  }
  return (
    <div className="strategy-planner" id="planner">
      <div className="strategy-planner-heading">
        <p className="sp-kicker">
          {complete ? copy.readyLabel : `${step + 1} / 3`}
        </p>
        <h2 tabIndex={-1} ref={heading}>
          {complete ? copy.resultTitle : copy.steps[step]}
        </h2>
      </div>
      {complete ? (
        <div className="strategy-result">
          <div className="strategy-verdict">
            <h3>{assessment.ready ? copy.readyTitle : copy.gapsTitle}</h3>
            <p>{assessment.ready ? copy.readyBody : copy.gapsBody}</p>
            {assessment.gaps.length > 0 && (
              <ul>
                {assessment.gaps.map((gap) => (
                  <li key={gap}>{gap}</li>
                ))}
              </ul>
            )}
          </div>
          <dl>
            {(
              [
                "workflow",
                "outcome",
                "owner",
                "reviewDate",
                "success",
                "stop",
              ] as const
            ).map((key) => (
              <div key={key}>
                <dt>{copy.resultLabels[key]}</dt>
                <dd>{values[key]}</dd>
              </div>
            ))}
            <div>
              <dt>{copy.resultLabels.measure}</dt>
              <dd>{copy.purposes[values.purpose].measure}</dd>
            </div>
          </dl>
          <p className="strategy-note">{copy.readinessNote}</p>
          <div className="strategy-actions">
            <button
              className="sp-button"
              onClick={() => {
                downloadText(
                  formatStrategyBrief(values),
                  "recoup-first-project-brief.md",
                );
                trackEvent("strategy_brief_downloaded", {
                  purpose: values.purpose,
                });
              }}
            >
              {copy.downloadBrief}
            </button>
            <button className="sp-button sp-button-secondary" onClick={handoff}>
              {copy.handoff}
            </button>
          </div>
          <p className="strategy-note">{copy.handoffNote}</p>
          <div className="strategy-actions">
            <button
              className="strategy-text-button"
              onClick={() => {
                move(0);
                setComplete(false);
              }}
            >
              {copy.actions.edit}
            </button>
            <button
              className="strategy-text-button"
              onClick={() => {
                setValues(initial);
                move(0);
                setComplete(false);
              }}
            >
              {copy.actions.reset}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit}>
          <fieldset disabled={!hydrated} className="strategy-fieldset">
            <StrategyFields
              step={step}
              values={values}
              onChange={(key, value) => {
                setError("");
                setValues((current) => ({ ...current, [key]: value }));
              }}
            />
            <div className="strategy-actions">
              {step > 0 && (
                <button
                  type="button"
                  className="sp-button sp-button-secondary"
                  onClick={() => move(step - 1)}
                >
                  {copy.actions.back}
                </button>
              )}
              <button className="sp-button" type="submit">
                {step === 2 ? copy.actions.build : copy.actions.next}
              </button>
            </div>
          </fieldset>
          <p className="strategy-note">{copy.privacy}</p>
        </form>
      )}
      {error && (
        <p role="alert" className="strategy-error">
          {error}
        </p>
      )}
      <noscript>
        <p>{copy.noScript}</p>
      </noscript>
    </div>
  );
}
