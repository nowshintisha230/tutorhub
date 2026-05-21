"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export default function AddTutorPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    document.title = "Add Tutor | Tutor Hub";
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const tutor = {
      tutorName: formData.get("tutorName"),
      photoUrl: formData.get("photoUrl"),
      subject: formData.get("subject"),
      timeSlot: formData.get("timeSlot"),
      hourlyFee: formData.get("hourlyFee"),
      totalSlots: formData.get("totalSlots"),
      startDate: formData.get("startDate"),
      institutionExperience: formData.get("institutionExperience"),
      location: formData.get("location"),
      teachingMode: formData.get("teachingMode"),
      availableDays: formData.getAll("availableDays"),
      addedBy: session?.user?.email ?? "",
    };

    await toast.promise(
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tutor),
      }).then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.message || `Server error: ${res.status}`);
        }
        return res.json();
      }),
      {
        loading: "Adding tutor...",
        success: "Tutor added successfully! 🎉",
        error: (err) => err.message || "Failed to add tutor.",
      }
    );

    setTimeout(() => {
      router.push("/my-tutors");
    }, 1500);
  };

  const inputCls = "border p-2 w-full bg-white dark:bg-zinc-800 text-black dark:text-white rounded";
  const selectCls = "border p-2 w-full bg-white text-black rounded";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Tutor</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <input name="tutorName" placeholder="Tutor Name" className={inputCls} required />
        <input name="photoUrl" placeholder="Photo URL" className={inputCls} required />

        <select name="subject" className={selectCls} required>
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

        <div className="flex flex-wrap gap-3">
          {DAYS.map((day) => (
            <label key={day} className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" name="availableDays" value={day} />
              {day}
            </label>
          ))}
        </div>

        <select name="timeSlot" className={selectCls} required>
          <option value="">Select Time Slot</option>
          <option>6:00 AM – 9:00 AM</option>
          <option>9:00 AM – 12:00 PM</option>
          <option>12:00 PM – 3:00 PM</option>
          <option>3:00 PM – 6:00 PM</option>
          <option>6:00 PM – 9:00 PM</option>
        </select>

        <input type="number" name="hourlyFee" placeholder="Hourly Fee" className={inputCls} required />
        <input type="number" name="totalSlots" placeholder="Total Slots" className={inputCls} required />

        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
            Session Start Date
          </label>
          <input type="date" name="startDate" className={inputCls} required />
        </div>

        <textarea
          name="institutionExperience"
          placeholder="Institution & Experience"
          className={inputCls}
          rows={4}
          required
        />

        <input name="location" placeholder="Location" className={inputCls} required />

        <select name="teachingMode" className={selectCls} required>
          <option value="">Teaching Mode</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="both">Both</option>
        </select>

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition">
          Add Tutor
        </button>
      </form>
    </div>
  );
}