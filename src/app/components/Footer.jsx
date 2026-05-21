"use client";

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

  const socials = [
    {
      label: "Facebook",
      href: "https://facebook.com",
      path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
      filled: false,
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z",
      filled: false,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
      filled: false,
    },
    {
      label: "X (Twitter)",
      href: "https://x.com",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.928l4.27 5.647 4.796-5.647z",
      filled: true,
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Logo Section */}
          <div className="md:col-span-1">
            <a href="/" className="inline-flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-sm">
                📖
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Tutor<span className="text-green-500">Hub</span>
              </span>
            </a>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              Connecting learners with expert tutors worldwide.
            </p>

            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-green-500 hover:border-green-500 transition-all duration-200"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={s.filled ? "currentColor" : "none"}
                    stroke={s.filled ? "none" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-colors"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Learning + Company — 2 col on mobile, separate cols on md+ */}
          <div className="grid grid-cols-2 gap-8 md:contents">

            {/* Learning Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                Learning
              </p>
              <ul className="space-y-3">
                {learningLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                Company
              </p>
              <ul className="space-y-3">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* CTA Section */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
              Get Started
            </p>
            <div className="bg-green-50 dark:bg-green-950 rounded-xl p-5 border border-green-100 dark:border-green-900">
              <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
                Find your tutor today
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                Join thousands of students learning with TutorHub.
              </p>
              <a
                href="/tutors"
                className="block text-center text-sm font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition-colors"
              >
                Browse Tutors
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {currentYear} TutorHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-xs text-gray-400 dark:text-gray-500 hover:text-green-500 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-xs text-gray-400 dark:text-gray-500 hover:text-green-500 transition-colors">
              Terms
            </a>
            <a href="/cookies" className="text-xs text-gray-400 dark:text-gray-500 hover:text-green-500 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}