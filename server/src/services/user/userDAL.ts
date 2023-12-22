import { FilterQuery, UpdateQuery } from "mongoose";
import Users from "./user";
import AppError from "../../error/AppError";

const getUsers = async (query: FilterQuery<UserFull>) => {
    return Users.find(query);
};

const createUser = (user: User) => {
    return new Users(user).save();
};

const updateUserById = async (_id: ObjectId, update: UpdateQuery<UserFull>) => {
    return Users.findByIdAndUpdate(_id, update);
};

const getUserById = async (id: ObjectId) => {
    const user = await Users.findById(id);

    if (!user) throw new AppError("User not found", `User ${id} not found`, true, 404);

    return user;
};

export default {
    getUsers,
    createUser,
    updateUserById,
    getUserById,
};
