import express from "express";
import authC from "./authControllers";

const router = express.Router();

router.get("/google/generate-url", authC.generateGoogleUrlController);

router.get("/google/callback", authC.authenticateWithGoogleController);

export default router;
