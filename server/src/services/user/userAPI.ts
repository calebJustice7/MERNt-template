import express from "express";
import userC from "./userController";
import { validate } from "../../validators/validate";
import authMiddleware from "../../auth/authMiddleware";
import { findUsersValidator } from "./userValidators";

const router = express.Router();

router.get("/", authMiddleware("read", "user"), validate(findUsersValidator), userC.findUsersController);

export default router;
