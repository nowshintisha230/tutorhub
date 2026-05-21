"use client";

import React, { useState, useEffect } from "react";
import TutorsCard from "../components/TutorsCard";

const TutorPage = () => {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTutors = async () => {
    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor?${params.toString()}`
      );

      if (!res.ok) {
        console.error("API Error:", res.status);
        return;
      }

      const data = await res.json();
      setTutors(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [search, startDate, endDate]);

  useEffect(() => {
    document.title = search
      ? `Search: ${search} | Tutors`
      : "All Tutors";
  }, [search]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        All Tutors
      </h1>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search tutor by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <div className="flex flex-col">
          <label className="text-sm mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tutors?.map((tutor) => (
          <TutorsCard key={tutor._id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default TutorPage;