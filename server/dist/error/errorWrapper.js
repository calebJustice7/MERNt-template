"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncErrorWrapper = exports.syncErrorWrapper = void 0;
const logError_1 = require("./logError");
const syncErrorWrapper = (fn) => {
    return (req, res, next) => {
        try {
            fn(req, res, next);
        }
        catch (err) {
            (0, logError_1.logError)(err);
            next(err);
        }
    };
};
exports.syncErrorWrapper = syncErrorWrapper;
const asyncErrorWrapper = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            (0, logError_1.logError)(err);
            next(err);
        });
    };
};
exports.asyncErrorWrapper = asyncErrorWrapper;
