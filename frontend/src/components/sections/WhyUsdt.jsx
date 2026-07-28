import React, { useEffect, useRef, useState } from "react";

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
        { threshold: 0.25, rootMargin: "0px 0px -60px 0px" }
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

const ITEMS = [
  {
    title: "Stable Value",
    body: "Participate using a USD pegged digital asset that minimizes exposure to the extreme volatility commonly associated with cryptocurrencies.",
  },
  {
    title: "Borderless Participation",
    body: "Anyone with an internet connection can join the ecosystem without traditional banking limitations or geographic restrictions.",
  },
  {
    title: "Fast Settlement",
    body: "Blockchain transactions allow efficient transfers across the globe with significantly reduced settlement times compared to conventional financial systems.",
  },
  {
    title: "Transparent Accounting",
    body: "Every transaction is recorded on chain, providing transparency and verifiable records throughout the ecosystem.",
  },
];

export default function WhyUsdt() {
  const [headRef, headVisible] = useReveal();
  const [cardRefs, cardsVisible] = useRevealList(ITEMS.length);

  return (
    <section id="why-usdt" className="relative bg-white py-24 sm:py-32 border-y border-gray-100 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-[120px] left-1/2 -translate-x-1/2 w-[680px] h-[340px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(186,230,253,0.55) 0%, rgba(99,102,241,0.32) 55%, transparent 75%)" }}
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
          <SectionLabel>Why USDT</SectionLabel>
          <h2 className="text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
            Stability Meets{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Global Accessibility
            </span>
          </h2>
          <p className="mt-4.5 text-lg text-slate-500 leading-relaxed">
            USDT provides the foundation for a more predictable and accessible digital ecosystem.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className="h-full rounded-2xl bg-white p-7 transition-transform duration-300 hover:-translate-y-[3px]"
              style={{
                border: "1px solid rgba(99,102,241,0.12)",
                boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 10px 24px rgba(99,102,241,0.08)",
                opacity: cardsVisible[i] ? 1 : 0,
                transform: cardsVisible[i] ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s ease-out ${i * 0.1}s, transform 0.6s ease-out ${i * 0.1}s`,
              }}
            >
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-[12px] font-bold text-white"
                style={{ background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg mt-4 mb-3 text-gray-950">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}