import React, { useEffect, useRef, useState } from "react";
import { Users } from "lucide-react";

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

export default function CommunityNetwork() {
  const [contentRef, contentVisible] = useReveal();

  return (
    <section id="community" className="relative overflow-hidden bg-white py-24 sm:py-32">
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
          className="mx-auto flex max-w-[720px] flex-col items-center text-center"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
            style={{
              background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)",
              boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
            }}
          >
            <Users size={22} color="#ffffff" strokeWidth={2} />
          </div>

          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
            Community Network
          </span>

          <h2 className="mt-3.5 text-[34px] max-[860px]:text-[27px] font-bold text-slate-900 leading-snug">
            Growing{" "}
            <span
              className="cn-shimmer bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
              }}
            >
              Together
            </span>
          </h2>

          <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
            Tethernodes believes that strong communities build stronger
            ecosystems. Participants can help expand the network by introducing
            others who share the vision of financial inclusion and decentralized
            innovation.
          </p>

          <p className="mt-4.5 max-w-[620px] text-lg leading-relaxed text-gray-500">
            As the community grows, collaboration increases, new opportunities
            emerge, and the ecosystem becomes more resilient.
          </p>

          <p className="mt-6 max-w-[560px] font-display text-xl text-slate-900 italic leading-relaxed">
            Together, we are building more than a platform we are building a
            global Web3 community.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .cn-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </section>
  );
}