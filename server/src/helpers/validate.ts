import { Request, RequestHandler } from "express";
import { z, infer, UnknownKeysParam, ZodTypeAny } from "zod";
import { HttpStatusCode } from "../error/HttpStatusCodes";

export const validate =
    (schema: z.AnyZodObject): RequestHandler =>
    (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            next();
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(HttpStatusCode.BAD_REQUEST).send(err.errors);
            } else {
                return res.status(HttpStatusCode.BAD_REQUEST).send("Validation Error");
            }
        }
    };
