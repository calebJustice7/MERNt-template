import ensureEnv from "../../helpers/ensureEnv";
import { getAccessTokenFromCode, getUser } from "../google/googleServices";

export const generateGoogleUrl = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${ensureEnv(
        "GOOGLE_CLIENT_ID",
    )}&redirect_uri=${ensureEnv("GOOGLE_REDIRECT_URI")}&response_type=code&scope=profile email`;

    return url;
};

export const authenticateWithGoogle = async (code: string) => {
    const tokenResponse = await getAccessTokenFromCode(code);

    const user = await getUser(tokenResponse.access_token);

    console.log(user);
    return user;
};
