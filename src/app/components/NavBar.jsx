"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";

export default function NavBar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Public nav links (always visible)
  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "Tutors", href: "/tutors" },
    { label: "Add Tutor", href: "/add-tutor" },
  ];

  // Authenticated-only nav links
  const authLinks = [
    { label: "My Tutor List", href: "/my-tutors", icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )},
    { label: "Booked Sessions", href: "/my-bookings", icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    )},
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

        .font-sora { font-family: 'Sora', sans-serif; }
        .font-serif-brand { font-family: 'Instrument Serif', serif; }

        /* ── Logo ── */
        .logo-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(34,197,94,0.30);
          flex-shrink: 0;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .logo-icon:hover { transform: scale(1.06); box-shadow: 0 4px 16px rgba(34,197,94,0.42); }

        /* ── Nav links ── */
        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #16a34a;
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover::after { width: 100%; }

        /* ── Auth nav pill links (My Tutor List / Booked Sessions) ── */
        .nav-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 11px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #15803d;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.18);
          transition: all 0.22s ease;
          text-decoration: none;
        }
        .nav-pill:hover {
          background: rgba(34,197,94,0.16);
          border-color: rgba(34,197,94,0.36);
          color: #14532d;
          transform: translateY(-1px);
        }

        /* ── Buttons ── */
        .btn-login {
          background: transparent;
          border: 1.5px solid #16a34a;
          color: #16a34a;
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }
        .btn-login:hover { background: #16a34a; color: #fff; }

        .btn-register {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: #fff;
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          box-shadow: 0 2px 12px rgba(34,197,94,0.28);
        }
        .btn-register:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(34,197,94,0.38);
        }

        .btn-logout {
          background: transparent;
          border: 1.5px solid #dc2626;
          color: #dc2626;
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-logout:hover { background: #dc2626; color: #fff; }

        /* ── Hamburger ── */
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #1c1c1e;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile menu ── */
        .mobile-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
          opacity: 0;
        }
        .mobile-menu.open { max-height: 520px; opacity: 1; }

        /* ── Mobile auth pill ── */
        .mobile-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #15803d;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.20);
          text-decoration: none;
          transition: background 0.2s;
        }
        .mobile-pill:hover { background: rgba(34,197,94,0.16); }

        .mobile-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
          margin: 8px 0;
        }
      `}</style>

      <nav
        className={`font-sora fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_32px_rgba(0,0,0,0.07)]"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        {/* Top accent bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-green-400 via-emerald-300 to-green-600" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[68px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              {/* Icon mark */}
              <div className="logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Graduation cap */}
                  <path d="M12 3L2 8.5L12 14L22 8.5L12 3Z" fill="white" fillOpacity="0.95"/>
                  <path d="M6 11.2V16.5C6 16.5 8.5 19 12 19C15.5 19 18 16.5 18 16.5V11.2L12 14.2L6 11.2Z" fill="white" fillOpacity="0.80"/>
                  <line x1="22" y1="8.5" x2="22" y2="14" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                  <circle cx="22" cy="14.5" r="1" fill="white"/>
                </svg>
              </div>
              {/* Wordmark */}
              <span className="font-serif-brand text-[1.35rem] tracking-tight text-stone-900">
                Tutor<span className="text-green-600">Hub</span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden md:flex items-center gap-7">
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-[0.875rem] font-medium text-stone-600 hover:text-stone-900"
                >
                  {link.label}
                </Link>
              ))}

              {/* Auth-only pill links */}
              {user && authLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-pill">
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── Desktop Auth Controls ── */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Avatar
                    src={user?.image || undefined}
                    name={user?.name || "User"}
                    size="sm"
                  />
                  <span className="text-sm font-medium text-stone-700 max-w-[120px] truncate">
                    {user?.name}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="btn-logout px-5 py-2 rounded-lg"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-login px-5 py-2 rounded-lg">
                    Log In
                  </Link>
                  <Link href="/signup" className="btn-register px-5 py-2 rounded-lg">
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className={`md:hidden hamburger flex flex-col gap-[5px] p-2 rounded-lg ${
                menuOpen ? "open" : ""
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div className={`mobile-menu md:hidden ${menuOpen ? "open" : ""}`}>
          <div className="px-5 py-5 flex flex-col gap-2.5 border-t border-stone-100">

            {/* Public links */}
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[0.9rem] font-medium text-stone-700 hover:text-green-700 py-1"
              >
                {link.label}
              </Link>
            ))}

            {/* Auth-only links */}
            {user && (
              <>
                <div className="mobile-divider" />
                <p className="text-[0.7rem] font-semibold text-stone-400 uppercase tracking-widest">
                  My Account
                </p>
                {authLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="mobile-pill w-fit"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </>
            )}

            <div className="mobile-divider" />

            {/* Auth controls */}
            {user ? (
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <Avatar
                    src={user?.image || ""}
                    name={user?.name || "User"}
                    size="sm"
                  />
                  <span className="text-sm font-medium text-stone-700 max-w-[150px] truncate">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMenuOpen(false);
                  }}
                  className="btn-logout px-3 py-1.5 rounded-lg text-sm"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex gap-3 pt-1">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn-login flex-1 text-center py-2 rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="btn-register flex-1 text-center py-2 rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under the fixed nav */}
      <div className="h-[71px]" />
    </>
  );
}