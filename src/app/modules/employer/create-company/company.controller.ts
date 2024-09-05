import { RequestHandler } from "express";
import httpStatus from "http-status";
import { companyService } from "./compnay.service";

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

export const companyController = {
  createCompany,
};
