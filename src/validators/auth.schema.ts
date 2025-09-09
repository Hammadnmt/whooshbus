import { Provider, UserRole } from "@/types/ENUMS";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Email is Required" }),
  password: z.string({ error: "Password is required" }).min(6, "Password must be at least 6 characters"),
});
export const registerSchema = z.object({
  firstname: z.string({ error: "First name is required" }).min(2, "First name must be at least 2 characters"),
  lastname: z.string({ error: "Last name is required" }).min(2, "Last name must be at least 2 characters"),
  email: z.email({ error: "Email is Required" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must not exceed 32 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  profilePicture: z.url().nullable().optional(),

  phone: z.string().optional(),
  role: z.enum(UserRole).default(UserRole.USER).optional(),
});
export const oauthRegisterSchema = registerSchema.omit({ password: true }).extend({
  provider: z.literal(Provider.GOOGLE as string),
  providerId: z.string().min(1, "Provider ID is required for OAuth"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type OauthInput = z.infer<typeof oauthRegisterSchema>;
