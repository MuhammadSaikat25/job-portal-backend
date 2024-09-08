import express from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { userRoute } from "./app/modules/users/user.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import { companyRoute } from "./app/modules/employer/create-company/company.route";
import { jobRoute } from "./app/modules/employer/post-job/job.route";
import { candidateProfileRoute } from "./app/modules/candidate/create-profile/profile.route";
import { resumeRouter } from "./app/modules/candidate/resume/resume.route";
import { jobRouter } from "./app/modules/jobs/job.route";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Other-Custom-Header"],
  })
);

app.get("/", (_, res) => {
  res.send("Looking for job ?");
});
app.use(
  "/api/v1",
  userRoute,
  companyRoute,
  jobRoute,
  candidateProfileRoute,
  resumeRouter,
  jobRouter
);

app.use(globalErrorHandler);
app.use(notFound);
export default app;
