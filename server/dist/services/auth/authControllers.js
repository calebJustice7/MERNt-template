"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCodes_1 = require("../../error/HttpStatusCodes");
const authServices_1 = require("./authServices");
const errorWrapper_1 = require("../../error/errorWrapper");
const AppError_1 = __importDefault(require("../../error/AppError"));
const generateGoogleUrlController = (req, res) => {
    const url = (0, authServices_1.generateGoogleUrl)();
    res.status(HttpStatusCodes_1.HttpStatusCode.OK).send(url);
};
const authenticateWithGoogleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const user = yield (0, authServices_1.authenticateWithGoogle)(query.code);
    const newUser = yield (0, authServices_1.upsertUser)(user);
    if (!newUser) {
        throw new AppError_1.default("Invalid Auth", "No user id when upserting user", true, 500);
    }
    req.session.user = newUser.toObject()._id;
    req.session.save();
    res.status(HttpStatusCodes_1.HttpStatusCode.OK).redirect("http://localhost:5173/login");
});
const checkAuthController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, authServices_1.getUserFromSession)(req.session.user);
    if (!user) {
        req.session.destroy(() => { });
        res.clearCookie("connect.sid");
        throw new AppError_1.default("Invalid Session", "No User id from session", true, 401);
    }
    else {
        res.status(HttpStatusCodes_1.HttpStatusCode.OK).json(user.toObject());
    }
});
exports.default = {
    generateGoogleUrlController: (0, errorWrapper_1.syncErrorWrapper)(generateGoogleUrlController),
    authenticateWithGoogleController: (0, errorWrapper_1.asyncErrorWrapper)(authenticateWithGoogleController),
    checkAuthController: (0, errorWrapper_1.asyncErrorWrapper)(checkAuthController),
};
