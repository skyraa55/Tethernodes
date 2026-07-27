import React, { useEffect, useRef, useState } from "react";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

export default function About() {
  const [contentRef, contentVisible] = useReveal();

  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Radial blur backdrop — QuantZen signature motif */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99,102,241,0.16), rgba(186,230,253,0.22), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div
          ref={contentRef}
          className="mx-auto flex flex-col items-center text-center"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
            About Tethernodes
          </span>

          <h2 className="mt-3.5 max-w-[760px] text-[34px] font-bold text-slate-900 max-[860px]:text-[27px]">
            Building the{" "}
            <span
              className="th-shimmer bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
              }}
            >
              Foundation
            </span>{" "}
            of the Decentralized Future
          </h2>

          <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
            The internet transformed how the world communicates. Blockchain is
            transforming how the world owns, transacts, and builds trust.
          </p>

          <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
            Tethernodes exists to accelerate this transformation by creating an
            ecosystem where community participation helps fund real blockchain
            innovation. Instead of limiting access to institutions and venture
            capital firms, we believe the next generation of Web3 should be
            built with the support of a global community.
          </p>

          <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
            By combining blockchain transparency, stablecoin accessibility, and
            community participation, Tethernodes creates an ecosystem focused
            on long-term technological growth and financial inclusion.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .th-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </section>
  );
}