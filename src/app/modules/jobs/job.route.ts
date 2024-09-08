import { Router } from "express";
import { jobController } from "./job.controller";

const route = Router();
route.get("/get-jobs", jobController.getAllJob);
export const jobRouter = route;
