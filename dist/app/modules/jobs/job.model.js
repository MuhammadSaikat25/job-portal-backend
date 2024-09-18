"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appliedJobModel = void 0;
const mongoose_1 = require("mongoose");
const appliedJobSchema = new mongoose_1.Schema({
    job: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "job",
    },
    resume: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "resume",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    applicationStatus: {
        type: String,
        enum: ["rejected", "approved", "pending"],
        default: "pending",
    },
}, {
    timestamps: true,
});
exports.appliedJobModel = (0, mongoose_1.model)("appliedJOb", appliedJobSchema);
