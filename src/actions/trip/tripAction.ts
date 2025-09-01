// app/actions/tripActions.ts
"use server";

export async function searchTrips(formData: FormData, date: Date | null) {
  const origin = formData.get("origin") as string;
  const destination = formData.get("destination") as string;
  console.log("in server action ", date);
  // Call backend / DB
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/trip/search?origin=${origin}&destination=${destination}&date=${date}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const trips = await res.json();
  return trips.data;
}
