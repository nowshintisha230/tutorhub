"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const LogInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("Login successful! Welcome back 👋", {
        style: { borderRadius: "12px", background: "#16a34a", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#16a34a" },
        duration: 3000,
      });
      setTimeout(() => router.push(callbackUrl), 1500);
    }

    if (error) {
      toast.error(error.message || "Login failed. Please try again.", {
        style: { borderRadius: "12px", background: "#dc2626", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#dc2626" },
        duration: 4000,
      });
    }
  };

  const handleGoogleLogin = async () => {
    const loadingToast = toast.loading("Signing in with Google...");
    try {
      const result = await authClient.signIn.social({ provider: "google" });
      toast.dismiss(loadingToast);

      if (result?.error) {
        toast.error("Google login failed. Please try again.", {
          style: { borderRadius: "12px", background: "#dc2626", color: "#fff" },
          iconTheme: { primary: "#fff", secondary: "#dc2626" },
        });
        return;
      }

      toast.success("Google login successful 🎉", {
        style: { borderRadius: "12px", background: "#16a34a", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#16a34a" },
        duration: 3000,
      });
      setTimeout(() => router.push(callbackUrl), 1500);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error?.message || "Google login failed.", {
        style: { borderRadius: "12px", background: "#dc2626", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#dc2626" },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-3 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-5">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Login
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />

            <div className="text-right mt-2">
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-sm text-green-600 hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-xl"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
          <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">or</p>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-xl py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
        >
          <FcGoogle size={22} />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
            Continue with Google
          </span>
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-green-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Forgot Password
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              This feature is currently not available.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 text-sm mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotEmail("");
                }}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Close
              </button>

              <button
                type="button"
                disabled
                className="flex-1 py-2.5 rounded-xl bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-sm font-semibold cursor-not-allowed"
              >
                Disabled
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogInPage;