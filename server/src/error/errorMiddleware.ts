import { ErrorRequestHandler, Response } from "express";
import AppError from "./AppError";
import ensureEnv from "../helpers/ensureEnv";

const handleError = (err: unknown, res: Response) => {
    if (err instanceof AppError) {
        res.status(err.httpStatusCode).send({
            statusCode: err.httpStatusCode,
            message: ensureEnv("NODE_ENV") === "dev" ? err.message : err.name,
        });
    } else if (err instanceof Error) {
        res.status(500).send({ statusCode: 500, message: err.message });
    } else {
        res.status(500).send({ statusCode: 500, message: "Something went wrong" });
    }
};

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    handleError(err, res);
};

export default errorMiddleware;
