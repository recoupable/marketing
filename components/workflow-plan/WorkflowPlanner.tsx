"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageMark } from "@/components/sky/brand";
import { workflowPlanCopy as copy } from "@/lib/copy/workflow-plan";
import {
  answersSchema,
  draftAnswersSchema,
  planSchema,
  type WorkflowAnswers,
  type WorkflowPlan,
} from "@/lib/workflow-plan/schema";
import { planText } from "@/lib/workflow-plan/planText";
import { saveReviewedDraft } from "@/lib/agent-draft";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { captureWorkflowLead } from "@/lib/workflow-plan/captureWorkflowLead";
import { WorkflowIntro } from "./WorkflowIntro";
import "./workflow-plan.css";

const storageKey = "recoup:workflow-plan:v1";
const empty: WorkflowAnswers = {
  bottleneck: [],
  sources: [],
  outcome: [],
};

export function WorkflowPlanner() {
  const router = useRouter();
  const [answers, setAnswers] = useState<WorkflowAnswers>(empty);
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "" });
  const capturedLead = useRef("");
  const [plan, setPlan] = useState<WorkflowPlan | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [deliveryToken, setDeliveryToken] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [mode, setMode] = useState("starter");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [replies, setReplies] = useState<{ question: string; reply: string }[]>(
    [],
  );
  const heading = useRef<HTMLHeadingElement>(null);
  const controller = useRef<AbortController | null>(null);
  const routerBusy = useRef(false);

  /* eslint-disable react-hooks/set-state-in-effect -- Restore browser-only storage after hydration; SSR and the first client render must match. */
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) || "null");
      if (saved?.expires > Date.now()) {
        const parsed = draftAnswersSchema.safeParse({
          sources: saved.answers?.sources,
          outcome: (Array.isArray(saved.answers?.outcome) ? saved.answers.outcome : [saved.answers?.outcome])
            .map((value: string) => ({
              "Putting reports together": "A weekly catalog income report",
              "Finding royalty gaps": "A royalty review queue",
              "Finding tracks for a brief": "A shortlist for each brief",
              "Reviewing acquisition documents": "An acquisition diligence checklist",
              "Keeping the team out of spreadsheets": "A shared catalog dashboard",
            }[value] || value))
            .filter((value: string) => copy.questions[2].options.some((option) => option === value)),
          bottleneck: typeof saved.answers?.bottleneck === "string"
            ? [saved.answers.bottleneck]
            : saved.answers?.bottleneck,
        });
        if (parsed.success) {
          setAnswers(parsed.data);
          setStarted(saved.started === true || parsed.data.bottleneck.length > 0);
          setStep(
            Number.isInteger(saved.step) && saved.step >= -1 && saved.step <= 3
              ? Math.max(0, saved.version >= 2 ? Math.min(2, saved.step) : saved.step - (saved.step > 1 ? 1 : 0))
              : 0,
          );
          const result = planSchema.safeParse(saved.plan);
          if (result.success && answersSchema.safeParse(parsed.data).success) {
            setPlan(result.data);
            setUnlocked(saved.unlocked === true);
            setDeliveryToken(typeof saved.deliveryToken === "string" ? saved.deliveryToken : "");
            setMode(saved.mode === "personalized" ? "personalized" : "starter");
          }
        }
      }
    } catch {
      /* Storage is optional; the interview still works in memory. */
    }
    setReady(true);
    return () => controller.current?.abort();
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          version: 2,
          started,
          unlocked,
          deliveryToken,
          answers,
          step,
          plan,
          mode,
          expires: Date.now() + 3600000,
        }),
      );
    } catch {
      /* No persistence in restricted browsers. */
    }
  }, [answers, step, plan, mode, ready, unlocked, deliveryToken, started]);
  useEffect(() => {
    if (step >= 0 || plan) heading.current?.focus();
  }, [step, plan, started]);

  async function generate(followUp = false) {
    if (routerBusy.current) return;
    routerBusy.current = true;
    setBusy(true);
    setError("");
    controller.current = new AbortController();
    try {
      const response = await fetch("/api/workflow-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          ...(followUp ? { plan, question } : {}),
        }),
        signal: AbortSignal.any([
          controller.current.signal,
          AbortSignal.timeout(30000),
        ]),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error || "Your plan didn’t finish. Please try again.",
        );
      if (followUp) {
        if (typeof data.reply !== "string" || !data.reply.trim())
          throw new Error("That reply didn’t finish. Please try again.");
        setReplies((previous) => [
          ...previous,
          { question, reply: data.reply },
        ]);
        setQuestion("");
        trackEvent("workflow_plan_followup");
      } else {
        setPlan(planSchema.parse(data.plan));
        setDeliveryToken(data.deliveryToken || "");
        setUnlocked(false);
        setStep(3);
        setMode(data.mode);
        trackEvent("workflow_plan_completed", {
          focus: answers.bottleneck.join(", "),
          mode: data.mode,
        });
      }
    } catch (cause) {
      setError(
        cause instanceof Error &&
          cause.name !== "TimeoutError" &&
          cause.name !== "AbortError"
          ? cause.message
          : "That took too long. Your answers are still here—try again.",
      );
      trackEvent("workflow_plan_failed", {
        stage: followUp ? "followup" : "plan",
      });
    } finally {
      setBusy(false);
      routerBusy.current = false;
    }
  }
  async function unlockPlan() {
    if (routerBusy.current || !plan) return;
    routerBusy.current = true;
    setBusy(true);
    setError("");
    try {
      const fingerprint = JSON.stringify({ contact, answers });
      if (capturedLead.current !== fingerprint) {
        const saved = await captureWorkflowLead(contact, answers);
        if (!saved.ok) throw new Error(saved.error);
        capturedLead.current = fingerprint;
        trackEvent("workflow_plan_lead_captured");
      }
      setUnlocked(true);
      if (deliveryToken) {
        const response = await fetch("/api/workflow-plan/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: contact.email, token: deliveryToken }),
          signal: AbortSignal.timeout(25000),
        });
        const receipt = await response.json();
        if (!response.ok || !receipt.ok) throw new Error(receipt.error || "Your plan is ready, but email delivery failed.");
        setEmailSent(true);
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Please try again.");
    } finally {
      routerBusy.current = false;
      setBusy(false);
    }
  }
  function download() {
    if (!plan) return;
    const url = URL.createObjectURL(
      new Blob([planText(answers, plan)], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-music-workflow-brief.txt";
    link.click();
    URL.revokeObjectURL(url);
    trackEvent("workflow_plan_downloaded");
  }
  const current = copy.questions[Math.max(step, 0)];
  const valid =
    (step === 0 && answers.bottleneck.length > 0) ||
    (step === 1 && answers.sources.length > 0) ||
    (step === 2 && answers.outcome.length > 0);

  if (!started && !plan) return <WorkflowIntro onStart={() => { setStep(0); setStarted(true); }} />;

  return (
    <div className="wp-page">
      <Link className="wp-brand" href="/" aria-label="Recoup home"><PageMark /></Link>
      <h1 className="sr-only">Your workflow brief</h1>
      <section
        className="wp-panel"
        aria-label="Your workflow plan"
        aria-busy={busy}
      >
        {!ready ? (
          <p role="status">Loading your workspace…</p>
        ) : busy && !plan ? (
          <div className="wp-generating" role="status" aria-live="polite">
            <span className="wp-spinner" aria-hidden="true" />
            <h2>Putting your brief together…</h2>
            <p>Choosing a starting point from your answers.</p>
          </div>
        ) : plan && unlocked ? (
          <div className="wp-result">
            {emailSent && <p role="status">Your plan has been sent to your email.</p>}
            {!emailSent && deliveryToken && error && <button className="wp-secondary" disabled={busy} onClick={() => void unlockPlan()}>Retry email</button>}
            <p className="wp-eyebrow">
              {mode === "personalized"
                ? "YOUR WORKFLOW BRIEF"
                : "YOUR STARTER BRIEF"}
            </p>
            <h2 tabIndex={-1} ref={heading}>
              {plan.title}
            </h2>
            {mode === "starter" && (
              <p className="wp-note">
                This is a starting template for your selected workflow. AI
                personalization is currently unavailable.
              </p>
            )}
            <p>{plan.summary}</p>
            <h3>What your team gets</h3>
            <p>{plan.output}</p>
            <div className="wp-first">
              <p className="wp-eyebrow">YOUR FIRST MOVE</p>
              <p>{plan.firstStep}</p>
            </div>
            <h3>What you’ll need</h3>
            <ul>
              {plan.inputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3>How to start</h3>
            <ol>
              {plan.steps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <h3>Where a person checks the work</h3>
            <p>{plan.review}</p>
            <h3>How you’ll know it’s useful</h3>
            <p>{plan.success}</p>
            <p className="wp-note">
              Based on your answers, not a review of your catalog or a confirmed
              project scope.
            </p>
            <details>
              <summary>Review your answers</summary>
              <dl>
                {copy.questions.map((item) => (
                  <div key={item.id}>
                    <dt>{item.title}</dt>
                    <dd>
                      {Array.isArray(answers[item.id])
                        ? answers[item.id].join(", ")
                        : answers[item.id]}
                    </dd>
                  </div>
                ))}
              </dl>
            </details>
            <div className="wp-actions">
              <button className="wp-primary" onClick={download}>
                Download my brief ↓
              </button>
              <button
                className="wp-secondary"
                disabled={busy}
                onClick={() => {
                  setPlan(null);
                  setStep(0);
                  setReplies([]);
                  setError("");
                }}
              >
                Edit answers
              </button>
            </div>
            {mode === "personalized" && (
              <div className="wp-chat">
                <h3>Talk through your plan.</h3>
                <p>
                  Ask about the first step, your tools, or who should review the
                  output.
                </p>
                <div aria-live="polite">
                  {replies.map((entry, index) => (
                    <div key={index}>
                      <p className="wp-question">{entry.question}</p>
                      <p className="wp-reply">{entry.reply}</p>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void generate(true);
                  }}
                >
                  <label htmlFor="followup">Your question</label>
                  <textarea
                    id="followup"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    minLength={3}
                    maxLength={500}
                    required
                    disabled={busy}
                  />
                  <button
                    className="wp-secondary"
                    disabled={busy || question.trim().length < 3}
                  >
                    Ask about my plan
                  </button>
                </form>
              </div>
            )}
            <div className="wp-handoff">
              <h3>Want help building this?</h3>
              <p>
                Take your answers and plan into an inquiry. Add your contact
                details and review before sending.
              </p>
              <button
                className="wp-primary"
                onClick={() => {
                  if (
                    saveReviewedDraft({
                      interest: "Custom systems",
                      message: planText(answers, plan).slice(0, 4900),
                    })
                  ) {
                    trackEvent("workflow_plan_inquiry_started");
                    router.push("/contact");
                  } else
                    setError(
                      "Your browser couldn’t carry the plan over. Download it and open our Contact page to share it.",
                    );
                }}
              >
                Help us build it ↗
              </button>
            </div>
            <button
              className="wp-secondary"
              disabled={busy}
              onClick={() => {
                setContact({ name: "", email: "" });
                capturedLead.current = "";
                setStarted(false);
                setAnswers(empty);
                setPlan(null);
                setUnlocked(false);
                setDeliveryToken("");
                setEmailSent(false);
                setStep(0);
                setReplies([]);
                setQuestion("");
                setError("");
                try {
                  sessionStorage.removeItem(storageKey);
                } catch {}
              }}
            >
              Start again
            </button>
          </div>
        ) : plan ? (
          <form className="wp-contact" onSubmit={(event) => {
            event.preventDefault();
            if (!busy) void unlockPlan();
          }}>
            <p className="wp-eyebrow">{mode === "personalized" ? "YOUR STARTING POINT" : "A STARTER IDEA"}</p>
            <h2 tabIndex={-1} ref={heading}>{plan.title}</h2>
            <div className="wp-output-preview">
              <h3>What your team would get</h3>
              <p>{plan.output}</p>
            </div>
            {mode === "starter" && <p className="wp-note">This is a starting template. AI personalization is currently unavailable.</p>}
            <h3>Get the full brief</h3>
            <p className="wp-unlock-copy">The tools, information, and first test to put this into practice.</p>
            <p className="wp-note">{deliveryToken ? "Add your name and email to view it and receive a copy." : "Add your name and email to view it."}</p>
            <label htmlFor="wp-name">Name</label>
            <input id="wp-name" name="name" autoComplete="name" required
              maxLength={100} value={contact.name} disabled={busy}
              onChange={(event) => setContact({ ...contact, name: event.target.value })} />
            <label htmlFor="wp-email">Email</label>
            <input id="wp-email" name="email" type="email" autoComplete="email" required
              maxLength={254} value={contact.email} disabled={busy}
              onChange={(event) => setContact({ ...contact, email: event.target.value })} />
            <div className="wp-actions">
              <button type="button" className="wp-secondary" disabled={busy}
                onClick={() => { setPlan(null); setStep(2); setError(""); }}>Back</button>
              <button className="wp-primary" disabled={busy || !contact.name.trim() || !contact.email.trim()}>
                {deliveryToken ? "Get my full brief" : "View my full brief"}
              </button>
            </div>
            <p className="wp-note">We save your details and answers. AI uses only your answers. <a href="/privacy">Privacy policy</a></p>
          </form>
        ) : (
          <form key={step} className="wp-step"
            onSubmit={(event) => {
              event.preventDefault();
              if (!valid || busy) return;
              if (step === 0) trackEvent("workflow_plan_started");
              trackEvent("workflow_plan_step_completed", { step: step + 1 });
              if (step === 2) void generate();
              else setStep(step + 1);
            }}
          >
            <div className="wp-progress">
              <span>{step + 1} / 3</span>
            </div>
            <h2 tabIndex={-1} ref={heading} id="wp-question">
              {current.title}
            </h2>
            <p id="wp-hint">{current.hint}</p>
            {step === 0 ? (
              <fieldset className="wp-options">
                <legend className="sr-only">{current.title}</legend>
                {copy.questions[0].options.map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      checked={answers.bottleneck.includes(option)}
                      onChange={() =>
                        setAnswers({
                          ...answers,
                          bottleneck: answers.bottleneck.includes(option)
                            ? answers.bottleneck.filter((item) => item !== option)
                            : [...answers.bottleneck, option],
                        })
                      }
                    />
                    {option}
                  </label>
                ))}
              </fieldset>
            ) : step === 1 ? (
              <fieldset className="wp-options">
                <legend className="sr-only">{current.title}</legend>
                {copy.questions[1].options.map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      checked={answers.sources.includes(option)}
                      onChange={() =>
                        setAnswers({
                          ...answers,
                          sources: answers.sources.includes(option)
                            ? answers.sources.filter((item) => item !== option)
                            : option === "Not sure yet"
                              ? [option]
                              : [
                                  ...answers.sources.filter(
                                    (item) => item !== "Not sure yet",
                                  ),
                                  option,
                                ],
                        })
                      }
                    />
                    {option}
                  </label>
                ))}
              </fieldset>
            ) : (
              <fieldset className="wp-options" disabled={busy}>
                <legend className="sr-only">{current.title}</legend>
                {copy.questions[2].options.map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      name="outcome"
                      value={option}
                      checked={answers.outcome.includes(option)}
                      onChange={() => setAnswers({
                        ...answers,
                        outcome: answers.outcome.includes(option)
                          ? answers.outcome.filter((item) => item !== option)
                          : [...answers.outcome, option],
                      })}
                    />
                    {option}
                  </label>
                ))}
              </fieldset>
            )}
            <div className="wp-actions">
              {step > 0 && (
                <button
                  type="button"
                  className="wp-secondary"
                  disabled={busy}
                  onClick={() => {
                    setStep(step - 1);
                    setError("");
                  }}
                >
                  Back
                </button>
              )}
                <button className="wp-primary" disabled={!valid || busy}>
                  {step === 2 ? "Create my brief" : "Continue →"}
                </button>
              </div>

          </form>
        )}
        {busy && plan && (
          <p role="status">
            {plan
              ? (unlocked ? "Working…" : "Saving your details…")
              : "Putting your plan together…"}
          </p>
        )}
        {error && (
          <p className="wp-error" role="alert">
            {error}
          </p>
        )}
      </section>
    </div>
  );
}
