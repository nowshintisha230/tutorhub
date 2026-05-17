"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const initialFormData = {
  tutorName: "",
  photoUrl: "",
  subject: "",
  availableDays: [],
  timeSlot: "",
  hourlyFee: "",
  totalSlots: "",
  startDate: null,
  institutionExperience: "",
  location: "",
  teachingMode: "",
};

export default function AddTutorPage() {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.availableDays.length === 0) {
      alert("Please select at least one available day.");
      return;
    }
    console.log(formData);
    alert("Tutor submitted successfully!");
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Tutor</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* 1. Tutor Name */}
        <div>
          <label className={labelClass}>Tutor Name</label>
          <input
            name="tutorName"
            value={formData.tutorName}
            onChange={handleChange}
            placeholder="e.g. Rahim Uddin"
            className={inputClass}
            required
          />
        </div>

        {/* 2. Photo URL */}
        <div>
          <label className={labelClass}>Photo (imgbb / postimage link)</label>
          <input
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            placeholder="Paste your image link here"
            className={inputClass}
            required
          />
        </div>

        {/* 3. Subject / Category */}
        <div>
          <label className={labelClass}>Subject / Category</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Select a subject</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
            <option value="english">English</option>
            <option value="programming">Programming</option>
            <option value="bangla">Bangla</option>
            <option value="economics">Economics</option>
          </select>
        </div>

        {/* 4. Available Days + Time Slot */}
        <div>
          <label className={labelClass}>Available Days</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {DAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  formData.availableDays.includes(day)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <label className={labelClass}>Available Time Slot</label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Select a time slot</option>
            <option>6:00 AM – 9:00 AM</option>
            <option>9:00 AM – 12:00 PM</option>
            <option>12:00 PM – 3:00 PM</option>
            <option>3:00 PM – 6:00 PM</option>
            <option>5:00 PM – 8:00 PM</option>
            <option>6:00 PM – 9:00 PM</option>
            <option>7:00 PM – 10:00 PM</option>
          </select>
        </div>

        {/* 5. Hourly Fee */}
        <div>
          <label className={labelClass}>Hourly Fee (BDT)</label>
          <input
            type="number"
            name="hourlyFee"
            value={formData.hourlyFee}
            onChange={handleChange}
            placeholder="e.g. 500"
            min="0"
            className={inputClass}
            required
          />
        </div>

        {/* 6. Total Slots */}
        <div>
          <label className={labelClass}>Total Slots</label>
          <input
            type="number"
            name="totalSlots"
            value={formData.totalSlots}
            onChange={handleChange}
            placeholder="e.g. 10"
            min="1"
            className={inputClass}
            required
          />
        </div>

        {/* 7. Session Start Date */}
        <div>
          <label className={labelClass}>Session Start Date</label>
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => setFormData({ ...formData, startDate: date })}
            minDate={new Date()}
            placeholderText="Pick a start date"
            dateFormat="dd MMM yyyy"
            className={inputClass}
            required
          />
        </div>

        {/* 8. Institution & Experience */}
        <div>
          <label className={labelClass}>Institution & Experience</label>
          <textarea
            name="institutionExperience"
            value={formData.institutionExperience}
            onChange={handleChange}
            placeholder="e.g. BSc in Physics, CUET — 3 years tutoring O & A Level students..."
            rows={4}
            className={inputClass}
            required
          />
        </div>

        {/* 9. Location */}
        <div>
          <label className={labelClass}>Location (Area / City)</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Chittagong"
            className={inputClass}
            required
          />
        </div>

        {/* 10. Teaching Mode */}
        <div>
          <label className={labelClass}>Teaching Mode</label>
          <select
            name="teachingMode"
            value={formData.teachingMode}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Select teaching mode</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="both">Both</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          Submit Tutor
        </button>

      </form>
    </div>
  );
}