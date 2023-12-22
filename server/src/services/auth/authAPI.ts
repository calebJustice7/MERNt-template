import express from "express";
import authC from "./authControllers";
import { validate } from "../../helpers/validate";
import { googleCallbackValidator } from "./authValidators";

const router = express.Router();

router.get("/google/generate-url", authC.generateGoogleUrlController);

router.get("/google/callback", validate(googleCallbackValidator), authC.authenticateWithGoogleController);

router.get("/", authC.checkAuthController);

export default router;
