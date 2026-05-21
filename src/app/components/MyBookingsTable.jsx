"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const MyBookingsTable = ({ bookings }) => {
  const [bookingData, setBookingData] = useState(bookings);
  const [selectedId, setSelectedId] = useState(null);

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
    document.getElementById("cancel_modal").close();
  };

  const openModal = (id) => {
    setSelectedId(id);
    document.getElementById("cancel_modal").showModal();
  };

  const getStatusBadge = (status) => {
    const s = status || "confirmed";
    const styles = {
      confirmed: "bg-green-100 text-green-700 border border-green-300",
      cancelled: "bg-red-100 text-red-700 border border-red-300",
      pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
          styles[s] || "bg-gray-100 text-gray-600"
        }`}
      >
        {s}
      </span>
    );
  };

  if (bookingData.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">No bookings available</h2>
        <p className="text-gray-500">You haven't booked any sessions yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-md border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-green-600 text-white text-sm uppercase tracking-wide">
              <th className="px-5 py-4">#</th>
              <th className="px-5 py-4">Tutor Name</th>
              <th className="px-5 py-4">Student Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((booking, index) => (
              <tr
                key={booking._id}
                className={`border-b transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-50`}
              >
                <td className="px-5 py-4 font-medium text-gray-500">
                  {index + 1}
                </td>
                <td className="px-5 py-4 font-semibold text-gray-800">
                  {booking.tutorName}
                </td>
                <td className="px-5 py-4 text-gray-700">
                  {booking.studentName}
                </td>
                <td className="px-5 py-4 text-gray-500">
                  {booking.studentEmail}
                </td>
                <td className="px-5 py-4">{getStatusBadge(booking.status)}</td>
                <td className="px-5 py-4 text-center">
                  <button
                    disabled={booking.status === "cancelled"}
                    onClick={() => openModal(booking._id)}
                    className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {/* Mobile Header */}
        <div className="bg-green-600 text-white rounded-xl px-4 py-3 grid grid-cols-3 text-xs font-bold uppercase tracking-wide">
          <span>#&nbsp;Tutor</span>
          <span className="text-center">Status</span>
          <span className="text-right">Action</span>
        </div>

        {bookingData.map((booking, index) => (
          <div
            key={booking._id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-base">
                #{index + 1} {booking.tutorName}
              </span>
              {getStatusBadge(booking.status)}
            </div>
            <p className="text-sm text-gray-500 mb-1">
              👤 <span className="font-medium">{booking.studentName}</span>
            </p>
            <p className="text-sm text-gray-500 mb-3">
              ✉️ {booking.studentEmail}
            </p>
            <button
              disabled={booking.status === "cancelled"}
              onClick={() => openModal(booking._id)}
              className="w-full py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <dialog id="cancel_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Cancel Booking</h3>
          <p className="py-4 text-gray-600">
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </p>
          <div className="modal-action">
            <button
              onClick={() => {
                setSelectedId(null);
                document.getElementById("cancel_modal").close();
              }}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              No, Keep it
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyBookingsTable;