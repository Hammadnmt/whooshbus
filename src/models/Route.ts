import { Schema, model, Document } from "mongoose";

export interface IRoute extends Document {
  originStation: string;
  destinationStation: string;
  stops?: { name: string; arrivalOffsetMin: number }[];
  distanceKm?: number;
  approxDurationMin?: number;
}

const routeSchema = new Schema<IRoute>(
  {
    originStation: { type: String, required: true, trim: true },
    destinationStation: { type: String, required: true, trim: true },
    stops: [
      {
        name: { type: String, trim: true },
        arrivalOffsetMin: { type: Number, min: 0 },
      },
    ],
    distanceKm: { type: Number, min: 0 },
    approxDurationMin: { type: Number, min: 0 },
  },
  { timestamps: true }
);

export const Route = model<IRoute>("Route", routeSchema);
