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
    const { jobType, jobPosition, experience, salary, limit = 10, page = 1, } = query || {};
    const filter = {};
    if (jobType) {
        filter.jobType = {
            $in: jobType
                .split(",")
                .map((type) => new RegExp(type.trim(), "i")),
        };
    }
    if (jobPosition) {
        filter.position = {
            $in: jobPosition
                .split(",")
                .map((position) => new RegExp(position.trim(), "i")),
        };
    }
    if (experience) {
        filter.experience = {
            $in: experience.split(",").map((exp) => exp.trim()),
        };
    }
    if (salary) {
        const salaryArray = salary.split(",").map(Number);
        if (salaryArray.length === 2 &&
            !isNaN(salaryArray[0]) &&
            !isNaN(salaryArray[1])) {
            filter.salary = {
                $gte: salaryArray[0],
                $lte: salaryArray[1],
            };
        }
    }
    const skip = (page - 1) * (limit || 10);
    const totalJob = yield job_model_1.jobModel.countDocuments();
    const result = yield job_model_1.jobModel
        .find(filter)
        .populate("company")
        .skip(skip)
        .limit(limit);
    return {
        result,
        totalJob,
    };
});
const getSingleJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_1.jobModel.findById(id).populate("company");
    if (!result) {
        throw new Error("Job not found");
    }
    const jobTitle = new RegExp(result.title, "i");
    const Jobs = yield job_model_1.jobModel.find({ title: jobTitle }).populate("company");
    const matchingJobs = Jobs.filter((job) => job._id.toString() !== id.toString());
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
const popularJob = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_1.jobModel.find().populate("company");
    const popularJob = result
        .sort((a, b) => Number(b.applied) - Number(a.applied))
        .slice(0, 6);
    return popularJob;
});
const candidateOverview = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const allAppliedJob = yield job_model_2.appliedJobModel.find().populate("user");
    const myAppliedJob = allAppliedJob.filter((applied) => applied.user.email === email);
    const approved = myAppliedJob.filter((applied) => applied.applicationStatus === "approved");
    const pending = myAppliedJob.filter((applied) => applied.applicationStatus === "pending");
    const rejected = myAppliedJob.filter((applied) => applied.applicationStatus === "rejected");
    const applications = myAppliedJob;
    const analytics = {};
    for (let month = 0; month < 12; month++) {
        const now = new Date();
        const date = new Date(now.getFullYear(), now.getMonth() - month, 1);
        const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
        analytics[yearMonth] = 0;
    }
    applications.forEach((app) => {
        const createdAt = new Date(app.createdAt);
        const yearMonth = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
        if (analytics[yearMonth] !== undefined) {
            analytics[yearMonth]++;
        }
    });
    return {
        myAppliedJob,
        approved,
        pending,
        rejected,
        analytics,
    };
});
const searchJob = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, location } = query;
    const searchConditions = [];
    if (title && typeof title === "string") {
        searchConditions.push({ title: { $regex: title, $options: "i" } });
    }
    if (location && typeof location === "string") {
        searchConditions.push({ country: { $regex: location, $options: "i" } });
    }
    if (searchConditions.length > 0) {
        const result = yield job_model_1.jobModel
            .find({
            $or: searchConditions,
        })
            .populate("company");
        return result;
    }
    else {
        return [];
    }
});
exports.jobService = {
    getAllJob,
    getSingleJob,
    appliedJOb,
    singleAppliedJob,
    getAllAppliedJob,
    popularJob,
    candidateOverview,
    searchJob,
};
