import React, { useState } from "react";
import { SectionHeading } from "../ui/Atoms.jsx";
import Reveal from "../ui/Reveal.jsx";

const BENEFITS = [
  "Product & Platform Updates",
  "Web3 Industry News",
  "Community Announcements",
  "New Feature Releases",
  "Educational Content",
  "Partnership Announcements",
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section id="newsletter" className="bg-paper-100 py-24 sm:py-32 border-y border-ink-900/5">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Newsletter"
            title="Stay Ahead of the Next Wave of Web3"
            sub="Receive the latest updates on platform developments, ecosystem milestones, blockchain insights, educational resources, and upcoming announcements — all delivered directly to your inbox."
          />
          <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-ink-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-500 shrink-0">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-white rounded-2xl border border-ink-900/8 shadow-card p-8 sm:p-10">
            <h3 className="font-display text-xl text-ink-900 mb-1.5">
              Join Our Community
            </h3>
            <p className="text-sm text-ink-400 mb-6">
              Stay connected with the future of decentralized technology.
            </p>

            {submitted ? (
              <div className="rounded-lg bg-brand-50 border border-brand-200 text-brand-700 text-sm px-4 py-3">
                You're on the list — thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-ink-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full rounded-lg border border-ink-900/15 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg py-3 transition-colors"
                >
                  Subscribe Now
                </button>
              </form>
            )}
            <p className="text-xs text-ink-400 mt-4 text-center">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
