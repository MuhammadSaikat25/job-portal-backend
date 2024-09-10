import { Router } from "express";
import { resumeController } from "./resume.controller";
import { authValidation } from "../../../middlewares/auth";
const route = Router();
route.put('/create-resume',authValidation('candidate'),resumeController.createResume)
route.get('/get-resume',authValidation('candidate'),resumeController.getMyResume)
export const resumeRouter = route;
