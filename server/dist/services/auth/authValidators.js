"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCallbackValidator = void 0;
const zod_1 = require("zod");
exports.googleCallbackValidator = zod_1.z.object({
    query: zod_1.z.object({
        code: zod_1.z.string(),
        scope: zod_1.z.string(),
        authuser: zod_1.z.string(),
        prompt: zod_1.z.string(),
    }),
});
