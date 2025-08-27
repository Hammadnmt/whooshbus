export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export function successResponse<T>(data: T, message = "Success"): ApiResponse<T> {
  return { success: true, message, data };
}

export function errorResponse(message = "Something went wrong", status = 500) {
  return Response.json({ success: false, message }, { status });
}
