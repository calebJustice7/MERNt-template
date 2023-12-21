import GoogleClient from "../../sdks/google/client";

const googleClient = new GoogleClient(
    process.env.GOOGLE_CLIENT_ID || "",
    process.env.GOOGLE_CLIENT_SECRET || "",
    process.env.GOOGLE_REDIRECT_URI || "",
);

export const getAccessTokenFromCode = async (code: string) => {
    return googleClient.getAccessTokenFromCode(code);
};

export const getUser = async (token: string) => {
    return googleClient.getUser(token);
};
