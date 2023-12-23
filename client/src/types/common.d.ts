// import { types } from "mongoose";
import { actions, subjects } from "../auth/ability";

declare global {
  interface Doc {
    created_at: Date;
    updated_at: Date;
    _id: string;
  }

  type Actions = typeof actions;
  type Subjects = typeof subjects;
}
