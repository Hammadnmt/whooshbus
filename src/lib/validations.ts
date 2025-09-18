import { z } from "zod";

export const bookingSchema = z.object({
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  email: z.string().email("Invalid email"),
  title: z.string().nonempty("Select a title"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  dob: z.string().nonempty("Date of birth is required"),
  cnic: z.string().length(13, "CNIC must be 13 digits"),
});
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fname: z.string().min(2, "First name is required"),
  lname: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
});

export type RegisterData = z.infer<typeof registerSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
