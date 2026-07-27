import React from "react";
import { SectionHeading } from "../ui/Atoms.jsx";
import Reveal from "../ui/Reveal.jsx";

const PARTNERS = [
  "USDT Stablecoin",
  "Ethereum",
  "BNB Chain",
  "Polygon",
  "Arbitrum",
  "Optimism",
  "Solana",
  "Future Web3 Integrations",
];

export default function TechPartners() {
  return (
    <section id="partners" className="bg-paper-100 py-24 sm:py-32 border-y border-ink-900/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Technology Partners"
            title="Building Alongside the Web3 Ecosystem"
            sub="Tethernodes is designed to integrate with the broader blockchain landscape."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-5">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="group flex items-center justify-center text-center h-24 rounded-xl border border-ink-900/8 bg-white px-4"
              >
                <span className="font-display text-sm sm:text-base text-ink-400 grayscale opacity-60 group-hover:opacity-100 group-hover:text-brand-600 group-hover:grayscale-0 transition-all duration-300">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 bg-ink-900 text-paper rounded-2xl p-8 sm:p-10">
            <div>
              <h3 className="font-display text-xl mb-1.5">
                Interested in partnering with Tethernodes?
              </h3>
              <p className="text-paper/60 text-sm max-w-xl">
                We're always looking to collaborate with blockchain developers,
                infrastructure providers, communities, and technology partners who
                share our vision for the decentralized future.
              </p>
            </div>
            <a
              href="mailto:partnerships@tethernodes.com"
              className="shrink-0 inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-ink-900 font-semibold rounded-full px-6 py-3 transition-colors"
            >
              Become a Partner
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
