import { Schema, model, Types } from "mongoose";

interface ISeatLayout {
  seatNumber: string;
  class: string;
  position?: string;
}

export interface IBus extends Document {
  operator: Types.ObjectId;
  regNumber: string;
  model?: string;
  capacity: number;
  seatLayout: ISeatLayout[];
}

const busSchema = new Schema<IBus>(
  {
    operator: { type: Schema.Types.ObjectId, ref: "Operator", required: true },
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

export const Bus = model<IBus>("Bus", busSchema);
