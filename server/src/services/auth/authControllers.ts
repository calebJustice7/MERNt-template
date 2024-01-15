import { RequestHandler } from "express";
import { HttpStatusCode } from "../../consts/HttpStatusCodes";
import { authenticateWithGoogle, generateGoogleUrl, upsertUser } from "./authServices";
import { AsyncRequestHandler, asyncErrorWrapper, syncErrorWrapper } from "../../error/errorWrapper";
import { z } from "zod";
import { googleCallbackValidator, generateGoogleUrlValidator } from "./authValidators";
import AppError from "../../error/AppError";
import ensureEnv from "../../helpers/ensureEnv";
import { validateSession } from "../../auth/authMiddleware";

const generateGoogleUrlController: RequestHandler = (req, res) => {
    const { query } = req as unknown as z.infer<typeof generateGoogleUrlValidator>;

    const url = generateGoogleUrl(query.redirect);

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
    res.status(HttpStatusCode.OK).redirect(`${ensureEnv("BASE_URL")}${query.state || "/"}`);
};

const checkAuthController: AsyncRequestHandler = async (req, res) => {
    const user = await validateSession(req, res, false);

    if (user) {
        res.status(HttpStatusCode.OK).json({ status: "authenticated", user });
        return;
    }

    res.status(HttpStatusCode.OK).json({ status: "unauthenticated", user: null });
};

const logoutUser: RequestHandler = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.status(HttpStatusCode.OK).send();
    });
};

export default {
    generateGoogleUrlController: syncErrorWrapper(generateGoogleUrlController),
    authenticateWithGoogleController: asyncErrorWrapper(authenticateWithGoogleController),
    checkAuthController: asyncErrorWrapper(checkAuthController),
    logoutUser: syncErrorWrapper(logoutUser),
};
