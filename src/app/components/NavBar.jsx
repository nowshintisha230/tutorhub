"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";

export default function NavBar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { theme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // ✅ KEY FIX: use isDark from actual theme value, not CSS dark: classes
  const isDark = mounted ? theme === "dark" : false;

  // Dynamic colors based on theme
  const navBg = isDark ? "#09090b" : "#ffffff";
  const navBorder = isDark ? "#27272a" : "#f3f4f6";
  const textPrimary = isDark ? "#ffffff" : "#111827";
  const textMuted = isDark ? "#a1a1aa" : "#6b7280";
  const menuBg = isDark ? "#09090b" : "#ffffff";
  const menuBorder = isDark ? "#27272a" : "#e5e7eb";

  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "Tutors", href: "/tutors" },
    { label: "Add Tutor", href: "/add-tutor" },
  ];

  const authLinks = [
    { label: "My Tutor List", href: "/my-tutors" },
    { label: "Booked Sessions", href: "/my-bookings" },
  ];

  return (
    <nav
      style={{
        backgroundColor: navBg,
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none",
        borderBottom: scrolled ? `1px solid ${navBorder}` : "none",
        transition: "background-color 0.3s, box-shadow 0.3s",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* TOP BAR */}
      <div className="h-[3px] bg-gradient-to-r from-green-400 via-emerald-300 to-green-600" />

      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-[70px]">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-600 text-white font-bold">
              📖
            </div>
            <span className="text-xl font-bold" style={{ color: textPrimary }}>
              Tutor<span className="text-green-600">Hub</span>
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-6">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium hover:text-green-600 transition"
                style={{ color: textPrimary }}
              >
                {link.label}
              </Link>
            ))}

            {user &&
              authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-green-600 font-medium hover:text-green-700"
                >
                  {link.label}
                </Link>
              ))}

            {/* THEME TOGGLE */}
            {mounted && (
              <button onClick={toggleTheme} className="text-xl ml-2">
                {isDark ? "🌞" : "🌙"}
              </button>
            )}
          </div>

          {/* USER AREA - DESKTOP */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img
                    src={user?.image}
                    alt="user"
                    className="w-9 h-9 rounded-full object-cover border-2 border-green-500 hover:border-green-400 transition cursor-pointer"
                  />
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`}
                    style={{ color: textMuted }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 rounded-xl shadow-xl py-1 z-50"
                    style={{
                      backgroundColor: menuBg,
                      border: `1px solid ${menuBorder}`,
                    }}
                  >
                    <div
                      className="px-4 py-3"
                      style={{ borderBottom: `1px solid ${menuBorder}` }}
                    >
                      <p className="text-sm font-semibold truncate" style={{ color: textPrimary }}>
                        {user?.name}
                      </p>
                      <p className="text-xs truncate" style={{ color: textMuted }}>
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:text-green-600 transition"
                      style={{ color: isDark ? "#e4e4e7" : "#374151" }}
                    >
                      <span>👤</span> My Profile
                    </Link>

                    <div style={{ borderTop: `1px solid ${menuBorder}`, margin: "4px 0" }} />

                    <button
                      onClick={() => { authClient.signOut(); setProfileDropdownOpen(false); }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1 rounded border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
            style={{ color: textPrimary }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="md:hidden px-5 pb-5"
          style={{
            backgroundColor: menuBg,
            borderTop: `1px solid ${menuBorder}`,
          }}
        >
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 font-medium hover:text-green-600 transition"
              style={{ color: textPrimary }}
            >
              {link.label}
            </Link>
          ))}

          {user &&
            authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-green-600 font-medium"
              >
                {link.label}
              </Link>
            ))}

          {/* Mobile: logged-in */}
          {user ? (
            <>
              <div
                className="flex items-center gap-3 py-3 mt-2"
                style={{ borderTop: `1px solid ${menuBorder}` }}
              >
                <img
                  src={user?.image}
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover border-2 border-green-500"
                />
                <div>
                  <p className="text-sm font-semibold" style={{ color: textPrimary }}>
                    {user?.name}
                  </p>
                  <p className="text-xs" style={{ color: textMuted }}>
                    {user?.email}
                  </p>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-green-600 font-medium"
              >
                👤 My Profile
              </Link>
              <button
                onClick={() => { authClient.signOut(); setMenuOpen(false); }}
                className="block py-2 text-red-500"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            // Login & Register for mobile when logged out
            <div
              className="flex flex-col gap-2 mt-3 pt-3"
              style={{ borderTop: `1px solid ${menuBorder}` }}
            >
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center px-4 py-2 rounded border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="block text-center px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile theme toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="mt-3 text-xl"
              style={{ color: textPrimary }}
            >
              {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          )}
        </div>
      )}
    </nav>
  );
}