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

const getUserAndPermissions = async (id: ObjectId) => {
    const users = (await Users.aggregate([
        { $match: { _id: id } },
        {
            $lookup: {
                from: "roles",
                as: "full_role",
                localField: "role",
                foreignField: "_id",
            },
        },
        {
            $unwind: "$full_role",
        },
    ])) as (UserFull & { full_role: RoleFull })[];

    if (!users || !users.length || !users[0].role) {
        if (!users) throw new AppError("User OR role not found", `User ${id} not found`, true, 404);
    }

    return users[0];
};

const findUsers = async (query: FindQuery) => {
    const usersFn = Users.find(query.where)
        .skip(query.page * query.pageSize)
        .sort(query.sort);

    return await usersFn;
};

export default {
    getUsers,
    createUser,
    updateUserById,
    getUserById,
    getUserAndPermissions,
    findUsers,
};
