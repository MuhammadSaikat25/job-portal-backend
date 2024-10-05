"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const user_route_1 = require("./app/modules/users/user.route");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const company_route_1 = require("./app/modules/employer/create-company/company.route");
const job_route_1 = require("./app/modules/employer/job/job.route");
const profile_route_1 = require("./app/modules/candidate/create-profile/profile.route");
const resume_route_1 = require("./app/modules/candidate/resume/resume.route");
const job_route_2 = require("./app/modules/jobs/job.route");
const message_route_1 = require("./app/modules/messages/message.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Other-Custom-Header"],
}));
app.get("/", (_, res) => {
    res.send("Looking for job ?");
});
app.use("/api/v1", user_route_1.userRoute, company_route_1.companyRoute, job_route_1.jobRoute, profile_route_1.candidateProfileRoute, resume_route_1.resumeRouter, job_route_2.jobRouter, message_route_1.messageRouter);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
