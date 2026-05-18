"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const MyBookingsTable = ({ bookings }) => {
  const [bookingData, setBookingData] = useState(bookings);

  const handleCancel = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to cancel?"
    );

    if (!confirmDelete) {
      return;
    }

    const res = await fetch(
      `http://localhost:5000/bookings/${id}`,
      {
        method: "PATCH",
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      const updatedBookings = bookingData.map((booking) =>
        booking._id === id
          ? { ...booking, status: "cancelled" }
          : booking
      );

      setBookingData(updatedBookings);

      toast.success("Booking cancelled");
    }
  };

  if (bookingData.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">
          No bookings available
        </h2>

        <p className="text-gray-500">
          You haven’t booked any sessions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border">
        <thead className="bg-base-200">
          <tr>
            <th>Tutor Name</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookingData.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.tutorName}</td>

              <td>{booking.studentName}</td>

              <td>{booking.studentEmail}</td>

              <td>
                <span
                  className={`badge ${
                    booking.status === "cancelled"
                      ? "badge-error"
                      : "badge-success"
                  }`}
                >
                  {booking.status}
                </span>
              </td>

              <td>
                <button
                  disabled={booking.status === "cancelled"}
                  onClick={() =>
                    handleCancel(booking._id)
                  }
                  className="btn btn-error btn-sm"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookingsTable;