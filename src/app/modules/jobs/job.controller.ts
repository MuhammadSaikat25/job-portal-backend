import { RequestHandler } from "express";
import httpStatus from "http-status";
import { jobService } from "./job.service";
import { TRequest } from "../../middlewares/auth";
import { date } from "zod";

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

const appliedJob: RequestHandler = async (req, res, next) => {
  try {
    const result = await jobService.appliedJOb(req.body);
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

const singleAppliedJob: RequestHandler = async (req: TRequest, res, next) => {
  const email = req?.user!.email;

  try {
    const result = await jobService.singleAppliedJob(req.params.id, email);
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

const getAllAppliedJob: RequestHandler = async (req: TRequest, res, next) => {
  const email = req.user?.email;
  try {
    const result = await jobService.getAllAppliedJob(email);
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

const popularJob: RequestHandler = async (req, res, next) => {
  try {
    const result = await jobService.popularJob();
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
const candidateOverview: RequestHandler = async (req: TRequest, res, next) => {
  const email = req.user?.email;
  try {
    const result = await jobService.candidateOverview(email);
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

const searchJob: RequestHandler = async (req, res, next) => {
  const query = req.query;
  try {
    const result = await jobService.searchJob(query);
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
  appliedJob,
  singleAppliedJob,
  getAllAppliedJob,
  popularJob,
  searchJob,
  candidateOverview,
};
