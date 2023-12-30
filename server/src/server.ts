import express, { Express } from "express";
import mongoose from "mongoose";
import ensureEnv from "./helpers/ensureEnv";
import authRouter from "./services/auth/authAPI";
import usersRouter from "./services/user/userAPI";
import errorMiddleware from "./error/errorMiddleware";
import cors from "cors";
import sessionMiddleware from "./auth/sessionMiddleware";
import { envVars } from "./config";
import { Server as HttpServer } from "http";

class Server {
    app: Express;
    mongo_uri: string;
    base_uri: string;
    server?: HttpServer;

    constructor() {
        this.app = express();
        this.base_uri = "/api/v1";
        this.mongo_uri = ensureEnv("MONGO_URI");
    }

    initializeEndpoints(): void {
        this.app.use(sessionMiddleware());
        this.app.use(cors({ credentials: true, origin: ensureEnv("BASE_URL") }));

        this.app.use(this.base_uri + "/auth", authRouter);
        this.app.use(this.base_uri + "/users", usersRouter);
        this.app.get("/health-check", (_req, res) => res.status(200).send("Healthy"));

        this.app.use(errorMiddleware);
    }

    verifyEnv(): void {
        envVars.forEach((envVar) => {
            ensureEnv(envVar);
        });
    }

    close(): void {
        console.log("Closing time\n\n\n");
        if (this.server) {
            this.server.close(() => {
                console.log("Server closed.");
                mongoose.connection.close();
                process.exit(0);
            });
        }

        setTimeout(() => {
            console.error("Could not close connections in time, forcefully shutting down");
            process.exit(1);
        }, 5000);
    }

    async initializeDatabase() {
        await mongoose.connect(this.mongo_uri);
        console.log("DB Connected");
    }

    async start(): Promise<void> {
        // this.verifyEnv();

        // const port = Number(ensureEnv("PORT"));
        const port = 4200;

        this.initializeEndpoints();

        this.server = this.app.listen(port, () => {
            console.log(`API running on port ${port}`);
            return Promise.resolve();
        });
    }
}

export default Server;
