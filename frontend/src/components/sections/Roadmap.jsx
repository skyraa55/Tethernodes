import React from "react";
import { SectionHeading } from "../ui/Atoms.jsx";
import Reveal from "../ui/Reveal.jsx";

const PHASES = [
  {
    year: "2026",
    title: "Foundation",
    items: [
      "Launch the Tethernodes platform",
      "Community onboarding begins",
      "USDT-powered ecosystem goes live",
      "Initial blockchain infrastructure initiatives",
      "Establish global community channels",
    ],
  },
  {
    year: "2027",
    title: "Expansion",
    items: [
      "Expand into additional global markets",
      "Strategic technology collaborations",
      "Support for more decentralized infrastructure initiatives",
      "Enhanced participant dashboard",
      "Community education programs",
    ],
  },
  {
    year: "2028",
    title: "Ecosystem Growth",
    items: [
      "Scale community participation worldwide",
      "Introduce additional Web3 ecosystem services",
      "Expand support across emerging blockchain technologies",
      "Foster a sustainable global decentralized community",
    ],
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="bg-paper py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Roadmap"
            title="Building the Future, One Milestone at a Time"
          />
        </Reveal>

        <div className="mt-16 relative">
          <div className="hidden md:block absolute left-[7.5rem] top-2 bottom-2 w-px bg-ink-900/10" />
          <div className="space-y-12 md:space-y-16">
            {PHASES.map((phase, i) => (
              <Reveal key={phase.year} delay={i * 100}>
                <div className="grid md:grid-cols-[7.5rem_1fr] gap-4 md:gap-10">
                  <div className="flex md:flex-col items-baseline md:items-start gap-3 md:gap-1">
                    <span className="font-display text-3xl text-ink-900">{phase.year}</span>
                    <span className="relative md:mt-2 hidden md:block h-3 w-3 rounded-full bg-gold-500 -translate-x-[1.62rem]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-ink-900 mb-4">{phase.title}</h3>
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-ink-500 text-sm leading-relaxed">
                          <span className="mt-2 h-1 w-1 rounded-full bg-gold-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
