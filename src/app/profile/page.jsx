"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ✅ Dynamic Title
import Head from "next/head";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [user, isPending]);

  if (!mounted || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <>
      {/* ✅ Dynamic Page Title */}
      <title>{user?.name ? `${user.name}'s Profile — TutorHub` : "Profile — TutorHub"}</title>

      <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* HEADER CARD */}
          <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden mb-6">
            {/* Green banner */}
            <div className="h-24 bg-gradient-to-r from-green-500 via-emerald-400 to-green-600" />

            {/* Avatar */}
            <div className="absolute top-10 left-6">
              <img
                src={user?.image || "/default-avatar.png"}
                alt={user?.name}
                className="w-20 h-20 rounded-full border-4 border-white dark:border-zinc-900 object-cover shadow-md"
              />
            </div>

            <div className="pt-14 px-6 pb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {user?.email}
              </p>
              <span className="inline-block mt-2 text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium">
                ✅ Verified Member
              </span>
            </div>
          </div>

          {/* INFO CARD */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg px-6 py-5 mb-6">
            <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
              Account Info
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-800">
                <span className="text-sm text-gray-500 dark:text-gray-400">Full Name</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-zinc-800">
                <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.email}</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Member Since</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{joinedDate}</span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Link
              href="/my-tutors"
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg px-5 py-5 flex flex-col gap-2 hover:shadow-xl hover:border-green-500 border border-transparent transition group"
            >
              <span className="text-2xl">📚</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-600 transition">
                My Tutor List
              </span>
              <span className="text-xs text-gray-400">View saved tutors</span>
            </Link>

            <Link
              href="/my-bookings"
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg px-5 py-5 flex flex-col gap-2 hover:shadow-xl hover:border-green-500 border border-transparent transition group"
            >
              <span className="text-2xl">🗓️</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-green-600 transition">
                Booked Sessions
              </span>
              <span className="text-xs text-gray-400">View your bookings</span>
            </Link>
          </div>

          {/* LOGOUT */}
          <button
            onClick={() => {
              authClient.signOut();
              router.push("/");
            }}
            className="w-full py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium transition"
          >
            🚪 Logout
          </button>

        </div>
      </main>
    </>
  );
}