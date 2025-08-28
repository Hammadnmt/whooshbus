import { NextRequest } from "next/server";
import { User } from "@/models/User";
import { successResponse } from "@/utils/apiResponse";
import { handleApiError } from "@/utils/errorHandler";
import { connectDB } from "@/lib/db";

// GET /api/users/:id → get user by ID
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const user = await User.findById(id).select("-password");
    if (!user) return Response.json({ success: false, message: "User not found" }, { status: 404 });

    return Response.json(successResponse(user, "User fetched successfully"));
  } catch (error) {
    return handleApiError(error, "Failed to fetch user");
  }
}

// PUT /api/users/:id → update user
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!updatedUser) return Response.json({ success: false, message: "User not found" }, { status: 404 });

    return Response.json(successResponse(updatedUser, "User updated successfully"));
  } catch (error) {
    return handleApiError(error, "Failed to update user");
  }
}

// DELETE /api/users/:id → delete user
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) return Response.json({ success: false, message: "User not found" }, { status: 404 });

    return Response.json(successResponse(null, "User deleted successfully"));
  } catch (error) {
    return handleApiError(error, "Failed to delete user");
  }
}
