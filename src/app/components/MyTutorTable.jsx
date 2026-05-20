"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const MyTutorTable = ({ tutors }) => {
  const [tutorData, setTutorData] = useState(tutors);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this tutor?");
    if (!confirmDelete) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
      setTutorData(tutorData.filter((tutor) => tutor._id !== id));
      toast.success("Tutor deleted successfully");
    }
  };

  if (tutorData.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">No tutors found</h2>
        <p className="text-gray-500">You haven't added any tutors yet.</p>
        <Link href="/add-tutor">
          <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Add Tutor
          </button>
        </Link>
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
              <th className="px-5 py-4">Photo</th>
              <th className="px-5 py-4">Tutor Name</th>
              <th className="px-5 py-4">Subject</th>
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4">Mode</th>
              <th className="px-5 py-4">Fee</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tutorData.map((tutor, index) => (
              <tr
                key={tutor._id}
                className={`border-b transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-50`}
              >
                <td className="px-5 py-4 font-medium text-gray-500">{index + 1}</td>
                <td className="px-5 py-4">
                  <img
                    src={tutor.photoUrl}
                    alt={tutor.tutorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-5 py-4 font-semibold text-gray-800">{tutor.tutorName}</td>
                <td className="px-5 py-4 text-gray-700">{tutor.subject}</td>
                <td className="px-5 py-4 text-gray-500">{tutor.location}</td>
                <td className="px-5 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-300 capitalize">
                    {tutor.teachingMode}
                  </span>
                </td>
                <td className="px-5 py-4 font-bold text-green-700">${tutor.hourlyFee}</td>
                <td className="px-5 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <Link href={`/tutors/${tutor._id}`}>
                      <button className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(tutor._id)}
                      className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {tutorData.map((tutor, index) => (
          <div key={tutor._id} className="border rounded-xl p-4 shadow-sm bg-base-100">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={tutor.photoUrl}
                alt={tutor.tutorName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-lg">{tutor.tutorName}</p>
                <p className="text-sm text-gray-500">{tutor.subject}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">📍 {tutor.location}</p>
            <p className="text-sm text-gray-500">🎓 {tutor.teachingMode}</p>
            <p className="text-sm font-bold text-green-700 mt-1">💵 ${tutor.hourlyFee} / session</p>
            <div className="flex gap-2 mt-3">
              <Link href={`/tutors/${tutor._id}`} className="flex-1">
                <button className="w-full px-3 py-2 rounded-lg text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition">
                  View
                </button>
              </Link>
              <button
                onClick={() => handleDelete(tutor._id)}
                className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTutorTable;