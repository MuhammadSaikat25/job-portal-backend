import { Router } from "express";
import { jobController } from "./job.controller";
import { authValidation } from "../../../middlewares/auth";

const route = Router();
route.post("/post-job", authValidation("employer"), jobController.createJob);
export const jobRoute = route;
