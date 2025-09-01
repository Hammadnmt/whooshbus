import { NextRequest, NextResponse } from "next/server";
import tripService from "@/services/tripService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");
    if (!origin || !destination || !date) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }
    const trips = await tripService.searchTrips({ origin, destination, selectedDate });
    return NextResponse.json({
      message: "Trip fetched Successfully",
      data: trips && trips?.length > 0 ? trips : [],
    });
  } catch (error) {
    console.error("Error in GET /api/trip/search:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
