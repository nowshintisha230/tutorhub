"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

// ─── Update Form (separate component so state resets on each open) ─────────────
const UpdateForm = ({ tutor, onClose, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState(tutor.availableDays ?? []);

  const toggleDay = (day) =>
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const updated = {
      tutorName: fd.get("tutorName"),
      photoUrl: fd.get("photoUrl"),
      subject: fd.get("subject"),
      timeSlot: fd.get("timeSlot"),
      hourlyFee: fd.get("hourlyFee"),
      totalSlots: fd.get("totalSlots"),
      startDate: fd.get("startDate"),
      institutionExperience: fd.get("institutionExperience"),
      location: fd.get("location"),
      teachingMode: fd.get("teachingMode"),
      availableDays: selectedDays, // ✅ use controlled state, not FormData
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${tutor._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );
      const data = await res.json();

      if (res.ok) {
        onSaved({ ...tutor, ...updated });
        toast.success("Tutor updated successfully! 🎉");
        onClose();
      } else {
        toast.error(data?.message || "Failed to update tutor");
      }
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "border p-2 w-full bg-white dark:bg-zinc-800 text-black dark:text-white rounded text-sm";
  const selectCls =
    "border p-2 w-full bg-white dark:bg-zinc-800 text-black dark:text-white rounded text-sm";

  return (
    // ✅ backdrop: click outside to close
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Update Tutor
        </h2>

        {/* ✅ Plain form — no nested <form> inside anything */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="tutorName"
            defaultValue={tutor.tutorName}
            placeholder="Tutor Name"
            className={inputCls}
            required
          />
          <input
            name="photoUrl"
            defaultValue={tutor.photoUrl}
            placeholder="Photo URL"
            className={inputCls}
            required
          />

          <select
            name="subject"
            defaultValue={tutor.subject}
            className={selectCls}
            required
          >
            <option value="">Select Subject</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
            <option value="english">English</option>
            <option value="programming">Programming</option>
            <option value="bangla">Bangla</option>
            <option value="economics">Economics</option>
          </select>

          {/* ✅ Controlled checkboxes — no stale defaultChecked bug */}
          <div className="flex flex-wrap gap-3">
            {DAYS.map((day) => (
              <label
                key={day}
                className="flex items-center gap-1 cursor-pointer text-sm dark:text-white"
              >
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => toggleDay(day)}
                />
                {day}
              </label>
            ))}
          </div>

          <select
            name="timeSlot"
            defaultValue={tutor.timeSlot}
            className={selectCls}
            required
          >
            <option value="">Select Time Slot</option>
            <option>6:00 AM – 9:00 AM</option>
            <option>9:00 AM – 12:00 PM</option>
            <option>12:00 PM – 3:00 PM</option>
            <option>3:00 PM – 6:00 PM</option>
            <option>6:00 PM – 9:00 PM</option>
          </select>

          <input
            type="number"
            name="hourlyFee"
            defaultValue={tutor.hourlyFee}
            placeholder="Hourly Fee"
            className={inputCls}
            required
          />
          <input
            type="number"
            name="totalSlots"
            defaultValue={tutor.totalSlots}
            placeholder="Total Slots"
            className={inputCls}
            required
          />

          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Session Start Date
            </label>
            <input
              type="date"
              name="startDate"
              defaultValue={tutor.startDate?.split("T")[0]}
              className={inputCls}
              required
            />
          </div>

          <textarea
            name="institutionExperience"
            defaultValue={tutor.institutionExperience}
            placeholder="Institution & Experience"
            className={inputCls}
            rows={3}
            required
          />

          <input
            name="location"
            defaultValue={tutor.location}
            placeholder="Location"
            className={inputCls}
            required
          />

          <select
            name="teachingMode"
            defaultValue={tutor.teachingMode}
            className={selectCls}
            required
          >
            <option value="">Teaching Mode</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="both">Both</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const MyTutorTable = ({ tutors }) => {
  const [tutorData, setTutorData] = useState(tutors);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false); // ✅ prevent double-click
  const [updateTutor, setUpdateTutor] = useState(null);

  // ✅ Delete with loading guard
  const handleDelete = async () => {
    if (deleteLoading) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${deleteId}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.deletedCount > 0) {
        setTutorData((prev) => prev.filter((t) => t._id !== deleteId));
        toast.success("Tutor deleted successfully");
      } else {
        toast.error("Failed to delete tutor");
      }
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setDeleteId(null);
      setDeleteLoading(false);
    }
  };

  // ✅ Called by UpdateForm after a successful save
  const handleSaved = (updatedTutor) => {
    setTutorData((prev) =>
      prev.map((t) => (t._id === updatedTutor._id ? updatedTutor : t))
    );
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
    <>
      <div className="w-full">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-2xl shadow-md border border-gray-200 dark:border-zinc-700">
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
                  className={`border-b dark:border-zinc-700 transition-colors duration-150 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-zinc-900"
                      : "bg-gray-50 dark:bg-zinc-800"
                  } hover:bg-green-50 dark:hover:bg-zinc-700`}
                >
                  <td className="px-5 py-4 font-medium text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4">
                    <img
                      src={tutor.photoUrl}
                      alt={tutor.tutorName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-5 py-4 font-semibold text-gray-800 dark:text-white">
                    {tutor.tutorName}
                  </td>
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    {tutor.subject}
                  </td>
                  <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                    {tutor.location}
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-300 capitalize dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700">
                      {tutor.teachingMode}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-green-700 dark:text-green-400">
                    ${tutor.hourlyFee}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link href={`/tutors/${tutor._id}`}>
                        <button className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition">
                          View
                        </button>
                      </Link>
                      <button
                        onClick={() => setUpdateTutor(tutor)}
                        className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-yellow-400 text-white hover:bg-yellow-500 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setDeleteId(tutor._id)}
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
          {tutorData.map((tutor) => (
            <div
              key={tutor._id}
              className="border dark:border-zinc-700 rounded-xl p-4 shadow-sm bg-white dark:bg-zinc-900"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={tutor.photoUrl}
                  alt={tutor.tutorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-lg dark:text-white">{tutor.tutorName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{tutor.subject}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">📍 {tutor.location}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">🎓 {tutor.teachingMode}</p>
              <p className="text-sm font-bold text-green-700 dark:text-green-400 mt-1">
                💵 ${tutor.hourlyFee} / session
              </p>
              <div className="flex gap-2 mt-3">
                <Link href={`/tutors/${tutor._id}`} className="flex-1">
                  <button className="w-full px-3 py-2 rounded-lg text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition">
                    View
                  </button>
                </Link>
                <button
                  onClick={() => setUpdateTutor(tutor)}
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-yellow-400 text-white hover:bg-yellow-500 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => setDeleteId(tutor._id)}
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => !deleteLoading && setDeleteId(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              Delete Tutor
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Are you sure you want to delete this tutor? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Update Modal — key prop forces full remount on each tutor, fixing stale checkbox state */}
      {updateTutor && (
        <UpdateForm
          key={updateTutor._id}
          tutor={updateTutor}
          onClose={() => setUpdateTutor(null)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
};

export default MyTutorTable;