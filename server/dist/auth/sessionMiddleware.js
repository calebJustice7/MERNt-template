"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
exports.default = () => (0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "",
    cookie: {
        path: "/",
        httpOnly: true,
        // maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
        maxAge: 1000 * 60 * 0.1, // 30 seconds
        sameSite: true,
        secure: process.env.NODE_ENV === "dev" ? false : true,
    },
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        autoRemove: "interval",
        autoRemoveInterval: 60,
        clientPromise: mongoose_1.default.connection.asPromise().then((con) => con.getClient()),
    }),
});
