"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const learningLinks = [
    { label: "Find a Tutor", href: "/tutors" },
    { label: "Browse Subjects", href: "/subjects" },
    { label: "Online Sessions", href: "/online-sessions" },
    { label: "Group Classes", href: "/group-classes" },
    { label: "Become a Tutor", href: "/become-tutor" },
    { label: "Pricing & Plans", href: "/pricing" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      label: "Twitter / X",
      href: "https://twitter.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: "https://youtube.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58a2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
        .font-sora { font-family: 'Sora', sans-serif; }
        .font-serif-brand { font-family: 'Instrument Serif', serif; }

        .footer-link {
          position: relative;
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .footer-link:hover {
          color: #22c55e;
          padding-left: 6px;
        }

        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #9ca3af;
          transition: all 0.22s ease;
        }
        .social-btn:hover {
          background: #16a34a;
          border-color: #16a34a;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(22,163,74,0.35);
        }

        .footer-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .newsletter-input {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: white;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .newsletter-input::placeholder { color: #6b7280; }
        .newsletter-input:focus { border-color: #16a34a; }
      `}</style>

      <footer className="font-sora bg-[#0f1a12] text-stone-300">

        {/* Top wave accent */}
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,0 L0,0 Z" fill="#f0fdf4" fillOpacity="0.04"/>
          </svg>
        </div>

        {/* Green top line */}
        <div className="h-[3px] bg-gradient-to-r from-green-500 via-emerald-400 to-green-600" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-8">

          {/* Main grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* ── Column 1: Brand + Newsletter ── */}
            <div className="lg:col-span-1 flex flex-col gap-5">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group w-fit">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md shadow-green-900/40 group-hover:scale-105 transition-transform duration-200">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6C12 6 9 4.5 5 4.5V18C9 18 12 19.5 12 19.5C12 19.5 15 18 19 18V4.5C15 4.5 12 6 12 6Z" fill="white" fillOpacity="0.25"/>
                    <path d="M12 6V19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 4.5V18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M19 4.5V18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 4.5C9 4.5 12 6 12 6C12 6 15 4.5 19 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 18C9 18 12 19.5 12 19.5C12 19.5 15 18 19 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M7 9.5C8.5 9.2 10 9.3 11 9.7" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.8"/>
                    <path d="M7 12C8.5 11.7 10 11.8 11 12.2" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.8"/>
                    <path d="M13 9.7C14 9.3 15.5 9.2 17 9.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.8"/>
                    <path d="M13 12.2C14 11.8 15.5 11.7 17 12" stroke="white" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.8"/>
                  </svg>
                </div>
                <span className="font-serif-brand text-[1.3rem] tracking-tight text-white leading-none">
                  Tutor<span className="text-green-400">Hub</span>
                </span>
              </Link>

              <p className="text-sm text-stone-400 leading-relaxed">
                Connecting learners with expert tutors. Quality education, flexible schedules, and real results — all in one place.
              </p>

              {/* Newsletter */}
              <div className="mt-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2.5">Newsletter</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="newsletter-input flex-1 min-w-0 text-sm px-3 py-2 rounded-lg"
                  />
                  <button className="flex-shrink-0 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* ── Column 2: Learning Services ── */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-5">Learning Services</p>
              <ul className="flex flex-col gap-3">
                {learningLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link text-sm text-stone-400 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Column 3: Company ── */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-5">Company</p>
              <ul className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link text-sm text-stone-400 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Column 4: Contact ── */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-5">Contact Us</p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-green-500 flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span className="text-sm text-stone-400 leading-relaxed">123 Learning Lane,<br/>Chittagong, Bangladesh</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </span>
                  <a href="tel:+8801700000000" className="text-sm text-stone-400 hover:text-green-400 transition-colors">+880 1700-000000</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <a href="mailto:hello@tutorhub.com" className="text-sm text-stone-400 hover:text-green-400 transition-colors">hello@tutorhub.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </span>
                  <span className="text-sm text-stone-400">Sun – Thu: 9am – 7pm</span>
                </li>
              </ul>

              {/* Social links */}
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-3">Follow Us</p>
                <div className="flex gap-2 flex-wrap">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="social-btn"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Divider */}
          <hr className="footer-divider my-8" />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
            <p>© {currentYear} <span className="text-green-500 font-medium">TutorHub</span>. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link>
              <span className="text-stone-700">·</span>
              <Link href="/terms" className="hover:text-green-400 transition-colors">Terms of Service</Link>
              <span className="text-stone-700">·</span>
              <Link href="/cookies" className="hover:text-green-400 transition-colors">Cookies</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}