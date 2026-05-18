"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Tutors", href: "/tutors" },
    { label: "Add Tutor", href: "/add-tutor" },
  ];

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

        .font-sora { font-family: 'Sora', sans-serif; }
        .font-serif-brand { font-family: 'Instrument Serif', serif; }

        .nav-link {
          position: relative;
        }
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

        .btn-login {
          background: transparent;
          border: 1.5px solid #16a34a;
          color: #16a34a;
          transition: all 0.25s ease;
        }
        .btn-login:hover {
          background: #16a34a;
          color: #fff;
        }

        .btn-register {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: #fff;
          transition: all 0.25s ease;
          box-shadow: 0 2px 12px rgba(34,197,94,0.28);
        }
        .btn-register:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(34,197,94,0.38);
        }

        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #1c1c1e;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .mobile-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
          opacity: 0;
        }
        .mobile-menu.open {
          max-height: 400px;
          opacity: 1;
        }


      `}</style>

      <nav
        className={`font-sora fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_32px_rgba(0,0,0,0.07)]"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        {/* Top accent line */}
        <div className="h-[3px] w-full bg-gradient-to-r from-green-400 via-emerald-300 to-green-600" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[68px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              {/* Icon mark */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md shadow-green-200 group-hover:scale-105 transition-transform duration-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  {/* Open book */}
                  <path d="M12 6C12 6 9 4.5 5 4.5V18C9 18 12 19.5 12 19.5C12 19.5 15 18 19 18V4.5C15 4.5 12 6 12 6Z" fill="white" fillOpacity="0.25"/>
                  <path d="M12 6V19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M5 4.5V18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M19 4.5V18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M5 4.5C9 4.5 12 6 12 6C12 6 15 4.5 19 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M5 18C9 18 12 19.5 12 19.5C12 19.5 15 18 19 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  {/* Lines on left page */}
                  <path d="M7 9.5C8.5 9.2 10 9.3 11 9.7" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.8"/>
                  <path d="M7 12C8.5 11.7 10 11.8 11 12.2" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.8"/>
                  {/* Lines on right page */}
                  <path d="M13 9.7C14 9.3 15.5 9.2 17 9.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.8"/>
                  <path d="M13 12.2C14 11.8 15.5 11.7 17 12" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.8"/>
                </svg>
              </div>
              {/* Brand name */}
              <span className="font-serif-brand text-[1.35rem] tracking-tight text-stone-900 leading-none">
                Tutor<span className="text-green-600">Hub</span>
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-[0.875rem] font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </Link>
              ))}


            </div>

            {/* ── Desktop Auth Buttons ── */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="btn-login font-sora text-sm font-semibold px-5 py-2 rounded-lg"
              >
                Log In
              </Link>
              <Link
                href={"/signup"}
                className="btn-register font-sora text-sm font-semibold px-5 py-2 rounded-lg"
              >
                Register
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className={`md:hidden hamburger flex flex-col gap-[5px] p-2 rounded-lg hover:bg-stone-100 transition-colors ${menuOpen ? "open" : ""}`}
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
        <div className={`mobile-menu md:hidden border-t border-stone-100 ${menuOpen ? "open" : ""}`}>
          <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-700 hover:bg-green-50 hover:text-green-700 font-medium text-sm transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}



            {/* Auth buttons */}
            <div className="flex gap-3 pt-3 mt-1">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="btn-login font-sora flex-1 text-center text-sm font-semibold px-4 py-2.5 rounded-xl"
              >
                Log In
              </Link>
              <Link
                href={"/signup"}
                onClick={() => setMenuOpen(false)}
                className="btn-register font-sora flex-1 text-center text-sm font-semibold px-4 py-2.5 rounded-xl"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer so page content isn't hidden under fixed nav */}
      <div className="h-[71px]" />
    </>
  );
}