import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const PI2 = Math.PI * 2;

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";

// Three tethered orbit-lanes — indigo / sky / violet — representing
// nodes tethered around a central trust layer.
const ORBITS = [
  { rx: 190, ry: 62, tilt: 0, spd: 0.0105, col: [99, 102, 241] },
  { rx: 226, ry: 76, tilt: 58, spd: 0.0078, col: [56, 189, 248] },
  { rx: 258, ry: 88, tilt: 116, spd: 0.0058, col: [165, 180, 252] },
];

const NUCLEUS_R = 14;

function rgba(c, a) {
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

function pt(rx, ry, deg, a) {
  const t = (deg * Math.PI) / 180;
  const lx = rx * Math.cos(a);
  const ly = ry * Math.sin(a);
  return [lx * Math.cos(t) - ly * Math.sin(t), lx * Math.sin(t) + ly * Math.cos(t)];
}

function TetherCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const state = {
      W: 0,
      H: 0,
      T: 0,
      lanes: ORBITS.map(() => ({
        packets: [{ a: Math.random() * PI2 }, { a: Math.random() * PI2 + Math.PI }],
      })),
      pulses: [],
      dust: Array.from({ length: 36 }, () => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00014,
        vy: (Math.random() - 0.5) * 0.00014,
        r: Math.random() * 0.8 + 0.3,
        a: Math.random() * 0.12 + 0.04,
        ph: Math.random() * PI2,
        c: Math.random() < 0.5 ? [99, 102, 241] : [56, 189, 248],
      })),
    };

    function resize() {
      const el = canvas.parentElement;
      state.W = canvas.width = el ? el.offsetWidth : window.innerWidth;
      state.H = canvas.height = el ? el.offsetHeight : window.innerHeight;
    }
    resize();

    // Anchored on the right side of the hero, behind the headline area.
    const cx = () => state.W * 0.82;
    const cy = () => state.H * 0.48;

    function drawGlow() {
      const x = cx(), y = cy();
      const g = ctx.createRadialGradient(x, y, 0, x, y, Math.min(state.W, state.H) * 0.55);
      g.addColorStop(0, "rgba(99,102,241,0.16)");
      g.addColorStop(0.5, "rgba(56,189,248,0.08)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, state.W, state.H);
    }

    function drawDust() {
      state.dust.forEach((p) => {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        const f = 0.5 + 0.5 * Math.sin(state.T * 0.014 + p.ph);
        ctx.save();
        ctx.globalAlpha = p.a * f;
        ctx.fillStyle = rgba(p.c, 1);
        ctx.beginPath();
        ctx.arc(p.x * state.W, p.y * state.H, p.r, 0, PI2);
        ctx.fill();
        ctx.restore();
      });
    }

    function drawTethers(x, y) {
      // faint lines from center out to each active packet — "tethered nodes"
      state.lanes.forEach((lane, i) => {
        const o = ORBITS[i];
        lane.packets.forEach((pk) => {
          const [dx, dy] = pt(o.rx, o.ry, o.tilt, pk.a);
          ctx.save();
          ctx.strokeStyle = rgba(o.col, 0.1);
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + dx, y + dy);
          ctx.stroke();
          ctx.restore();
        });
      });
    }

    function drawPulses(x, y) {
      const pulses = state.pulses;
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const age = state.T - p.startT;
        const life = 46;
        if (age > life) {
          pulses.splice(i, 1);
          continue;
        }
        const f = age / life;
        const r = NUCLEUS_R + f * 55;
        ctx.save();
        ctx.globalAlpha = (1 - f) * 0.5;
        ctx.strokeStyle = rgba(p.col, 1);
        ctx.lineWidth = 1.3 * (1 - f * 0.6);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, PI2);
        ctx.stroke();
        ctx.restore();
      }
    }

    function drawOrbits() {
      const x = cx(), y = cy();
      ORBITS.forEach((o, i) => {
        const lane = state.lanes[i];

        ctx.save();
        ctx.strokeStyle = rgba(o.col, 0.1);
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        for (let j = 0; j <= 200; j++) {
          const a = (j / 200) * PI2;
          const [dx, dy] = pt(o.rx, o.ry, o.tilt, a);
          j === 0 ? ctx.moveTo(x + dx, y + dy) : ctx.lineTo(x + dx, y + dy);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        lane.packets.forEach((pk) => {
          const prevA = pk.a;
          pk.a += o.spd;

          const crossedTop = prevA % PI2 < Math.PI && pk.a % PI2 >= Math.PI;
          if (crossedTop) state.pulses.push({ startT: state.T, col: o.col });

          const [dx, dy] = pt(o.rx, o.ry, o.tilt, pk.a);
          const ex = x + dx, ey = y + dy;

          const hg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 11);
          hg.addColorStop(0, rgba(o.col, 0.5));
          hg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.save();
          ctx.fillStyle = hg;
          ctx.beginPath();
          ctx.arc(ex, ey, 11, 0, PI2);
          ctx.fill();
          ctx.restore();

          ctx.save();
          ctx.translate(ex, ey);
          const sg = ctx.createRadialGradient(-0.6, -0.6, 0, 0, 0, 4);
          sg.addColorStop(0, "rgba(255,255,255,1)");
          sg.addColorStop(0.55, rgba(o.col, 0.9));
          sg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.arc(0, 0, 2.8, 0, PI2);
          ctx.fill();
          ctx.restore();
        });
      });
      drawTethers(x, y);
    }

    function drawNucleus() {
      const x = cx(), y = cy();
      const p = 1 + 0.05 * Math.sin(state.T * 0.03);

      [[120, 0.014], [80, 0.03], [40, 0.08]].forEach(([r, a]) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * p);
        g.addColorStop(0, `rgba(56,189,248,${a * 2})`);
        g.addColorStop(0.5, `rgba(99,102,241,${a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * p, 0, PI2);
        ctx.fill();
        ctx.restore();
      });

      drawPulses(x, y);

      const cg = ctx.createRadialGradient(x - 2, y - 2, 0, x, y, NUCLEUS_R * p);
      cg.addColorStop(0, "rgba(255,255,255,1)");
      cg.addColorStop(0.35, "rgba(186,230,253,1)");
      cg.addColorStop(0.75, "rgba(99,102,241,0.9)");
      cg.addColorStop(1, "rgba(49,46,129,0.4)");
      ctx.save();
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(x, y, NUCLEUS_R * p, 0, PI2);
      ctx.fill();
      ctx.strokeStyle = "rgba(186,230,253,0.25)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(x, y, NUCLEUS_R * 1.8 * p, 0, PI2);
      ctx.stroke();
      ctx.restore();
    }

    function frame() {
      state.T++;
      ctx.clearRect(0, 0, state.W, state.H);
      drawGlow();
      drawDust();
      drawOrbits();
      drawNucleus();
      rafRef.current = requestAnimationFrame(frame);
    }

    if (reduced) {
      ctx.clearRect(0, 0, state.W, state.H);
      drawGlow();
      drawDust();
      drawOrbits();
      drawNucleus();
    } else {
      rafRef.current = requestAnimationFrame(frame);
    }

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);
    let ro;
    if (window.ResizeObserver && canvas.parentElement) {
      ro = new ResizeObserver(() => resize());
      ro.observe(canvas.parentElement);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (ro) ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function Hero() {
  return (
    <section className="relative bg-ink-900 text-paper overflow-hidden pt-36 pb-28 sm:pt-44 sm:pb-36">
      {/* Ledger grid backdrop — signature motif, kept */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(246,245,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(246,245,241,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full blur-[10px]"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 45%, transparent 72%)` }}
      />
      <div
        className="pointer-events-none absolute bottom-[-120px] left-[-140px] h-[380px] w-[380px] rounded-full blur-[90px]"
        style={{ background: `radial-gradient(circle, ${INDIGO} 0%, transparent 70%)` }}
      />

      {/* Animated tethered-node canvas layer */}
      <TetherCanvas />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <div
            className="th-fade inline-flex items-center gap-[7px] mb-8 font-mono text-[11px] uppercase tracking-[0.2em] rounded-full px-4 py-[6px]"
            data-delay="0"
            style={{ color: "#A5B4FC", background: "rgba(99,102,241,0.14)", border: "1px solid rgba(99,102,241,0.3)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full th-dot" style={{ background: "#818CF8" }} />
            Community Funded Web3 Infrastructure
          </div>

          <h1
            className="th-fade font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.1] tracking-tight"
            data-delay="1"
          >
            Empowering{" "}
            <span
              className="th-shimmer bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#6366f1,#a5b4fc,#7dd3fc)",
                backgroundSize: "200% auto",
              }}
            >
              Financial Freedom
            </span>{" "}
            Through Web3 Innovation
          </h1>

          <p className="th-fade mt-6 text-lg sm:text-xl text-paper/70 font-display italic" data-delay="2">
            Fund the infrastructure that powers tomorrow's digital economy.
          </p>

          <p className="th-fade mt-6 text-base leading-relaxed text-paper/60 max-w-2xl" data-delay="3">
            Tethernodes is building a community driven ecosystem where individuals
            can participate in the growth of next generation blockchain technology
            through the stability of USDT  connecting global participants with
            innovative Web3 infrastructure projects.
          </p>

          <div className="th-fade mt-10 flex flex-wrap items-center gap-4" data-delay="4">
            <Link
              to="/signup"
              className="th-cta group relative inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3.5 text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
                boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
              }}
            >
              <span className="th-cta-shine" />
              Launch App
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <a
              href="#about"
              className="inline-flex items-center gap-2 border border-paper/25 hover:border-paper/50 text-paper font-medium rounded-full px-7 py-3.5 transition-colors"
            >
              WhitePaper
            </a>
          </div>

          <div
            className="th-fade mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 font-mono text-xs uppercase tracking-[0.15em] text-paper/40"
            data-delay="5"
          >
            <span>Simple</span>
            <span className="h-1 w-1 rounded-full bg-paper/30" />
            <span>Transparent</span>
            <span className="h-1 w-1 rounded-full bg-paper/30" />
            <span>Global</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes th-fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes th-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes th-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .th-fade {
          opacity: 0;
          animation: th-fadeUp 0.7s cubic-bezier(.22,1,.36,1) forwards;
        }
        .th-fade[data-delay="0"] { animation-delay: .05s; }
        .th-fade[data-delay="1"] { animation-delay: .16s; }
        .th-fade[data-delay="2"] { animation-delay: .28s; }
        .th-fade[data-delay="3"] { animation-delay: .38s; }
        .th-fade[data-delay="4"] { animation-delay: .5s; }
        .th-fade[data-delay="5"] { animation-delay: .62s; }

        .th-shimmer { animation: th-shimmer 3s linear infinite; }
        .th-dot { animation: th-blink 2s ease-in-out infinite; }

        .th-cta { transition: transform .2s ease, box-shadow .2s ease; }
        .th-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 34px rgba(99,102,241,0.45);
        }
        .th-cta-shine {
          position: absolute;
          top: 0;
          left: -40%;
          width: 30%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          pointer-events: none;
          transition: left .6s ease;
        }
        .th-cta:hover .th-cta-shine { left: 130%; }

        @media (prefers-reduced-motion: reduce) {
          .th-fade { animation: none !important; opacity: 1 !important; transform: none !important; }
          .th-shimmer, .th-dot { animation: none !important; }
        }
      `}</style>
    </section>
  );
}