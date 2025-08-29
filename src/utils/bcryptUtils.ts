import { IUser } from "@/models/User";
import bcrypt from "bcryptjs";

export async function hashPassword(password: IUser["password"]) {
  if (!password) {
    throw new Error("Password is required to hash.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}
export async function validPassword(plainPassword: IUser["password"], hashedPassword: IUser["password"]) {
  if (!plainPassword) {
    throw new Error("Password is required to hash.");
  }
  if (!hashedPassword) {
    throw new Error("Password is required to hash.");
  }

  return await bcrypt.compare(plainPassword, hashedPassword);
}
