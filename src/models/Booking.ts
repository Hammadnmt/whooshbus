import { Schema, model, Document, Types } from "mongoose";
import { BookingStatus } from "@/types/ENUMS";

interface IPassenger {
  name: string;
  age: number;
  idType: string;
  idNumber: string;
  seatNumber: string;
}

export interface IBooking extends Document {
  user: Types.ObjectId;
  trip: Types.ObjectId;
  seats: { seatNumber: string; class?: string }[];
  passengers: IPassenger[];
  totalFare: number;
  fareBreakdown?: Record<string, BookingStatus>;
  status: BookingStatus;
  payment?: Types.ObjectId;
  pnr: string;
}

const passengerSchema = new Schema<IPassenger>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 0 },
    idType: { type: String, required: true },
    idNumber: { type: String, required: true },
    seatNumber: { type: String, required: true },
  },
  { _id: false }
);

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    trip: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    seats: [{ seatNumber: String, class: String }],
    passengers: [passengerSchema],
    totalFare: { type: Number, required: true, min: 0 },
    fareBreakdown: { type: Schema.Types.Mixed },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING,
    },
    payment: { type: Schema.Types.ObjectId, ref: "Payment" },
    pnr: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Booking = model<IBooking>("Booking", bookingSchema);
