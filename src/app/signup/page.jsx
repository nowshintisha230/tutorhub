"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");

  // Password validation function
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return ""; // valid
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Validate before calling API
    const error = validatePassword(user.password);
    if (error) {
      setPasswordError(error);
      return; // Stop here, don't register
    }

    setPasswordError(""); // Clear any previous error

    const { data, error: authError } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.photoURL,
    });

    if (data) {
      toast.success("Registration successful! Welcome 🎉", {
        style: { borderRadius: "12px", background: "#16a34a", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#16a34a" },
        duration: 3000,
      });
      setTimeout(() => router.push("/"), 1500);
    }

    if (authError) {
      toast.error(authError.message || "Registration failed. Please try again.", {
        style: { borderRadius: "12px", background: "#dc2626", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#dc2626" },
        duration: 4000,
      });
    }
  };

  const handleGoogleSignin = async () => {
    const loadingToast = toast.loading("Redirecting to Google...");
    try {
      const result = await authClient.signIn.social({ provider: "google" });
      toast.dismiss(loadingToast);
      if (result?.error) {
        toast.error("Google login failed. Try again.", {
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
          Register Now
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Enter photo URL"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password field with error */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              onChange={() => setPasswordError("")} // Clear error when typing
              className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 ${
                passwordError
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {/* 👇 Error message shown here */}
            {passwordError && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                ⚠️ {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-xl"
          >
            Register
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400 font-medium">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          onClick={handleGoogleSignin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group"
        >
          <FcGoogle size={22} />
          <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
            Sign up with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;