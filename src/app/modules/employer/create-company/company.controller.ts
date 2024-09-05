import { RequestHandler } from "express";
import httpStatus from "http-status";
import { companyService } from "./compnay.service";

import { TRequest } from "../../../middlewares/auth";

const createCompany: RequestHandler = async (req, res, next) => {
  try {
    const result = await companyService.createCompany(req.body);
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
const getMyCompany: RequestHandler = async (req: TRequest, res, next) => {
  const email = req?.user!.email;
  try {
    const result = await companyService.getMyCompany(email);
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
export const companyController = {
  createCompany,
  getMyCompany,
};
