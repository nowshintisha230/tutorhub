"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LogInPage = () => {
  const router = useRouter();

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
      setTimeout(() => router.push("/"), 1500);
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
      const result = await authClient.signIn.social({
        provider: "google",
      });

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

      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      toast.dismiss(loadingToast);

      toast.error(error?.message || "Google login failed.", {
        style: { borderRadius: "12px", background: "#dc2626", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#dc2626" },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-5">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
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
          <div className="flex-1 h-px bg-gray-200" />
          <p className="text-sm text-gray-400 font-medium">or</p>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-50 transition-all duration-200 group"
        >
          <FcGoogle size={22} />
          <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default LogInPage;