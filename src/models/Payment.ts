import { Schema, model, Document, Types } from "mongoose";
import { PaymentStatus, PaymentMethod } from "@/types/ENUMS";

export interface IPayment extends Document {
  booking: Types.ObjectId;
  user: Types.ObjectId;
  amount: number;
  currency: string;
  provider: string;
  providerPaymentId?: string;
  status: PaymentStatus;
  method: PaymentMethod;
  idempotencyKey: string;
}

const paymentSchema = new Schema<IPayment>(
  {
    booking: { type: Schema.Types.ObjectId, ref: "Booking" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "PKR" },
    provider: { type: String, required: true },
    providerPaymentId: { type: String },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.INITIATED,
    },
    method: {
      type: String,
      enum: Object.values(PaymentMethod),
      default: PaymentMethod.CARD,
    },
    idempotencyKey: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

export const Payment = model<IPayment>("Payment", paymentSchema);
