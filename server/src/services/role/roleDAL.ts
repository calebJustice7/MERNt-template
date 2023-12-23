import AppError from "../../error/AppError";
import Roles from "./role";

const getDefaultRole = async () => {
    const role = await Roles.findOne({ default: true });

    if (!role) throw new AppError("No Default Role", "No default role", false, 404);

    return role;
};

export default {
    getDefaultRole,
};
