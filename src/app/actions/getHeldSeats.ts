"use server";

import { SeatHold } from "@/models/SeatHold";
import { Types } from "mongoose";

export async function getHeldSeats(tripId: Types.ObjectId) {
  try {
    // Fetch active holds for the trip
    const holds = await SeatHold.find(
      {
        trip: tripId,
        expiresAt: { $gt: new Date() }, // still valid
      },
      { seats: 1, _id: 0 } // only seats
    ).lean();

    // Flatten into a single array of seats
    const heldSeats = holds.flatMap((hold) =>
      hold.seats.map((seat: { seatNumber: string; gender: string }) => ({
        seatNumber: seat.seatNumber,
        gender: seat.gender,
      }))
    );

    return { success: true, data: heldSeats };
  } catch (error) {
    console.error("Error fetching held seats:", error);
    return { success: false, message: "Failed to fetch held seats" };
  }
}
