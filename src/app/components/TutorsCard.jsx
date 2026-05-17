import Image from "next/image";
import React from "react";

const TutorsCard = ({ tutor }) => {
  const {
    tutorName,
    photoUrl,
    subject,
    timeSlot,
    hourlyFee,
    startDate,
    location,
    teachingMode,
  } = tutor;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">

      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={photoUrl}
          alt={tutorName}
          width={400}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">

        {/* Name + Subject (FIXED RESPONSIVE) */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-800 break-words">
            {tutorName}
          </h2>

          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full w-fit">
            {subject}
          </span>
        </div>

        {/* Info */}
        <p className="text-sm text-gray-500">
          📍 {location}
        </p>

        <p className="text-sm text-gray-500">
          🕒 {timeSlot}
        </p>

        <p className="text-sm text-gray-500">
          🎓 Mode: {teachingMode}
        </p>

        <p className="text-sm text-gray-500">
          📅 Start: {startDate}
        </p>

        {/* Bottom Row */}
        <div className="flex justify-between items-center pt-2">
          <p className="text-green-600 font-bold text-lg">
            ৳{hourlyFee}/hr
          </p>
        </div>

      </div>
    </div>
  );
};

export default TutorsCard;