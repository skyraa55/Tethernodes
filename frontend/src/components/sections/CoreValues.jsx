import React, { useEffect, useRef, useState } from "react";
import { Eye, ShieldCheck, Lightbulb, Handshake, Globe } from "lucide-react";

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

function useRevealList(count) {
  const refs = useRef([]);
  const [visible, setVisible] = useState(() => Array(count).fill(false));
  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            io.disconnect();
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io && io.disconnect());
  }, []);
  return [refs, visible];
}

// Alternating two-tone gradients for the icon badges — same rotation used across the site
const ICON_THEMES = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
  "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)",
  "linear-gradient(135deg, #A78BFA 0%, #4F46E5 100%)",
];

const VALUES = [
  { icon: Eye, title: "Transparency", body: "Open processes, blockchain visibility, and honest communication form the foundation of our ecosystem." },
  { icon: ShieldCheck, title: "Security", body: "We prioritize secure technologies and responsible operational practices to help protect participants and ecosystem integrity." },
  { icon: Lightbulb, title: "Innovation", body: "We continuously explore emerging blockchain technologies that contribute to the future of decentralized finance and digital infrastructure." },
  { icon: Handshake, title: "Community", body: "Strong communities create stronger ecosystems. Collaboration and shared growth are central to our mission." },
  { icon: Globe, title: "Accessibility", body: "Financial innovation should be available to everyone, regardless of geography or traditional financial limitations." },
];

export default function CoreValues() {
  const [headRef, headVisible] = useReveal();
  const [cardRefs, cardsVisible] = useRevealList(VALUES.length);

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
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
          ref={headRef}
          className="flex flex-col items-center text-center mx-auto max-w-[680px] mb-14"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
            Our Core Values
          </span>
          <h2 className="mt-3.5 text-[34px] max-[860px]:text-[27px] font-bold text-slate-900 leading-snug">
            Principles That{" "}
            <span
              className="cv-shimmer bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
              }}
            >
              Guide Everything
            </span>{" "}
            We Build
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className="h-full rounded-2xl bg-white p-7 transition-transform duration-300 hover:-translate-y-[3px] hover:shadow-lg"
                style={{
                  border: "1px solid rgba(99,102,241,0.12)",
                  boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 10px 24px rgba(99,102,241,0.08)",
                  opacity: cardsVisible[i] ? 1 : 0,
                  transform: cardsVisible[i] ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.6s ease-out ${i * 0.08}s, transform 0.6s ease-out ${i * 0.08}s`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{ background: ICON_THEMES[i % ICON_THEMES.length], boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
                >
                  <Icon size={20} color="#ffffff" strokeWidth={2} />
                </div>
                <h3 className="font-display text-lg mt-4 mb-3 text-slate-900">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .cv-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </section>
  );
}