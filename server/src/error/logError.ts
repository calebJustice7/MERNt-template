import axios from "axios";
import AppError from "./AppError";
import { ForbiddenError } from "@casl/ability";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logError = (error: any) => {
    if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
    } else if (error instanceof AppError) {
        console.log(error.name, "\n", error.message);
    } else if (error instanceof ForbiddenError) {
        console.log("User cannot perform ", error.action, " on ", error.subject);
    } else {
        console.log(error);
    }
};
