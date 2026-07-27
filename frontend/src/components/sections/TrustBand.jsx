import React from "react";
import { Eyebrow } from "../ui/Atoms.jsx";
import Reveal from "../ui/Reveal.jsx";

export default function TrustBand() {
  return (
    <section className="bg-ink-900 text-paper py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14">
        <Reveal>
          <Eyebrow tone="dark">Security &amp; Transparency</Eyebrow>
          <h3 className="font-display text-2xl sm:text-[1.7rem] leading-snug mb-5">
            Built with Trust at the Core
          </h3>
          <p className="text-paper/60 leading-relaxed">
            Transparency is fundamental to everything we build. Our platform is
            designed around secure blockchain technology, transparent processes,
            and responsible ecosystem management. We continuously work toward
            maintaining a reliable environment where participants can engage
            with confidence.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <Eyebrow tone="dark">Why Now</Eyebrow>
          <h3 className="font-display text-2xl sm:text-[1.7rem] leading-snug mb-5">
            The Future Is Already Being Built
          </h3>
          <p className="text-paper/60 leading-relaxed">
            Blockchain adoption continues to accelerate across finance,
            payments, gaming, identity, artificial intelligence, and enterprise
            technology. Organizations worldwide are investing billions into
            decentralized infrastructure. Tethernodes provides an opportunity to
            become part of this transformation through a simple, globally
            accessible ecosystem powered by USDT.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
