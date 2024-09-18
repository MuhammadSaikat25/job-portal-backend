"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobService = void 0;
const job_model_1 = require("../employer/job/job.model");
const user_model_1 = require("../users/user.model");
const job_model_2 = require("./job.model");
const mongoose_1 = __importDefault(require("mongoose"));
const getAllJob = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobType, jobPosition, experience, salary } = query;
    const filter = {};
    if (jobType)
        filter.jobType = new RegExp(jobType, "i");
    if (jobPosition)
        filter.position = new RegExp(jobPosition, "i");
    if (experience)
        filter.experience = experience;
    if (salary && salary.includes(",")) {
        const salaryRange = salary.split(",").map(Number);
        // filter.salary = {
        //   $gte: salaryRange[0],
        //   $lte: salaryRange[1],
        // };
    }
    const result = yield job_model_1.jobModel.find(filter).populate("company");
    return result;
});
const getSingleJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_1.jobModel.findById(id).populate("company");
    if (!result) {
        throw new Error("Job not found");
    }
    const jobTitle = new RegExp(result.title, "i");
    const Jobs = yield job_model_1.jobModel.find({ title: jobTitle }).populate("company");
    const matchingJobs = Jobs.filter((job) => job._id.toString() == id.toString());
    return {
        singleJob: result,
        matchingJobs,
    };
});
const appliedJOb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield job_model_2.appliedJobModel.create(payload);
    const job = yield job_model_1.jobModel.findById(payload.job);
    if (!job) {
        return;
    }
    const currentApplications = (_a = job.applied) !== null && _a !== void 0 ? _a : 0;
    yield job_model_1.jobModel.findByIdAndUpdate(payload.job, {
        applied: Number(currentApplications) + 1,
    });
    return result;
});
const singleAppliedJob = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const loginUser = user._id;
    const allAppliedJob = yield job_model_2.appliedJobModel.find({
        user: new mongoose_1.default.Types.ObjectId(loginUser),
        job: new mongoose_1.default.Types.ObjectId(id),
    });
    return allAppliedJob;
});
const getAllAppliedJob = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const getCandidate = yield user_model_1.UserModel.findOne({ email });
    const getCandidateApplied = yield job_model_2.appliedJobModel
        .find({
        user: getCandidate === null || getCandidate === void 0 ? void 0 : getCandidate._id,
    })
        .populate("resume")
        .populate("user")
        .populate({
        path: "job",
        populate: {
            path: "company",
        },
    });
    return getCandidateApplied;
});
exports.jobService = {
    getAllJob,
    getSingleJob,
    appliedJOb,
    singleAppliedJob,
    getAllAppliedJob,
};