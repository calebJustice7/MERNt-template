import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logError = (error: any) => {
    if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
    } else {
        console.log(error);
    }
};
