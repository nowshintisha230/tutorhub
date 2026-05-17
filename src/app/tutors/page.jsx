import React from "react";
import TutorsCard from "../components/TutorsCard";

const TutorPage = async () => {
  const res = await fetch("http://localhost:5000/tutor", {
    cache: "no-store",
  });

  const tutors = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        All Tutors
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tutors?.map((tutor) => (
          <TutorsCard key={tutor._id} tutor={tutor} />
        ))}
      </div>

    </div>
  );
};

export default TutorPage;