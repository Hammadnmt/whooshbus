// app/actions/tripActions.ts
"use server";
import tripService from "@/services/tripService";

export async function searchTrips(formData: FormData, date: Date | null) {
  const origin = formData.get("origin") as string;
  const destination = formData.get("destination") as string;

  if (!origin || !destination || !date) {
    return {
      success: false,
      data: [],
      message: "Missing required fields",
    };
  }

  try {
    // Call service directly instead of HTTP request
    const trips = await tripService.searchTrips({
      origin,
      destination,
      selectedDate: date,
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(trips)), // Serialize for client
      message: trips && trips.length > 0 ? "Trips found!" : "No trips available for this route",
    };
  } catch (error) {
    console.error("Error in searchTrips action:", error);
    return {
      success: false,
      data: [],
      message: "Failed to search trips",
    };
  }
}
