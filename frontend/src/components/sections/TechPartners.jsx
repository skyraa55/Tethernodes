import { useEffect, useRef, useState } from "react";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";
const SKY_SOLID = "rgba(56,131,217,1)";

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

// Gradient badge rotation, same family as Security.jsx's protectionThemes
const partnerThemes = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
  "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)",
  "linear-gradient(135deg, #A78BFA 0%, #4F46E5 100%)",
];

// Generic chain-link icon for token/network partners; a "+" node icon for the
// forward-looking "Future Web3 Integrations" entry.
function PartnerIcon({ isFuture, color }) {
  if (isFuture) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
        <path d="M12 8v8M8 12h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="8" height="8" rx="3" stroke={color} strokeWidth="2" />
      <rect x="13" y="8" width="8" height="8" rx="3" stroke={color} strokeWidth="2" />
      <path d="M11 12h2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
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

export default function TechPartners() {
  const [introRef, introVisible] = useReveal();
  const [cardRefs, cardsVisible] = useRevealList(PARTNERS.length);
  const [ctaRef, ctaVisible] = useReveal();

  return (
    <section id="partners" className="relative overflow-hidden bg-white py-24 sm:py-32 border-y border-gray-100">
      {/* decorative glow, same treatment as Security.jsx */}
      <div
        className="pointer-events-none absolute -top-[160px] left-1/2 -translate-x-1/2 w-[680px] h-[400px] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 55%, transparent 75%)` }}
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
          <SectionLabel>Technology Partners</SectionLabel>
          <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
            Building Alongside the{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Web3 Ecosystem
            </span>
          </h2>
          <p className="mt-4.5 max-w-[680px] text-lg text-slate-500 leading-relaxed">
            Tethernodes is designed to integrate with the broader blockchain landscape.
          </p>
        </div>

        {/* ── Partner grid ── */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-[900px] mx-auto">
          {PARTNERS.map((p, i) => {
            const isFuture = p === "Future Web3 Integrations";
            return (
              <div
                key={p}
                ref={(el) => (cardRefs.current[i] = el)}
                className="group flex flex-col items-center justify-center text-center gap-3 h-32 rounded-2xl bg-white px-4 hover:-translate-y-[2px] transition-transform duration-300"
                style={{
                  border: "1px solid rgba(99,102,241,0.12)",
                  boxShadow: "0 1px 3px rgba(15,23,42,0.05), 0 8px 20px rgba(99,102,241,0.08)",
                  opacity: cardsVisible[i] ? 1 : 0,
                  transform: cardsVisible[i] ? "translateY(0px)" : "translateY(20px)",
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
                  willChange: "transform, opacity",
                }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: partnerThemes[i % partnerThemes.length],
                    boxShadow: "0 4px 12px rgba(99,102,241,0.28)",
                  }}
                >
                  <PartnerIcon isFuture={isFuture} color="#ffffff" />
                </div>
                <span className="font-semibold text-[13px] sm:text-sm text-gray-700 group-hover:text-gray-950 transition-colors duration-300">
                  {p}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── CTA panel ── */}
               {/* ── CTA panel ── */}
        <div
          ref={ctaRef}
          className="mt-16 max-w-[980px] mx-auto rounded-[28px] p-8 sm:p-10 flex flex-col items-center text-center gap-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 55%, #3B82F6 100%)",
            boxShadow: "0 24px 60px rgba(99,102,241,0.28)",
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div
            className="pointer-events-none absolute -top-[80px] right-[-60px] w-[280px] h-[280px] rounded-full blur-[90px]"
            style={{
              background: `radial-gradient(circle, ${SKY} 0%, transparent 70%)`,
            }}
          />

          <div className="relative">
            <h3 className="text-[20px] sm:text-[22px] font-bold text-white mb-2">
              Interested in partnering with Tethernodes?
            </h3>

            <p className="text-white/75 text-sm max-w-xl mx-auto leading-relaxed">
              We're always looking to collaborate with blockchain developers,
              infrastructure providers, communities, and technology partners who
              share our vision for the decentralized future.
            </p>
          </div>

          <a
            href="mailto:partnerships@tethernodes.com"
            className="relative shrink-0 inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-indigo-700 font-semibold rounded-full px-6 py-3 transition-colors duration-300"
          >
            Become a Partner
          </a>
        </div>
        
      </div>
    </section>
  );
}