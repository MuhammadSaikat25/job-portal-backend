import { Router } from "express";
import { jobController } from "./job.controller";
import { authValidation } from "../../middlewares/auth";

const route = Router();

route.get("/get-jobs", jobController.getAllJob);
route.get('/job-details/:id',jobController.getSingleJOb)
route.post('/applied-job',authValidation('candidate'),jobController.appliedJob)
route.get('/get-applied-job/:id',authValidation('candidate'),jobController.singleAppliedJob)
route.get('/get-applied-job',authValidation('candidate'),jobController.getAllAppliedJob)
export const jobRouter = route;
