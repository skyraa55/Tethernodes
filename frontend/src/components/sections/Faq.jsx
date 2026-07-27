import React, { useState } from "react";
import { SectionHeading } from "../ui/Atoms.jsx";
import Reveal from "../ui/Reveal.jsx";

const FAQS = [
  {
    q: "Why do Tethernodes use USDT?",
    a: "USDT provides a stable and globally recognized digital asset that simplifies participation while reducing exposure to cryptocurrency price volatility.",
  },
  {
    q: "Who can join?",
    a: "Anyone who meets the platform's eligibility requirements and has access to USDT can participate.",
  },
  {
    q: "Do I need blockchain experience?",
    a: "No. Tethernodes is designed to be accessible for both newcomers and experienced Web3 participants.",
  },
  {
    q: "Is the platform available globally?",
    a: "Our goal is to build a borderless ecosystem that enables participation from users around the world, subject to local regulations.",
  },
];

function FaqItem({ item, isOpen, onClick }) {
  return (
    <div className="border-b border-ink-900/10">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-lg text-ink-900">{item.q}</span>
        <span
          className={`shrink-0 h-8 w-8 rounded-full border border-ink-900/15 flex items-center justify-center transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-ink-500 leading-relaxed pr-14">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-paper py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 border-t border-ink-900/10">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
