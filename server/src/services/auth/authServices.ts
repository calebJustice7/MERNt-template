import ensureEnv from "../../helpers/ensureEnv";
import toObjectId from "../../helpers/toObjectId";
import { UserResponse } from "../../sdks/google/response";
import { getAccessTokenFromCode, getUser } from "../google/googleServices";
import { createUser, getUsers, updateUserById, getUserById } from "../user/userServices";

export const generateGoogleUrl = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${ensureEnv(
        "GOOGLE_CLIENT_ID",
    )}&redirect_uri=${ensureEnv("GOOGLE_REDIRECT_URI")}&response_type=code&scope=profile email`;

    return url;
};

export const authenticateWithGoogle = async (code: string) => {
    const tokenResponse = await getAccessTokenFromCode(code);

    const user = await getUser(tokenResponse.access_token);

    return user;
};

export const upsertUser = async (google_user: UserResponse) => {
    const user = await getUsers({ google_identifier: google_user.sub });

    if (!user || !user.length) {
        return createUser({
            name: google_user.name,
            email: google_user.email,
            picture: google_user.picture,
            google_identifier: google_user.sub,
            permissions: [],
        });
    } else {
        return updateUserById(user[0]._id, {
            name: google_user.name,
            picture: google_user.picture,
            email: google_user.email,
        });
    }
};

export const getUserFromSession = async (userId?: ObjectId | string) => {
    if (!userId) return null;

    return getUserById(toObjectId(userId));
};
