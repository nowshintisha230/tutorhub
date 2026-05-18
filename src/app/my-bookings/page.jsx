import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyBookingsTable from "./MyBookingsTable";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(
    `http://localhost:5000/bookings/${user?.email}`,
    {
      cache: "no-store",
    }
  );

  const bookings = await res.json();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Booked Sessions
      </h1>

      <MyBookingsTable bookings={bookings} />
    </div>
  );
};

export default MyBookingPage;