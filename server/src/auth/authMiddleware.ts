import { NextFunction, Request, Response } from "express";
import { getUserFromSession } from "../services/auth/authServices";
import AppError from "../error/AppError";
import { logError } from "../error/logError";
import { HttpStatusCode } from "../error/HttpStatusCodes";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.session.cookie.expires || new Date(req.session.cookie.expires).getTime() < new Date().getTime()) {
            throw new Error("Expired Token");
        }
        const user = await getUserFromSession(req.session.user);

        if (!user) {
            throw new Error(`No User With id ${user}`);
        } else {
            req.app.locals.user = user.toObject();
            next();
        }
    } catch (er) {
        req.session.destroy(() => {});
        res.clearCookie("connect.sid");
        const message = er instanceof Error ? er.message : "Error coming from auth middleware";
        logError(new AppError("Invalid Session", message, true, 401));
        res.status(HttpStatusCode.UNAUTHORIZED).send("");
    }
};

export default authMiddleware;
