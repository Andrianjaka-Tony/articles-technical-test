import { Article } from "@/src/types/article.type";
import { articleService } from "@/src/services/article.service";
import { apiResponse } from "@/src/utils/api-response.util";
import { NextRequest } from "next/server";
import { articleQuerySchema } from "@/src/dtos/article.dto";

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
  const result = articleQuerySchema.safeParse(searchParams);
  if (!result.success) {
    return apiResponse(400, "Invalid query parameters", result.error.format());
  }

  const { query, sort } = result.data;
  return apiResponse<Article[]>(200, "Articles list", articleService.findAll(query, sort));
}
