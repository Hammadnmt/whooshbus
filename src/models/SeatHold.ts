import { Schema, model, models, Document, Types } from "mongoose";

export interface ISeatHold extends Document {
  trip: Types.ObjectId;
  user: Types.ObjectId;
  seats: { seatNumber: string; gender: string }[];
  expiresAt: Date;
}

const seatHoldSchema = new Schema<ISeatHold>(
  {
    trip: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seats: [
      { seatNumber: { type: String, required: true }, gender: { type: String, enum: ["male", "female"] } },
    ],
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

seatHoldSchema.index({ trip: 1, expiresAt: 1 });
seatHoldSchema.index({ trip: 1, "seats.seatNumber": 1 });
seatHoldSchema.index({ user: 1 });
seatHoldSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // For TTL

export const SeatHold = models.SeatHold || model<ISeatHold>("SeatHold", seatHoldSchema);
