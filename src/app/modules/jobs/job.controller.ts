import { RequestHandler } from "express";
import httpStatus from "http-status";
import { jobService } from "./job.service";

const getAllJob: RequestHandler = async (req, res, next) => {
  try {
    const result = await jobService.getAllJob(req.query);
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

const getSingleJOb: RequestHandler = async (req, res, next) => {
  try {
    const result = await jobService.getSingleJob(req.params.id);
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

export const jobController = {
  getAllJob,
  getSingleJOb,
};
