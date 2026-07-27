import React, { useEffect, useRef, useState } from "react";

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

function Shimmer({ children }) {
  return (
    <span
      className="mv-shimmer bg-clip-text text-transparent"
      style={{
        backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
        backgroundSize: "200% auto",
      }}
    >
      {children}
    </span>
  );
}

const CARDS = [
  {
    n: 1,
    label: "Our Mission",
    titlePre: "Democratizing Access to ",
    titleShimmer: "Web3 Innovation",
    titlePost: "",
    body: "Our mission is to make participation in blockchain infrastructure accessible to everyone. We aim to remove traditional financial barriers and enable people around the world to support meaningful decentralized technologies through a transparent and efficient ecosystem built on stable digital assets.",
  },
  {
    n: 2,
    label: "Our Vision",
    titlePre: "A Future Where ",
    titleShimmer: "Financial Freedom",
    titlePost: " Has No Borders",
    body: "We envision a world where financial opportunities are not restricted by geography, institutions, or legacy banking systems. Tethernodes strives to become a bridge between global communities and the decentralized technologies shaping tomorrow's digital economy.",
  },
];

export default function MissionVision() {
  const [refs, visible] = useRevealList(CARDS.length);

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
        <div className="grid md:grid-cols-2 gap-6">
          {CARDS.map((c, i) => (
            <div
              key={c.n}
              ref={(el) => (refs.current[i] = el)}
              className="rounded-2xl border border-slate-200/80 bg-white p-10 sm:p-12 shadow-[0_4px_18px_rgba(99,102,241,0.08)] transition-shadow hover:shadow-[0_8px_28px_rgba(99,102,241,0.14)]"
              style={{
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s ease-out ${i * 0.12}s, transform 0.6s ease-out ${i * 0.12}s`,
              }}
            >
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-full text-[13px] font-bold text-white"
                style={{ background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)" }}
              >
                {c.n}
              </span>

              <p className="font-mono text-xs uppercase tracking-[0.2em] mt-4 mb-4 text-indigo-500">
                {c.label}
              </p>

              <h3 className="font-display text-2xl sm:text-[1.7rem] leading-snug mb-5 text-slate-900">
                {c.titlePre}
                <Shimmer>{c.titleShimmer}</Shimmer>
                {c.titlePost}
              </h3>

              <p className="text-gray-500 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .mv-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </section>
  );
}