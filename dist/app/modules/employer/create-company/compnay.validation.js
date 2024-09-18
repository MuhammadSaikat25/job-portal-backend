"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companySchema = void 0;
const zod_1 = require("zod");
exports.companySchema = zod_1.z.object({
    body: zod_1.z.object({
        companyName: zod_1.z.string(),
        email: zod_1.z.string().email("Invalid email address"),
        phone: zod_1.z.string(),
        website: zod_1.z.string(),
        teamSize: zod_1.z.string(),
        aboutCompany: zod_1.z
            .array(zod_1.z.string())
            .min(1, "At least one description is required"),
        CompanyDescription: zod_1.z.string(),
        address: zod_1.z.string().min(1, "Address is required"),
        city: zod_1.z.string().min(1, "City is required"),
        country: zod_1.z.string().min(1, "Country is required"),
        image: zod_1.z.string().url("Invalid image URL"),
    }),
});
