"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateProfileModel = void 0;
const mongoose_1 = require("mongoose");
const candidateProfileSchema = new mongoose_1.Schema({
    address: {
        type: String,
        required: true,
    },
    image: String,
    age: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    currentSalary: {
        type: String,
        required: true,
        enum: ["40-70", "60-90", "70-100", "100-150"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    expectedSalary: {
        type: String,
        required: true,
        enum: ["40-70", "60-90", "70-100", "100-150", "120-300"],
    },
    experience: {
        type: String,
        required: true,
        enum: ["1-3", "3-5", "6-8", "10+"],
    },
    jobTitle: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.candidateProfileModel = (0, mongoose_1.model)("candidateProfile", candidateProfileSchema);
