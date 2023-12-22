"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../error/AppError"));
const ensureEnv = (envName) => {
    const envVar = process.env[envName];
    if (!envVar) {
        throw new AppError_1.default("Env", `Env var ${envName} Does not exist`, false, 500);
    }
    return envVar;
};
exports.default = ensureEnv;
