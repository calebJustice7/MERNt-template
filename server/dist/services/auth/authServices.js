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
exports.getUserFromSession = exports.upsertUser = exports.authenticateWithGoogle = exports.generateGoogleUrl = void 0;
const ensureEnv_1 = __importDefault(require("../../helpers/ensureEnv"));
const toObjectId_1 = __importDefault(require("../../helpers/toObjectId"));
const googleServices_1 = require("../google/googleServices");
const userServices_1 = require("../user/userServices");
const generateGoogleUrl = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${(0, ensureEnv_1.default)("GOOGLE_CLIENT_ID")}&redirect_uri=${(0, ensureEnv_1.default)("GOOGLE_REDIRECT_URI")}&response_type=code&scope=profile email`;
    return url;
};
exports.generateGoogleUrl = generateGoogleUrl;
const authenticateWithGoogle = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenResponse = yield (0, googleServices_1.getAccessTokenFromCode)(code);
    const user = yield (0, googleServices_1.getUser)(tokenResponse.access_token);
    return user;
});
exports.authenticateWithGoogle = authenticateWithGoogle;
const upsertUser = (google_user) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userServices_1.getUsers)({ google_identifier: google_user.sub });
    if (!user || !user.length) {
        return (0, userServices_1.createUser)({
            name: google_user.name,
            email: google_user.email,
            picture: google_user.picture,
            google_identifier: google_user.sub,
            permissions: [],
        });
    }
    else {
        return (0, userServices_1.updateUserById)(user[0]._id, {
            name: google_user.name,
            picture: google_user.picture,
            email: google_user.email,
        });
    }
});
exports.upsertUser = upsertUser;
const getUserFromSession = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        return null;
    return (0, userServices_1.getUserById)((0, toObjectId_1.default)(userId));
});
exports.getUserFromSession = getUserFromSession;
