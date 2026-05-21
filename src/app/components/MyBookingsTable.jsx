"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const MyBookingsTable = ({ bookings }) => {
  const [bookingData, setBookingData] = useState(bookings);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${selectedId}`,
      { method: "PATCH" }
    );
    const data = await res.json();
    if (data.modifiedCount > 0) {
      setBookingData((prev) =>
        prev.map((booking) =>
          booking._id === selectedId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
      toast.success("Booking cancelled successfully");
    }
    setSelectedId(null);
    setIsModalOpen(false);
  };

  const openModal = (id) => { setSelectedId(id); setIsModalOpen(true); };
  const closeModal = () => { setSelectedId(null); setIsModalOpen(false); };

  const statusConfig = {
    confirmed: {
      wrap: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
      dot: "bg-emerald-500",
    },
    cancelled: {
      wrap: "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300",
      dot: "bg-red-500",
    },
    pending: {
      wrap: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
      dot: "bg-amber-500",
    },
  };

  const getStatusBadge = (status) => {
    const s = status || "confirmed";
    const c = statusConfig[s] || {
      wrap: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      dot: "bg-gray-400",
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.wrap}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        {s.charAt(0).toUpperCase() + s.slice(1)}
      </span>
    );
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const avatarColors = [
    "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300",
    "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300",
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
  ];

  if (bookingData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-5">
          <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No bookings yet</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
          You haven&apos;t booked any sessions yet. Browse tutors to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookingData.map((booking, index) => (
          <div
            key={booking._id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 flex flex-col gap-4"
          >
            {/* Top */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatarColors[index % avatarColors.length]}`}>
                  {getInitials(booking.tutorName)}
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-0.5">Tutor</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                    {booking.tutorName}
                  </p>
                </div>
              </div>
              {getStatusBadge(booking.status)}
            </div>

            <hr className="border-gray-100 dark:border-gray-800" />

            {/* Fields */}
            <div className="flex flex-col gap-2.5">
              <div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1 mb-0.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Student
                </p>
                <p className="text-sm text-gray-800 dark:text-gray-200">{booking.studentName}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1 mb-0.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </p>
                <p className="text-sm text-gray-800 dark:text-gray-200 break-all">{booking.studentEmail}</p>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-gray-800" />

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300 dark:text-gray-600 font-medium">
                #{String(index + 1).padStart(2, "0")}
              </span>
              <button
                disabled={booking.status === "cancelled"}
                onClick={() => openModal(booking._id)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold
                  bg-red-50 text-red-700 border border-red-200
                  dark:bg-red-950 dark:text-red-300 dark:border-red-800
                  hover:bg-red-100 dark:hover:bg-red-900
                  active:scale-95 transition-all duration-150
                  disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-600 mt-4 text-right">
        {bookingData.length} booking{bookingData.length !== 1 ? "s" : ""} total
      </p>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 dark:bg-red-950 mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center mb-1">
              Cancel booking?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
              This action cannot be undone. The session slot will be released back to the tutor.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold
                  border border-gray-200 dark:border-gray-700
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-50 dark:hover:bg-gray-800
                  transition-all duration-150"
              >
                Keep it
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold
                  bg-red-500 hover:bg-red-600 text-white
                  transition-all duration-150"
              >
                Yes, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsTable;