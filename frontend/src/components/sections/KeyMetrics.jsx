import React from "react";
import { SectionHeading } from "../ui/Atoms.jsx";
import Reveal from "../ui/Reveal.jsx";

const METRICS = [
  { icon: "🌍", label: "Global Community", body: "Growing participants across multiple regions worldwide." },
  { icon: "🌐", label: "Countries Reached", body: "Expanding access to decentralized opportunities without geographical barriers." },
  { icon: "💵", label: "USDT Ecosystem Activity", body: "Supporting a transparent, stablecoin-powered participation model." },
  { icon: "🚀", label: "Web3 Initiatives Supported", body: "Contributing to blockchain infrastructure, DeFi, Layer-2 solutions, and decentralized applications." },
  { icon: "🤝", label: "Community Network", body: "A collaborative ecosystem driven by education, innovation, and shared growth." },
  { icon: "🔒", label: "Blockchain Transparency", body: "Every ecosystem transaction is securely recorded on-chain." },
];

export default function KeyMetrics() {
  return (
    <section className="bg-ink-900 text-paper py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Key Metrics"
            title="Building a Global Web3 Ecosystem"
            sub="Our vision extends beyond technology — we're building a worldwide community committed to accelerating blockchain innovation."
          />
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/10 rounded-2xl overflow-hidden border border-paper/10">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 70} className="bg-ink-900 p-8">
              <span className="text-2xl">{m.icon}</span>
              <h3 className="font-display text-lg mt-4 mb-2">{m.label}</h3>
              <p className="text-sm text-paper/55 leading-relaxed">{m.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
