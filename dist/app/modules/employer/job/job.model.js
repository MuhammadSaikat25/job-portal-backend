"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobModel = void 0;
const mongoose_1 = require("mongoose");
const JobSchema = new mongoose_1.Schema({
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "company",
    },
    applied: { type: Number, default: 0 },
    country: { type: String, required: true },
    deadline: { type: String, required: true },
    description: { type: String, required: true },
    experience: { type: String, required: true },
    gender: { type: String, required: true },
    jobType: { type: String, required: true },
    position: { type: String, required: true },
    responsibilities: { type: [String], required: true },
    salary: { type: Number, required: true },
    skills: { type: [String], required: true },
    title: { type: String, required: true },
}, {
    timestamps: true,
});
exports.jobModel = (0, mongoose_1.model)("job", JobSchema);
