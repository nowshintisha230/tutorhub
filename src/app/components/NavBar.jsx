"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { useTheme } from "next-themes";

export default function NavBar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { theme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-md"
          : "bg-white dark:bg-black"}
      `}
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
            <button
              onClick={toggleTheme}
              className="text-xl ml-2"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
          </div>

          {/* USER AREA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Avatar src={user?.image || undefined} size="sm" />

                <span className="text-sm text-gray-900 dark:text-white font-medium">
                  {user?.name}
                </span>

                <button
                  onClick={() => authClient.signOut()}
                  className="px-4 py-1 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
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