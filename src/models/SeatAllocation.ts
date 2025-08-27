import { Schema, model, Document, Types } from "mongoose";
import { SeatStatus } from "@/types/ENUMS";

export interface ISeatAllocation extends Document {
  trip: Types.ObjectId;
  seatNumber: string;
  class?: string;
  price?: number;
  status: SeatStatus;
  heldBy?: Types.ObjectId;
}

const seatAllocationSchema = new Schema<ISeatAllocation>(
  {
    trip: { type: Schema.Types.ObjectId, ref: "Trip", required: true, index: true },
    seatNumber: { type: String, required: true },
    class: { type: String },
    price: { type: Number, min: 0 },
    status: {
      type: String,
      enum: Object.values(SeatStatus),
      default: SeatStatus.AVAILABLE,
    },
    heldBy: { type: Schema.Types.ObjectId, ref: "SeatHold" },
  },
  { timestamps: true }
);

seatAllocationSchema.index({ trip: 1, seatNumber: 1 }, { unique: true });

export const SeatAllocation = model<ISeatAllocation>("SeatAllocation", seatAllocationSchema);
