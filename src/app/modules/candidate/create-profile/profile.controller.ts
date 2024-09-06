import { RequestHandler } from "express";
import httpStatus from "http-status";
import { candidateProfileService } from "./profile.service";

const createCandidateProfile: RequestHandler = async (req, res, next) => {
  try {
    const result = await candidateProfileService.createCandidateProfile(
      req.body
    );
    res.status(httpStatus.OK).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      data: error,
    });
  }
};
export const candidateProfileController = {
  createCandidateProfile,
};
