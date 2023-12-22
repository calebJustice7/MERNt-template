import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

export default () =>
    session({
        secret: process.env.SESSION_SECRET || "",
        cookie: {
            path: "/",
            httpOnly: true,
            // maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
            maxAge: 1000 * 60 * 0.25, // 15 seconds
            sameSite: true,
            secure: process.env.NODE_ENV === "dev" ? false : true,
        },
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            autoRemove: "interval",
            autoRemoveInterval: 60, // in minutes
            clientPromise: mongoose.connection.asPromise().then((con) => con.getClient()),
        }),
    });
