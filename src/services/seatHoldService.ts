import { Types, ClientSession, startSession } from "mongoose";
import { SeatHold } from "@/models/SeatHold";
import { Booking, IBooking } from "@/models/Booking";
import { BookingStatus } from "@/types/ENUMS";

interface HoldSeatResult {
  success: boolean;
  message: string;
  data?: IBooking;
}

const seatService = {
  /**
   * Place a temporary hold on seats with transaction support
   */
  holdSeat: async (tripId: string, userId: string, seatNumbers: string[]): Promise<HoldSeatResult> => {
    let session: ClientSession | null = null;
    try {
      session = await startSession();
      session.startTransaction();

      const now = new Date();

      // 1. Check if seats are already booked
      const alreadyBooked = await Booking.findOne({
        trip: new Types.ObjectId(tripId),
        "seats.seatNumber": { $in: seatNumbers },
        status: { $in: [BookingStatus.CONFIRMED, BookingStatus.PENDING] },
      }).session(session);

      if (alreadyBooked) {
        await session.abortTransaction();
        return {
          success: false,
          message: "Some of the selected seats are already booked.",
        };
      }

      // 2. Check if seats are already held by another user
      const alreadyHeld = await SeatHold.findOne({
        trip: new Types.ObjectId(tripId),
        "seats.seatNumber": { $in: seatNumbers },
        expiresAt: { $gt: now },
      }).session(session);

      if (alreadyHeld) {
        await session.abortTransaction();
        return {
          success: false,
          message: "Some of the selected seats are currently on hold.",
        };
      }

      // 3. Create a new hold (5 min TTL)
      const hold = await SeatHold.create(
        [
          {
            trip: new Types.ObjectId(tripId),
            user: new Types.ObjectId(userId),
            seats: seatNumbers.map((s) => ({ seatNumber: s })),
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
          },
        ],
        { session }
      );

      await session.commitTransaction();

      return {
        success: true,
        message: "Seats successfully held.",
        data: hold[0],
      };
    } catch (error) {
      if (session) {
        await session.abortTransaction();
      }
      return {
        success: false,
        message: "Failed to hold seats.",
      };
    } finally {
      if (session) {
        session.endSession();
      }
    }
  },

  /**
   * Confirm booking after payment with transaction support
   */
  confirmBooking: async (
    tripId: string,
    userId: string,
    passengers: {
      name: string;
      age: number;
      idType: string;
      idNumber: string;
      seatNumber: string;
    }[],
    totalFare: number,
    paymentId: string
  ): Promise<HoldSeatResult> => {
    let session: ClientSession | null = null;
    try {
      session = await startSession();
      session.startTransaction();

      const seats = passengers.map((p) => ({
        seatNumber: p.seatNumber,
      }));

      // Check if seats are still available
      const now = new Date();
      const seatNumbers = passengers.map((p) => p.seatNumber);

      const alreadyBooked = await Booking.findOne({
        trip: new Types.ObjectId(tripId),
        "seats.seatNumber": { $in: seatNumbers },
        status: { $in: [BookingStatus.CONFIRMED, BookingStatus.PENDING] },
      }).session(session);

      if (alreadyBooked) {
        await session.abortTransaction();
        return {
          success: false,
          message: "Some of the selected seats are no longer available.",
        };
      }

      const alreadyHeldByOthers = await SeatHold.findOne({
        trip: new Types.ObjectId(tripId),
        "seats.seatNumber": { $in: seatNumbers },
        user: { $ne: new Types.ObjectId(userId) },
        expiresAt: { $gt: now },
      }).session(session);

      if (alreadyHeldByOthers) {
        await session.abortTransaction();
        return {
          success: false,
          message: "Some of the selected seats are currently on hold by another user.",
        };
      }

      // Generate PNR
      const pnr = `PNR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Create booking
      const booking = await Booking.create(
        [
          {
            trip: new Types.ObjectId(tripId),
            user: new Types.ObjectId(userId),
            seats,
            passengers,
            totalFare,
            status: BookingStatus.CONFIRMED,
            payment: new Types.ObjectId(paymentId),
            pnr,
          },
        ],
        { session }
      );

      // Remove seat holds for this user
      await SeatHold.deleteMany({
        trip: new Types.ObjectId(tripId),
        user: new Types.ObjectId(userId),
      }).session(session);

      await session.commitTransaction();

      return {
        success: true,
        message: "Booking confirmed successfully.",
        data: booking[0],
      };
    } catch (error) {
      if (session) {
        await session.abortTransaction();
      }
      return {
        success: false,
        message: "Failed to confirm booking.",
      };
    } finally {
      if (session) {
        session.endSession();
      }
    }
  },

  /**
   * Release seat holds with transaction support
   */
  releaseHold: async (tripId: string, userId: string, seatNumbers?: string[]): Promise<HoldSeatResult> => {
    let session: ClientSession | null = null;
    try {
      session = await startSession();
      session.startTransaction();

      const query = {
        trip: new Types.ObjectId(tripId),
        user: new Types.ObjectId(userId),
      };

      // if (seatNumbers && seatNumbers.length > 0) {
      //   query.seats.seatNumber = { $in: seatNumbers };
      // }

      const result = await SeatHold.deleteMany(query).session(session);

      if (result.deletedCount === 0) {
        await session.abortTransaction();
        return {
          success: false,
          message: "No holds found to release.",
        };
      }

      await session.commitTransaction();

      return {
        success: true,
        message: "Seat hold(s) released successfully.",
      };
    } catch (error) {
      if (session) {
        await session.abortTransaction();
      }
      return {
        success: false,
        message: "Failed to release seat hold(s).",
      };
    } finally {
      if (session) {
        session.endSession();
      }
    }
  },
};

export default seatService;
