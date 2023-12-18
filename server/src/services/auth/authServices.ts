import ensureEnv from "../../helpers/ensureEnv";

export const generateGoogleUrl = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${ensureEnv(
        "GOOGLE_CLIENT_ID",
    )}&redirect_uri=${ensureEnv("GOOGLE_REDIRECT_URI")}&response_type=token&scope=profile email`;

    return url;
};
