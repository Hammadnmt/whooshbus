// app/api/trip/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import tripService from "@/services/tripService";
import { handleApiError } from "@/utils/errorHandler";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    const trip = await tripService.getTripById(id);
    if (!trip) {
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Trip Fetched", data: trip });
  } catch (error) {
    console.error("Error fetching trip:", error);
    return handleApiError(error, "Failed to fetch");
  }
}
