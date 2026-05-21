"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BookingModal = ({ isOpen, onOpenChange, tutor, onBookingSuccess }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [studentName, setStudentName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleBooking = async () => {
    if (!studentName || !phone) {
      toast.error("Please fill in all fields.");
      return;
    }

    const bookingData = {
      studentName,
      phone,
      studentEmail: user?.email,
      tutorId: tutor?._id,
      tutorName: tutor?.tutorName,
      subject: tutor?.subject,
    };

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      console.log("Server error details:", data);

      if (!res.ok) {
        toast.error(data.error || data.message || JSON.stringify(data));
        return;
      }

      if (data.insertedId) {
        toast.success("Booking confirmed successfully! 🎉");
        onBookingSuccess && onBookingSuccess();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 bg-white dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Book Session
        </h2>

        <div className="flex flex-col gap-3">
          {[
            {
              label: "Student Name",
              value: studentName,
              onChange: (e) => setStudentName(e.target.value),
              placeholder: "Enter your name",
              readOnly: false,
            },
            {
              label: "Phone Number",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "017XXXXXXXX",
              readOnly: false,
            },
          ].map(({ label, value, onChange, placeholder, readOnly }) => (
            <div key={label}>
              <label className="text-sm mb-1 block text-gray-700 dark:text-gray-300">
                {label}
              </label>
              <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm
                           bg-white dark:bg-gray-800
                           text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          {[
            { label: "Tutor Name", value: tutor?.tutorName || "" },
            { label: "Student Email", value: user?.email || "" },
            { label: "Subject", value: tutor?.subject || "" },
          ].map(({ label, value }) => (
            <div key={label}>
              <label className="text-sm mb-1 block text-gray-700 dark:text-gray-300">
                {label}
              </label>
              <input
                type="text"
                value={value}
                readOnly
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm
                           bg-gray-100 dark:bg-gray-700
                           text-gray-600 dark:text-gray-300
                           cursor-not-allowed capitalize"
              />
            </div>
          ))}

          <div>
            <label className="text-sm mb-1 block text-gray-700 dark:text-gray-300">
              Available Slots
            </label>
            <input
              type="text"
              value={`${tutor?.totalSlots} Slots Remaining`}
              readOnly
              className="w-full border border-green-300 dark:border-green-700 rounded-lg px-3 py-2 text-sm
                         bg-green-50 dark:bg-green-900/30
                         text-green-700 dark:text-green-400
                         cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition
                       text-red-500 border border-red-300 dark:border-red-600
                       hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-medium transition
                       bg-green-500 hover:bg-green-600 text-white
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;