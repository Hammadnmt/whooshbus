import { Schema, model, Document, Types } from "mongoose";

export interface ISeatHold extends Document {
  trip: Types.ObjectId;
  user: Types.ObjectId;
  seats: { seatNumber: string }[];
  expiresAt: Date;
}

const seatHoldSchema = new Schema<ISeatHold>(
  {
    trip: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seats: [{ seatNumber: { type: String, required: true } }],
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// TTL index to auto-expire holds
seatHoldSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const SeatHold = model<ISeatHold>("SeatHold", seatHoldSchema);
