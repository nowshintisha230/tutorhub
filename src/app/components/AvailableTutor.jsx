"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AvailableTutor() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/tutor")
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <section className="py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Available Tutors</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <div key={tutor._id} className="border rounded-xl shadow p-5">
            <img
              src={tutor.photoUrl}
              alt={tutor.tutorName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{tutor.tutorName}</h3>
            <p className="text-gray-500">{tutor.subject}</p>
            <p className="text-gray-400 text-sm mt-1">{tutor.location} • {tutor.teachingMode}</p>
            <p className="font-bold mt-2">${tutor.hourlyFee} / session</p>

            <Link href={`/tutors/${tutor._id}`}>
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                Book Session
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}