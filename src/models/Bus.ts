import { Schema, Types, model, models } from "mongoose";

export interface ISeatLayout {
  _id?: Types.ObjectId;
  seatNumber: string;
  class: string;
  position?: string;
}

export interface IBus extends Document {
  regNumber: string;
  model?: string;
  capacity: number;
  seatLayout: ISeatLayout[];
}

const busSchema = new Schema<IBus>(
  {
    regNumber: { type: String, required: true, unique: true },
    model: { type: String },
    capacity: { type: Number, required: true, min: 1 },
    seatLayout: [
      {
        seatNumber: { type: String, required: true },
        class: { type: String, required: true },
        position: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Bus = models.Bus || model<IBus>("Bus", busSchema);
