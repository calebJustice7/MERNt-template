import express, { Express } from "express";
import mongoose from "mongoose";
import ensureEnv from "./helpers/ensureEnv";
import authRouter from "./services/auth/authAPI";
import errorMiddleware from "./error/errorMiddleware";
import cors from "cors";
import sessionMiddleware from "./auth/sessionMiddleware";
import { envVars } from "./config";

class Server {
    app: Express;
    mongo_uri: string;
    base_uri: string;

    constructor() {
        this.app = express();
        this.base_uri = "/api/v1";
        this.mongo_uri = ensureEnv("MONGO_URI");
    }

    initializeEndpoints(): void {
        this.app.use(sessionMiddleware());
        this.app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
        this.app.use(this.base_uri + "/auth", authRouter);
        this.app.use(errorMiddleware);
    }

    verifyEnv(): void {
        envVars.forEach((envVar) => {
            ensureEnv(envVar);
        });
    }

    async initializeDatabase() {
        await mongoose.connect(this.mongo_uri);
        console.log("DB Connected");
    }

    async start(): Promise<void> {
        this.verifyEnv();

        const port = Number(ensureEnv("PORT"));

        this.initializeEndpoints();

        this.app.listen(port, () => {
            console.log(`API running on port ${port}`);
            return Promise.resolve();
        });
    }
}

export default Server;
