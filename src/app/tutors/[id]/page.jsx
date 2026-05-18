"use client";

import Image from "next/image";
import React, { useEffect, useState, use } from "react";

import BookingModal from "@/app/components/BookingModal";

const TutorsDetailsPage = ({ params }) => {
  const { id } = use(params);

  const [tutor, setTutor] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);

  const onOpenChange = () => setIsOpen(false);

  useEffect(() => {
    const fetchTutor = async () => {
      const res = await fetch(`http://localhost:5000/tutor/${id}`);
      const data = await res.json();
      setTutor(data);
    };
    fetchTutor();
  }, [id]);

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  const {
    tutorName,
    photoUrl,
    subject,
    timeSlot,
    hourlyFee,
    totalSlots,
    startDate,
    institutionExperience,
    location,
    teachingMode,
    availableDays,
  } = tutor;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

        {/* Image */}
        <div className="relative w-full h-[350px]">
          <Image
            src={photoUrl}
            alt={tutorName}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{tutorName}</h1>
              <p className="text-gray-500 mt-1">Expert {subject} Tutor</p>
            </div>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              {subject}
            </span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">📍 Location</p>
              <h3 className="font-semibold text-gray-800 mt-1">{location}</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">🎓 Teaching Mode</p>
              <h3 className="font-semibold text-gray-800 mt-1 capitalize">{teachingMode}</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">🕒 Time Slot</p>
              <h3 className="font-semibold text-gray-800 mt-1">{timeSlot}</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">📅 Start Date</p>
              <h3 className="font-semibold text-gray-800 mt-1">{startDate}</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">💰 Hourly Fee</p>
              <h3 className="font-semibold text-green-600 text-xl mt-1">৳{hourlyFee}/hr</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">📚 Total Slots</p>
              <h3 className="font-semibold text-gray-800 mt-1">{totalSlots} Slots</h3>
            </div>

          </div>

          {/* Experience */}
          <div className="bg-blue-50 rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">🏫 Institution Experience</h2>
            <p className="text-gray-600">{institutionExperience}</p>
          </div>

          {/* Available Days */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">📆 Available Days</h2>
            <div className="flex flex-wrap gap-3">
              {availableDays?.map((day, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={onOpen}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition"
          >
            Book Session
          </button>

          {/* Booking Modal */}
          <BookingModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            tutor={tutor}
          />

        </div>
      </div>
    </div>
  );
};

export default TutorsDetailsPage;