import { IUser } from "@/models/User";
import bcrypt from "bcryptjs";

export async function hashPassword(password: IUser["password"]) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}
export async function validPassword(plainPassword: string, hashedPassword: IUser["password"]) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
