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

  // Close dropdown when clicking outside
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

  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "Tutors", href: "/tutors" },
    { label: "Add Tutor", href: "/add-tutor" },
  ];

  const authLinks = [
    { label: "My Tutor List", href: "/my-tutors" },
    { label: "Booked Sessions", href: "/my-bookings" },
  ];

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-md"
          : "bg-white dark:bg-black"
      }`}
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
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Tutor<span className="text-green-600">Hub</span>
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-6">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-900 dark:text-white font-medium hover:text-green-600 transition"
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
            <button onClick={toggleTheme} className="text-xl ml-2">
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
          </div>

          {/* USER AREA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* PROFILE DROPDOWN */}
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
                    {/* Small chevron indicator */}
                    <svg
                      className={`w-3 h-3 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                        profileDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* DROPDOWN MENU */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      {/* User info header */}
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email}
                        </p>
                      </div>

                      {/* Profile link */}
                      <Link
                        href="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-zinc-800 hover:text-green-600 transition"
                      >
                        <span>👤</span> My Profile
                      </Link>

                      {/* Divider */}
                      <div className="my-1 border-t border-gray-100 dark:border-zinc-800" />

                      {/* Logout */}
                      <button
                        onClick={() => {
                          authClient.signOut();
                          setProfileDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-zinc-800 transition"
                      >
                        <span>🚪</span> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
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

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-900 dark:text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-5 pb-5 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-gray-900 dark:text-white"
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
                className="block py-2 text-green-600"
              >
                {link.label}
              </Link>
            ))}

          {/* Mobile profile link */}
          {user && (
            <>
              <div className="flex items-center gap-3 py-3 border-t border-gray-200 dark:border-gray-800 mt-2">
                <img
                  src={user?.image}
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover border-2 border-green-500"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
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
                onClick={() => {
                  authClient.signOut();
                  setMenuOpen(false);
                }}
                className="block py-2 text-red-500"
              >
                🚪 Logout
              </button>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="mt-3 text-xl text-gray-900 dark:text-white"
          >
            {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}