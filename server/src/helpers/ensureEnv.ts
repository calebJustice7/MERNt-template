import AppError from "../error/AppError";

const ensureEnv = (envName: string) => {
    const envVar = process.env[envName];

    if (!envVar) {
        throw new AppError("Env", `Env var ${envName} Does not exist`, false, 500);
    }
    return envVar;
};

export default ensureEnv;
