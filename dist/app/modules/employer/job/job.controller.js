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
exports.jobController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const job_service_1 = require("./job.service");
const createJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield job_service_1.jobService.createJob(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            data: error,
        });
    }
});
const getAllApplicants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req === null || req === void 0 ? void 0 : req.user.email;
    try {
        const result = yield job_service_1.jobService.getAllApplicants(email);
        res.status(http_status_1.default.OK).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            data: error,
        });
    }
});
const getCompanyAllJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req === null || req === void 0 ? void 0 : req.user.email;
    try {
        const result = yield job_service_1.jobService.getCompanyAllJob(email);
        res.status(http_status_1.default.OK).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).json({
            success: true,
            data: error,
        });
    }
});
const approvedApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const companyEmail = req === null || req === void 0 ? void 0 : req.user.email;
    try {
        const result = yield job_service_1.jobService.approvedApplication(req.params.id, companyEmail);
        res.status(http_status_1.default.OK).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).json({
            success: true,
            data: error,
        });
    }
});
const rejectApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const companyEmail = req === null || req === void 0 ? void 0 : req.user.email;
    try {
        const result = yield job_service_1.jobService.rejectApplication(req.params.id, companyEmail);
        res.status(http_status_1.default.OK).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).json({
            success: true,
            data: error,
        });
    }
});
const updateJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield job_service_1.jobService.updateJob(req.body, id);
        res.status(http_status_1.default.OK).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(http_status_1.default.BAD_REQUEST).json({
            success: true,
            data: error,
        });
    }
});
exports.jobController = {
    createJob,
    getAllApplicants,
    getCompanyAllJob,
    approvedApplication,
    rejectApplication,
    updateJob,
};
