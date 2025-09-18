"use server";
import moment from "moment";
export async function searchTrips(formData: FormData, date: Date | null) {
  const origin = formData.get("origin") as string;
  const destination = formData.get("destination") as string;
  const dateParam = date ? moment(date).format("YYYY-MM-DD") : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/trip/search?origin=${origin}&destination=${destination}&date=${dateParam}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const trips = await res.json();
  return trips;
}
