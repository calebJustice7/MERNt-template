import { z } from "zod";
import { findQuery } from "../../validators/common";

export const findUsersValidator = z.object({
    query: findQuery,
});
