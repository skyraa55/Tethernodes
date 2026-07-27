import { useEffect, useRef, useState } from "react";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";
const SKY_SOLID = "rgba(56,131,217,1)";

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

// One badge gradient + icon per phase, same family as Security.jsx's protectionThemes
const phaseThemes = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", // Foundation
  "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)", // Expansion
  "linear-gradient(135deg, #A78BFA 0%, #4F46E5 100%)", // Ecosystem Growth
];

function PhaseIcon({ index, color }) {
  switch (index) {
    case 0: // Foundation — rocket / launch
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2c2.5 2 4 5.2 4 8.5 0 2-1 4-2 5.2v3.3l-2-1.3-2 1.3v-3.3c-1-1.2-2-3.2-2-5.2C8 7.2 9.5 4 12 2z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="1.6" stroke={color} strokeWidth="1.6" />
          <path d="M8.5 15.5L6 19M15.5 15.5L18 19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 1: // Expansion — globe
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
          <path d="M4 12h16M12 4c2.4 2.2 3.6 5 3.6 8s-1.2 5.8-3.6 8c-2.4-2.2-3.6-5-3.6-8S9.6 6.2 12 4z" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 2: // Ecosystem Growth — upward growth network
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 19V5M4 19h16" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M7 15l4-4 3 3 5-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="19" cy="8" r="1.4" fill={color} />
        </svg>
      );
    default:
      return null;
  }
}

const eyebrowStyle = {
  color: INDIGO_SOLID,
  background: "rgba(99,102,241,0.07)",
  border: "1px solid rgba(99,102,241,0.18)",
};

function SectionLabel({ children }) {
  return (
    <span
      className="inline-flex items-center gap-[7px] text-[11px] font-semibold uppercase tracking-[.14em] rounded-full px-4 py-[6px] mb-5"
      style={eyebrowStyle}
    >
      <span className="w-[5px] h-[5px] rounded-full" style={{ background: INDIGO_SOLID }} />
      {children}
    </span>
  );
}

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

export default function Roadmap() {
  const [introRef, introVisible] = useReveal();
  const [phaseRefs, phasesVisible] = useRevealList(PHASES.length);

  return (
    <section id="roadmap" className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* decorative glows, same treatment as Security.jsx */}
      <div
        className="pointer-events-none absolute -top-[160px] left-1/2 -translate-x-1/2 w-[680px] h-[400px] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 55%, transparent 75%)` }}
      />
      <div
        className="pointer-events-none absolute bottom-[0%] left-[-160px] w-[360px] h-[360px] rounded-full blur-[110px]"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, transparent 70%)` }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ── Heading: centered, shimmer accent ── */}
        <div
          ref={introRef}
          className="flex flex-col items-center text-center mx-auto"
          style={{
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <SectionLabel>Roadmap</SectionLabel>
          <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
            Building the{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Future
            </span>
            , One Milestone at a Time
          </h2>
        </div>

        {/* ── Timeline: centered vertical line with animated draw-in ── */}
        <div className="relative max-w-[760px] mx-auto mt-16">
          <div
            className="absolute left-[27px] top-[10px] bottom-[10px] w-px overflow-hidden max-[640px]:left-[27px]"
            style={{ background: "rgba(99,102,241,0.12)" }}
          >
            <div
              className="w-full"
              style={{
                height: phasesVisible.some(Boolean) ? "100%" : "0%",
                background: `linear-gradient(180deg, ${INDIGO_SOLID}, #8B5CF6 50%, ${SKY_SOLID})`,
                transition: "height 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            />
          </div>

          <div className="relative flex flex-col gap-10 md:gap-12">
            {PHASES.map((phase, i) => (
              <div
                key={phase.year}
                ref={(el) => (phaseRefs.current[i] = el)}
                className="relative flex gap-5"
                style={{
                  opacity: phasesVisible[i] ? 1 : 0,
                  transform: phasesVisible[i] ? "translateX(0)" : "translateX(-28px)",
                  transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <div
                  className="relative z-10 shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-white"
                  style={{
                    background: phaseThemes[i % phaseThemes.length],
                    boxShadow: phasesVisible[i]
                      ? "0 0 0 6px rgba(99,102,241,0.14), 0 4px 14px rgba(99,102,241,0.3)"
                      : "0 0 0 0px rgba(99,102,241,0.14), 0 4px 14px rgba(99,102,241,0.3)",
                    transition: "box-shadow 0.5s ease-out 0.15s",
                  }}
                >
                  <PhaseIcon index={i} color="#ffffff" />
                </div>

                <div
                  className="flex-1 min-w-0 rounded-2xl bg-white p-6 text-left"
                  style={{
                    border: "1px solid rgba(99,102,241,0.14)",
                    boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 22px rgba(15,23,42,0.05)",
                  }}
                >
                  <div className="flex flex-wrap items-baseline gap-3 mb-4">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-[5px] text-[12px] font-bold"
                      style={{ background: "rgba(99,102,241,0.08)", color: INDIGO_SOLID }}
                    >
                      {phase.year}
                    </span>
                    <h3 className="text-[19px] font-bold text-gray-950 leading-snug">
                      {phase.title}
                    </h3>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[13.5px] text-gray-600 leading-relaxed"
                      >
                        <span
                          className="mt-[7px] h-[5px] w-[5px] rounded-full shrink-0"
                          style={{ background: INDIGO_SOLID }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}