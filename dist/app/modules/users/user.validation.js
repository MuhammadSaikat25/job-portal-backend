"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidation = void 0;
const zod_1 = require("zod");
exports.createUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        role: zod_1.z.enum(["admin", "candidate", "employer"]),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8),
        avatar: zod_1.z.string().url().optional(),
    }),
});
