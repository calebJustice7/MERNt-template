import { RequestHandler } from "express";
import { z } from "zod";
import { HttpStatusCode } from "../consts/HttpStatusCodes";

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
