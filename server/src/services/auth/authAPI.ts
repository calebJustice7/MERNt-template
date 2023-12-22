import express from "express";
import authC from "./authControllers";
import { validate } from "../../helpers/validate";
import { googleCallbackValidator } from "./authValidators";
import authMiddleware from "../../auth/authMiddleware";

const router = express.Router();

router.get("/google/generate-url", authC.generateGoogleUrlController);

router.get("/google/callback", validate(googleCallbackValidator), authC.authenticateWithGoogleController);

router.get("/", authMiddleware, authC.checkAuthController);

export default router;
