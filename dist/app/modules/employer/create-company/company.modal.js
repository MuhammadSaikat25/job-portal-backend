"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModal = void 0;
const mongoose_1 = require("mongoose");
const companySchema = new mongoose_1.Schema({
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, default: "" },
    teamSize: { type: String, required: true },
    aboutCompany: { type: [String], required: true },
    CompanyDescription: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true,
});
exports.CompanyModal = (0, mongoose_1.model)("company", companySchema);
