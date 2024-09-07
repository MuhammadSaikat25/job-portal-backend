import { Router } from "express";
import { authValidation } from "../../../middlewares/auth";
import { candidateProfileController } from "./profile.controller";

const route=Router()
route.put('/candidate-profile',authValidation('candidate'),candidateProfileController.createCandidateProfile)
route.get('/candidate-profile',authValidation('candidate'),candidateProfileController.getCandidateProfile)

export const candidateProfileRoute=route