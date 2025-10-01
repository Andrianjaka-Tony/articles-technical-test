import z from "zod";
import { orderEnum } from "@/src/dtos/order.dto";

export const articleQuerySchema = z.object({
  query: z.string().optional().default(""),
  sort: orderEnum.default("desc"),
});
export type ArticleQueryDto = z.infer<typeof articleQuerySchema>;
