import { RequestHandler } from "express";
import httpStatus from "http-status";
import { candidateProfileService } from "./profile.service";
import { TRequest } from "../../../middlewares/auth";

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

const getCandidateProfile:RequestHandler=async(req:TRequest,res,next)=>{
  const email=req?.user!.email
  try {
    const result=await candidateProfileService.getCandidateProfile(email)
    res.status(httpStatus.OK).json({
      success:true,
      data:result
    })
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success:true,
      data:error
    })
  }
}
export const candidateProfileController = {
  createCandidateProfile,
  getCandidateProfile
};
