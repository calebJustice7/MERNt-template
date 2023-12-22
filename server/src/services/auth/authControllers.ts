import { RequestHandler } from "express";
import { HttpStatusCode } from "../../error/HttpStatusCodes";
import { authenticateWithGoogle, generateGoogleUrl, upsertUser, getUserFromSession } from "./authServices";
import { AsyncRequestHandler, asyncErrorWrapper, syncErrorWrapper } from "../../error/errorWrapper";
import { z } from "zod";
import { googleCallbackValidator } from "./authValidators";
import AppError from "../../error/AppError";

const generateGoogleUrlController: RequestHandler = (req, res) => {
    const url = generateGoogleUrl();

    res.status(HttpStatusCode.OK).send(url);
};

const authenticateWithGoogleController: AsyncRequestHandler = async (req, res) => {
    const { query } = req as unknown as z.infer<typeof googleCallbackValidator>;

    const user = await authenticateWithGoogle(query.code);

    const newUser = await upsertUser(user);

    if (!newUser) {
        throw new AppError("Invalid Auth", "No user id when upserting user", true, 500);
    }

    req.session.user = newUser.toObject()._id;
    req.session.save();
    res.status(HttpStatusCode.OK).redirect("http://localhost:5173/login");
};

const checkAuthController: AsyncRequestHandler = async (req, res) => {
    if (!req.app.locals.user) {
        req.session.destroy(() => {});
        res.clearCookie("connect.sid");
        res.status(HttpStatusCode.UNAUTHORIZED).send();
        return;
    }

    res.status(HttpStatusCode.OK).json(req.app.locals.user);
};

export default {
    generateGoogleUrlController: syncErrorWrapper(generateGoogleUrlController),
    authenticateWithGoogleController: asyncErrorWrapper(authenticateWithGoogleController),
    checkAuthController: asyncErrorWrapper(checkAuthController),
};
