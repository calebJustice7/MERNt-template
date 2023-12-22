import express, { Express } from "express";
import mongoose from "mongoose";
import ensureEnv from "./helpers/ensureEnv";
import authRouter from "./services/auth/authAPI";
import errorMiddleware from "./error/errorMiddleware";
import cors from "cors";
import sessionMiddleware from "./auth/sessionMiddleware";

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

    async initializeDatabase() {
        await mongoose.connect(this.mongo_uri);
        console.log("DB Connected");
    }

    async start(): Promise<void> {
        const port = process.env.PORT || 3000;

        this.initializeEndpoints();

        this.app.listen(port, () => {
            console.log(`API running on port ${port}`);
            return Promise.resolve();
        });
    }
}

export default Server;
