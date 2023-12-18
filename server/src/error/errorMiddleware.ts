import { ErrorRequestHandler, Response } from "express";
import AppError from "./AppError";

const handleError = (err: unknown, res: Response) => {
    if (err instanceof AppError) {
        res.status(err.httpStatusCode).send({ statusCode: err.httpStatusCode, description: err.message });
    } else {
        res.status(500).send({ statusCode: 500, description: "Something went wrong" });
    }
};

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    handleError(err, res);
};

export default errorMiddleware;
