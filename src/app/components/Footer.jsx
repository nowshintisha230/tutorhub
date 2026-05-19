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
      label: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: "https://youtube.com",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58a2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98" fill="white" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-white dark:bg-black text-gray-700 dark:text-gray-300 transition-colors">

      {/* top line */}
      <div className="h-[3px] bg-gradient-to-r from-green-500 via-emerald-400 to-green-600" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="text-xl font-bold text-black dark:text-white">
                Tutor<span className="text-green-500">Hub</span>
              </span>
            </Link>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connecting learners with expert tutors.
            </p>
          </div>

          {/* Learning */}
          <div>
            <h3 className="font-semibold mb-4 text-black dark:text-white">Learning</h3>
            <div className="flex flex-col gap-2 text-sm">
              {learningLinks.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-green-500">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-black dark:text-white">Company</h3>
            <div className="flex flex-col gap-2 text-sm">
              {companyLinks.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-green-500">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-black dark:text-white">Follow Us</h3>

            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-500 hover:text-white transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between text-xs gap-3">
          <p>
            © {currentYear} <span className="text-green-500">TutorHub</span>
          </p>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-green-500">Privacy</Link>
            <Link href="/terms" className="hover:text-green-500">Terms</Link>
            <Link href="/cookies" className="hover:text-green-500">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}