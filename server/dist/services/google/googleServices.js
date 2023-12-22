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
exports.getUser = exports.getAccessTokenFromCode = void 0;
const client_1 = __importDefault(require("../../sdks/google/client"));
const googleClient = new client_1.default(process.env.GOOGLE_CLIENT_ID || "", process.env.GOOGLE_CLIENT_SECRET || "", process.env.GOOGLE_REDIRECT_URI || "");
const getAccessTokenFromCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    return googleClient.getAccessTokenFromCode(code);
});
exports.getAccessTokenFromCode = getAccessTokenFromCode;
const getUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return googleClient.getUser(token);
});
exports.getUser = getUser;
