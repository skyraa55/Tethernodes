import React, { useEffect, useRef, useState } from "react";
import { Globe, ShieldCheck, Zap, Handshake, Eye, Rocket } from "lucide-react";

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

function SectionLabel({ children }) {
  return (
    <span
      className="inline-flex items-center gap-[7px] text-[11px] font-semibold uppercase tracking-[.14em] rounded-full px-4 py-[6px] mb-5"
      style={{
        color: INDIGO_SOLID,
        background: "rgba(99,102,241,0.07)",
        border: "1px solid rgba(99,102,241,0.18)",
      }}
    >
      <span className="w-[5px] h-[5px] rounded-full" style={{ background: INDIGO_SOLID }} />
      {children}
    </span>
  );
}

// Alternating two-tone gradients for the icon badges, matching QuantZen's protection cards
const ICON_THEMES = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
  "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)",
  "linear-gradient(135deg, #A78BFA 0%, #4F46E5 100%)",
  "linear-gradient(135deg, #34D3E0 0%, #4F46E5 100%)",
];

const ITEMS = [
  {
    icon: Globe,
    title: "Global Accessibility",
    body: "Participate from anywhere in the world using USDT. No traditional banking barriers, no geographical limitations.",
  },
  {
    icon: ShieldCheck,
    title: "Stability First",
    body: "Built around USD pegged stablecoins to provide a more consistent participation experience while minimizing exposure to market volatility.",
  },
  {
    icon: Zap,
    title: "Blockchain Powered",
    body: "Leveraging decentralized technology to deliver transparent, efficient, and secure ecosystem operations.",
  },
  {
    icon: Handshake,
    title: "Community Driven",
    body: "Our ecosystem grows through collaboration. Every participant contributes to expanding the network and supporting blockchain innovation.",
  },
  {
    icon: Eye,
    title: "Transparent by Design",
    body: "Blockchain technology provides visibility into transactions and ecosystem activity, promoting openness and trust.",
  },
  {
    icon: Rocket,
    title: "Long-Term Vision",
    body: "Focused on supporting the infrastructure powering tomorrow's decentralized economy not short term market speculation.",
  },
];

export default function WhyChoose() {
  const [headRef, headVisible] = useReveal();
  const [cardRefs, cardsVisible] = useRevealList(ITEMS.length);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={headRef}
          className="flex flex-col items-center text-center mx-auto max-w-[680px] mb-14"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <SectionLabel>Why Choose Tethernodes</SectionLabel>
          <h2 className="text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
            Built for the{" "}
            <span
              className="wc-shimmer bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
              }}
            >
              Next Generation
            </span>{" "}
            of Web3
          </h2>
          <p className="mt-4.5 text-lg text-slate-500 leading-relaxed">
            No advanced trading knowledge or technical expertise required just a stable, transparent way to participate.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
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
                <h3 className="font-display text-lg mt-4 mb-3 text-gray-950">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
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
        .wc-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </section>
  );
}