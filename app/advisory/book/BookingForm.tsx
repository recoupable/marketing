"use client";

import { postCapture } from "@/lib/postCapture";
import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

/** A selectable package tile. Defaults are the advisory tiers; the /build
 * funnel passes its own list plus its own capture `source` (chat#1800). */
export interface BookingPackage {
  id: string;
  name: string;
  price: string;
  desc: string;
  popular?: boolean;
}

const ADVISORY_PACKAGES: readonly BookingPackage[] = [
  {
    id: "strategy-session",
    name: "Strategy Session",
    price: "$2,500",
    desc: "One 90-minute deep dive with Sidney",
  },
  {
    id: "ai-transformation",
    name: "AI Transformation",
    price: "$10,000",
    desc: "Full strategy + 90-day implementation",
    popular: true,
  },
  {
    id: "retained-advisor",
    name: "Retained Advisor",
    price: "$5,000/mo",
    desc: "Ongoing strategic partnership",
  },
];

const roles = [
  "Label Owner / GM",
  "Artist Manager",
  "Head of Marketing",
  "A&R",
  "Distributor",
  "Catalog Owner",
  "Other",
];

const rosterSizes = [
  "1-5 artists",
  "6-20 artists",
  "21-50 artists",
  "50-200 artists",
  "200+ artists",
];

export function BookingForm({
  packages = ADVISORY_PACKAGES,
  source = "/advisory/book",
}: {
  packages?: readonly BookingPackage[];
  source?: string;
} = {}) {
  const searchParams = useSearchParams();
  const [selectedPkg, setSelectedPkg] = useState<string>(packages[0].id);

  useEffect(() => {
    const p = searchParams.get("package");
    if (p && packages.some((pkg) => pkg.id === p)) {
      setSelectedPkg(p);
    }
  }, [searchParams, packages]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [rosterSize, setRosterSize] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Success replaces the tall form with a short block; without this the scroll
  // position stays where the submit button was and the visitor stares at the
  // footer while "Request received" sits above the fold (chat#1800 row 10).
  useEffect(() => {
    if (status === "success") window.scrollTo(0, 0);
  }, [status]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const captured = await postCapture({
        kind: "booking",
        source,
        name,
        email,
        company,
        role: role || undefined,
        package: selectedPkg,
        rosterSize: rosterSize || undefined,
        message: message || undefined,
      });

      if (!captured.ok) {
        throw new Error(captured.error);
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
        <h2
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          Request received
        </h2>
        <p className="text-[var(--muted-foreground)] text-lg max-w-md mx-auto">
          The Recoup team will review your info and get back to you within 24
          hours to schedule your{" "}
          {packages.find((p) => p.id === selectedPkg)?.name?.toLowerCase() ||
            "session"}
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Package selection */}
      <div>
        <label className="block text-sm font-semibold uppercase tracking-wide mb-3">
          Select a package
        </label>
        <div className="grid gap-3">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelectedPkg(pkg.id)}
              className={`text-left p-4 rounded-lg border transition-all ${
                selectedPkg === pkg.id
                  ? "border-[var(--foreground)] border-2 bg-[var(--foreground)]/5"
                  : "border-[var(--border)] hover:border-[var(--foreground)]/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold">{pkg.name}</span>
                  {"popular" in pkg && pkg.popular && (
                    <span className="ml-2 text-xs bg-[var(--foreground)] text-[var(--background)] px-2 py-0.5 rounded-full font-medium">
                      Most Popular
                    </span>
                  )}
                  <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
                    {pkg.desc}
                  </p>
                </div>
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-bitmap), monospace" }}
                >
                  {pkg.price}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contact info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Full name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--foreground)]/5 border border-[var(--border)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Work email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--foreground)]/5 border border-[var(--border)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
            placeholder="jane@label.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1.5">
            Company *
          </label>
          <input
            id="company"
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--foreground)]/5 border border-[var(--border)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
            placeholder="Acme Records"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1.5">
            Your role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--foreground)]/5 border border-[var(--border)] focus:border-[var(--foreground)] focus:outline-none transition-colors appearance-none"
          >
            <option value="">Select...</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="roster" className="block text-sm font-medium mb-1.5">
          Roster size
        </label>
        <select
          id="roster"
          value={rosterSize}
          onChange={(e) => setRosterSize(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[var(--foreground)]/5 border border-[var(--border)] focus:border-[var(--foreground)] focus:outline-none transition-colors appearance-none"
        >
          <option value="">Select...</option>
          {rosterSizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">
          What are you hoping to achieve with AI?
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[var(--foreground)]/5 border border-[var(--border)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none"
          placeholder="Tell us about your current operations and what you'd like to automate..."
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-semibold hover:opacity-90 transition-colors disabled:opacity-50"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit Request
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-xs text-[var(--muted-foreground)] text-center">
        No commitment. The Recoup team reviews every request personally and
        responds within 24 hours.
      </p>
    </form>
  );
}
