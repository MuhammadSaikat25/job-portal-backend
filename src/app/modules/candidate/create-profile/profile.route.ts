import { Router } from "express";
import { authValidation } from "../../../middlewares/auth";
import { candidateProfileController } from "./profile.controller";

const route=Router()
route.put('/candidate-profile',authValidation('candidate'),candidateProfileController.createCandidateProfile)

export const candidateProfileRoute=route