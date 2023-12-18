import mongoose, { Schema } from "mongoose";

const UsersSchema = new Schema({});

const Users = mongoose.model("Users", UsersSchema);

export default Users;
