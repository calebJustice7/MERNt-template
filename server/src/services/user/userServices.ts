import { FilterQuery, UpdateQuery } from "mongoose";
import userDAL from "./userDAL";

export const getUsers = async (query: FilterQuery<UserFull>) => {
    return userDAL.getUsers(query);
};

export const createUser = (user: User) => {
    return userDAL.createUser(user);
};

export const updateUserById = async (_id: ObjectId, update: UpdateQuery<UserFull>) => {
    return userDAL.updateUserById(_id, update);
};

export const getUserById = (id: ObjectId) => {
    return userDAL.getUserById(id);
};

export const getUserAndPermissions = (id: ObjectId) => {
    return userDAL.getUserAndPermissions(id);
};

export const findUsers = async (query: FindQuery) => {
    return userDAL.findUsers(query);
};
