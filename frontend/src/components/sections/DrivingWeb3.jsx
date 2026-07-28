import { useEffect, useRef, useState } from "react";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";
const SKY_SOLID = "rgba(56,131,217,1)";

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
    body: "Supporting the evolution of real world asset tokenization and programmable digital ownership.",
  },
];

// Gradient theme per icon box — same two-tone indigo/sky family used in Security.jsx
const iconThemes = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", // Layer-1/2 networks
  "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)", // DeFi
  "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)", // DID
  "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)", // Web3 infra
  "linear-gradient(135deg, #A78BFA 0%, #4F46E5 100%)", // Tokenization
];

function ItemIcon({ index, color }) {
  switch (index) {
    case 0: // Layer-1 & Layer-2 networks — stacked layers
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 3l9 5-9 5-9-5 9-5z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
          <path d="M3 13l9 5 9-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 18l9 5 9-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 1: // DeFi — coin / exchange
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
          <path d="M9 10.5c0-1.1 1.1-2 2.5-2s2.5.75 2.5 1.75-1 1.5-2.5 1.75-2.5.75-2.5 1.75S10.1 15.5 11.5 15.5s2.5-.9 2.5-2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12 7v1.2M12 15.8V17" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 2: // Decentralized identity — id / fingerprint
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8.5" r="3.2" stroke={color} strokeWidth="2" />
          <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 3: // Web3 infrastructure — nodes / network
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="6" cy="6" r="2.2" stroke={color} strokeWidth="2" />
          <circle cx="18" cy="6" r="2.2" stroke={color} strokeWidth="2" />
          <circle cx="12" cy="18" r="2.2" stroke={color} strokeWidth="2" />
          <path d="M7.7 7.2L11 16M16.3 7.2L13 16M8.2 6h7.6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 4: // Tokenization — token / badge
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" />
          <path d="M12 8.5l1.4 2.9 3.1.4-2.3 2.2.6 3.1L12 15.6l-2.8 1.5.6-3.1-2.3-2.2 3.1-.4L12 8.5z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
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
        { threshold: 0.25, rootMargin: "0px 0px -60px 0px" }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io && io.disconnect());
  }, []);
  return [refs, visible];
}

export default function DrivingWeb3() {
  const [introRef, introVisible] = useReveal();
  const [cardRefs, cardsVisible] = useRevealList(ITEMS.length);

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32 border-y border-gray-100">
      {/* decorative glow, same treatment as Security.jsx intro */}
      <div
        className="pointer-events-none absolute -top-[160px] left-1/2 -translate-x-1/2 w-[680px] h-[400px] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 55%, transparent 75%)` }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ── Heading: centered, shimmer accent like Security.jsx ── */}
        <div
          ref={introRef}
          className="flex flex-col items-center text-center mx-auto"
          style={{
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <SectionLabel>Driving the Web3 Revolution</SectionLabel>
          <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
            Supporting{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Technologies
            </span>{" "}
            That Shape the Future
          </h2>
          <p className="mt-4.5 max-w-[680px] text-lg text-slate-500 leading-relaxed">
            Tethernodes is committed to helping accelerate innovation across multiple sectors of Web3.
          </p>
        </div>

        {/* ── Item cards: centered grid, staggered reveal ── */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 max-w-[1100px] mx-auto">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className="group relative rounded-[20px] bg-white p-6 flex flex-col items-center text-center hover:-translate-y-[3px] transition-transform duration-300"
              style={{
                border: "1px solid rgba(99,102,241,0.12)",
                boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 10px 28px rgba(99,102,241,0.1)",
                opacity: cardsVisible[i] ? 1 : 0,
                transform: cardsVisible[i] ? "translateY(0px)" : "translateY(24px)",
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                willChange: "transform, opacity",
              }}
            >
              <div
                className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: iconThemes[i % iconThemes.length],
                  boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
                }}
              >
                <ItemIcon index={i} color="#ffffff" />
              </div>
              <h3 className="text-[15px] font-bold text-gray-950 leading-snug mb-2">
                {item.title}
              </h3>
              <p className="text-[13px] text-gray-600 leading-[1.6]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}