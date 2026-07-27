import React from "react";
import { SectionHeading } from "../ui/Atoms.jsx";
import Reveal from "../ui/Reveal.jsx";

const ITEMS = [
  {
    title: "Layer-1 & Layer-2 Networks",
    body: "Supporting blockchain scalability, lower transaction costs, and improved network efficiency.",
  },
  {
    title: "Decentralized Finance (DeFi)",
    body: "Helping enable financial services that operate without traditional intermediaries.",
  },
  {
    title: "Decentralized Identity (DID)",
    body: "Supporting technologies that allow individuals to own and control their digital identities.",
  },
  {
    title: "Web3 Infrastructure",
    body: "Contributing to the development of wallets, decentralized applications, middleware, and blockchain developer tools.",
  },
  {
    title: "Tokenization",
    body: "Supporting the evolution of real-world asset tokenization and programmable digital ownership.",
  },
];

export default function DrivingWeb3() {
  return (
    <section className="bg-paper-100 py-24 sm:py-32 border-y border-ink-900/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Driving the Web3 Revolution"
            title="Supporting Technologies That Shape the Future"
            sub="Tethernodes is committed to helping accelerate innovation across multiple sectors of Web3."
          />
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-5 gap-px bg-ink-900/10 rounded-2xl overflow-hidden border border-ink-900/10">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 80}
              className="bg-white p-7 flex flex-col"
            >
              <span className="font-mono text-xs text-gold-600 mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-base leading-snug text-ink-900 mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
