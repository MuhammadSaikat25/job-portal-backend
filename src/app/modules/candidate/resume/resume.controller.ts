import { RequestHandler } from "express";
import httpStatus from "http-status";
import { resumeService } from "./resume.service";
import { TRequest } from "../../../middlewares/auth";

const createResume: RequestHandler = async (req, res, next) => {
  try {
    const result = await resumeService.createResume(req.body);
    res.status(httpStatus.OK).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: true,
      data: error,
    });
  }
};


const getMyResume:RequestHandler=async(req:TRequest,res,next)=>{
  const email=req?.user!.email
  try {
    const result=await resumeService.getMyResume(email)
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
export const resumeController = {
  createResume,
  getMyResume
};
