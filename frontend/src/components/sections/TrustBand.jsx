import { useEffect, useRef, useState } from "react";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";
const SKY_SOLID = "rgba(56,131,217,1)";

const BLOCKS = [
  {
    eyebrow: "Security & Transparency",
    title: "Built with Trust at the Core",
    body: "Transparency is fundamental to everything we build. Our platform is designed around secure blockchain technology, transparent processes, and responsible ecosystem management. We continuously work toward maintaining a reliable environment where participants can engage with confidence.",
  },
  {
    eyebrow: "Why Now",
    title: "The Future Is Already Being Built",
    body: "Blockchain adoption continues to accelerate across finance, payments, gaming, identity, artificial intelligence, and enterprise technology. Organizations worldwide are investing billions into decentralized infrastructure. Tethernodes provides an opportunity to become part of this transformation through a simple, globally accessible ecosystem powered by USDT.",
  },
];

const blockThemes = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", // Security & Transparency
  "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)", // Why Now
];

function BlockIcon({ index, color }) {
  if (index === 0) {
    // Security & Transparency — shield with check
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // Why Now — upward trend / growth
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 19V5M4 19h16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 15l4-4 3 3 5-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="8" r="1.4" fill={color} />
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

export default function TrustBand() {
  const [cardRefs, cardsVisible] = useRevealList(BLOCKS.length);

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* decorative glows, same treatment as Security.jsx */}
      <div
        className="pointer-events-none absolute -top-[160px] left-1/2 -translate-x-1/2 w-[680px] h-[400px] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 55%, transparent 75%)` }}
      />
      <div
        className="pointer-events-none absolute bottom-[-10%] right-[-140px] w-[400px] h-[400px] rounded-full blur-[110px]"
        style={{ background: `radial-gradient(circle, ${INDIGO} 0%, transparent 70%)` }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 max-w-[980px] mx-auto">
          {BLOCKS.map((block, i) => (
            <div
              key={block.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className="rounded-[24px] bg-white p-8 flex flex-col items-center text-center hover:-translate-y-[3px] transition-transform duration-300"
              style={{
                border: "1px solid rgba(99,102,241,0.12)",
                boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 10px 28px rgba(99,102,241,0.1)",
                opacity: cardsVisible[i] ? 1 : 0,
                transform: cardsVisible[i] ? "translateY(0px)" : "translateY(24px)",
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
                willChange: "transform, opacity",
              }}
            >
              <div
                className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background: blockThemes[i % blockThemes.length],
                  boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
                }}
              >
                <BlockIcon index={i} color="#ffffff" />
              </div>

              <SectionLabel>{block.eyebrow}</SectionLabel>

              <h3 className="text-[22px] sm:text-[24px] font-bold text-gray-950 leading-snug mb-4">
                {block.title}
              </h3>

              <p className="text-[14.5px] text-gray-600 leading-[1.7] max-w-[420px]">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}