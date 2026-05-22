import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyTutorTable from "../components/MyTutorTable";

export async function generateMetadata() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const name = session?.user?.name || "My";

  return {
    title: `${name}'s Tutor List`,
    description: `Tutors added by ${name}`,
  };
}

const MyTutorPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/user/${user?.email}`,
    { cache: "no-store" }
  );

  const tutors = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">{user?.name}'s Tutor List</h1>
      <MyTutorTable tutors={tutors} />
    </div>
  );
};

export default MyTutorPage;