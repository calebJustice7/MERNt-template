import { z } from "zod";

export const googleCallbackValidator = z.object({
    query: z.object({
        code: z.string(),
        scope: z.string(),
        authuser: z.string(),
        prompt: z.string(),
    }),
});
