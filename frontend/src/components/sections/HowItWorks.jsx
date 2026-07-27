import React from "react";
import { SectionHeading, Entry, LedgerRule } from "../ui/Atoms.jsx";
import Reveal from "../ui/Reveal.jsx";

const STEPS = [
  {
    n: 1,
    title: "Join the Ecosystem",
    body: "Register your account and securely participate using USDT.",
  },
  {
    n: 2,
    title: "Support Blockchain Innovation",
    body: "Community participation contributes toward the growth of emerging decentralized technologies and blockchain infrastructure.",
  },
  {
    n: 3,
    title: "Network Expansion",
    body: "Invite others who share the vision of decentralized finance and digital innovation.",
  },
  {
    n: 4,
    title: "Ecosystem Growth",
    body: "As the community expands, blockchain development accelerates while strengthening the overall ecosystem.",
  },
];

export default function HowItWorks() {
  return (
    <section id="ecosystem" className="bg-paper py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            eyebrow="How The Ecosystem Works"
            title="Connecting Community Capital with Web3 Innovation"
            sub="Tethernodes follows a structured ecosystem designed around transparency and simplicity."
          />
        </Reveal>

        <div className="mt-14 border-t border-ink-900/10">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 80}>
              <div className="grid sm:grid-cols-[100px_1fr] gap-4 sm:gap-10 py-8 border-b border-ink-900/10 group">
                <Entry n={step.n} />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <h3 className="font-display text-xl sm:text-2xl text-ink-900 sm:w-2/5">
                    {step.title}
                  </h3>
                  <p className="text-ink-500 leading-relaxed sm:w-1/2">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-ink-400 max-w-2xl">
          Every stage is designed to encourage transparency, accessibility, and
          long-term ecosystem development.
        </p>
      </div>
    </section>
  );
}
