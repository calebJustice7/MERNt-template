import express from "express";
import authC from "./authControllers";
import { validate } from "../../validators/validate";
import { googleCallbackValidator, generateGoogleUrlValidator } from "./authValidators";
import authMiddleware from "../../auth/authMiddleware";

const router = express.Router();

router.get("/google/generate-url", validate(generateGoogleUrlValidator), authC.generateGoogleUrlController);

router.get("/google/callback", validate(googleCallbackValidator), authC.authenticateWithGoogleController);

router.get("/", authC.checkAuthController);

router.delete("/logout", authMiddleware(), authC.logoutUser);

export default router;
