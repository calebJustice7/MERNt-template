"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
const handleError = (err, res) => {
    if (err instanceof AppError_1.default) {
        res.status(err.httpStatusCode).send({ statusCode: err.httpStatusCode, description: err.message });
    }
    else {
        res.status(500).send({ statusCode: 500, description: "Something went wrong" });
    }
};
const errorMiddleware = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    handleError(err, res);
};
exports.default = errorMiddleware;
