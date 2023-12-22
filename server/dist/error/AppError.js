"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(name, description, isOperational, httpCode) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.isOperational = isOperational;
        this.httpStatusCode = httpCode;
        Error.captureStackTrace(this);
    }
}
exports.default = AppError;
