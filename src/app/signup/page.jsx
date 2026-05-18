"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Avatar } from "@heroui/react";
import { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const [photoURL, setPhotoURL] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: photoURL || "",
    });

    if (data) {
      toast.success("Registration successful! Welcome 🎉", {
        style: { borderRadius: "12px", background: "#16a34a", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#16a34a" },
        duration: 3000,
      });
      setTimeout(() => router.push("/"), 1500);
    }

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.", {
        style: { borderRadius: "12px", background: "#dc2626", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#dc2626" },
        duration: 4000,
      });
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
      });

      if (error) {
        toast.error(error.message || "Google sign-in failed", {
          style: { borderRadius: "12px", background: "#dc2626", color: "#fff" },
          iconTheme: { primary: "#fff", secondary: "#dc2626" },
          duration: 4000,
        });
        return;
      }

      toast.success("Google login successful 🎉", {
        style: { borderRadius: "12px", background: "#16a34a", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#16a34a" },
        duration: 3000,
      });

      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      toast.error(err.message || "Something went wrong", {
        style: { borderRadius: "12px", background: "#dc2626", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#dc2626" },
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-5">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register Now
        </h2>

        {/* Avatar Preview */}
        <div className="flex flex-col items-center mb-6">
          <Avatar src={photoURL} name="User" size="lg" className="mb-2" />
          <p className="text-xs text-gray-400">
            Avatar preview (Google or URL based)
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

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
              Avatar URL (optional)
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Paste image URL"
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
              placeholder="Enter password"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
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
          <span className="text-sm text-gray-400 font-medium">
            or continue with
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          onClick={handleGoogleSignin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-50"
        >
          <FcGoogle size={22} />
          <span className="text-sm font-semibold text-gray-700">
            Sign up with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;