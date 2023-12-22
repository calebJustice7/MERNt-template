"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class GoogleClient {
    constructor(client_id, client_secret, redirect_uri) {
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.redirect_uri = redirect_uri;
        this.axiosInstance = axios_1.default.create({
            baseURL: "https://accounts.google.com",
        });
    }
    getAccessTokenFromCode(authCode) {
        return this.axiosInstance
            .post("/o/oauth2/token", {
            grant_type: "authorization_code",
            code: authCode,
            client_id: this.client_id,
            client_secret: this.client_secret,
            redirect_uri: this.redirect_uri,
        })
            .then((res) => res.data);
    }
    getUser(token) {
        return this.axiosInstance
            .get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
            .then((res) => res.data);
    }
}
exports.default = GoogleClient;
