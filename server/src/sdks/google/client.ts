import axios, { AxiosInstance } from "axios";
import { TokenResponse, UserResponse } from "./response";

class GoogleClient {
    private readonly client_id: string;
    private readonly client_secret: string;
    private readonly redirect_uri: string;
    private readonly axiosInstance: AxiosInstance;

    constructor(client_id: string, client_secret: string, redirect_uri: string) {
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.redirect_uri = redirect_uri;

        this.axiosInstance = axios.create({
            baseURL: "https://accounts.google.com",
        });
    }

    getAccessTokenFromCode(authCode: string) {
        return this.axiosInstance
            .post<TokenResponse>("/o/oauth2/token", {
                grant_type: "authorization_code",
                code: authCode,
                client_id: this.client_id,
                client_secret: this.client_secret,
                redirect_uri: this.redirect_uri,
            })
            .then((res) => res.data);
    }

    getUser(token: string) {
        return this.axiosInstance
            .get<UserResponse>(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
            .then((res) => res.data);
    }
}

export default GoogleClient;
