import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyBookingsTable from "../components/MyBookingsTable";

export async function generateMetadata() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const name = session?.user?.name || "My";

  return {
    title: `${name}'s Booked Sessions`,
    description: `Booked sessions for ${name}`,
  };
}

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user.email}`,
    { cache: "no-store" }
  );

  const bookings = await res.json();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {user.name}'s Booked Sessions
      </h1>
      <MyBookingsTable bookings={bookings} />
    </div>
  );
};

export default MyBookingPage;