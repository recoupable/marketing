import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { BookingForm } from "./BookingForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Book an Advisory Session | Recoup",
  description:
    "Book a strategy session with Sidney Swift. AI advisory for labels, distributors, and catalog owners scaling with AI agents.",
  path: "/advisory/book",
});

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="max-w-2xl mx-auto px-6 py-24">
        <h1
          className="text-4xl font-bold mb-3"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          Book Your Session
        </h1>
        <p className="text-[var(--muted)] mb-10 text-lg">
          Tell us about your business and we&apos;ll get back to you within 24
          hours to schedule your call.
        </p>
        <Suspense fallback={<div className="animate-pulse h-96" />}>
          <BookingForm />
        </Suspense>
      </section>
    </main>
  );
}
