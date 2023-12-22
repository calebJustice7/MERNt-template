import { Types } from "mongoose";
import AppError from "../error/AppError";

export default function toObjectId(id: string | ObjectId) {
    if (typeof id === "string") {
        try {
            return new Types.ObjectId(id);
        } catch (err) {
            throw new AppError("Invalid _id", `An invalid ObjectId was provided ${id}`, true, 500);
        }
    }
    return id;
}
