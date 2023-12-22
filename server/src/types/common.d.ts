import { types } from "mongoose";

declare global {
    interface ObjectId extends types.ObjectId {}

    interface Doc {
        created_at: Date;
        updated_at: Date;
        _id: string | ObjectId;
    }
}
