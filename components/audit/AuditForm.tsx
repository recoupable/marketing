"use client";

import { useState, FormEvent } from "react";
import { auditCopy } from "@/lib/copy/audit";

type Step = "questions" | "contact" | "results";

function scoreAnswers(answers: Record<string, string>): "low" | "mid" | "high" {
  let score = 0;

  // Roster size
  const roster = answers.roster_size;
  if (roster === "6-15") score += 1;
  if (roster === "16-50") score += 2;
  if (roster === "51-200" || roster === "200+") score += 3;

  // Marketing hours
  const hours = answers.marketing_hours;
  if (hours === "10-20") score += 1;
  if (hours === "20-40") score += 2;
  if (hours === "40-80" || hours === "80+ (multiple people)") score += 3;

  // Content volume
  const content = answers.content_volume;
  if (content === "5-15 posts") score += 1;
  if (content === "15-30 posts") score += 2;
  if (content === "30+ posts") score += 3;

  // AI usage (inversely scored — less usage = more upside)
  const ai = answers.ai_usage;
  if (ai === "Not at all") score += 2;
  if (ai === "ChatGPT for copy sometimes") score += 2;
  if (ai === "A few AI tools here and there") score += 1;

  // Budget
  const budget = answers.budget;
  if (budget === "$1,000-$5,000") score += 1;
  if (budget === "$5,000-$15,000") score += 2;
  if (budget === "$15,000-$50,000" || budget === "$50,000+") score += 3;

  if (score <= 4) return "low";
  if (score <= 9) return "mid";
  return "high";
}

export function AuditForm() {
  const [step, setStep] = useState<Step>("questions");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [submitting, setSubmitting] = useState(false);
  const [tier, setTier] = useState<"low" | "mid" | "high">("mid");

  const questions = auditCopy.questions;
  const progress = step === "questions"
    ? ((currentQ) / questions.length) * 100
    : step === "contact"
    ? 90
    : 100;

  function handleAnswer(value: string) {
    const q = questions[currentQ];
    const updated = { ...answers, [q.id]: value };
    setAnswers(updated);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("contact");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const result = scoreAnswers(answers);
    setTier(result);

    // Send to Attio CRM via existing subscribe endpoint
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: contact.email,
          name: contact.name,
          company: contact.company,
          utm_campaign: "ai-audit",
          utm_medium: "lead-magnet",
          audit_answers: answers,
          audit_score: result,
        }),
      });
    } catch {
      // Don't block results on API failure
    }

    setSubmitting(false);
    setStep("results");
  }

  if (step === "results") {
    const r = auditCopy.results[tier];
    return (
      <div className="max-w-xl mx-auto text-center">
        <div
          className="inline-block rounded-full px-5 py-2 text-sm font-bold mb-6"
          style={{ backgroundColor: r.color + "20", color: r.color }}
        >
          Your Score: {r.score}
        </div>
        <p className="text-[15px] text-[var(--muted-foreground)] mb-6 leading-relaxed">
          {r.summary}
        </p>
        <div className="rounded-xl border border-[var(--border)] p-6 mb-8 text-left">
          <h3 className="font-semibold mb-2">Our Recommendation</h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            {r.recommendation}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={r.ctaPrimary.href}
            className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors"
          >
            {r.ctaPrimary.label}
          </a>
          <a
            href={r.ctaSecondary.href}
            className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium hover:bg-[var(--hover)] transition-colors"
          >
            {r.ctaSecondary.label}
          </a>
        </div>
      </div>
    );
  }

  if (step === "contact") {
    return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <h3 className="text-xl font-semibold text-center mb-2">
          Almost done — where should we send your report?
        </h3>
        <p className="text-sm text-[var(--muted-foreground)] text-center mb-6">
          We&apos;ll email you a detailed breakdown with specific recommendations for your operation.
        </p>
        {(["name", "email", "company"] as const).map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-1.5">
              {auditCopy.formFields[field]}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              required
              value={contact[field]}
              onChange={(e) =>
                setContact({ ...contact, [field]: e.target.value })
              }
              className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder={
                field === "email"
                  ? "you@label.com"
                  : field === "name"
                  ? "Sidney Swift"
                  : "Acme Records"
              }
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-white text-black py-3 text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {submitting ? "Analyzing..." : "Get My Free Report →"}
        </button>
        <p className="text-xs text-center text-[var(--muted-foreground)]/60">
          No spam. We&apos;ll send your report and that&apos;s it.
        </p>
      </form>
    );
  }

  // Questions step
  const q = questions[currentQ];
  return (
    <div className="max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="w-full h-1 rounded-full bg-[var(--border)] mb-8">
        <div
          className="h-1 rounded-full bg-white transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-[var(--muted-foreground)] mb-2">
        Question {currentQ + 1} of {questions.length}
      </p>
      <h3 className="text-xl font-semibold mb-6">{q.label}</h3>

      <div className="space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            className="w-full text-left rounded-xl border border-[var(--border)] px-5 py-3.5 text-sm hover:bg-[var(--hover)] hover:border-white/30 transition-all"
          >
            {opt}
          </button>
        ))}
      </div>

      {currentQ > 0 && (
        <button
          onClick={() => setCurrentQ(currentQ - 1)}
          className="mt-6 text-sm text-[var(--muted-foreground)] hover:text-white transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
