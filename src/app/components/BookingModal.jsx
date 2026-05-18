"use client";

import React from "react";

const BookingModal = ({ isOpen, onOpenChange, tutor }) => {
  if (!isOpen) return null;

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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Phone Number</label>
            <input
              type="text"
              placeholder="017XXXXXXXX"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Tutor ID</label>
            <input
              type="text"
              value={tutor?._id || ""}
              readOnly
              className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
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
              value="student@gmail.com"
              readOnly
              className="w-full border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Booking Status</label>
            <input
              type="text"
              value="Pending"
              readOnly
              className="w-full border border-yellow-300 bg-yellow-50 rounded-lg px-3 py-2 text-sm text-yellow-600 cursor-not-allowed"
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
          <button className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 text-sm font-medium transition">
            Confirm Booking
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookingModal;