import { errorResponse } from "./apiResponse";

export function handleApiError(error: unknown, customMessage?: string) {
  console.error(error);

  if (error instanceof Error) {
    return errorResponse(customMessage || error.message, 400);
  }

  return errorResponse(customMessage || "Internal server error", 500);
}
