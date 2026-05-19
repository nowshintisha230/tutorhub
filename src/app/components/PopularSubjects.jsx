import Link from "next/link";

export default function PopularSubjects() {
  const subjects = [
    { name: "Mathematics", icon: "➕", tutors: 24 },
    { name: "Physics", icon: "⚛️", tutors: 18 },
    { name: "Chemistry", icon: "🧪", tutors: 15 },
    { name: "English", icon: "📖", tutors: 30 },
    { name: "Biology", icon: "🧬", tutors: 12 },
    { name: "Programming", icon: "💻", tutors: 22 },
    { name: "History", icon: "🏛️", tutors: 10 },
    { name: "Geography", icon: "🌍", tutors: 9 },
  ];

  return (
    <section className="py-16 px-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Popular Subjects
        </h2>

        <p className="text-center text-gray-500 dark:text-gray-300 mb-12">
          Explore top subjects and find the perfect tutor for you
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {subjects.map((subject) => (
            <Link
              href={`/tutors?subject=${subject.name.toLowerCase()}`}
              key={subject.name}
            >
              <div className="
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                rounded-2xl p-6 text-center
                shadow hover:shadow-md
                hover:border-green-400
                hover:-translate-y-1
                transition-all cursor-pointer
              ">
                <div className="text-4xl mb-3">{subject.icon}</div>

                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {subject.name}
                </h3>

                <p className="text-sm text-green-500 mt-1">
                  {subject.tutors} Tutors
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}