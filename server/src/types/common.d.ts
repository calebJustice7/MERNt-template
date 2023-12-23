import { types } from "mongoose";
import { actions, subjects } from "../auth/appAbility";

declare global {
    interface ObjectId extends types.ObjectId {}

    interface Doc {
        created_at: Date;
        updated_at: Date;
        _id: string | ObjectId;
    }

    type Actions = typeof actions;
    type Subjects = typeof subjects;
}
