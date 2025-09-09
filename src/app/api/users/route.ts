import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { successResponse } from "@/utils/apiResponse";
import { handleApiError } from "@/utils/errorHandler";

// POST /api/users → create user
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const user = new User(body);
    await user.save();
    return successResponse(user, "User created successfully");
  } catch (error) {
    return handleApiError(error, "Failed to create user");
  }
}

// GET /api/users → get all users
export async function GET() {
  try {
    await connectDB();
    const users = await User.find().select("-password");
    return successResponse(users, "Users fetched successfully");
  } catch (error) {
    return handleApiError(error, "Failed to fetch users");
  }
}
