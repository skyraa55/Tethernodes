import React from "react";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";

export default function PageBanner({ eyebrow, title, sub }) {
  return (
    <section className="relative bg-ink-900 text-paper overflow-hidden pt-36 pb-16 sm:pt-40 sm:pb-20">
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(246,245,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(246,245,241,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[620px] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 50%, transparent 75%)` }}
      />

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {eyebrow && (
          <div
            className="inline-flex items-center gap-[7px] mb-5 font-mono text-xs uppercase tracking-[0.2em] rounded-full px-4 py-[6px]"
            style={{ color: "#A5B4FC", background: "rgba(99,102,241,0.14)", border: "1px solid rgba(99,102,241,0.3)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#818CF8" }} />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight max-w-2xl">
          {title}
        </h1>
        {sub && (
          <p className="mt-5 text-paper/60 max-w-xl leading-relaxed">{sub}</p>
        )}
      </div>
    </section>
  );
}