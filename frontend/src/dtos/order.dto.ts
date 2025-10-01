import z from "zod";

export const orderEnum = z.enum(["asc", "desc"]);
export type Order = z.infer<typeof orderEnum>;
