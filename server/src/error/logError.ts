import axios from "axios";
import AppError from "./AppError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logError = (error: any) => {
    if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
    } else if (error instanceof AppError) {
        console.log(error.name, "\n", error.message);
    } else {
        console.log(error);
    }
};
