import React from "react";

/** Small ledger-style entry number, e.g. 01, 02 — used only where order is real. */
export function Entry({ n }) {
  return (
    <span className="font-mono text-xs text-gold-600 tracking-widest">
      {String(n).padStart(2, "0")}
    </span>
  );
}

/** Uppercase eyebrow label above a heading. */
export function Eyebrow({ children, tone = "light" }) {
  return (
    <div
      className={`flex items-center gap-3 mb-4 ${
        tone === "dark" ? "text-gold-400" : "text-brand-600"
      }`}
    >
      <span className="h-px w-8 bg-current opacity-60" />
      <span className="font-mono text-xs uppercase tracking-[0.2em]">
        {children}
      </span>
    </div>
  );
}

/** Section heading with serif display treatment. */
export function SectionHeading({ eyebrow, title, sub, tone = "light" }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display text-3xl sm:text-4xl leading-[1.15] tracking-tight ${
          tone === "dark" ? "text-paper" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            tone === "dark" ? "text-paper/70" : "text-ink-400"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/** A thin ledger rule used as the page's signature divider between record-like rows. */
export function LedgerRule({ tone = "light" }) {
  return (
    <div
      className={`h-px w-full ${
        tone === "dark" ? "bg-paper/10" : "bg-ink-900/10"
      }`}
    />
  );
}

export function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink-900/10 bg-white px-3 py-1 text-xs font-medium text-ink-600">
      {children}
    </span>
  );
}
