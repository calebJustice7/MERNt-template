"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const HttpStatusCodes_1 = require("../error/HttpStatusCodes");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(HttpStatusCodes_1.HttpStatusCode.BAD_REQUEST).send(err.errors);
        }
        else {
            return res.status(HttpStatusCodes_1.HttpStatusCode.BAD_REQUEST).send("Validation Error");
        }
    }
};
exports.validate = validate;
