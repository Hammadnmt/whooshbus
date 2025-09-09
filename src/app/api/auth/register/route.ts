import { handleApiError } from "@/utils/errorHandler";
import { registerSchema } from "@/validators/auth.schema";
import { errorResponse, successResponse } from "@/utils/apiResponse";
import { connectDB } from "@/lib/db";
import authService from "@/services/authService";

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user with email & password
 * @access  Public
 */
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400);
    }
    const { firstname, lastname, email, password, phone } = parsed.data;
    const user = await authService.registerUser({ firstname, lastname, email, password, phone });
    if (!user) return errorResponse("Email already exists!", 400);
    return successResponse({ email: user.email }, "Welcome to whooshBus");
  } catch (error) {
    console.error("Login error:", error);
    return handleApiError(error, "Registration Failed");
  }
}
