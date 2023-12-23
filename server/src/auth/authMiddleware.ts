import { NextFunction, Request, Response } from "express";
import { getUserFromSession } from "../services/auth/authServices";
import AppError from "../error/AppError";
import { createAbility } from "./appAbility";
import { ForbiddenError } from "@casl/ability";
import handleError from "../error/errorMiddleware";

const authMiddleware = (action?: Actions[number], subject?: Subjects[number]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.session.cookie.expires || new Date(req.session.cookie.expires).getTime() < new Date().getTime()) {
                throw new AppError("Expired Token", "Expired Token", true, 401);
            }
            const user = await getUserFromSession(req.session.user);
            if (!user) throw new AppError(`No User With id ${user}`, `No User With id ${user}`, true, 401);

            if (action && subject) {
                const ability = createAbility(user.full_role.permissions);
                ForbiddenError.from(ability).throwUnlessCan(action, subject);
            }

            req.app.locals.user = user;
            next();
        } catch (err) {
            handleError(err, req, res, next);
        }
    };
};

export default authMiddleware;
