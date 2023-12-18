import { RequestHandler } from "express";
import { HttpStatusCode } from "../../error/HttpStatusCodes";
import { generateGoogleUrl } from "./authServices";
import { syncErrorWrapper } from "../../error/errorWrapper";

const generateGoogleUrlController: RequestHandler = (req, res) => {
    const url = generateGoogleUrl();

    res.status(HttpStatusCode.OK).send(url);
};

const authenticateWithGoogleController: RequestHandler = (req, res) => {
    console.log(req.query);

    res.status(HttpStatusCode.OK).send("OKAY");
};

export default {
    generateGoogleUrlController: syncErrorWrapper(generateGoogleUrlController),
    authenticateWithGoogleController: syncErrorWrapper(authenticateWithGoogleController),
};
