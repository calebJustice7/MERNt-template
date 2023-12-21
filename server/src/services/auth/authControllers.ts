import { RequestHandler } from "express";
import { HttpStatusCode } from "../../error/HttpStatusCodes";
import { authenticateWithGoogle, generateGoogleUrl } from "./authServices";
import { AsyncRequestHandler, asyncErrorWrapper, syncErrorWrapper } from "../../error/errorWrapper";
import { z } from "zod";
import { googleCallbackValidator } from "./authValidators";

const generateGoogleUrlController: RequestHandler = (req, res) => {
    const url = generateGoogleUrl();

    res.status(HttpStatusCode.OK).send(url);
};

const authenticateWithGoogleController: AsyncRequestHandler = async (req, res) => {
    const { query } = req as unknown as z.infer<typeof googleCallbackValidator>;

    const user = await authenticateWithGoogle(query.code);

    res.status(HttpStatusCode.OK).send("Success");
};

const checkAuthController: AsyncRequestHandler = async (req, res) => {
    setTimeout(() => {
        res.status(HttpStatusCode.OK).send({
            _id: "",
            firstName: "caleb",
            lastName: "justice",
            email: "",
            permissions: [],
        });
    }, 1000);
};

export default {
    generateGoogleUrlController: syncErrorWrapper(generateGoogleUrlController),
    authenticateWithGoogleController: asyncErrorWrapper(authenticateWithGoogleController),
    checkAuthController: asyncErrorWrapper(checkAuthController),
};
