import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  if (!password) {
    throw new Error("Password is required to hash.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}
export async function validPassword(plainPassword: string, hashedPassword: string | undefined | null) {
  if (!plainPassword) {
    throw new Error("Password is required to hash.");
  }
  if (!hashedPassword) {
    throw new Error("Password is required to hash.");
  }

  return await bcrypt.compare(plainPassword, hashedPassword);
}
