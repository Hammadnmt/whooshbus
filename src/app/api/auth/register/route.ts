import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { hashPassword } from "@/utils/bcryptUtils";

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user with email & password
 * @access  Public
 */
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { firstname, lastname, email, password, phone } = body;

    // Validate required fields
    if (!email || !password || !firstname || !lastname) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    await User.create({
      email,
      password: hashedPassword,
      firstName: firstname,
      lastName: lastname,
      phone,
      provider: "local",
      role: "user",
    });
    return NextResponse.json({ success: true, message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: "Server error", error: message }, { status: 500 });
  }
}
