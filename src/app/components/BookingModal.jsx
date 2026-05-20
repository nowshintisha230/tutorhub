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

      if (!res.ok) {
        toast.error(data.message || "Something went wrong.");
        return;
      }

      if (data.insertedId) {
        toast.success("Booking confirmed successfully! 🎉");
        onBookingSuccess && onBookingSuccess();
        onOpenChange(false);
      }
    } catch (error) {
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
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Book Session</h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Student Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Phone Number</label>
            <input
              type="text"
              placeholder="017XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Tutor Name</label>
            <input
              type="text"
              value={tutor?.tutorName || ""}
              readOnly
              className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Student Email</label>
            <input
              type="text"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Subject</label>
            <input
              type="text"
              value={tutor?.subject || ""}
              readOnly
              className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed capitalize"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Available Slots</label>
            <input
              type="text"
              value={`${tutor?.totalSlots} Slots Remaining`}
              readOnly
              className="w-full border border-green-200 bg-green-50 rounded-lg px-3 py-2 text-sm text-green-600 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-lg text-red-500 border border-red-300 hover:bg-red-50 text-sm font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;