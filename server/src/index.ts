import dotenv from "dotenv";
import Server from "./server";

dotenv.config();

(async () => {
    const server = new Server();
    await server.initializeDatabase();
    server.start();
})();
