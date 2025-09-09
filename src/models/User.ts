import { Schema, model, Document, models, Types } from "mongoose";
import { Provider, UserRole } from "@/types/ENUMS";
import { hashPassword } from "@/utils/bcryptUtils";

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string | null;
  provider: Provider;
  providerId?: string;
  profilePicture?: string | undefined | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: { type: String, match: [/^\+?[0-9]{7,15}$/, "Invalid phone number"] },
    password: { type: String }, // only for local provider
    provider: {
      type: String,
      enum: Object.values(Provider),
      default: Provider.LOCAL,
    },
    providerId: { type: String },
    profilePicture: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password") || !user.password) {
    return next();
  }

  try {
    user.password = await hashPassword(user.password);
    next();
  } catch (error) {
    next(error as Error);
  }
});

export const User = models.User || model<IUser>("User", userSchema);
