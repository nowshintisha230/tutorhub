"use client"

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
        style: {
          borderRadius: "12px",
          background: "#16a34a",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#16a34a",
        },
        duration: 3000,
      });
      setTimeout(() => router.push("/"), 1500);
    }

    if (error) {
      toast.error(error.message || "Login failed. Please try again.", {
        style: {
          borderRadius: "12px",
          background: "#dc2626",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#dc2626",
        },
        duration: 4000,
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
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
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
      </div>
    </div>
  );
};

export default LogInPage;