"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../error/AppError"));
function toObjectId(id) {
    if (typeof id === "string") {
        try {
            return new mongoose_1.Types.ObjectId(id);
        }
        catch (err) {
            throw new AppError_1.default("Invalid _id", `An invalid ObjectId was provided ${id}`, true, 500);
        }
    }
    return id;
}
exports.default = toObjectId;
