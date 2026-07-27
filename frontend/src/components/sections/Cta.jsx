import React from "react";
import { Link } from "react-router-dom";

export default function Cta() {
  return (
    <section className="relative bg-ink-900 text-paper py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[480px] w-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,75,0.14) 0%, rgba(201,162,75,0) 70%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-400 mb-5">
          Join the Future of Decentralized Innovation
        </p>
        <h2 className="font-display text-3xl sm:text-4xl leading-tight tracking-tight">
          Become part of a growing global community helping accelerate the next
          generation of blockchain technology.
        </h2>
        <p className="mt-5 text-paper/60">
          Start your journey with Tethernodes today and help shape the future of
          Web3.
        </p>
        <Link
          to="/signup"
          className="mt-9 inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-ink-900 font-semibold rounded-full px-8 py-4 transition-colors"
        >
          Join Now
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
