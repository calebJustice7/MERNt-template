"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const ensureEnv_1 = __importDefault(require("./helpers/ensureEnv"));
const authAPI_1 = __importDefault(require("./services/auth/authAPI"));
const errorMiddleware_1 = __importDefault(require("./error/errorMiddleware"));
const cors_1 = __importDefault(require("cors"));
const sessionMiddleware_1 = __importDefault(require("./auth/sessionMiddleware"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.base_uri = "/api/v1";
        this.mongo_uri = (0, ensureEnv_1.default)("MONGO_URI");
    }
    initializeEndpoints() {
        this.app.use((0, sessionMiddleware_1.default)());
        this.app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:5173" }));
        this.app.use(this.base_uri + "/auth", authAPI_1.default);
        this.app.use(errorMiddleware_1.default);
    }
    initializeDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(this.mongo_uri);
            console.log("DB Connected");
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const port = process.env.PORT || 3000;
            this.initializeEndpoints();
            this.app.listen(port, () => {
                console.log(`API running on port ${port}`);
                return Promise.resolve();
            });
        });
    }
}
exports.default = Server;
