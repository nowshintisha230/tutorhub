import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyTutorTable from "../components/MyTutorTable";

const MyTutorPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(
    `http://localhost:5000/tutor/user/${user?.email}`,
    { cache: "no-store" }
  );

  const tutors = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Tutor List</h1>
      <MyTutorTable tutors={tutors} />
    </div>
  );
};

export default MyTutorPage;