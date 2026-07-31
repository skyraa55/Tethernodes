import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";

const BENEFITS = [
  "Product & Platform Updates",
  "Web3 Industry News",
  "Community Announcements",
  "New Feature Releases",
  "Educational Content",
  "Partnership Announcements",
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

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const benefitThemes = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #38BFE3 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #818CF8 0%, #6366F1 100%)",
  "linear-gradient(135deg, #60D5F5 0%, #6366F1 100%)",
  "linear-gradient(135deg, #A78BFA 0%, #4F46E5 100%)",
  "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)",
];

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

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [leftRef, leftVisible] = useReveal();
  const [cardRef, cardVisible] = useReveal();
  const [benefitRefs, benefitsVisible] = useRevealList(BENEFITS.length);

//   async function handleSubmit(e) {
//   e.preventDefault();

//   if (!email || loading) return;

//   setLoading(true);

//   try {
//     const res = await fetch(
//       `${import.meta.env.VITE_API_URL}/newsletter`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       }
//     );

//     const data = await res.json();

//     if (!res.ok || !data.success) {
//       throw new Error(data.message || "Subscription failed");
//     }

//     setSubmitted(true);
//     setEmail("");
//   } catch (error) {
//     console.error(error);
//     alert(error.message || "Something went wrong. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// }


async function handleSubmit(e) {
  e.preventDefault();

  if (!email || loading) return;

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/signup");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/newsletter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      }
    );

    if (res.status === 401) {
      // token missing/expired/invalid on the server side
      localStorage.removeItem("token");
      navigate("/signup");
      return;
    }

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Subscription failed");
    }

    setSubmitted(true);
    setEmail("");
  } catch (error) {
    console.error(error);
    alert(error.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
}
  return (
    <section id="newsletter" className="!bg-white relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute -top-[160px] left-1/2 -translate-x-1/2 w-[680px] h-[400px] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 55%, transparent 75%)` }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <div
          ref={leftRef}
          style={{
            opacity: leftVisible ? 1 : 0,
            transform: leftVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <SectionLabel>Newsletter</SectionLabel>
          <h2 className="max-w-[560px] text-[34px] max-[860px]:text-[27px] font-bold text-gray-950 leading-snug">
            Stay ahead of the{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              next wave
            </span>{" "}
            of Web3.
          </h2>
          <p className="mt-4.5 max-w-[520px] text-lg text-slate-500 leading-relaxed">
            Receive the latest updates on platform developments, ecosystem
            milestones, blockchain insights, educational resources, and
            upcoming announcements all delivered directly to your inbox.
          </p>

          <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {BENEFITS.map((b, i) => (
              <li
                key={b}
                ref={(el) => (benefitRefs.current[i] = el)}
                className="flex items-center gap-3 text-[13.5px] font-semibold text-gray-700"
                style={{
                  opacity: benefitsVisible[i] ? 1 : 0,
                  transform: benefitsVisible[i] ? "translateX(0)" : "translateX(-14px)",
                  transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
                }}
              >
                <span
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: benefitThemes[i % benefitThemes.length],
                    boxShadow: "0 4px 12px rgba(99,102,241,0.28)",
                  }}
                >
                  <CheckIcon />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={cardRef}
          className="rounded-[28px] bg-white p-8 sm:p-10"
          style={{
            border: "1px solid rgba(99,102,241,0.14)",
            boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 24px 60px rgba(99,102,241,0.12)",
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s",
          }}
        >
          <h3 className="text-[20px] font-bold text-gray-950 mb-1.5 leading-snug">
            Join Our Community
          </h3>
          <p className="text-[13.5px] text-gray-500 mb-6">
            Stay connected with the future of decentralized technology.
          </p>

          {submitted ? (
            <div
              className="rounded-2xl text-[13.5px] font-semibold px-4 py-3.5 flex items-center gap-3"
              style={{
                background: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.2)",
                color: INDIGO_SOLID,
              }}
            >
              <span
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)",
                  boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                }}
              >
                <CheckIcon />
              </span>
              You're on the list — thanks for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-semibold mb-1.5 text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full rounded-xl px-4 py-3 text-[14px] outline-none transition-shadow"
                  style={{
                    border: "1px solid rgba(99,102,241,0.18)",
                    boxShadow: "0 1px 2px rgba(15,23,42,0.03)",
                  }}
                  onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px rgba(99,102,241,0.18)`)}
                  onBlur={(e) => (e.target.style.boxShadow = "0 1px 2px rgba(15,23,42,0.03)")}
                />
              </div>
              <button
  type="submit"
  disabled={loading}
  className="w-full text-white font-semibold rounded-xl py-3.5 text-[14px] transition-transform duration-200 hover:-translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed"
  style={{
    background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)",
    boxShadow: "0 8px 22px rgba(99,102,241,0.32)",
  }}
>
  {loading ? "Subscribing..." : "Subscribe Now"}
</button>
            </form>
          )}
          <p className="text-[11.5px] text-gray-400 mt-4 text-center">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}