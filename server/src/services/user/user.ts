import mongoose, { Schema } from "mongoose";

const UsersSchema = new Schema<UserFull>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    google_identifier: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, required: true },
    created_at: { type: Date, default: () => new Date() },
    updated_at: { type: Date, default: () => new Date() },
});

const Users = mongoose.model<UserFull>("Users", UsersSchema);

export default Users;
