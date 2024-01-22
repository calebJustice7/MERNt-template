import { NextFunction, Request, Response } from "express";
import { getUserFromSession } from "../services/auth/authServices";
import AppError from "../error/AppError";
import { createAbility } from "./appAbility";
import { ForbiddenError } from "@casl/ability";
import handleError from "../error/errorMiddleware";
import { HttpStatusCode } from "../consts/HttpStatusCodes";

export async function validateSession(
    req: Request,
    res: Response<unknown, Record<string, unknown>>,
    throwErrors: true,
): Promise<
    UserFull & {
        full_role: RoleFull;
    }
>;
export async function validateSession(
    req: Request,
    res: Response<unknown, Record<string, unknown>>,
    throwErrors: false,
): Promise<
    | (UserFull & {
          full_role: RoleFull;
      })
    | null
>;
export async function validateSession(
    req: Request,
    res: Response<unknown, Record<string, unknown>>,
    throwErrors: boolean,
) {
    if (!req.session.cookie.expires || new Date(req.session.cookie.expires).getTime() < new Date().getTime()) {
        req.session.destroy(() => {});
        res.clearCookie("connect.sid");
        if (throwErrors) {
            throw new AppError("Expired Token", "Expired Token", true, HttpStatusCode.BAD_REQUEST);
        } else {
            return null;
        }
    }
    const user = await getUserFromSession(req.session.user);

    if (!user) {
        req.session.destroy(() => {});
        res.clearCookie("connect.sid");
        if (throwErrors) {
            throw new AppError(`No User With id ${user}`, `No User With id ${user}`, true, HttpStatusCode.BAD_REQUEST);
        } else {
            return null;
        }
    }

    return user;
}

const authMiddleware = (action?: Actions[number], subject?: Subjects[number]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await validateSession(req, res, true);

            const ability = createAbility(user.full_role.permissions);
            res.locals.ability = ability;
            res.locals.user = user;

            if (action && subject) {
                ForbiddenError.from(ability).throwUnlessCan(action, subject);
            }

            next();
        } catch (err) {
            handleError(err, req, res, next);
        }
    };
};

export default authMiddleware;
