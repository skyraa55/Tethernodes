import React, { useEffect, useRef, useState } from "react";
import { UserPlus, Sparkles, Share2, TrendingUp } from "lucide-react";

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

const ICON_THEMES = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
  "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)",
];

const STEPS = [
  {
    n: 1,
    icon: UserPlus,
    title: "Join the Ecosystem",
    body: "Register your account and securely participate using USDT.",
  },
  {
    n: 2,
    icon: Sparkles,
    title: "Support Blockchain Innovation",
    body: "Community participation contributes toward the growth of emerging decentralized technologies and blockchain infrastructure.",
  },
  {
    n: 3,
    icon: Share2,
    title: "Network Expansion",
    body: "Invite others who share the vision of decentralized finance and digital innovation.",
  },
  {
    n: 4,
    icon: TrendingUp,
    title: "Ecosystem Growth",
    body: "As the community expands, blockchain development accelerates while strengthening the overall ecosystem.",
  },
];

export default function HowItWorks() {
  const [headRef, headVisible] = useReveal();
  const [stepRefs, stepsVisible] = useRevealList(STEPS.length);
  const anyVisible = stepsVisible.some(Boolean);

  return (
    <section id="ecosystem" className="relative overflow-hidden bg-white py-24 sm:py-32">
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
            How The Ecosystem Works
          </span>
          <h2 className="mt-3.5 text-[34px] max-[860px]:text-[27px] font-bold text-slate-900 leading-snug">
            Connecting Community{" "}
            <span
              className="hiw-shimmer bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
              }}
            >
              Capital
            </span>{" "}
            with Web3 Innovation
          </h2>
          <p className="mt-4.5 text-lg leading-relaxed text-gray-500">
            Tethernodes follows a structured ecosystem designed around transparency and simplicity.
          </p>
        </div>

        <div className="relative mx-auto max-w-[700px]">
          {/* animated connecting line */}
          <div
            className="absolute left-[21px] top-[6px] bottom-[6px] w-px overflow-hidden max-[500px]:left-[17px]"
            style={{ background: "rgba(99,102,241,0.12)" }}
          >
            <div
              className="w-full"
              style={{
                height: anyVisible ? "100%" : "0%",
                background: "linear-gradient(180deg, #6366F1, #38BFE3)",
                transition: "height 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            />
          </div>

          <div className="flex flex-col gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.n}
                  ref={(el) => (stepRefs.current[i] = el)}
                  className="relative flex gap-5"
                  style={{
                    opacity: stepsVisible[i] ? 1 : 0,
                    transform: stepsVisible[i] ? "translateX(0)" : "translateX(-24px)",
                    transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div
                    className="relative z-10 shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white max-[500px]:w-9 max-[500px]:h-9"
                    style={{
                      background: ICON_THEMES[i % ICON_THEMES.length],
                      boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
                    }}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </div>

                  <div
                    className="flex-1 min-w-0 rounded-2xl bg-white p-6"
                    style={{
                      border: "1px solid rgba(99,102,241,0.12)",
                      boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 10px 24px rgba(99,102,241,0.08)",
                    }}
                  >
                    <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                      <span className="font-mono text-[12px] text-indigo-400">
                        {String(step.n).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl text-slate-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-500 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-400 max-w-2xl mx-auto">
          Every stage is designed to encourage transparency, accessibility, and
          long term ecosystem development.
        </p>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .hiw-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </section>
  );
}