import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { IUser, User } from "@/models/User";
import validPassword from "@/utils/validPassword";

/**
 * POST /api/auth/login
 * Handles user login with email + password.
 * Expects JSON body: { email: string, password: string }
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
    // Check password
    if (!validPassword) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT (you can move secret to .env)
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    // Optionally set HTTP-only cookie (recommended for security)
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: "Server error", error: message }, { status: 500 });
  }
}
