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

  const openModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedId(null);
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    const s = status || "confirmed";
    const config = {
      confirmed: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border border-emerald-200",
        dot: "bg-emerald-500",
      },
      cancelled: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border border-red-200",
        dot: "bg-red-500",
      },
      pending: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border border-amber-200",
        dot: "bg-amber-500",
      },
    };
    const c = config[s] || {
      bg: "bg-gray-50",
      text: "text-gray-600",
      border: "border border-gray-200",
      dot: "bg-gray-400",
    };
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text} ${c.border}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        {s.charAt(0).toUpperCase() + s.slice(1)}
      </span>
    );
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarColors = [
    "bg-violet-100 text-violet-700",
    "bg-sky-100 text-sky-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-pink-100 text-pink-700",
  ];

  if (bookingData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No bookings yet
        </h3>
        <p className="text-gray-500 text-sm max-w-xs">
          You haven&apos;t booked any sessions yet. Browse tutors to get
          started.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-green-600 to-emerald-500">
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Tutor Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {bookingData.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-gray-400 font-medium text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                          avatarColors[index % avatarColors.length]
                        }`}
                      >
                        {getInitials(booking.tutorName)}
                      </div>
                      <span className="font-medium text-gray-900">
                        {booking.tutorName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {booking.studentName}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {booking.studentEmail}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      disabled={booking.status === "cancelled"}
                      onClick={() => openModal(booking._id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3 text-right">
          {bookingData.length} booking{bookingData.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Mobile Table */}
      <div className="md:hidden">
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="bg-gradient-to-r from-green-600 to-emerald-500">
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Tutor Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {bookingData.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-gray-400 font-medium text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                          avatarColors[index % avatarColors.length]
                        }`}
                      >
                        {getInitials(booking.tutorName)}
                      </div>
                      <span className="font-medium text-gray-900 text-xs whitespace-nowrap">
                        {booking.tutorName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-xs whitespace-nowrap">
                    {booking.studentName}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {booking.studentEmail}
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      disabled={booking.status === "cancelled"}
                      onClick={() => openModal(booking._id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3 text-right">
          {bookingData.length} booking{bookingData.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto mb-4">
              <svg
                className="w-7 h-7 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-1">
              Cancel booking?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              This action cannot be undone. The session slot will be released
              back to the tutor.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-150"
              >
                Keep it
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-all duration-150"
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