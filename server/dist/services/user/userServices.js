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
exports.getUserById = exports.updateUserById = exports.createUser = exports.getUsers = void 0;
const userDAL_1 = __importDefault(require("./userDAL"));
const getUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return userDAL_1.default.getUsers(query);
});
exports.getUsers = getUsers;
const createUser = (user) => {
    return userDAL_1.default.createUser(user);
};
exports.createUser = createUser;
const updateUserById = (_id, update) => __awaiter(void 0, void 0, void 0, function* () {
    return userDAL_1.default.updateUserById(_id, update);
});
exports.updateUserById = updateUserById;
const getUserById = (id) => {
    return userDAL_1.default.getUserById(id);
};
exports.getUserById = getUserById;
