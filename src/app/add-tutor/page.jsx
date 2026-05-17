"use client";

const DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export default function AddTutorPage() {
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
    };

    console.log(tutor);
const res =await fetch('http://localhost:5000/tutor',{
    method:'POST',
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify(tutor)
})
const data=await res.json()
console.log(data)

  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Tutor</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Tutor Name */}
        <input
          name="tutorName"
          placeholder="Tutor Name"
          className="border p-2 w-full"
          required
        />

        {/* Photo URL */}
        <input
          name="photoUrl"
          placeholder="Photo URL"
          className="border p-2 w-full"
          required
        />

        {/* Subject */}
        <select name="subject" className="border p-2 w-full" required>
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

        {/* Available Days */}
        <div className="flex flex-wrap gap-2">
          {DAYS.map((day) => (
            <label key={day} className="flex items-center gap-1">
              <input type="checkbox" name="availableDays" value={day} />
              {day}
            </label>
          ))}
        </div>

        {/* Time Slot */}
        <select name="timeSlot" className="border p-2 w-full" required>
          <option value="">Select Time Slot</option>
          <option>6:00 AM – 9:00 AM</option>
          <option>9:00 AM – 12:00 PM</option>
          <option>12:00 PM – 3:00 PM</option>
          <option>3:00 PM – 6:00 PM</option>
          <option>6:00 PM – 9:00 PM</option>
        </select>

        {/* Hourly Fee */}
        <input
          type="number"
          name="hourlyFee"
          placeholder="Hourly Fee"
          className="border p-2 w-full"
          required
        />

        {/* Total Slots */}
        <input
          type="number"
          name="totalSlots"
          placeholder="Total Slots"
          className="border p-2 w-full"
          required
        />

        {/* Start Date */}
        <input
          type="date"
          name="startDate"
          className="border p-2 w-full"
          required
        />

        {/* Experience */}
        <textarea
          name="institutionExperience"
          placeholder="Institution & Experience"
          className="border p-2 w-full"
          rows={4}
          required
        />

        {/* Location */}
        <input
          name="location"
          placeholder="Location"
          className="border p-2 w-full"
          required
        />

        {/* Teaching Mode */}
        <select name="teachingMode" className="border p-2 w-full" required>
          <option value="">Teaching Mode</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="both">Both</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Add Tutor
        </button>
      </form>
    </div>
  );
}