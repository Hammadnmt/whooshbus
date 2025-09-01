import { Schema, model, models, Document, Types } from "mongoose";
import { TripStatus } from "@/types/ENUMS";

export interface ITrip extends Document {
  route: Types.ObjectId;
  bus: Types.ObjectId;
  departureAt: Date;
  arrivalAt: Date;
  baseFare: number;
  status: TripStatus;
}

const tripSchema = new Schema<ITrip>(
  {
    route: { type: Schema.Types.ObjectId, ref: "Route", required: true },
    bus: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
    departureAt: { type: Date, required: true },
    arrivalAt: { type: Date, required: true },
    baseFare: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: Object.values(TripStatus),
      default: TripStatus.SCHEDULED,
    },
  },
  { timestamps: true }
);

tripSchema.index({ departureAt: 1 });

export const Trip = models.Trip || model<ITrip>("Trip", tripSchema);
