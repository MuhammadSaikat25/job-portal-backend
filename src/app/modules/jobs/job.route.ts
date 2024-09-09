import { Router } from "express";
import { jobController } from "./job.controller";

const route = Router();

route.get("/get-jobs", jobController.getAllJob);
route.get('/job-details/:id',jobController.getSingleJOb)

export const jobRouter = route;
