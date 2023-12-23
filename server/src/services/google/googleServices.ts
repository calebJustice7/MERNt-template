import ensureEnv from "../../helpers/ensureEnv";
import GoogleClient from "../../sdks/google/client";

const googleClient = new GoogleClient(
    ensureEnv("GOOGLE_CLIENT_ID"),
    ensureEnv("GOOGLE_CLIENT_SECRET"),
    ensureEnv("GOOGLE_REDIRECT_URI"),
);

export const getAccessTokenFromCode = async (code: string) => {
    return googleClient.getAccessTokenFromCode(code);
};

export const getUser = async (token: string) => {
    return googleClient.getUser(token);
};
