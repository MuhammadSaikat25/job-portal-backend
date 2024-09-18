"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeModel = void 0;
const mongoose_1 = require("mongoose");
const educationSchema = new mongoose_1.Schema({
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true },
});
const worksSchema = new mongoose_1.Schema({
    positionName: { type: String, required: true },
    company: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true },
});
const projectSchema = new mongoose_1.Schema({
    projectName: { type: String, required: true },
    liveLink: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true },
});
const resumeSchema = new mongoose_1.Schema({
    email: String,
    description: String,
    candidateProfile: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "candidateProfile",
    },
    skill: [String],
    education: [educationSchema],
    works: [worksSchema],
    project: [projectSchema],
}, {
    timestamps: true,
});
exports.ResumeModel = (0, mongoose_1.model)("resume", resumeSchema);
