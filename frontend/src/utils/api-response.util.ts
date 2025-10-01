import { NextResponse } from "next/server";

import { ApiResponse } from "@/src/types/api-response.type";

export function apiResponse<T>(status: number, message: string, data: T) {
  const body: ApiResponse<T> = { status, message, data };
  return NextResponse.json(body, { status });
}
