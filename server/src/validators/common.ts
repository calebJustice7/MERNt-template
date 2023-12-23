import { z } from "zod";

export const findQuery = z.object({
    where: z.object({}).default({}),
    sort: z.record(z.string(), z.string()).optional(),
    page: z.number().default(1),
    pageSize: z.number().default(100),
});
