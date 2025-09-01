import { Schema, model, models, Document, Types } from "mongoose";
import { TripStatus } from "@/types/ENUMS";
import { IRoute } from "./Route";
import { IBus } from "./Bus";

export interface ITrip extends Document {
  _id: Types.ObjectId;
  route: Types.ObjectId;
  bus: Types.ObjectId;
  departureAt: Date;
  arrivalAt: Date;
  baseFare: number;
  status: TripStatus;
}
export interface ITripPopulated extends Omit<ITrip, "route" | "bus"> {
  route: IRoute;
  bus: IBus;
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
