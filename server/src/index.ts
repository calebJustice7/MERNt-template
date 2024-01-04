import dotenv from "dotenv";
dotenv.config();
import Server from "./server";

(async () => {
    const server = new Server();
    server.initializeDatabase();
    server.start();

    // process.on("SIGTERM", server.close);
    // process.on("SIGINT", server.close);
    // process.on("exit", server.close);
    // process.on("SIGQUIT", server.close);
    // process.on("SIGUSR1", server.close);
    // process.on("SIGUSR2", server.close);
    // process.on("SIGHUP", server.close);
})();
