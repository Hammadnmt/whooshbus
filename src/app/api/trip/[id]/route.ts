// app/api/trip/[id]/route.ts
import { connectDB } from "@/lib/db";
import tripService from "@/services/tripService";
import { handleApiError } from "@/utils/errorHandler";
import { errorResponse, successResponse } from "@/utils/apiResponse";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const trip = await tripService.getTripById(id);
    if (!trip) {
      return errorResponse("Trip not found", 400);
    }
    return successResponse(trip, "Trip Fetched");
  } catch (error) {
    console.error("Error fetching trip:", error);
    return handleApiError(error, "Something bad happened");
  }
}
