export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Find a Tutor",
      description: "Browse our verified tutors by subject, location, or teaching mode that fits your schedule.",
      icon: "🔍",
    },
    {
      step: "02",
      title: "Book a Session",
      description: "Pick your preferred time slot and book a session instantly with just one click.",
      icon: "📅",
    },
    {
      step: "03",
      title: "Start Learning",
      description: "Connect with your tutor online or in-person and start your personalized learning journey.",
      icon: "🎓",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-center text-gray-500 mb-12">
          Get started with TutorHub in just 3 simple steps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl shadow p-8 text-center hover:shadow-md transition"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <span className="text-green-500 font-bold text-sm">STEP {item.step}</span>
              <h3 className="text-xl font-semibold mt-2 mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}