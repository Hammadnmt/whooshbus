import { NextRequest } from "next/server";
import tripService from "@/services/tripService";
import { handleApiError } from "@/utils/errorHandler";
import { errorResponse, successResponse } from "@/utils/apiResponse";
import moment from "moment";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");
    if (!origin || !destination || !date) {
      return errorResponse("Missing Origin and Destination", 400);
    }
    const start = moment.utc(date).startOf("day").toDate();
    const end = moment.utc(date).endOf("day").toDate();
    const trips = await tripService.searchTrips({ origin, destination, end, start });

    return successResponse(trips, "Fetched Successfully");
  } catch (error) {
    console.error("Error in GET /api/trip/search:", error);
    return handleApiError(error, "Something Bad happened");
  }
}
