import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";

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
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

export default function Cta() {
  const [ref, visible] = useReveal();

  return (
    <section className="relative bg-gray-950 text-white py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full blur-[110px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${INDIGO} 0%, transparent 70%)` }}
      />
      <div
        className="absolute -top-32 right-[-140px] h-[400px] w-[400px] rounded-full blur-[110px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, transparent 70%)` }}
      />

      <div
        ref={ref}
        className="relative max-w-3xl mx-auto px-6 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <span
          className="inline-flex items-center gap-[7px] text-[11px] font-semibold uppercase tracking-[.14em] rounded-full px-4 py-[6px] mb-6"
          style={{
            color: "#C7D2FE",
            background: "rgba(99,102,241,0.14)",
            border: "1px solid rgba(129,140,248,0.35)",
          }}
        >
          <span className="w-[5px] h-[5px] rounded-full" style={{ background: "#A5B4FC" }} />
          Join the Future of Decentralized Innovation
        </span>

        <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
          Become part of a growing global community helping accelerate the next
          generation of blockchain technology.
        </h2>

        <p className="mt-5 text-white/55 text-lg leading-relaxed">
          Start your journey with Tethernodes today and help shape the future of
          Web3.
        </p>

        <Link
          to="/signup"
          className="mt-9 inline-flex items-center gap-2.5 text-white font-semibold rounded-full pl-8 pr-3 py-3 transition-transform duration-200 hover:-translate-y-[2px]"
          style={{
            background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)",
            boxShadow: "0 10px 30px rgba(99,102,241,0.45)",
          }}
        >
          Join Now
          <span
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}