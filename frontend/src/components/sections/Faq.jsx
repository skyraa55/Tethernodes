import { useEffect, useRef, useState } from "react";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";

const FAQS = [
  {
    q: "Why do Tethernodes use USDT?",
    a: "USDT provides a stable and globally recognized digital asset that simplifies participation while reducing exposure to cryptocurrency price volatility.",
  },
  {
    q: "Who can join?",
    a: "Anyone who meets the platform's eligibility requirements and has access to USDT can participate.",
  },
  {
    q: "Do I need blockchain experience?",
    a: "No. Tethernodes is designed to be accessible for both newcomers and experienced Web3 participants.",
  },
  {
    q: "Is the platform available globally?",
    a: "Our goal is to build a borderless ecosystem that enables participation from users around the world, subject to local regulations.",
  },
];

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

function PlusIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5v14"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        style={{
          transformOrigin: "center",
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease",
          opacity: open ? 0 : 1,
        }}
      />
      <path d="M5 12h14" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
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

function FaqItem({ innerRef, visible, index, item, isOpen, onClick }) {
  return (
    <div
      ref={innerRef}
      className="rounded-[20px] bg-white overflow-hidden"
      style={{
        border: isOpen ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(99,102,241,0.12)",
        boxShadow: isOpen
          ? "0 1px 2px rgba(15,23,42,0.04), 0 14px 34px rgba(99,102,241,0.14)"
          : "0 1px 2px rgba(15,23,42,0.03), 0 6px 18px rgba(99,102,241,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, border-color 0.3s ease, box-shadow 0.3s ease`,
      }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
      >
        <span className="flex items-center gap-4">
          <span className="text-[12px] font-bold text-gray-400 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[16px] font-bold text-gray-950 leading-snug">{item.q}</span>
        </span>
        <span
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: isOpen
              ? "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)"
              : "linear-gradient(135deg, #A5B4FC 0%, #BAE6FD 100%)",
            boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
            transition: "background 0.3s ease",
          }}
        >
          <PlusIcon open={isOpen} />
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="text-[13.5px] text-gray-600 leading-[1.7] px-6 pb-6 pl-[52px]">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  const [introRef, introVisible] = useReveal();
  const [listRefs, listVisible] = useRevealList(FAQS.length);

  return (
    <section id="faq" className="!bg-white relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute -top-[160px] left-1/2 -translate-x-1/2 w-[680px] h-[400px] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 55%, transparent 75%)` }}
      />
      <div className="relative max-w-4xl mx-auto px-6">
        <div
          ref={introRef}
          className="flex flex-col items-center text-center mx-auto mb-12"
          style={{
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="max-w-[760px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
            Frequently{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              asked
            </span>{" "}
            questions.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              innerRef={(el) => (listRefs.current[i] = el)}
              visible={listVisible[i]}
              index={i}
              item={item}
              isOpen={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}