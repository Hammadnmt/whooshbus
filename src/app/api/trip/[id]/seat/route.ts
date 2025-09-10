import { NextRequest } from "next/server";
import seatService from "@/services/seatHoldService";
import { errorResponse, successResponse } from "@/utils/apiResponse";
import { handleApiError } from "@/utils/errorHandler";
import { Types } from "mongoose";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Validate trip ID
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      return errorResponse("Invalid Trip", 400);
    }

    const { seatData } = await req.json();

    // Validate input
    if (!seatData || !Array.isArray(seatData) || seatData.length === 0) {
      return handleApiError(null, "User ID and seat numbers array are required");
    }

    // if (!Types.ObjectId.isValid(userId)) {
    //   return errorResponse("Invalid User", 400);
    // }

    return successResponse({}, "Seats held successfully");
  } catch (error) {
    return handleApiError(error, "Failed to hold seats");
  }
}

// DELETE = release seat (using query parameters)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Validate trip ID
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      return errorResponse("Invalid Trip", 400);
    }

    // Get query parameters from URL
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const seatNumbersParam = searchParams.get("seatNumbers");

    // Parse seat numbers from comma-separated string
    const seatNumbers = seatNumbersParam ? seatNumbersParam.split(",") : [];

    // Validate input
    if (!userId) {
      return errorResponse("User ID is required", 400);
    }

    if (!Types.ObjectId.isValid(userId)) {
      return errorResponse("User ID is required", 400);
    }

    const result = await seatService.releaseHold(id, userId, seatNumbers);

    if (!result.success) {
      return errorResponse(result.message, 400);
    }

    return successResponse(result.data, result.message);
  } catch (error) {
    return handleApiError(error, "Failed to release seats");
  }
}
