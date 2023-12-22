"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = __importDefault(require("./authControllers"));
const validate_1 = require("../../helpers/validate");
const authValidators_1 = require("./authValidators");
const router = express_1.default.Router();
router.get("/google/generate-url", authControllers_1.default.generateGoogleUrlController);
router.get("/google/callback", (0, validate_1.validate)(authValidators_1.googleCallbackValidator), authControllers_1.default.authenticateWithGoogleController);
router.get("/", authControllers_1.default.checkAuthController);
exports.default = router;
