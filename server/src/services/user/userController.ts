import { z } from "zod";
import { AsyncRequestHandler, asyncErrorWrapper } from "../../error/errorWrapper";
import { findUsersValidator } from "./userValidators";
import { findUsers } from "./userServices";
import { HttpStatusCode } from "../../consts/HttpStatusCodes";

const findUsersController: AsyncRequestHandler = async (req, res) => {
    const { query } = req as unknown as z.infer<typeof findUsersValidator>;

    const users = await findUsers(query);

    res.status(HttpStatusCode.OK).json(users);
};

export default {
    findUsersController: asyncErrorWrapper(findUsersController),
};
