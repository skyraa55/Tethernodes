import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Boxes, Milestone, Handshake, HelpCircle } from "lucide-react";
import Layout from "../components/Layout.jsx";
import Hero from "../components/sections/Hero.jsx";
import About from "../components/sections/About.jsx";
import MissionVision from "../components/sections/MissionVision.jsx";
import WhyUsdt from "../components/sections/WhyUsdt.jsx";
import WhyChoose from "../components/sections/WhyChoose.jsx";

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

// Alternating two-tone gradients for the icon badges — same rotation used across the site
const ICON_THEMES = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
  "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)",
];

const EXPLORE = [
  {
    to: "/ecosystem",
    icon: Boxes,
    label: "The Ecosystem",
    body: "See how the ecosystem works, the metrics behind it, and the Web3 sectors it supports.",
  },
  {
    to: "/roadmap",
    icon: Milestone,
    label: "Roadmap & Values",
    body: "Our 2026–2028 milestones and the principles guiding how we build.",
  },
  {
    to: "/partners",
    icon: Handshake,
    label: "Partners & Community",
    body: "The chains we integrate with, and the community powering it all.",
  },
  {
    to: "/faq",
    icon: HelpCircle,
    label: "FAQ & Newsletter",
    body: "Common questions answered, plus updates straight to your inbox.",
  },
];

export default function Home() {
  const [headRef, headVisible] = useReveal();
  const [cardRefs, cardsVisible] = useRevealList(EXPLORE.length);

  return (
    <Layout>
      <Hero />
      <About />
      <MissionVision />
      <WhyUsdt />
      <WhyChoose />

      <section className="relative overflow-hidden bg-white py-24 sm:py-32 border-t border-slate-100">
        <div
          className="pointer-events-none absolute -top-[140px] right-[-10%] w-[560px] h-[340px] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(186,230,253,0.5) 0%, rgba(99,102,241,0.3) 55%, transparent 75%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div
            ref={headRef}
            className="flex flex-col items-center text-center mx-auto max-w-2xl mb-14"
            style={{
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-indigo-500">
              Explore More
            </span>
            <h2 className="mt-3.5 text-[34px] max-[860px]:text-[27px] font-bold text-slate-900 leading-snug">
              Go deeper into the{" "}
              <span
                className="em-shimmer bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                  backgroundSize: "200% auto",
                }}
              >
                ecosystem
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {EXPLORE.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="group h-full flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_4px_18px_rgba(99,102,241,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(99,102,241,0.14)]"
                  style={{
                    opacity: cardsVisible[i] ? 1 : 0,
                    transform: cardsVisible[i] ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.6s ease-out ${i * 0.08}s, transform 0.6s ease-out ${i * 0.08}s`,
                  }}
                >
                  <div>
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: ICON_THEMES[i % ICON_THEMES.length], boxShadow: "0 4px 14px rgba(99,102,241,0.3)" }}
                    >
                      <Icon size={20} color="#ffffff" strokeWidth={2} />
                    </div>
                    <h3 className="font-display text-xl text-slate-900 mb-3">{item.label}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                  </div>
                  <span
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: INDIGO_SOLID }}
                  >
                    Explore
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <style>{`
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          .em-shimmer {
            animation: shimmer 3s linear infinite;
          }
        `}</style>
      </section>
    </Layout>
  );
}