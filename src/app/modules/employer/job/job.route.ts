import { Router } from "express";
import { jobController } from "./job.controller";
import { authValidation } from "../../../middlewares/auth";

const route = Router();
route.post("/post-job", authValidation("employer"), jobController.createJob);
route.get('/get-allApplicants',authValidation('employer'),jobController.getAllApplicants)
route.get('/get-companyAllJob',authValidation('employer'),jobController.getCompanyAllJob)
export const jobRoute = route;
