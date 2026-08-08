import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/ecosystem", label: "Ecosystem" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/partners", label: "Partners" },
  { to: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const closeMenu = () => setOpen(false);

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/");
  }

  const getActiveLink = () =>
    LINKS.find((l) => (l.to === "/" ? location.pathname === "/" : location.pathname.startsWith(l.to)));

  const measurePill = () => {
    const activeLink = getActiveLink();
    if (!activeLink) {
      setPillStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const el = itemRefs.current[activeLink.to];
    const nav = navRef.current;
    if (!el || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPillStyle({ left: elRect.left - navRect.left, width: elRect.width, opacity: 1 });
  };

  useEffect(() => {
    measurePill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", measurePill);
    return () => window.removeEventListener("resize", measurePill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <style>{`
        /* ── Header shell — white bg, QuantZen style ── */
        .tn-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 12px rgba(99,102,241,0.08);
        }

        .tn-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          height: 68px;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* ── Logo — untouched content/asset, just spacing ── */
        .tn-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
          cursor: pointer;
        }
        .tn-logo img {
          width: 42px;
          height: 42px;
          object-fit: contain;
           filter: brightness(0) saturate(100%) invert(38%) sepia(93%) saturate(1955%) hue-rotate(226deg) brightness(101%) contrast(96%);
        }
        .tn-logo-name {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #111827;
          white-space: nowrap;
        }

        /* ── Desktop nav ── */
        .tn-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          position: relative;
        }
        @media (max-width: 900px) { .tn-nav { display: none; } }

        /* Animated pill under the active link */
        .tn-pill {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 34px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(99,102,241,0.10), rgba(14,165,233,0.10));
          border: 1px solid rgba(99,102,241,0.28);
          pointer-events: none;
          transition: left 0.28s cubic-bezier(0.34,1.26,0.64,1),
                      width 0.28s cubic-bezier(0.34,1.26,0.64,1),
                      opacity 0.18s ease;
          box-shadow: 0 2px 12px rgba(99,102,241,0.14);
        }

        .tn-nav a {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #6b7280;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.18s ease;
          cursor: pointer;
        }
        .tn-nav a:hover { color: #111827; }
        .tn-nav a.active {
          color: #6366f1;
          font-weight: 600;
        }

        /* ── Right-side auth actions ── */
        .tn-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        @media (max-width: 900px) { .tn-actions { display: none; } }

        .tn-hi {
          font-size: 13.5px;
          color: #6b7280;
          white-space: nowrap;
        }

        .tn-link-plain {
          font-size: 13.5px;
          font-weight: 500;
          color: #6b7280;
          text-decoration: none;
          transition: color 0.18s ease;
        }
        .tn-link-plain:hover { color: #111827; }

        .tn-btn-outline {
          display: inline-flex;
          align-items: center;
          padding: 9px 16px;
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 600;
          color: #374151;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          text-decoration: none;
          cursor: pointer;
          transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
        }
        .tn-btn-outline:hover {
          border-color: #6366f1;
          background: rgba(99,102,241,0.06);
          color: #4338ca;
        }

        /* CTA button — gradient, matches QuantZen */
        .tn-cta {
          display: inline-flex;
          align-items: center;
          padding: 9px 18px;
          border-radius: 9px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          color: #fff !important;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(99,102,241,0.30), inset 0 1px 0 rgba(255,255,255,0.14);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .tn-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(99,102,241,0.42), inset 0 1px 0 rgba(255,255,255,0.18);
        }

        /* ── Hamburger — dark lines on white bg, animated X ── */
        .tn-burger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 38px;
          border-radius: 9px;
          border: 1px solid #e5e7eb;
          background: transparent;
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
          padding: 0;
          flex-shrink: 0;
          transition: border-color 0.18s ease, background 0.18s ease;
        }
        .tn-burger:hover {
          border-color: #6366f1;
          background: rgba(99,102,241,0.05);
        }
        @media (max-width: 900px) { .tn-burger { display: flex; } }
        .tn-burger span {
          display: block;
          width: 18px;
          height: 1.8px;
          background: #374151;
          border-radius: 2px;
          transition: transform 0.22s ease, opacity 0.22s ease, width 0.22s ease;
          transform-origin: center;
        }
        .tn-burger.open span { background: #6366f1; }
        .tn-burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .tn-burger.open span:nth-child(2) { opacity: 0; width: 0; }
        .tn-burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile menu — white bg, slide-down ── */
        .tn-mobile-menu {
          display: none;
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease;
          opacity: 0;
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(99,102,241,0.08);
        }
        .tn-mobile-menu.open {
          max-height: 480px;
          opacity: 1;
        }
        @media (max-width: 900px) { .tn-mobile-menu { display: block; } }
        .tn-mobile-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .tn-mobile-menu a {
          display: block;
          padding: 11px 14px;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .tn-mobile-menu a:hover {
          background: rgba(99,102,241,0.07);
          color: #6366f1;
        }
        .tn-mobile-menu a.active {
          background: rgba(99,102,241,0.09);
          color: #6366f1;
          font-weight: 600;
        }
        .tn-mobile-hi {
          padding: 6px 14px 2px;
          font-size: 13px;
          color: #9ca3af;
        }
        .tn-mobile-cta {
          margin-top: 8px;
          display: block;
          padding: 12px 18px;
          border-radius: 10px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          color: #fff !important;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(99,102,241,0.28);
          border: none;
          cursor: pointer;
        }
        .tn-mobile-outline {
          margin-top: 8px;
          display: block;
          width: 100%;
          padding: 12px 18px;
          border-radius: 10px;
          background: #ffffff;
          color: #374151 !important;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          border: 1px solid #e5e7eb;
          cursor: pointer;
        }
      `}</style>

      <header className="tn-header">
        <div className="tn-wrap">
          {/* Logo — unchanged */}
          <Link to="/" className="tn-logo" onClick={closeMenu}>
            <img
              src="/images/logo-black.png"
              alt="Tethernodes"
              className="tn-logo img"
            />
            <span className="tn-logo-name">Tethernodes</span>
          </Link>

          {/* Desktop nav with animated pill */}
          <nav className="tn-nav" ref={navRef} aria-label="Main navigation">
            <span
              className="tn-pill"
              style={{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }}
              aria-hidden="true"
            />
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                ref={(el) => {
                  itemRefs.current[l.to] = el;
                }}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop auth actions */}
          <div className="tn-actions">
            {user ? (
              <>
                <span className="tn-hi">Hi, {user.name?.split(" ")[0] || "there"}</span>
                <button onClick={handleLogout} className="tn-btn-outline">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="tn-link-plain">
                  Log in
                </Link>
                <Link to="/signup" className="tn-cta">
                  Launch App
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={`tn-burger${open ? " open" : ""}`}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`tn-mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="tn-mobile-inner">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {l.label}
            </NavLink>
          ))}

          {user ? (
            <>
              <div className="tn-mobile-hi">Hi, {user.name?.split(" ")[0] || "there"}</div>
              <button onClick={handleLogout} className="tn-mobile-outline">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="tn-mobile-outline">
                Log in
              </Link>
              <Link to="/signup" onClick={closeMenu} className="tn-mobile-cta">
                Launch App
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}