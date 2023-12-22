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
const user_1 = __importDefault(require("./user"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const getUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.default.find(query);
});
const createUser = (user) => {
    return new user_1.default(user).save();
};
const updateUserById = (_id, update) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.default.findByIdAndUpdate(_id, update);
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(id);
    if (!user)
        throw new AppError_1.default("User not found", `User ${id} not found`, true, 404);
    return user;
});
exports.default = {
    getUsers,
    createUser,
    updateUserById,
    getUserById,
};
