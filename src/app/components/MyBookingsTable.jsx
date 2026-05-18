"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const MyBookingsTable = ({ bookings }) => {
  const [bookingData, setBookingData] = useState(bookings);

  const handleCancel = async (id) => {
    const confirmDelete = confirm("Are you sure you want to cancel?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/bookings/${id}`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
      const updatedBookings = bookingData.map((booking) =>
        booking._id === id ? { ...booking, status: "cancelled" } : booking
      );
      setBookingData(updatedBookings);
      toast.success("Booking cancelled");
    }
  };

  const getStatusBadge = (status) => {
    const s = status || "confirmed";
    const styles = {
      confirmed: "bg-green-100 text-green-700 border border-green-300",
      cancelled: "bg-red-100 text-red-700 border border-red-300",
      pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles[s] || "bg-gray-100 text-gray-600"}`}>
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
                <td className="px-5 py-4 font-medium text-gray-500">{index + 1}</td>
                <td className="px-5 py-4 font-semibold text-gray-800">{booking.tutorName}</td>
                <td className="px-5 py-4 text-gray-700">{booking.studentName}</td>
                <td className="px-5 py-4 text-gray-500">{booking.studentEmail}</td>
                <td className="px-5 py-4">{getStatusBadge(booking.status)}</td>
                <td className="px-5 py-4 text-center">
                  <button
                    disabled={booking.status === "cancelled"}
                    onClick={() => handleCancel(booking._id)}
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

      <div className="flex flex-col gap-4 md:hidden">
        {bookingData.map((booking, index) => (
          <div key={booking._id} className="border rounded-xl p-4 shadow-sm bg-base-100">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">#{index + 1} {booking.tutorName}</span>
              {getStatusBadge(booking.status)}
            </div>
            <p className="text-sm text-gray-500">👤 {booking.studentName}</p>
            <p className="text-sm text-gray-500">✉️ {booking.studentEmail}</p>
            <button
              disabled={booking.status === "cancelled"}
              onClick={() => handleCancel(booking._id)}
              className="btn btn-error btn-sm mt-3 w-full disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsTable;