import React from "react";
import { Link } from "react-router-dom";

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.26 10.99H16.17l-5.214-6.817L4.99 21.5H1.68l7.73-8.835L1.5 2.25h6.51l4.713 6.231ZM17.083 19.77h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

function DiscordIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.028C.533 9.09-.32 13.68.099 18.213a.083.083 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .079.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.107c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.727-3.549-13.816a.06.06 0 0 0-.031-.029ZM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.42 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.42 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419Z" />
    </svg>
  );
}

function TelegramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M22.05 3.53 18.77 20.1c-.25 1.09-.9 1.36-1.82.85l-5.02-3.7-2.42 2.33c-.27.27-.5.5-1.01.5l.36-5.12L18 5.9c.4-.36-.09-.56-.62-.2L6.4 12.72l-5.06-1.58c-1.1-.34-1.12-1.1.23-1.63L20.63 2.1c.92-.34 1.72.2 1.42 1.43Z" />
    </svg>
  );
}

const ECOSYSTEM_LINKS = [
  { to: "/about", label: "About Tethernodes" },
  { to: "/ecosystem", label: "How It Works" },
  { to: "/roadmap", label: "Roadmap" },
];

const COMMUNITY_LINKS = [
  { to: "/partners", label: "Partners & Community" },
  { to: "/faq", label: "Newsletter & FAQ" },
];

const SOCIALS = [
  { icon: XIcon, label: "Tethernodes on X" },
  { icon: DiscordIcon, label: "Tethernodes on Discord" },
  { icon: TelegramIcon, label: "Tethernodes on Telegram" },
];

const footerLinkClass =
  "block cursor-pointer py-1 text-sm text-slate-600 hover:text-indigo-500 transition-colors";

const footerHeadingClass =
  "mb-4 font-mono text-[11px] tracking-[0.2em] text-slate-400 uppercase";

const socialButtonClass =
  "grid h-8 w-8 place-items-center rounded-full border-[1.5px] border-slate-200 text-slate-500 transition-colors hover:border-indigo-400 hover:text-indigo-500";

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 pb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/images/logo-black.png"
                alt="Tethernodes"
                className="h-8 w-8 object-contain"
              />
              <span className="font-display text-lg text-slate-900">Tethernodes</span>
            </div>
            <p className="text-slate-500 text-[13px] leading-relaxed max-w-xs">
              Empowering Financial Freedom Through Web3 Innovation.
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <span key={s.label} aria-label={s.label} className={socialButtonClass}>
                  <s.icon />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className={footerHeadingClass}>Ecosystem</h4>
            <ul>
              {ECOSYSTEM_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={footerLinkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={footerHeadingClass}>Community</h4>
            <ul>
              {COMMUNITY_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={footerLinkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={footerHeadingClass}>Contact Us</h4>
            <a
              href="mailto:partnerships@tethernodes.com"
              className="text-sm text-slate-600 hover:text-indigo-500 transition-colors"
            >
              partnerships@tethernodes.com
            </a>
          </div>
        </div>

        <div className="h-px w-full bg-slate-200" />

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[12.5px] text-slate-500">
          <span>© 2026 Tethernodes. All Rights Reserved.</span>
          <span>Simple. Transparent. Global.</span>
        </div>
      </div>
    </footer>
  );
}