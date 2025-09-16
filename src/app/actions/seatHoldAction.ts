"use server";

import { SeatSelection } from "@/context/BookingContext";
import { connectDB } from "@/lib/db";
import { SeatHold } from "@/models/SeatHold";
import moment from "moment";
import { startSession, Types } from "mongoose";

export async function seatHoldAction(tripId: Types.ObjectId, seatData: SeatSelection[]) {
  await connectDB();
  const session = await startSession();
  try {
    session.startTransaction();

    // Optionally check if seats are already held
    const existingHold = await SeatHold.findOne(
      {
        trip: tripId,
        seats: {
          $elemMatch: {
            seatNumber: { $in: seatData.map((s) => s.seat.seatNumber) },
          },
        },
        expiresAt: { $gt: moment().format() }, // still valid
      },
      null,
      { session }
    );

    if (existingHold) {
      await session.abortTransaction();
      session.endSession();
      return { success: false, message: "Some seats are already held" };
    }

    // Create seat hold inside the transaction
    console.log("Holding seats:", seatData);
    await SeatHold.create(
      [
        {
          trip: tripId,
          user: new Types.ObjectId("68c032da83e6e400c8620414"), // Replace with actual user ID
          seats: seatData.map((seat) => ({ seatNumber: seat.seat.seatNumber, gender: seat.seat.gender })),
          expiresAt: new Date(Date.now() + 5 * 10 * 1000), // 10 min hold
        },
      ],
      { session }
    );

    await session.commitTransaction();
    return { success: true, message: "Seats held successfully" };
  } catch (error) {
    await session.abortTransaction();
    console.error("Error holding seats:", error);
    return { success: false, message: "Failed to hold seats" };
  } finally {
    session.endSession();
  }
}
