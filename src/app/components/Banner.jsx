"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const slides = [
  {
    id: 1,
    badge: "🎓 Expert-Led Learning",
    headline: "Learn From the\nBest Tutors",
    highlight: "Best Tutors",
    sub: "Connect with verified, passionate tutors across 50+ subjects. One-on-one sessions tailored to your pace, your goals, your future.",
    stat1: { value: "2,400+", label: "Expert Tutors" },
    stat2: { value: "98%", label: "Satisfaction Rate" },
    bg: "from-[#0a1f0e] via-[#0f2d14] to-[#0a1a0c]",
    bgLight: "from-[#f0fdf4] via-[#dcfce7] to-[#f0fdf4]",
    accentColor: "#16a34a",
    accentColorLight: "#15803d",
    pattern: "circles",
    floatingIcon: (color) => (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
        <path d="M12 6C12 6 9 4.5 5 4.5V18C9 18 12 19.5 12 19.5C12 19.5 15 18 19 18V4.5C15 4.5 12 6 12 6Z" fill={color} fillOpacity="0.2"/>
        <path d="M12 6V19.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 4.5V18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M19 4.5V18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 4.5C9 4.5 12 6 12 6C12 6 15 4.5 19 4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 18C9 18 12 19.5 12 19.5C12 19.5 15 18 19 18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 9.5C8.5 9.2 10 9.3 11 9.7" stroke={color} strokeWidth="1" strokeLinecap="round"/>
        <path d="M7 12C8.5 11.7 10 11.8 11 12.2" stroke={color} strokeWidth="1" strokeLinecap="round"/>
        <path d="M13 9.7C14 9.3 15.5 9.2 17 9.5" stroke={color} strokeWidth="1" strokeLinecap="round"/>
        <path d="M13 12.2C14 11.8 15.5 11.7 17 12" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    badge: "⚡ Flexible Scheduling",
    headline: "Study Anytime,\nAnywhere You Are",
    highlight: "Anywhere You Are",
    sub: "Online or in-person sessions that fit your schedule. Morning, evening, weekends — your learning never has to stop.",
    stat1: { value: "50+", label: "Subjects Available" },
    stat2: { value: "24/7", label: "Session Booking" },
    bg: "from-[#0c1a2e] via-[#0f2340] to-[#091628]",
    bgLight: "from-[#eff6ff] via-[#dbeafe] to-[#eff6ff]",
    accentColor: "#34d399",
    accentColorLight: "#059669",
    pattern: "dots",
    floatingIcon: (color) => (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" fill={color} fillOpacity="0.08"/>
        <polyline points="12 6 12 12 16 14"/>
        <path d="M16 2l2 2-2 2" strokeOpacity="0.6"/>
      </svg>
    ),
  },
  {
    id: 3,
    badge: "🏆 Proven Results",
    headline: "Achieve Your\nAcademic Goals",
    highlight: "Academic Goals",
    sub: "From school exams to university entrance tests — our tutors help students boost grades, build confidence, and unlock potential.",
    stat1: { value: "15,000+", label: "Students Helped" },
    stat2: { value: "4.9★", label: "Average Rating" },
    bg: "from-[#1a0f0a] via-[#2d1a0a] to-[#1a0f08]",
    bgLight: "from-[#fff7ed] via-[#ffedd5] to-[#fff7ed]",
    accentColor: "#86efac",
    accentColorLight: "#16a34a",
    pattern: "grid",
    floatingIcon: (color) => (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
        <path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 3.5l1 1-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    badge: "💡 Smart Matching",
    headline: "Find Your Perfect\nTutor Match",
    highlight: "Perfect\nTutor Match",
    sub: "Our intelligent matching system pairs you with the right tutor based on subject, learning style, budget, and availability.",
    stat1: { value: "3 min", label: "Avg. Match Time" },
    stat2: { value: "Free", label: "First Consultation" },
    bg: "from-[#0f0f1a] via-[#14142e] to-[#0a0a1a]",
    bgLight: "from-[#faf5ff] via-[#ede9fe] to-[#faf5ff]",
    accentColor: "#4ade80",
    accentColorLight: "#7c3aed",
    pattern: "hexagons",
    floatingIcon: (color) => (
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" fill={color} fillOpacity="0.08"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <path d="M8 11h6M11 8v6" strokeOpacity="0.7"/>
      </svg>
    ),
  },
];

const PatternBg = ({ type, color }) => {
  if (type === "circles") return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circles" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1"/>
          <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circles)"/>
    </svg>
  );
  if (type === "dots") return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.5" fill={color}/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)"/>
    </svg>
  );
  if (type === "grid") return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color} strokeWidth="0.8"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>
    </svg>
  );
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hex" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
          <polygon points="28,2 54,16 54,44 28,58 2,44 2,16" fill="none" stroke={color} strokeWidth="1"/>
          <polygon points="28,52 54,66 54,94 28,108 2,94 2,66" fill="none" stroke={color} strokeWidth="1"/>
          <polygon points="0,27 26,41 26,69 0,83" fill="none" stroke={color} strokeWidth="1"/>
          <polygon points="56,27 82,41 82,69 56,83" fill="none" stroke={color} strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)"/>
    </svg>
  );
};

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === "dark";

  const goTo = useCallback((index, dir = "next") => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 500);
  }, [animating]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = slides[current];

  // Pick colors based on theme
  const accent = isDark ? slide.accentColor : slide.accentColorLight;

  const renderHeadline = (headline, highlight) => {
    return headline.split("\n").map((line, i) => {
      const isHighlight = highlight.split("\n").some(h => line.includes(h));
      return (
        <span key={i} className="block">
          {isHighlight
            ? <span style={{ color: accent }}>{line}</span>
            : line}
        </span>
      );
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
        .font-sora { font-family: 'Sora', sans-serif; }
        .font-serif-display { font-family: 'Instrument Serif', serif; }

        .slide-enter-next { animation: slideInRight 0.5s cubic-bezier(0.4,0,0.2,1) forwards; }
        .slide-enter-prev { animation: slideInLeft 0.5s cubic-bezier(0.4,0,0.2,1) forwards; }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .content-reveal { animation: revealUp 0.65s cubic-bezier(0.4,0,0.2,1) both; }
        .content-reveal-1 { animation-delay: 0.05s; }
        .content-reveal-2 { animation-delay: 0.15s; }
        .content-reveal-3 { animation-delay: 0.25s; }
        .content-reveal-4 { animation-delay: 0.35s; }
        .content-reveal-5 { animation-delay: 0.45s; }

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .float-icon { animation: floatBob 4s ease-in-out infinite; }
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-12px) rotate(3deg); }
        }

        .glow-ring { animation: glowPulse 3s ease-in-out infinite; }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%       { opacity: 0.3;  transform: scale(1.05); }
        }

        .arrow-btn {
          width: 48px; height: 48px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }

        .dot-btn {
          height: 4px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }

        .progress-bar {
          height: 2px;
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 2px;
          animation: progressAnim 5s linear infinite;
        }
        @keyframes progressAnim {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      <section
        className={`relative w-full overflow-hidden transition-all duration-700`}
        style={{ minHeight: "88vh" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* BG */}
        <div
          key={`bg-${current}-${theme}`}
          className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 ${
            isDark ? slide.bg : slide.bgLight
          }`}
        />

        {/* Pattern */}
        <PatternBg type={slide.pattern} color={accent} />

        {/* Radial glow */}
        <div
          className="glow-ring absolute top-1/2 right-1/4 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: "600px", height: "600px",
            background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          }}
        />

        {/* CONTENT */}
        <div className="font-sora relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center min-h-[88vh]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-20">

            {/* Left */}
            <div key={`text-${current}-${theme}`} className="flex flex-col gap-6">

              {/* Badge */}
              <div className="content-reveal content-reveal-1">
                <span
                  className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
                  style={{
                    background: `${accent}18`,
                    border: `1px solid ${accent}40`,
                    color: accent,
                  }}
                >
                  {slide.badge}
                </span>
              </div>

              {/* Headline */}
              <h1
                className="content-reveal content-reveal-2 font-serif-display text-5xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight"
                style={{ color: isDark ? "#ffffff" : "#111827" }}
              >
                {renderHeadline(slide.headline, slide.highlight)}
              </h1>

              {/* Sub */}
              <p
                className="content-reveal content-reveal-3 text-base sm:text-lg leading-relaxed max-w-lg"
                style={{ color: isDark ? "#a8a29e" : "#4b5563" }}
              >
                {slide.sub}
              </p>

              {/* CTAs */}
              <div className="content-reveal content-reveal-4 flex flex-wrap gap-3 mt-2">
                <Link
                  href="/tutors"
                  className="font-sora text-sm px-6 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
                    color: "#ffffff",
                    boxShadow: `0 4px 20px ${accent}40`,
                  }}
                >
                  Browse Tutors
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
                <a
                  href="#how-it-works"
                  className="font-sora text-sm px-6 py-3.5 rounded-xl font-medium inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                    color: isDark ? "rgba(255,255,255,0.85)" : "#374151",
                    border: isDark ? "1px solid rgba(255,255,255,0.15)" : `1px solid ${accent}40`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  How It Works
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="10 8 14 12 10 16"/>
                  </svg>
                </a>
              </div>

              {/* Stats */}
              <div className="content-reveal content-reveal-5 flex gap-4 mt-2 flex-wrap">
                {[slide.stat1, slide.stat2].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl px-5 py-3.5 transition-colors duration-200"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                      border: isDark ? "1px solid rgba(255,255,255,0.1)" : `1px solid ${accent}30`,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <p className="text-2xl font-bold" style={{ color: isDark ? "#ffffff" : "#111827" }}>
                      {stat.value}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: isDark ? "#a8a29e" : "#6b7280" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Icon visual */}
            <div key={`icon-${current}`} className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    width: "340px", height: "340px",
                    border: `1px solid ${accent}20`,
                    transform: "translate(-50%, -50%)",
                    top: "50%", left: "50%",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    width: "240px", height: "240px",
                    border: `1px solid ${accent}30`,
                    transform: "translate(-50%, -50%)",
                    top: "50%", left: "50%",
                    background: `${accent}08`,
                  }}
                />
                <div
                  className="float-icon relative z-10 w-36 h-36 rounded-3xl flex items-center justify-center"
                  style={{
                    background: `${accent}12`,
                    border: `1.5px solid ${accent}30`,
                    boxShadow: `0 20px 60px ${accent}25`,
                  }}
                >
                  <div style={{ transform: "scale(1.8)" }}>
                    {slide.floatingIcon(accent)}
                  </div>
                </div>
                {[0, 90, 180, 270].map((deg, i) => (
                  <div
                    key={i}
                    className="absolute w-2.5 h-2.5 rounded-full"
                    style={{
                      background: accent,
                      opacity: 0.4,
                      top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 120}px - 5px)`,
                      left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 120}px - 5px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-6">

            {/* Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? "next" : "prev")}
                  className="dot-btn"
                  style={{
                    width: i === current ? "32px" : "12px",
                    background: i === current ? accent : (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"),
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Progress + Arrows */}
            <div className="flex items-center gap-4">
              <div
                className="progress-bar w-24 hidden sm:block"
                key={`progress-${current}`}
                style={{ background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" }}
              >
                {!paused && (
                  <div
                    className="progress-fill"
                    style={{ background: `linear-gradient(90deg, ${accent}, ${accent}99)` }}
                  />
                )}
              </div>

              <span
                className="text-xs font-medium tabular-nums hidden sm:block"
                style={{ color: isDark ? "#78716c" : "#6b7280" }}
              >
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>

              <div className="flex gap-2">
                {[prev, next].map((fn, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    className="arrow-btn"
                    aria-label={i === 0 ? "Previous" : "Next"}
                    style={{
                      background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                      border: isDark ? "1px solid rgba(255,255,255,0.12)" : `1px solid ${accent}30`,
                      color: isDark ? "white" : "#374151",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${accent}30`;
                      e.currentTarget.style.borderColor = `${accent}70`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
                      e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.12)" : `${accent}30`;
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {i === 0
                        ? <polyline points="15 18 9 12 15 6"/>
                        : <polyline points="9 18 15 12 9 6"/>
                      }
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Big watermark number */}
        <div
          className="absolute bottom-0 right-0 font-serif-display text-[200px] leading-none select-none pointer-events-none"
          style={{ color: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.04)" }}
        >
          {String(current + 1).padStart(2, "0")}
        </div>
      </section>
    </>
  );
}