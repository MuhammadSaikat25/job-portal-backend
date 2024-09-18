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
const job_model_1 = require("../../jobs/job.model");
const company_modal_1 = require("../create-company/company.modal");
const job_model_2 = require("./job.model");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMail_1 = __importDefault(require("../../../../utils/sendMail"));
const user_model_1 = require("../../users/user.model");
const createJob = (playLod) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_2.jobModel.create(playLod);
    return result;
});
const getAllApplicants = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllApplicants = yield job_model_1.appliedJobModel
        .find()
        .populate({
        path: "job",
        populate: {
            path: "company",
        },
    })
        .populate({
        path: "resume",
        populate: {
            path: "candidateProfile",
        },
    })
        .populate({
        path: "user",
        select: "-password",
    });
    const myApplicants = getAllApplicants.filter((job) => job.job.company.email === email);
    return myApplicants;
});
const getCompanyAllJob = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const getCompany = yield company_modal_1.CompanyModal.findOne({ email });
    const allJob = yield job_model_2.jobModel.find().populate("company");
    const companyId = getCompany === null || getCompany === void 0 ? void 0 : getCompany._id.toString();
    const result = allJob.filter((job) => job.company._id.toString() === companyId);
    return result;
});
const approvedApplication = (id, companyEmail) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const candidate = yield job_model_1.appliedJobModel.findById(id).populate("user");
    const getCandidate = yield user_model_1.UserModel.findById((_a = candidate === null || candidate === void 0 ? void 0 : candidate.user) === null || _a === void 0 ? void 0 : _a.id.toString());
    const company = yield company_modal_1.CompanyModal.findOne({ email: companyEmail });
    const image = company === null || company === void 0 ? void 0 : company.image;
    const companyName = company === null || company === void 0 ? void 0 : company.companyName;
    const result = yield job_model_1.appliedJobModel.findByIdAndUpdate(id, {
        applicationStatus: "approved",
    });
    const mailData = {
        response: {
            image,
            companyName,
            candidateName: getCandidate === null || getCandidate === void 0 ? void 0 : getCandidate.name,
        },
    };
    const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../../../../mail/approved-email.ejs"), mailData);
    yield (0, sendMail_1.default)({
        email: getCandidate === null || getCandidate === void 0 ? void 0 : getCandidate.email,
        subject: "Update on Your Application",
        template: "approved-email.ejs",
        data: mailData,
        companyEmail,
    });
    return result;
});
const rejectApplication = (id, companyEmail) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const candidate = yield job_model_1.appliedJobModel
        .findById(id)
        .populate("user")
        .populate("job");
    const getCandidate = yield user_model_1.UserModel.findById((_a = candidate === null || candidate === void 0 ? void 0 : candidate.user) === null || _a === void 0 ? void 0 : _a.id.toString());
    const company = yield company_modal_1.CompanyModal.findOne({ email: companyEmail });
    const image = company === null || company === void 0 ? void 0 : company.image;
    const companyName = company === null || company === void 0 ? void 0 : company.companyName;
    const result = yield job_model_1.appliedJobModel.findByIdAndUpdate(id, {
        applicationStatus: "rejected",
    });
    const mailData = {
        response: {
            image,
            companyName,
            candidateName: getCandidate === null || getCandidate === void 0 ? void 0 : getCandidate.name,
        },
    };
    const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../../../../mail/rejected-email.ejs"), mailData);
    yield (0, sendMail_1.default)({
        email: getCandidate === null || getCandidate === void 0 ? void 0 : getCandidate.email,
        subject: "Update on Your Application",
        template: "rejected-email.ejs",
        data: mailData,
        companyEmail,
    });
    return result;
});
const updateJob = (playLoad, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield job_model_2.jobModel.findByIdAndUpdate(id, Object.assign({}, playLoad), { new: true, upsert: true, runValidators: true });
    return result;
});
exports.jobService = {
    createJob,
    getAllApplicants,
    getCompanyAllJob,
    approvedApplication,
    rejectApplication,
    updateJob,
};
