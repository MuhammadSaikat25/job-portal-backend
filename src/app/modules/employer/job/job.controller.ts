import { RequestHandler } from "express";
import httpStatus from "http-status";
import { jobService } from "./job.service";
import { TRequest } from "../../../middlewares/auth";

const createJob: RequestHandler = async (req, res, next) => {
  try {
    const result = await jobService.createJob(req.body);
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
const getAllApplicants: RequestHandler = async (req: TRequest, res, next) => {
  const email = req?.user!.email;
  try {
    const result = await jobService.getAllApplicants(email);
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

const getCompanyAllJob: RequestHandler = async (req: TRequest, res, next) => {
  const email = req?.user!.email;
  try {
    const result = await jobService.getCompanyAllJob(email);
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

const approvedApplication: RequestHandler = async (
  req: TRequest,
  res,
  next
) => {
  const companyEmail = req?.user!.email;

  try {
    const result = await jobService.approvedApplication(
      req.params.id,
      companyEmail
    );
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
const rejectApplication: RequestHandler = async (req: TRequest, res, next) => {
  const companyEmail = req?.user!.email;
  try {
    const result = await jobService.rejectApplication(
      req.params.id,
      companyEmail
    );
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

const updateJob: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await jobService.updateJob(req.body, id);
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
  createJob,
  getAllApplicants,
  getCompanyAllJob,
  approvedApplication,
  rejectApplication,
  updateJob,
};
