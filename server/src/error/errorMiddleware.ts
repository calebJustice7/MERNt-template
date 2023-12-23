import { ErrorRequestHandler, Request, Response } from "express";
import AppError from "./AppError";
import ensureEnv from "../helpers/ensureEnv";
import { ForbiddenError } from "@casl/ability";
import { HttpStatusCode } from "../consts/HttpStatusCodes";
import { NextFunction } from "express-serve-static-core";
import { logError } from "./logError";

export const errorMiddleware: ErrorRequestHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    logError(err);
    let statusCode: HttpStatusCode;
    let message: string;

    if (err instanceof AppError) {
        statusCode = err.httpStatusCode;
        message = ensureEnv("NODE_ENV") === "dev" ? err.message : err.name;

        if (err.httpStatusCode === HttpStatusCode.UNAUTHORIZED) {
            req.session.destroy(() => {});
            res.clearCookie("connect.sid");
        }
    } else if (err instanceof ForbiddenError) {
        statusCode = HttpStatusCode.FORBIDDEN;
        message = "Insufficient permissions";
    } else if (err instanceof Error) {
        statusCode = HttpStatusCode.INTERNAL_SERVER;
        message = err.message;
    } else {
        statusCode = HttpStatusCode.INTERNAL_SERVER;
        message = "Something went wrong";
    }

    res.status(statusCode).send({
        statusCode,
        message,
    });
};

export default errorMiddleware;
