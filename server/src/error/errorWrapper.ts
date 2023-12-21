import { NextFunction, RequestHandler, Response, Request } from "express";
import { logError } from "./logError";

export interface AsyncRequestHandler extends RequestHandler {
    (req: Request, res: Response, next: NextFunction): Promise<void>;
}

export const syncErrorWrapper = (fn: RequestHandler): RequestHandler => {
    return (req, res, next) => {
        try {
            fn(req, res, next);
        } catch (err) {
            logError(err);
            next(err);
        }
    };
};

export const asyncErrorWrapper = (fn: AsyncRequestHandler): RequestHandler => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            logError(err);
            next(err);
        });
    };
};
