"use server";

import { SeatSelection } from "@/context/BookingContext";
import { SeatHold } from "@/models/SeatHold";
import { Types } from "mongoose";
export async function seatHoldAction(tripId: Types.ObjectId, seatData: SeatSelection[]) {
  // Call your service to hold seats
  try {
    await SeatHold.create({
      trip: tripId,
      // user: new Types.ObjectId(), // Replace with actual user ID
      user: new Types.ObjectId("68c032da83e6e400c8620414"), // Replace with actual user ID
      seats: seatData.map((seat) => ({ seatNumber: seat.seat, gender: seat.gender })),
      //hold for 10 seconds for testing
      expiresAt: new Date(Date.now() + 10 * 1000),
    });
    return { success: true, message: "Success" };
  } catch (error) {
    console.error("Error holding seats:", error);
    return { success: false, message: "Failed to hold seats" };
  }
}
