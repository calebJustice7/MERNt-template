"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = void 0;
const axios_1 = __importDefault(require("axios"));
const AppError_1 = __importDefault(require("./AppError"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logError = (error) => {
    var _a;
    if (axios_1.default.isAxiosError(error)) {
        console.log((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
    }
    else if (error instanceof AppError_1.default) {
        console.log(error.message, "\n", error.name);
    }
    else {
        console.log(error);
    }
};
exports.logError = logError;
