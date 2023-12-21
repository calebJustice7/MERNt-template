import dotenv from "dotenv";
dotenv.config();
import Server from "./server";

(async () => {
    const server = new Server();
    await server.initializeDatabase();
    server.start();
})();
